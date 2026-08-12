package com.afm.backend.controller;

import com.afm.backend.entity.Application;
import com.afm.backend.entity.FeatureToggle;
import com.afm.backend.repository.ApplicationRepository;
import com.afm.backend.repository.FeatureToggleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private FeatureToggleRepository featureToggleRepository;

    @Autowired
    private com.afm.backend.service.EmailService emailService;

    private static final String UPLOAD_DIR = "D:/Projects/AFM/uploads/";

    @PostMapping("/public/applications")
    public ResponseEntity<?> submitApplication(
            @RequestParam("fullName") String fullName,
            @RequestParam("emailAddress") String emailAddress,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("preferredLocation") String preferredLocation,
            @RequestParam("totalExperience") String totalExperience,
            @RequestParam("targetRole") String targetRole,
            @RequestParam(value = "currentCtc", required = false) Double currentCtc,
            @RequestParam("expectedCtc") Double expectedCtc,
            @RequestParam("noticePeriod") String noticePeriod,
            @RequestParam("resumeFile") MultipartFile file,
            @RequestParam(value = "coverMessage", required = false) String coverMessage) {

        // Check if Resume Upload feature toggle is active (SuperAdmin switch)
        Optional<FeatureToggle> toggle = featureToggleRepository.findById("resume_upload_enabled");
        if (toggle.isPresent() && !toggle.get().isToggleValue()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Collections.singletonMap("error", "Applications are currently closed by the administrator."));
        }

        // Validate File Type (MIME-Type)
        String contentType = file.getContentType();
        if (contentType == null || (!contentType.equals("application/pdf") && 
                !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Only PDF and DOCX files are allowed."));
        }

        // Handle File Save
        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + filename);
            Files.write(path, file.getBytes());

            // Save Application details to Database
            Application app = new Application();
            app.setFullName(fullName);
            app.setEmailAddress(emailAddress);
            app.setPhoneNumber(phoneNumber);
            app.setPreferredLocation(preferredLocation);
            app.setTotalExperience(totalExperience);
            app.setTargetRole(targetRole);
            app.setCurrentCtc(currentCtc);
            app.setExpectedCtc(expectedCtc);
            app.setNoticePeriod(noticePeriod);
            app.setResumeUrl("/uploads/" + filename);
            app.setCoverMessage(coverMessage);
            app.setCreatedAt(new Date());

            Application savedApp = applicationRepository.save(app);

            // Trigger Automated Dual Emails (1 to Candidate, 1 to HR Alert)
            emailService.sendCandidateThankYou(emailAddress, fullName, targetRole);
            emailService.sendHrApplicationAlert(fullName, emailAddress, phoneNumber, targetRole);

            return ResponseEntity.ok(savedApp);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Could not upload the file. Error: " + e.getMessage()));
        }
    }

    @GetMapping("/admin/applications")
    @PreAuthorize("hasAnyRole('HR', 'ADMIN', 'SUPERADMIN')")
    public ResponseEntity<List<Application>> getAllApplications() {
        List<Application> apps = applicationRepository.findByIsVisibleTrueOrderByCreatedAtDesc();
        return ResponseEntity.ok(apps);
    }

    @PutMapping("/admin/applications/{id}/status")
    @PreAuthorize("hasAnyRole('HR', 'ADMIN', 'SUPERADMIN')")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable("id") Long id,
            @RequestBody Map<String, String> requestBody) {

        Optional<Application> appOpt = applicationRepository.findById(id);
        if (!appOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        String newStatus = requestBody.get("status");
        if (newStatus == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Status field is required."));
        }

        Application app = appOpt.get();
        app.setStatus(newStatus.toUpperCase());
        applicationRepository.save(app);

        return ResponseEntity.ok(app);
    }

    // Endpoint to securely download or view candidate resume files
    @GetMapping("/admin/applications/{id}/resume")
    @PreAuthorize("hasAnyRole('HR', 'ADMIN', 'SUPERADMIN')")
    public ResponseEntity<org.springframework.core.io.Resource> getResume(
            @PathVariable("id") Long id,
            @RequestParam(value = "download", required = false) Boolean download) {
        
        Optional<Application> appOpt = applicationRepository.findById(id);
        if (!appOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Application app = appOpt.get();
        String resumeUrl = app.getResumeUrl(); // Format: "/uploads/filename"
        if (resumeUrl == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Extract filename and resolve actual physical path
        String filename = resumeUrl.substring(resumeUrl.lastIndexOf("/") + 1);
        java.nio.file.Path filePath = java.nio.file.Paths.get(UPLOAD_DIR).resolve(filename).normalize();
        
        try {
            org.springframework.core.io.Resource resource = new org.springframework.core.io.UrlResource(filePath.toUri());
            if (resource.exists()) {
                String contentType = java.nio.file.Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                
                String disposition = (download != null && download) ? "attachment" : "inline";
                
                return ResponseEntity.ok()
                        .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                        .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, disposition + "; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
