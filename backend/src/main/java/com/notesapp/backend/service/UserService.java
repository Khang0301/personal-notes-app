package com.notesapp.backend.service;

import com.notesapp.backend.dto.user.ChangePasswordRequest;
import com.notesapp.backend.dto.user.UpdateProfileRequest;
import com.notesapp.backend.dto.user.UserResponse;
import com.notesapp.backend.entity.User;
import com.notesapp.backend.exception.BadRequestException;
import com.notesapp.backend.repository.UserRepository;
import com.notesapp.backend.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CurrentUserProvider currentUserProvider;
    private final AuthService authService;

    public UserResponse getCurrentUser() {
        return authService.toUserResponse(currentUserProvider.getCurrentUser());
    }

    public UserResponse updateProfile(UpdateProfileRequest request) {
        User user = currentUserProvider.getCurrentUser();
        user.setFullName(request.getFullName());
        User saved = userRepository.save(user);
        return authService.toUserResponse(saved);
    }

    public void changePassword(ChangePasswordRequest request) {
        User user = currentUserProvider.getCurrentUser();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
