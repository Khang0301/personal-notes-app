package com.notesapp.backend.controller;

import com.notesapp.backend.dto.note.NoteRequest;
import com.notesapp.backend.dto.note.NoteResponse;
import com.notesapp.backend.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    // GET /api/notes?search=&category=&tag=&favorite=&pinned=&archived=&sort=
    @GetMapping
    public ResponseEntity<List<NoteResponse>> getNotes(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) Boolean favorite,
            @RequestParam(required = false) Boolean pinned,
            @RequestParam(required = false) Boolean archived,
            @RequestParam(required = false) String sort
    ) {
        return ResponseEntity.ok(noteService.getNotes(search, category, tag, favorite, pinned, archived, sort));
    }

    // Must be declared BEFORE /{id} so Spring doesn't try to parse "trash" as a Long id.
    @GetMapping("/trash")
    public ResponseEntity<List<NoteResponse>> getTrash() {
        return ResponseEntity.ok(noteService.getTrash());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.getNoteById(id));
    }

    @PostMapping
    public ResponseEntity<NoteResponse> create(@Valid @RequestBody NoteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.createNote(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> update(@PathVariable Long id, @Valid @RequestBody NoteRequest request) {
        return ResponseEntity.ok(noteService.updateNote(id, request));
    }

    // Soft delete: moves the note to Trash.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        noteService.moveToTrash(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/favorite")
    public ResponseEntity<NoteResponse> toggleFavorite(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.toggleFavorite(id));
    }

    @PatchMapping("/{id}/pin")
    public ResponseEntity<NoteResponse> togglePin(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.togglePin(id));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<NoteResponse> toggleArchive(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.toggleArchive(id));
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<NoteResponse> restore(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.restoreNote(id));
    }

    // Hard delete — only reachable from the Trash view. Cannot be undone.
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<Void> permanentDelete(@PathVariable Long id) {
        noteService.permanentlyDelete(id);
        return ResponseEntity.noContent().build();
    }
}
