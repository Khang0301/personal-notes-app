package com.notesapp.backend.dto.note;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class NoteResponse {
    private Long id;
    private String title;
    private String content;
    private boolean isFavorite;
    private boolean isPinned;
    private boolean isArchived;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private CategorySummary category; // null means "Uncategorized"
    private List<String> tags;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class CategorySummary {
        private Long id;
        private String name;
    }
}
