package com.anhduc.backend.service;

import com.anhduc.backend.dto.ViewingAppointmentDTO;
import com.anhduc.backend.entity.AppointmentStatus;
import com.anhduc.backend.entity.ViewingAppointment;
import com.anhduc.backend.exception.ResourceNotFoundException;
import com.anhduc.backend.repository.UserRepository;
import com.anhduc.backend.repository.ViewingAppointmentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ViewingAppointmentService {

    @Autowired
    private ViewingAppointmentRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    public void createAppointment(ViewingAppointmentDTO viewingAppointmentDTO, Long userId) {
        ViewingAppointment entity = modelMapper.map(viewingAppointmentDTO, ViewingAppointment.class);
        entity.setStudent(userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Could not find user" + userId)));
        entity.setLandlord(userRepository.findById(viewingAppointmentDTO.getLandlord().getId()).orElseThrow(() -> new ResourceNotFoundException("Could not find user" + userId)));
        repository.save(entity);
    }

    public List<ViewingAppointment> getAllAppointments() {
        List<ViewingAppointment> viewingAppointments = repository.findAll();
        return viewingAppointments;
    }

    public List<ViewingAppointment> getAppointmentsForStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<ViewingAppointment> getAppointmentsForLandlord(Long landlordId) {
        return repository.findByLandlordId(landlordId);
    }

    public Optional<ViewingAppointment> getAppointmentById(Long appointmentId) {
        return repository.findById(appointmentId);
    }

    public ViewingAppointment updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        Optional<ViewingAppointment> appointmentOpt = repository.findById(appointmentId);
        if (appointmentOpt.isPresent()) {
            ViewingAppointment appointment = appointmentOpt.get();
            appointment.setStatus(status);
            return repository.save(appointment);
        }
        throw new RuntimeException("Appointment not found");
    }
}
