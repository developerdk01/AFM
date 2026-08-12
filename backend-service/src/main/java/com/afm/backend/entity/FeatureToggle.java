package com.afm.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "feature_toggles")
public class FeatureToggle {

    @Id
    private String toggleKey; // resume_upload_enabled, email_notifications_enabled, etc.

    @Column(nullable = false)
    private boolean toggleValue;

    private String description;

    // Constructors
    public FeatureToggle() {}

    public FeatureToggle(String toggleKey, boolean toggleValue, String description) {
        this.toggleKey = toggleKey;
        this.toggleValue = toggleValue;
        this.description = description;
    }

    // Getters and Setters
    public String getToggleKey() { return toggleKey; }
    public void setToggleKey(String toggleKey) { this.toggleKey = toggleKey; }

    public boolean isToggleValue() { return toggleValue; }
    public boolean getToggleValue() { return toggleValue; }
    public void setToggleValue(boolean toggleValue) { this.toggleValue = toggleValue; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
