package com.notesapp.backend.service;

import com.notesapp.backend.entity.User;
import com.notesapp.backend.repository.TagRepository;
import com.notesapp.backend.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

// Read-only: tags themselves are created implicitly whenever a note uses a
// new tag name (see NoteService.applyTags). This service only powers the
// tag filter dropdown on the frontend.
@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final CurrentUserProvider currentUserProvider;

    public List<String> getTagNames() {
        User user = currentUserProvider.getCurrentUser();
        return tagRepository.findByUserIdOrderByNameAsc(user.getId())
                .stream()
                .map(t -> t.getName())
                .toList();
    }
}
