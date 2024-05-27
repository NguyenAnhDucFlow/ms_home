package com.anhduc.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyListingDTO {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private BigDecimal price;
    private String address;
    private String amenities;
    private String status;
    private String verificationStatus;
}
