package com.afm.backend.controller;

import com.afm.backend.entity.FeatureToggle;
import com.afm.backend.repository.FeatureToggleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/settings")
public class SettingsController {

    @Autowired
    private FeatureToggleRepository featureToggleRepository;

    @PostConstruct
    public void seedDefaultToggles() {
        if (featureToggleRepository.count() == 0) {
            featureToggleRepository.save(new FeatureToggle("resume_upload_enabled", true, "Global switch to show/hide the public resume uploader form."));
            featureToggleRepository.save(new FeatureToggle("email_notifications_enabled", true, "Send SMTP email alerts when new leads are registered."));
            featureToggleRepository.save(new FeatureToggle("maintenance_mode_enabled", false, "Actives system maintenance overlay on the public portal."));
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('HR', 'ADMIN', 'SUPERADMIN')")
    public ResponseEntity<List<FeatureToggle>> getSettings() {
        return ResponseEntity.ok(featureToggleRepository.findAll());
    }

    @PostMapping("/{key}")
    @PreAuthorize("hasRole('SUPERADMIN')")
    public ResponseEntity<?> updateToggle(
            @PathVariable("key") String key,
            @RequestBody Map<String, Boolean> requestBody) {

        Optional<FeatureToggle> toggleOpt = featureToggleRepository.findById(key);
        if (!toggleOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Boolean newValue = requestBody.get("value");
        if (newValue == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Value parameter is required."));
        }

        FeatureToggle toggle = toggleOpt.get();
        toggle.setToggleValue(newValue);
        featureToggleRepository.save(toggle);

        return ResponseEntity.ok(toggle);
    }
}
