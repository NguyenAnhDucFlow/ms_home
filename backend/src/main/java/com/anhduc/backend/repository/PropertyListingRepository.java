package com.anhduc.backend.repository;

import com.anhduc.backend.entity.PropertyListing;
import com.anhduc.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface PropertyListingRepository extends JpaRepository<PropertyListing, Long>, JpaSpecificationExecutor<PropertyListing> {

    Optional<PropertyListing> findByUser(User user);
}
