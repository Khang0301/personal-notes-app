package com.notesapp.backend.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {

    @NotBlank(message = "is required")
    private String currentPassword;

    @NotBlank(message = "is required")
    @Size(min = 6, message = "must be at least 6 characters")
    private String newPassword;
}
