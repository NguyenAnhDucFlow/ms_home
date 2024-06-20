package com.anhduc.backend.controller;

import com.anhduc.backend.dto.PropertyListingDTO;
import com.anhduc.backend.dto.PropertySearchCriteria;
import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.dto.UpdateStatusRequest;
import com.anhduc.backend.entity.PropertyListing;
import com.anhduc.backend.entity.RentalType;
import com.anhduc.backend.entity.VerificationStatus;
import com.anhduc.backend.jwt.JwtTokenService;
import com.anhduc.backend.service.PropertyListingService;
import com.anhduc.backend.service.S3StorageService;
import com.anhduc.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/listings")
public class PropertyListingController {

    private final PropertyListingService propertyListingService;

    private final JwtTokenService jwtTokenService;

    private final S3StorageService s3StorageService;
    
    private final UserService userService;

    @Autowired
    public PropertyListingController(PropertyListingService propertyListingService, JwtTokenService jwtTokenService, S3StorageService s3StorageService, UserService userService) {
        this.propertyListingService = propertyListingService;
        this.jwtTokenService = jwtTokenService;
        this.s3StorageService = s3StorageService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseDTO<PropertyListingDTO> createPropertyListing(@Valid @ModelAttribute PropertyListingDTO propertyListingDTO, @RequestHeader("Authorization") String token) throws IOException {
        Long userId = jwtTokenService.getUserIdFromToken(token.replace("Bearer ", ""));

        List<String> images = new ArrayList<>();

        if (propertyListingDTO.getMultipartFile() != null && !propertyListingDTO.getMultipartFile().isEmpty()) {
            for (MultipartFile file : propertyListingDTO.getMultipartFile()) {
                String filename = file.getOriginalFilename();
                String extension = filename != null ? filename.substring(filename.lastIndexOf(".")) : null;
                String newFilename = UUID.randomUUID().toString() + extension;
                String fileUrl = s3StorageService.uploadFile(newFilename, file);
                images.add(fileUrl);
                if (propertyListingDTO.getCover() == null) {
                    propertyListingDTO.setCover(fileUrl);
                }
            }
            propertyListingDTO.setImages(images);
        }
        PropertyListingDTO result = propertyListingService.createPropertyListing(propertyListingDTO, userId);
        return ResponseDTO.<PropertyListingDTO>builder()
                .status(HttpStatus.OK)
                .data(result)
                .build();
    }

    @GetMapping()
    public ResponseDTO<List<PropertyListingDTO>> getUserListings(@RequestHeader("Authorization") String token) {
        Long userId = jwtTokenService.getUserIdFromToken(token.replace("Bearer ", ""));
        return ResponseDTO.<List<PropertyListingDTO>>builder()
                .status(HttpStatus.OK)
                .data(propertyListingService.getPropertyListingsByUser(userId))
                .build();
    }
    @GetMapping("/{id}")
    public ResponseDTO<PropertyListingDTO> getPropertyListingById(@PathVariable Long id) {
        return ResponseDTO.<PropertyListingDTO>builder()
                .status(HttpStatus.OK)
                .data(propertyListingService.getPropertyListingById(id))
                .build();
    }

    @GetMapping("/search")
    public ResponseDTO<Page<PropertyListingDTO>> searchProperties(
            @RequestParam(required = false) Double priceMin,
            @RequestParam(required = false) Double priceMax,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) RentalType typeOfRental,
            @RequestParam(required = false) String dimensions,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {

        PropertySearchCriteria criteria = new PropertySearchCriteria();
        criteria.setPriceMin(priceMin);
        criteria.setPriceMax(priceMax);
        criteria.setAddress(address);
        criteria.setTypeOfRental(typeOfRental);
        criteria.setDimensions(dimensions);

        Sort sort;
        if ("price".equals(sortBy)) {
            sort = Sort.by(Sort.Direction.fromString(sortDirection), "price");
        } else {
            sort = Sort.by(Sort.Direction.DESC, "createdAt");
        }

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<PropertyListingDTO> result = propertyListingService.searchListings(criteria, pageable);

        return ResponseDTO.<Page<PropertyListingDTO>>builder()
                .status(HttpStatus.OK)
                .data(result)
                .build();
    }


    @GetMapping("/top8/{verificationStatus}")
    public ResponseDTO<List<PropertyListingDTO>> getTop8Listings(@PathVariable VerificationStatus verificationStatus ) {
        return ResponseDTO.<List<PropertyListingDTO>>builder()
                .status(HttpStatus.OK)
                .data(propertyListingService.getTop8ListingByStatus(verificationStatus))
                .build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PropertyListing> updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest updateStatusRequest) {
        PropertyListing updatedListing = propertyListingService.updateStatus(id, updateStatusRequest.getStatus());
        return ResponseEntity.ok(updatedListing);
    }


}
