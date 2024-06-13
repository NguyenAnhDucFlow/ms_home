package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.dto.ViewingAppointmentDTO;
import com.anhduc.backend.entity.AppointmentStatus;
import com.anhduc.backend.entity.ViewingAppointment;
import com.anhduc.backend.jwt.JwtTokenService;
import com.anhduc.backend.service.ViewingAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class ViewingAppointmentController {

    @Autowired
    private ViewingAppointmentService service;

    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping
    public ResponseDTO<Void> createAppointment(@RequestBody ViewingAppointmentDTO viewingAppointmentDTO, @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenService.getUserIdFromToken(token.replace("Bearer ", ""));
        service.createAppointment(viewingAppointmentDTO, userId);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .message("Created Appointment successfully")
                .build();
    }

    @GetMapping("/student/{studentId}")
    public List<ViewingAppointment> getAppointmentsForStudent(@PathVariable Long studentId) {
        return service.getAppointmentsForStudent(studentId);
    }

    @GetMapping("/landlord/{landlordId}")
    public List<ViewingAppointment> getAppointmentsForLandlord(@PathVariable Long landlordId) {
        return service.getAppointmentsForLandlord(landlordId);
    }

    @GetMapping("/{appointmentId}")
    public ViewingAppointment getAppointmentById(@PathVariable Long appointmentId) {
        return service.getAppointmentById(appointmentId).orElse(null);
    }

    @GetMapping
    public List<ViewingAppointment> getAllAppointments() {
        return service.getAllAppointments();
    }

    @PutMapping("/{appointmentId}/status")
    public ViewingAppointment updateAppointmentStatus(@PathVariable Long appointmentId, @RequestBody String status) {
        AppointmentStatus appointmentStatus = AppointmentStatus.valueOf(status);
        return service.updateAppointmentStatus(appointmentId, appointmentStatus);
    }
}
