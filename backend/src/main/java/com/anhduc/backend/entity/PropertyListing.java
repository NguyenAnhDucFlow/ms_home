package com.anhduc.backend.entity;

import com.anhduc.backend.converter.AmenitiesConverter;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Cascade;

import java.math.BigDecimal;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "property_listings")
public class PropertyListing extends Auditable {

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
    private RentalType propertyType;

    @Convert(converter = AmenitiesConverter.class)
    private List<String> amenities;

    @Column(columnDefinition = "TEXT")
    private String conditions;

    private String cover;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ListingStatus status = ListingStatus.AVAILABLE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    private Integer rooms;

    private Integer bathrooms;

    @Column(length = 50)
    private String dimensions;

    @Column(precision = 10, scale = 2)
    private BigDecimal water;

    @Column(precision = 10, scale = 2)
    private BigDecimal electricity;

}

