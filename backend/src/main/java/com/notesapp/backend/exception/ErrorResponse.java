package com.notesapp.backend.exception;

import java.time.LocalDateTime;

// Simple, consistent shape for every error the API returns.
public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        String path
) {
}
