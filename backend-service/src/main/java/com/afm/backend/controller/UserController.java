package com.afm.backend.controller;

import com.afm.backend.entity.User;
import com.afm.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/admin/users")
@PreAuthorize("hasRole('SUPERADMIN')")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private com.afm.backend.service.EmailService emailService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        // Exclude password hashes from list for security & filter visible users
        List<User> users = userRepository.findByIsVisibleTrue();
        users.forEach(user -> user.setPasswordHash("PROTECTED"));
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> requestBody) {
        String username = requestBody.get("username");
        String password = requestBody.get("password");
        String role = requestBody.get("role");
        String email = requestBody.get("email");

        if (username == null || password == null || role == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Username, password and role are required."));
        }

        // Validate role prefix
        if (!role.equals("ROLE_HR") && !role.equals("ROLE_ADMIN") && !role.equals("ROLE_SUPERADMIN")) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid role specified. Use ROLE_HR, ROLE_ADMIN or ROLE_SUPERADMIN."));
        }

        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Username is already registered."));
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPasswordHash(passwordEncoder.encode(password));
        newUser.setRole(role);
        newUser.setActive(true);
        if (email != null && !email.trim().isEmpty()) {
            newUser.setEmail(email.trim());
        }

        User savedUser = userRepository.save(newUser);

        // Send login credentials via email to new user
        if (email != null && !email.trim().isEmpty()) {
            emailService.sendUserCredentials(email.trim(), username, password, role);
        }

        savedUser.setPasswordHash("PROTECTED"); // hide hash from response
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<?> toggleUserActive(@PathVariable("id") Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (!userOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        // Prevent SuperAdmin from deactivating themselves
        if (user.getUsername().equals("superadmin")) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Cannot deactivate the primary superadmin account."));
        }

        user.setActive(!user.isActive());
        userRepository.save(user);
        user.setPasswordHash("PROTECTED");
        return ResponseEntity.ok(user);
    }
}
