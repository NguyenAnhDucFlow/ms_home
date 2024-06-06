package com.anhduc.backend.dto;

import com.anhduc.backend.entity.ListingStatus;
import com.anhduc.backend.entity.RentalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PropertyListingDTO {
    private Long id;

    private UserDTO user;

    @NotBlank(message = "Full name is mandatory")
    private String fullName;

    @NotBlank(message = "Phone number is mandatory")
    @Pattern(regexp = "^\\+?\\d{10,15}$", message = "Invalid phone number")
    private String phoneNumber;

    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @NotNull(message = "Price is mandatory")
    @Positive(message = "Price must be greater than zero")
    private BigDecimal price;

    @NotBlank(message = "Address is mandatory")
    private String address;

    @NotNull(message = "Property type is mandatory")
    private RentalType propertyType;

    private List<String> amenities;

    private String conditions;

    private String cover;

    private List<String> images;

    private ListingStatus status;

    @JsonIgnore
    private List<MultipartFile> multipartFile;
}
