package com.anhduc.backend.dto;

import com.anhduc.backend.entity.ListingStatus;
import com.anhduc.backend.entity.RentalType;
import com.anhduc.backend.entity.VerificationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @JsonIgnore
    private List<MultipartFile> multipartFile;

    @NotNull(message = "Number of rooms is mandatory")
    @Positive(message = "Number of rooms must be greater than zero")
    private Integer rooms;

    @NotNull(message = "Number of bathrooms is mandatory")
    @Positive(message = "Number of bathrooms must be greater than zero")
    private Integer bathrooms;

    @NotBlank(message = "Dimensions are mandatory")
    private String dimensions;

    @NotNull(message = "Water is mandatory")
    @Positive(message = "Water value must be greater than zero")
    private BigDecimal water;

    @NotNull(message = "Electricity is mandatory")
    @Positive(message = "Electricity value must be greater than zero")
    private BigDecimal electricity;
}
