package com.notesapp.backend.dto.note;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NoteRequest {

    @NotBlank(message = "is required")
    private String title;

    private String content;

    // Nullable: no category = "Uncategorized"
    private Long categoryId;

    // Tag names as plain strings; the service finds-or-creates each Tag
    // for the current user so the frontend never has to manage tag IDs.
    private List<String> tags;

    private Boolean isFavorite;
    private Boolean isPinned;
}
