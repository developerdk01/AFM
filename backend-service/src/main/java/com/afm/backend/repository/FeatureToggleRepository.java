package com.afm.backend.repository;

import com.afm.backend.entity.FeatureToggle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureToggleRepository extends JpaRepository<FeatureToggle, String> {
}
