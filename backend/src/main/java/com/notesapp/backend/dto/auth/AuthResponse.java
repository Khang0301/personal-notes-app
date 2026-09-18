package com.notesapp.backend.dto.auth;

import com.notesapp.backend.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserResponse user;
}
