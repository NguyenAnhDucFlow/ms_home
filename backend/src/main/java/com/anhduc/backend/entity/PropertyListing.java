package com.anhduc.backend.entity;

import com.anhduc.backend.converter.AmenitiesConverter;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.List;

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
    @Enumerated(EnumType.STRING)
    private RentalType typeOfRental;
    @Convert(converter = AmenitiesConverter.class)
    private List<String> amenities;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ListingStatus status = ListingStatus.AVAILABLE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

}

enum ListingStatus {
    AVAILABLE, RENTED, INACTIVE
}

enum VerificationStatus {
    PENDING, VERIFIED, REJECTED
}