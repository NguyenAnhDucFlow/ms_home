package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.dto.ServiceDTO;
import com.anhduc.backend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceController {

    private final ServiceService serviceService;

    @Autowired
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseDTO<List<ServiceDTO>> getServices() {
        return ResponseDTO.<List<ServiceDTO>>builder()
                .status(HttpStatus.OK)
                .data(serviceService.getAllServices())
                .build();
    }

    @PostMapping
    public ResponseDTO<Void> createService(@RequestBody ServiceDTO serviceDTO) {
        serviceService.createService(serviceDTO);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .message("Created service successfully")
                .build();
    }
}
