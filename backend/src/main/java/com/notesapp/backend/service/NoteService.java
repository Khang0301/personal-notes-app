package com.notesapp.backend.service;

import com.notesapp.backend.dto.note.NoteRequest;
import com.notesapp.backend.dto.note.NoteResponse;
import com.notesapp.backend.entity.Category;
import com.notesapp.backend.entity.Note;
import com.notesapp.backend.entity.Tag;
import com.notesapp.backend.entity.User;
import com.notesapp.backend.exception.ForbiddenException;
import com.notesapp.backend.exception.ResourceNotFoundException;
import com.notesapp.backend.repository.CategoryRepository;
import com.notesapp.backend.repository.NoteRepository;
import com.notesapp.backend.repository.TagRepository;
import com.notesapp.backend.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final CurrentUserProvider currentUserProvider;

    /**
     * The single query behind /api/notes, /favorites, /pinned and /archive.
     * All filtering and sorting happens in memory with Java Streams instead
     * of a complex JPA Specification — deliberately simple, and fine for the
     * data size of a personal notes app.
     */
    public List<NoteResponse> getNotes(
            String search, Long categoryId, String tag,
            Boolean favorite, Boolean pinned, Boolean archived, String sort
    ) {
        User user = currentUserProvider.getCurrentUser();
        List<Note> notes = noteRepository.findByUserIdAndIsDeletedFalse(user.getId());

        Stream<Note> stream = notes.stream();

        boolean wantArchived = archived != null && archived;
        stream = stream.filter(n -> n.isArchived() == wantArchived);

        if (favorite != null && favorite) {
            stream = stream.filter(Note::isFavorite);
        }
        if (pinned != null && pinned) {
            stream = stream.filter(Note::isPinned);
        }
        if (categoryId != null) {
            stream = stream.filter(n -> n.getCategory() != null && n.getCategory().getId().equals(categoryId));
        }
        if (tag != null && !tag.isBlank()) {
            String tagLower = tag.toLowerCase();
            stream = stream.filter(n -> n.getTags().stream()
                    .anyMatch(t -> t.getName().toLowerCase().equals(tagLower)));
        }
        if (search != null && !search.isBlank()) {
            String q = search.toLowerCase();
            stream = stream.filter(n ->
                    n.getTitle().toLowerCase().contains(q)
                            || (n.getContent() != null && n.getContent().toLowerCase().contains(q))
                            || n.getTags().stream().anyMatch(t -> t.getName().toLowerCase().contains(q))
            );
        }

        Comparator<Note> sortComparator = resolveSort(sort);

        // Pinned notes always float to the top, then the chosen sort applies.
        Comparator<Note> finalComparator = Comparator
                .comparing(Note::isPinned).reversed()
                .thenComparing(sortComparator);

        return stream
                .sorted(finalComparator)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<NoteResponse> getTrash() {
        User user = currentUserProvider.getCurrentUser();
        return noteRepository.findByUserIdAndIsDeletedTrue(user.getId())
                .stream()
                .sorted(Comparator.comparing(Note::getUpdatedAt).reversed())
                .map(this::toResponse)
                .toList();
    }

    public NoteResponse getNoteById(Long id) {
        return toResponse(getOwnedNote(id));
    }

    @Transactional
    public NoteResponse createNote(NoteRequest request) {
        User user = currentUserProvider.getCurrentUser();

        Note note = Note.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(user)
                .isFavorite(Boolean.TRUE.equals(request.getIsFavorite()))
                .isPinned(Boolean.TRUE.equals(request.getIsPinned()))
                .build();

        applyCategory(note, user, request.getCategoryId());
        applyTags(note, user, request.getTags());

        return toResponse(noteRepository.save(note));
    }

    @Transactional
    public NoteResponse updateNote(Long id, NoteRequest request) {
        Note note = getOwnedNote(id);
        User user = note.getUser();

        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        if (request.getIsFavorite() != null) note.setFavorite(request.getIsFavorite());
        if (request.getIsPinned() != null) note.setPinned(request.getIsPinned());

        applyCategory(note, user, request.getCategoryId());
        applyTags(note, user, request.getTags());

        return toResponse(noteRepository.save(note));
    }

    // Normal delete: move to Trash (soft delete). Nothing is removed from the DB yet.
    public void moveToTrash(Long id) {
        Note note = getOwnedNote(id);
        note.setDeleted(true);
        noteRepository.save(note);
    }

    public NoteResponse restoreNote(Long id) {
        Note note = getOwnedNote(id);
        note.setDeleted(false);
        return toResponse(noteRepository.save(note));
    }

    // Permanent delete: only ever called from the Trash view — actually
    // removes the row from the database. Cannot be undone.
    public void permanentlyDelete(Long id) {
        Note note = getOwnedNote(id);
        noteRepository.delete(note);
    }

    public NoteResponse toggleFavorite(Long id) {
        Note note = getOwnedNote(id);
        note.setFavorite(!note.isFavorite());
        return toResponse(noteRepository.save(note));
    }

    public NoteResponse togglePin(Long id) {
        Note note = getOwnedNote(id);
        note.setPinned(!note.isPinned());
        return toResponse(noteRepository.save(note));
    }

    public NoteResponse toggleArchive(Long id) {
        Note note = getOwnedNote(id);
        note.setArchived(!note.isArchived());
        return toResponse(noteRepository.save(note));
    }

    // --- helpers ---------------------------------------------------------

    private void applyCategory(Note note, User user, Long categoryId) {
        if (categoryId == null) {
            note.setCategory(null);
            return;
        }
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        if (!category.getUser().getId().equals(user.getId())) {
            throw new ForbiddenException("You do not have access to this category");
        }
        note.setCategory(category);
    }

    private void applyTags(Note note, User user, List<String> tagNames) {
        if (tagNames == null) {
            return;
        }
        Set<Tag> tags = new HashSet<>();
        for (String rawName : tagNames) {
            String name = rawName.trim();
            if (name.isEmpty()) continue;

            Tag tag = tagRepository.findByUserIdAndNameIgnoreCase(user.getId(), name)
                    .orElseGet(() -> tagRepository.save(Tag.builder().name(name).user(user).build()));
            tags.add(tag);
        }
        note.setTags(tags);
    }

    private Note getOwnedNote(Long id) {
        User user = currentUserProvider.getCurrentUser();
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        if (!note.getUser().getId().equals(user.getId())) {
            throw new ForbiddenException("You do not have access to this note");
        }
        return note;
    }

    private Comparator<Note> resolveSort(String sort) {
        String key = sort == null ? "newest" : sort;
        return switch (key) {
            case "oldest" -> Comparator.comparing(Note::getCreatedAt);
            case "updated" -> Comparator.comparing(Note::getUpdatedAt).reversed();
            case "title_asc" -> Comparator.comparing((Note n) -> n.getTitle().toLowerCase());
            case "title_desc" -> Comparator.comparing((Note n) -> n.getTitle().toLowerCase()).reversed();
            default -> Comparator.comparing(Note::getCreatedAt).reversed(); // "newest"
        };
    }

    private NoteResponse toResponse(Note note) {
        NoteResponse.CategorySummary categorySummary = note.getCategory() == null
                ? null
                : NoteResponse.CategorySummary.builder()
                    .id(note.getCategory().getId())
                    .name(note.getCategory().getName())
                    .build();

        return NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .isFavorite(note.isFavorite())
                .isPinned(note.isPinned())
                .isArchived(note.isArchived())
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .category(categorySummary)
                .tags(note.getTags().stream().map(Tag::getName).sorted().toList())
                .build();
    }
}
