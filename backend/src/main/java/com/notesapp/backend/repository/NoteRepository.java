package com.notesapp.backend.repository;

import com.notesapp.backend.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserIdAndIsDeletedFalse(Long userId);
    List<Note> findByUserIdAndIsDeletedTrue(Long userId);
    List<Note> findByCategoryId(Long categoryId);
}
