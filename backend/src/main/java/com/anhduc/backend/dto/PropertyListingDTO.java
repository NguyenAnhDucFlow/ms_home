package com.anhduc.backend.dto;

import com.anhduc.backend.entity.RentalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PropertyListingDTO {
    private Long id;
    private UserDTO user;
    @NotBlank(message = "Title is mandatory")
    private String title;
    @NotBlank(message = "Description is mandatory")
    private String description;
    @NotNull(message = "Price is mandatory")
    @Positive(message = "Price must be greater than zero")
    private BigDecimal price;

    @NotBlank(message = "Address is mandatory")
    private String address;

    private RentalType typeOfRental;
    private List<String> amenities;
    private String status;
    private String verificationStatus;
}
