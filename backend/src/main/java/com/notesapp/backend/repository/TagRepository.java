package com.notesapp.backend.repository;

import com.notesapp.backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByUserIdOrderByNameAsc(Long userId);
    Optional<Tag> findByUserIdAndNameIgnoreCase(Long userId, String name);
}
