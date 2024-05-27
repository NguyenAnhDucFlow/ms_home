package com.anhduc.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "property_listings")
public class PropertyListing extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(columnDefinition = "JSON")
    private String amenities;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ListingStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private VerificationStatus verificationStatus;

}

enum ListingStatus {
    AVAILABLE, RENTED, INACTIVE
}

enum VerificationStatus {
    PENDING, VERIFIED, REJECTED
}