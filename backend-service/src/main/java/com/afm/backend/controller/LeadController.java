package com.afm.backend.controller;

import com.afm.backend.entity.Lead;
import com.afm.backend.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class LeadController {

    @Autowired
    private LeadRepository leadRepository;

    @PostMapping("/public/leads")
    public ResponseEntity<?> submitLead(@Valid @RequestBody Lead lead) {
        lead.setCreatedAt(new Date());
        Lead savedLead = leadRepository.save(lead);
        return ResponseEntity.ok(savedLead);
    }

    @GetMapping("/admin/leads")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    public ResponseEntity<List<Lead>> getAllLeads() {
        List<Lead> leads = leadRepository.findByIsVisibleTrueOrderByCreatedAtDesc();
        return ResponseEntity.ok(leads);
    }
}
