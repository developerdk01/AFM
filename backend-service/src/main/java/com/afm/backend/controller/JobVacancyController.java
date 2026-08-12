package com.afm.backend.controller;

import com.afm.backend.entity.JobVacancy;
import com.afm.backend.repository.JobVacancyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class JobVacancyController {

    @Autowired
    private JobVacancyRepository jobVacancyRepository;

    // Public API to list only active & visible vacancies
    @GetMapping("/public/jobs")
    public ResponseEntity<List<JobVacancy>> getActiveJobs() {
        List<JobVacancy> activeJobs = jobVacancyRepository.findByActiveTrueAndIsVisibleTrue();
        return ResponseEntity.ok(activeJobs);
    }

    // Secured API to list all visible vacancies (Active + Inactive) for HR/Admin Console
    @GetMapping("/admin/jobs")
    public ResponseEntity<List<JobVacancy>> getAllJobsForAdmin() {
        List<JobVacancy> allJobs = jobVacancyRepository.findByIsVisibleTrueOrderByIdDesc();
        return ResponseEntity.ok(allJobs);
    }

    // Secured API to create a new job vacancy listing
    @PostMapping("/admin/jobs")
    public ResponseEntity<?> createJobVacancy(@Valid @RequestBody JobVacancy jobVacancy) {
        jobVacancy.setActive(true); // Default to active on creation
        jobVacancy.setIsVisible(true); // Ensure isVisible is true for UI display
        JobVacancy savedVacancy = jobVacancyRepository.save(jobVacancy);
        return ResponseEntity.ok(savedVacancy);
    }

    // Secured API to toggle active/inactive status (ON/OFF)
    @PutMapping("/admin/jobs/{id}/toggle")
    public ResponseEntity<?> toggleJobVacancyActiveStatus(@PathVariable("id") Long id) {
        Optional<JobVacancy> vacancyOpt = jobVacancyRepository.findById(id);
        if (!vacancyOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "Job vacancy not found with ID: " + id));
        }

        JobVacancy vacancy = vacancyOpt.get();
        vacancy.setActive(!vacancy.isActive()); // Toggle Boolean state
        JobVacancy updatedVacancy = jobVacancyRepository.save(vacancy);
        return ResponseEntity.ok(updatedVacancy);
    }

    // Secured API to delete a vacancy
    @DeleteMapping("/admin/jobs/{id}")
    public ResponseEntity<?> deleteJobVacancy(@PathVariable("id") Long id) {
        Optional<JobVacancy> vacancyOpt = jobVacancyRepository.findById(id);
        if (!vacancyOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "Job vacancy not found with ID: " + id));
        }

        jobVacancyRepository.deleteById(id);
        return ResponseEntity.ok(Collections.singletonMap("success", "Job vacancy deleted successfully"));
    }
}
