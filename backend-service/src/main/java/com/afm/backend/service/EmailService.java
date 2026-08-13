package com.afm.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Primary Sender & HR Recipient Email (Configured: masumduhijod01@gmail.com)
    @Value("${spring.mail.username:masumduhijod01@gmail.com}")
    private String fromEmail;

    /**
     * Send Candidate Thank You Confirmation Email
     */
    public void sendCandidateThankYou(String candidateEmail, String candidateName, String jobRole) {
        new Thread(() -> {
            if (mailSender == null || candidateEmail == null || candidateEmail.trim().isEmpty()) {
                return;
            }
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("masumduhijod01@gmail.com");
                message.setTo(candidateEmail.trim());
                message.setSubject("Application Received - " + (jobRole != null ? jobRole : "Career Position") + " | AFM Pvt. Ltd.");
                message.setText("Dear " + candidateName + ",\n\n" +
                        "Thank you for applying for the " + (jobRole != null ? jobRole : "opportunity") + " position at Aatmanirbhar Facility Management Pvt. Ltd.\n\n" +
                        "Our recruitment operations team has received your application details. Our HR team will review your profile and contact you shortly if your credentials match our client requirements.\n\n" +
                        "Best Regards,\n" +
                        "HR Operations Team\n" +
                        "Aatmanirbhar Facility Management Pvt. Ltd.\n" +
                        "https://afmtest.vercel.app");
                mailSender.send(message);
                System.out.println("✅ Candidate Confirmation Email sent to: " + candidateEmail);
            } catch (Exception e) {
                System.err.println("⚠️ Could not send Candidate Email to " + candidateEmail + ": " + e.getMessage());
                e.printStackTrace();
            }
        }).start();
    }

    /**
     * Send HR Team Notification Alert Email to masumduhijod01@gmail.com
     */
    public void sendHrApplicationAlert(String candidateName, String candidateEmail, String phone, String jobRole) {
        new Thread(() -> {
            if (mailSender == null) {
                return;
            }
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("masumduhijod01@gmail.com");
                message.setTo("masumduhijod01@gmail.com");
                message.setSubject("🚨 New Candidate Application: " + candidateName + " for " + (jobRole != null ? jobRole : "Vacancy"));
                message.setText("A new candidate has submitted their application on the AFM Portal:\n\n" +
                        "• Candidate Name: " + candidateName + "\n" +
                        "• Email Address: " + candidateEmail + "\n" +
                        "• Phone Contact: " + phone + "\n" +
                        "• Role Applied: " + (jobRole != null ? jobRole : "General Pipeline") + "\n\n" +
                        "Please log in to the HR Admin Operations Console to review the candidate application and resume:\n" +
                        "https://afmtest.vercel.app");
                mailSender.send(message);
                System.out.println("✅ HR Team Notification Alert Email sent to: masumduhijod01@gmail.com");
            } catch (Exception e) {
                System.err.println("⚠️ Could not send HR Alert Email: " + e.getMessage());
                e.printStackTrace();
            }
        }).start();
    }

    /**
     * Send Welcome Login Credentials to newly created Admin/HR User
     */
    @Async
    public void sendUserCredentials(String userEmail, String username, String rawPassword, String role) {
        if (mailSender == null || userEmail == null || userEmail.trim().isEmpty()) {
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(userEmail.trim());
            message.setSubject("Welcome to AFM HR Operations Console - Account Credentials");
            message.setText("Hello,\n\n" +
                    "Your account has been created for the Aatmanirbhar Facility Management Admin Operations Portal.\n\n" +
                    "Here are your login credentials:\n" +
                    "• Role Assigned: " + role + "\n" +
                    "• Username: " + username + "\n" +
                    "• Initial Password: " + rawPassword + "\n\n" +
                    "Please log in at: https://aatmanirbharfacility.in/admin\n\n" +
                    "For security reasons, we recommend updating your password after logging in.\n\n" +
                    "Best Regards,\n" +
                    "System Administrator\n" +
                    "Aatmanirbhar Facility Management Pvt. Ltd.");
            mailSender.send(message);
            System.out.println("✅ User Welcome Credentials Email sent to: " + userEmail);
        } catch (Exception e) {
            System.err.println("⚠️ Could not send User Credentials Email: " + e.getMessage());
        }
    }

    /**
     * Send Password Reset 6-Digit OTP to User
     */
    @Async
    public void sendPasswordResetOtp(String userEmail, String otpCode) {
        if (mailSender == null || userEmail == null || userEmail.trim().isEmpty()) {
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(userEmail.trim());
            message.setSubject("Password Reset OTP - AFM Admin Portal");
            message.setText("Hello,\n\n" +
                    "You have requested to reset your password for the AFM Admin Portal.\n\n" +
                    "Your 6-Digit Verification OTP is: " + otpCode + "\n\n" +
                    "This OTP is valid for 15 minutes. Please do not share this OTP with anyone.\n\n" +
                    "If you did not request a password reset, please ignore this email.\n\n" +
                    "Best Regards,\n" +
                    "Security & Admin Team\n" +
                    "Aatmanirbhar Facility Management Pvt. Ltd.");
            mailSender.send(message);
            System.out.println("✅ Password Reset OTP Email sent to: " + userEmail);
        } catch (Exception e) {
            System.err.println("⚠️ Could not send Password Reset OTP Email: " + e.getMessage());
        }
    }
}
