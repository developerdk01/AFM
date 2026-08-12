package com.afm.backend.repository;

import com.afm.backend.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findTopByEmailAndOtpCodeOrderByExpiryDateDesc(String email, String otpCode);
    void deleteByEmail(String email);
}
