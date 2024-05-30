package com.anhduc.backend.controller;

import com.anhduc.backend.dto.PropertyListingDTO;
import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.entity.PropertyListing;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.service.PropertyListingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class PropertyListingController {

    @Autowired
    private PropertyListingService propertyListingService;

    public ResponseDTO<PropertyListingDTO> createPropertyListing(@Valid @RequestBody PropertyListingDTO propertyListingDTO, Principal principal) {
        String username = principal.getName();
    }

}
