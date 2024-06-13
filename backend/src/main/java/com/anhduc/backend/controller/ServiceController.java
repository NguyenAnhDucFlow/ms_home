package com.anhduc.backend.controller;

import com.anhduc.backend.entity.Service;
import com.anhduc.backend.exception.ResourceNotFoundException;
import com.anhduc.backend.jwt.JwtTokenService;
import com.anhduc.backend.repository.UserRepository;
import com.anhduc.backend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceService serviceService;
    private final UserRepository userRepository;
    private final JwtTokenService jwtTokenService;

    @Autowired
    public ServiceController(ServiceService serviceService, UserRepository userRepository, JwtTokenService jwtTokenService) {
        this.serviceService = serviceService;
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenService;
    }

    @PostMapping("/create")
    public Service createService(@RequestBody Service service, @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenService.getUserIdFromToken(token.replace("Bearer ", ""));
        service.setProvider(userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Could not find user" + userId)));
        return serviceService.createService(service);
    }

    @GetMapping("/list")
    public List<Service> getAllServices() {
        return serviceService.getAllServices();
    }
}
