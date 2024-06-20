package com.anhduc.backend.repository;

import com.anhduc.backend.entity.PropertyListing;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.entity.VerificationStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PropertyListingRepository extends JpaRepository<PropertyListing, Long>, JpaSpecificationExecutor<PropertyListing> {

    @Query("SELECT a FROM PropertyListing a WHERE a.verificationStatus = :status ORDER BY a.createdAt DESC")
    List<PropertyListing> findTop8ByStatusOrderByCreatedAtDesc(@Param("status") VerificationStatus verificationStatus, Pageable pageable);

    @Query("SELECT p FROM PropertyListing p WHERE p.user = :user")
    Optional<List<PropertyListing>> findAllByUser(@Param("user") User user);
}
