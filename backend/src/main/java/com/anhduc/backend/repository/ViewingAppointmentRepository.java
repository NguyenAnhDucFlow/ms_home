package com.anhduc.backend.repository;

import com.anhduc.backend.entity.ViewingAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ViewingAppointmentRepository extends JpaRepository<ViewingAppointment, Long> {
    List<ViewingAppointment> findByStudentId(Long studentId);
    List<ViewingAppointment> findByLandlordId(Long landlordId);
    List<ViewingAppointment> findByPropertyListingId(Long listingId);
}
