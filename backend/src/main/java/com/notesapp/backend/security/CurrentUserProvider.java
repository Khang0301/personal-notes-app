package com.notesapp.backend.security;

import com.notesapp.backend.entity.User;
import com.notesapp.backend.exception.ResourceNotFoundException;
import com.notesapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

// Small helper injected into services/controllers so they never have to deal
// with SecurityContextHolder directly. After JwtAuthFilter runs, the
// authenticated principal's username IS the user's email (see CustomUserDetailsService).
@Component
@RequiredArgsConstructor
public class CurrentUserProvider {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }
}
