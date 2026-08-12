package com.afm.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "job_vacancies")
public class JobVacancy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String jobRole;

    @Column(nullable = false)
    private String type; // Private or Government

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String experience;

    @Column(nullable = false)
    private String salary;

    @Column(columnDefinition = "TEXT")
    private String jobDescription;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false)
    private Boolean isVisible = true; // Set to false manually in DB to hide from UI

    public JobVacancy() {}

    public JobVacancy(String jobRole, String type, String location, String experience, String salary, String jobDescription, String skills) {
        this.jobRole = jobRole;
        this.type = type;
        this.location = location;
        this.experience = experience;
        this.salary = salary;
        this.jobDescription = jobDescription;
        this.skills = skills;
        this.active = true;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Boolean getIsVisible() {
        return isVisible != null ? isVisible : true;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible != null ? isVisible : true;
    }

    @PrePersist
    public void prePersist() {
        if (this.isVisible == null) {
            this.isVisible = true;
        }
    }
}
