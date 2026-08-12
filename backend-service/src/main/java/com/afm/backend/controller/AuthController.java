package com.afm.backend.controller;

import com.afm.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private com.afm.backend.repository.UserRepository userRepository;

    @Autowired
    private com.afm.backend.repository.PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private com.afm.backend.service.EmailService emailService;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/public/auth/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> authenticationRequest) throws Exception {
        String username = authenticationRequest.get("username");
        String password = authenticationRequest.get("password");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        final String token = jwtUtil.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", userDetails.getUsername());
        response.put("role", userDetails.getAuthorities().iterator().next().getAuthority());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/public/auth/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String emailOrUsername = request.get("email");
        if (emailOrUsername == null || emailOrUsername.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Email address or username is required."));
        }

        String searchKey = emailOrUsername.trim();
        java.util.Optional<com.afm.backend.entity.User> userOpt = userRepository.findByUsername(searchKey);
        if (!userOpt.isPresent()) {
            // Try searching by email
            userOpt = userRepository.findAll().stream()
                    .filter(u -> searchKey.equalsIgnoreCase(u.getEmail()))
                    .findFirst();
        }

        if (!userOpt.isPresent()) {
            // For security, return success message even if user not found
            return ResponseEntity.ok(Collections.singletonMap("message", "If an account matches, a 6-digit verification OTP has been sent to the registered email."));
        }

        com.afm.backend.entity.User user = userOpt.get();
        String targetEmail = user.getEmail();
        if (targetEmail == null || targetEmail.trim().isEmpty()) {
            targetEmail = user.getUsername() + "@aatmanirbharfacility.in";
        }

        // Generate 6-Digit Verification OTP
        String otpCode = String.format("%06d", new java.security.SecureRandom().nextInt(1000000));
        java.util.Date expiryDate = new java.util.Date(System.currentTimeMillis() + (15 * 60 * 1000)); // 15 mins expiry

        com.afm.backend.entity.PasswordResetToken resetToken = new com.afm.backend.entity.PasswordResetToken(targetEmail, otpCode, expiryDate);
        passwordResetTokenRepository.save(resetToken);

        // Send OTP via Email
        emailService.sendPasswordResetOtp(targetEmail, otpCode);

        return ResponseEntity.ok(Collections.singletonMap("message", "A 6-digit verification OTP has been sent to: " + targetEmail));
    }

    @PostMapping("/public/auth/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otpCode = request.get("otp");
        String newPassword = request.get("newPassword");

        if (email == null || otpCode == null || newPassword == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Email, OTP, and new password are required."));
        }

        java.util.Optional<com.afm.backend.entity.PasswordResetToken> tokenOpt = 
                passwordResetTokenRepository.findTopByEmailAndOtpCodeOrderByExpiryDateDesc(email.trim(), otpCode.trim());

        if (!tokenOpt.isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid or expired OTP code."));
        }

        com.afm.backend.entity.PasswordResetToken token = tokenOpt.get();
        if (token.getExpiryDate().before(new java.util.Date())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "OTP has expired. Please request a new OTP."));
        }

        // Find user by email or username
        java.util.Optional<com.afm.backend.entity.User> userOpt = userRepository.findAll().stream()
                .filter(u -> email.equalsIgnoreCase(u.getEmail()) || email.equalsIgnoreCase(u.getUsername()))
                .findFirst();

        if (!userOpt.isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "User account not found."));
        }

        com.afm.backend.entity.User user = userOpt.get();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete used token
        try {
            passwordResetTokenRepository.delete(token);
        } catch (Exception e) {}

        return ResponseEntity.ok(Collections.singletonMap("message", "Password has been successfully reset! You can now log in."));
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwtToken = authorizationHeader.substring(7);
            
            // Add token to Redis blacklist if Redis is available
            try {
                stringRedisTemplate.opsForValue().set("blacklist:" + jwtToken, "true", 24, TimeUnit.HOURS);
            } catch (Exception e) {
                // Redis offline, proceed with local logout
            }
            
            SecurityContextHolder.clearContext();
            return ResponseEntity.ok(Collections.singletonMap("message", "Logged out successfully."));
        }
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid authorization header."));
    }
}
