package com.notesapp.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "is required")
    @Email(message = "must be a valid email address")
    private String email;

    @NotBlank(message = "is required")
    private String password;
}
