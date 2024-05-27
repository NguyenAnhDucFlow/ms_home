package com.anhduc.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.Instant;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "viewing_appointments")
@Data
public class ViewingAppointment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    private PropertyListing propertyListing;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "landlord_id", nullable = false)
    private User landlord;

    @Column(nullable = false)
    private Instant appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private AppointmentStatus status;

    @Column(columnDefinition = "TEXT")
    private String feedback;

}

enum AppointmentStatus {
    PENDING, CONFIRMED, CANCELLED
}