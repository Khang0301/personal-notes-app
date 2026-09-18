package com.notesapp.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "is required")
    private String fullName;

    @NotBlank(message = "is required")
    @Email(message = "must be a valid email address")
    private String email;

    @NotBlank(message = "is required")
    @Size(min = 6, message = "must be at least 6 characters")
    private String password;

    @NotBlank(message = "is required")
    private String confirmPassword;
}
