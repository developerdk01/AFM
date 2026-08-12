package com.afm.backend.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String designation;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String companyEmail;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String industrySector;

    @Column(nullable = false)
    private String requiredService;

    @Column(nullable = false)
    private String requiredStaffSize;

    @Column(nullable = false)
    private String targetLocation;

    @Column(columnDefinition = "TEXT")
    private String requirementsDetail;

    @Column(nullable = false)
    private Boolean isVisible = true; // Set to false manually in DB to hide from UI

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt = new Date();

    // Default Constructor
    public Lead() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyEmail() { return companyEmail; }
    public void setCompanyEmail(String companyEmail) { this.companyEmail = companyEmail; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getIndustrySector() { return industrySector; }
    public void setIndustrySector(String industrySector) { this.industrySector = industrySector; }

    public String getRequiredService() { return requiredService; }
    public void setRequiredService(String requiredService) { this.requiredService = requiredService; }

    public String getRequiredStaffSize() { return requiredStaffSize; }
    public void setRequiredStaffSize(String requiredStaffSize) { this.requiredStaffSize = requiredStaffSize; }

    public String getTargetLocation() { return targetLocation; }
    public void setTargetLocation(String targetLocation) { this.targetLocation = targetLocation; }

    public String getRequirementsDetail() { return requirementsDetail; }
    public void setRequirementsDetail(String requirementsDetail) { this.requirementsDetail = requirementsDetail; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Boolean getIsVisible() { return isVisible; }
    public void setIsVisible(Boolean isVisible) { this.isVisible = isVisible; }
}
