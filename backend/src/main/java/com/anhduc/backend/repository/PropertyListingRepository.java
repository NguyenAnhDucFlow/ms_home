package com.anhduc.backend.repository;

import com.anhduc.backend.entity.PropertyListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyListingRepository extends JpaRepository<PropertyListing, Long> {
}
