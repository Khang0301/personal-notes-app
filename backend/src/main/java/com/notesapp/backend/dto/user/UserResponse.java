package com.notesapp.backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private LocalDateTime createdAt;
    // Password is intentionally never included here.
}
