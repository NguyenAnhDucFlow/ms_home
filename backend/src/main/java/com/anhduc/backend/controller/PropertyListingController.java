package com.anhduc.backend.controller;

import com.anhduc.backend.dto.PropertyListingDTO;
import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.service.PropertyListingService;
import com.anhduc.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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


}
