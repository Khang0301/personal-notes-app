package com.notesapp.backend.controller;

import com.notesapp.backend.dto.auth.AuthResponse;
import com.notesapp.backend.dto.auth.LoginRequest;
import com.notesapp.backend.dto.auth.RegisterRequest;
import com.notesapp.backend.dto.user.UserResponse;
import com.notesapp.backend.service.AuthService;
import com.notesapp.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Everything under /api/auth/** is public (see SecurityConfig) except /me,
// which still lives here for convenience but requires a valid token.
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }
}
