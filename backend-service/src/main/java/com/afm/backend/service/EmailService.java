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

    @Value("${brevo.api.key:}")
    private String brevoApiKey;

    /**
     * Send Candidate Thank You Confirmation Email
     */
    public void sendCandidateThankYou(String candidateEmail, String candidateName, String jobRole) {
        new Thread(() -> {
            if (candidateEmail == null || candidateEmail.trim().isEmpty()) {
                return;
            }
            String subject = "Application Received - " + (jobRole != null ? jobRole : "Career Position") + " | AFM Pvt. Ltd.";
            String textContent = "Dear " + candidateName + ",\n\n" +
                    "Thank you for applying for the " + (jobRole != null ? jobRole : "opportunity") + " position at Aatmanirbhar Facility Management Pvt. Ltd.\n\n" +
                    "Our recruitment operations team has received your application details. Our HR team will review your profile and contact you shortly if your credentials match our client requirements.\n\n" +
                    "Best Regards,\n" +
                    "HR Operations Team\n" +
                    "Aatmanirbhar Facility Management Pvt. Ltd.\n" +
                    "https://afmtest.vercel.app";

            boolean sent = false;
            if (brevoApiKey != null && !brevoApiKey.trim().isEmpty()) {
                sent = sendViaBrevoHttps(candidateEmail.trim(), candidateName, subject, textContent);
            }
            if (!sent && mailSender != null) {
                sendViaSmtp(candidateEmail.trim(), subject, textContent);
            }
        }).start();
    }

    /**
     * Send HR Team Notification Alert Email to masumduhijod01@gmail.com
     */
    public void sendHrApplicationAlert(String candidateName, String candidateEmail, String phone, String jobRole) {
        new Thread(() -> {
            String hrEmail = "masumduhijod01@gmail.com";
            String subject = "🚨 New Candidate Application: " + candidateName + " for " + (jobRole != null ? jobRole : "Vacancy");
            String textContent = "A new candidate has submitted their application on the AFM Portal:\n\n" +
                    "• Candidate Name: " + candidateName + "\n" +
                    "• Email Address: " + candidateEmail + "\n" +
                    "• Phone Contact: " + phone + "\n" +
                    "• Role Applied: " + (jobRole != null ? jobRole : "General Pipeline") + "\n\n" +
                    "Please log in to the HR Admin Operations Console to review the candidate application and resume:\n" +
                    "https://afmtest.vercel.app";

            boolean sent = false;
            if (brevoApiKey != null && !brevoApiKey.trim().isEmpty()) {
                sent = sendViaBrevoHttps(hrEmail, "HR Team", subject, textContent);
            }
            if (!sent && mailSender != null) {
                sendViaSmtp(hrEmail, subject, textContent);
            }
        }).start();
    }

    private boolean sendViaBrevoHttps(String recipientEmail, String recipientName, String subject, String textContent) {
        try {
            java.net.URL url = new java.net.URL("https://api.brevo.com/v3/smtp/email");
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("accept", "application/json");
            conn.setRequestProperty("api-key", brevoApiKey.trim());
            conn.setRequestProperty("content-type", "application/json");
            conn.setDoOutput(true);
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);

            String jsonInputString = String.format(
                "{\"sender\":{\"name\":\"AFM HR Operations\",\"email\":\"developerdk01@gmail.com\"},\"to\":[{\"email\":\"%s\",\"name\":\"%s\"}],\"subject\":\"%s\",\"textContent\":\"%s\"}",
                recipientEmail,
                recipientName != null ? recipientName.replace("\"", "\\\"") : "Applicant",
                subject.replace("\"", "\\\""),
                textContent.replace("\n", "\\n").replace("\"", "\\\"")
            );

            try (java.io.OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(java.nio.charset.StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int code = conn.getResponseCode();
            if (code >= 200 && code < 300) {
                System.out.println("✅ Email sent via HTTPS Port 443 to: " + recipientEmail);
                return true;
            } else {
                System.err.println("⚠️ Brevo HTTPS API returned HTTP status: " + code);
            }
        } catch (Exception e) {
            System.err.println("⚠️ Brevo HTTPS API Exception: " + e.getMessage());
        }
        return false;
    }

    private void sendViaSmtp(String recipientEmail, String subject, String textContent) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("developerdk01@gmail.com");
            message.setTo(recipientEmail);
            message.setSubject(subject);
            message.setText(textContent);
            mailSender.send(message);
            System.out.println("✅ Email sent via SMTP to: " + recipientEmail);
        } catch (Exception e) {
            System.err.println("⚠️ SMTP Dispatch Warning (Render firewall blocked SMTP port 465/587): " + e.getMessage());
        }
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
