package com.notesapp.backend.service;

import com.notesapp.backend.dto.category.CategoryRequest;
import com.notesapp.backend.dto.category.CategoryResponse;
import com.notesapp.backend.entity.Category;
import com.notesapp.backend.entity.Note;
import com.notesapp.backend.entity.User;
import com.notesapp.backend.exception.ForbiddenException;
import com.notesapp.backend.exception.ResourceNotFoundException;
import com.notesapp.backend.repository.CategoryRepository;
import com.notesapp.backend.repository.NoteRepository;
import com.notesapp.backend.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final NoteRepository noteRepository;
    private final CurrentUserProvider currentUserProvider;

    public List<CategoryResponse> getCategories() {
        User user = currentUserProvider.getCurrentUser();
        return categoryRepository.findByUserIdOrderByNameAsc(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public CategoryResponse createCategory(CategoryRequest request) {
        User user = currentUserProvider.getCurrentUser();
        Category category = Category.builder()
                .name(request.getName())
                .user(user)
                .build();
        return toResponse(categoryRepository.save(category));
    }

    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = getOwnedCategory(id);
        category.setName(request.getName());
        return toResponse(categoryRepository.save(category));
    }

    // Deleting a category never deletes notes — they simply become
    // Uncategorized, exactly as required by the project spec.
    @Transactional
    public void deleteCategory(Long id) {
        Category category = getOwnedCategory(id);

        List<Note> notes = noteRepository.findByCategoryId(category.getId());
        for (Note note : notes) {
            note.setCategory(null);
        }
        noteRepository.saveAll(notes);

        categoryRepository.delete(category);
    }

    private Category getOwnedCategory(Long id) {
        User user = currentUserProvider.getCurrentUser();
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new ForbiddenException("You do not have access to this category");
        }

        return category;
    }

    private CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .createdAt(category.getCreatedAt())
                .build();
    }
}
