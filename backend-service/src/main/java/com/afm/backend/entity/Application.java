package com.afm.backend.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String emailAddress;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String preferredLocation;

    @Column(nullable = false)
    private String totalExperience;

    @Column(nullable = false)
    private String targetRole;

    private Double currentCtc;

    @Column(nullable = false)
    private Double expectedCtc;

    @Column(nullable = false)
    private String noticePeriod;

    @Column(nullable = false)
    private String resumeUrl; // Local path or secure link

    @Column(columnDefinition = "TEXT")
    private String coverMessage;

    @Column(nullable = false)
    private String status = "RECEIVED"; // RECEIVED, REVIEWED, SHORTLISTED, INTERVIEW_SCHEDULED, HIRED, ARCHIVED

    @Column(nullable = false)
    private Boolean isVisible = true; // Set to false manually in DB to hide from UI

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt = new Date();

    // Default Constructor
    public Application() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmailAddress() { return emailAddress; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPreferredLocation() { return preferredLocation; }
    public void setPreferredLocation(String preferredLocation) { this.preferredLocation = preferredLocation; }

    public String getTotalExperience() { return totalExperience; }
    public void setTotalExperience(String totalExperience) { this.totalExperience = totalExperience; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public Double getCurrentCtc() { return currentCtc; }
    public void setCurrentCtc(Double currentCtc) { this.currentCtc = currentCtc; }

    public Double getExpectedCtc() { return expectedCtc; }
    public void setExpectedCtc(Double expectedCtc) { this.expectedCtc = expectedCtc; }

    public String getNoticePeriod() { return noticePeriod; }
    public void setNoticePeriod(String noticePeriod) { this.noticePeriod = noticePeriod; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getCoverMessage() { return coverMessage; }
    public void setCoverMessage(String coverMessage) { this.coverMessage = coverMessage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getIsVisible() { return isVisible; }
    public void setIsVisible(Boolean isVisible) { this.isVisible = isVisible; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
