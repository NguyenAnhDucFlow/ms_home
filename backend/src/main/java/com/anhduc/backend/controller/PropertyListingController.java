package com.anhduc.backend.controller;

import com.anhduc.backend.dto.PropertyListingDTO;
import com.anhduc.backend.dto.PropertySearchCriteria;
import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.entity.PropertyListing;
import com.anhduc.backend.entity.RentalType;
import com.anhduc.backend.service.PropertyListingService;
import com.anhduc.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class PropertyListingController {

    @Autowired
    private PropertyListingService propertyListingService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseDTO<PropertyListingDTO> createPropertyListing(@Valid @RequestBody PropertyListingDTO propertyListingDTO, Principal principal) {
        String email = principal.getName();
        UserDTO userDTO = userService.getUserByEmail(email);
        return ResponseDTO.<PropertyListingDTO>builder()
                .status(HttpStatus.OK)
                .data(propertyListingService.createPropertyListing(propertyListingDTO, userDTO.getId()))
                .build();
    }

    @GetMapping("/user")
    public ResponseDTO<List<PropertyListingDTO>> getUserListings(Principal principal) {
        String email = principal.getName();
        UserDTO userDTO = userService.getUserByEmail(email);
        return ResponseDTO.<List<PropertyListingDTO>>builder()
                .status(HttpStatus.OK)
                .data(propertyListingService.getPropertyListingsByUser(userDTO.getId()))
                .build();
    }

    @GetMapping("/search")
    public ResponseDTO<Page<PropertyListingDTO>> searchProperties(
            @RequestParam(required = false) Double priceMin,
            @RequestParam(required = false) Double priceMax,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) RentalType typeOfRental,
            @RequestParam(required = false) List<String> amenities,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {

        PropertySearchCriteria criteria = new PropertySearchCriteria();
        criteria.setPriceMin(priceMin);
        criteria.setPriceMax(priceMax);
        criteria.setAddress(address);
        criteria.setTypeOfRental(typeOfRental);
        criteria.setAmenities(amenities);

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<PropertyListingDTO> result = propertyListingService.searchListings(criteria, pageable);

        return ResponseDTO.<Page<PropertyListingDTO>>builder()
                .status(HttpStatus.OK)
                .data(result)
                .build();
    }



}
