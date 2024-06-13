package com.anhduc.backend.dto;

import com.anhduc.backend.entity.AppointmentStatus;
import com.anhduc.backend.entity.PropertyListing;
import com.anhduc.backend.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class ViewingAppointmentDTO {


    private Long appointmentId;

    private PropertyListing propertyListing;

    private UserDTO landlord;

    private Date appointmentTime;

    private AppointmentStatus status = AppointmentStatus.PENDING;

    private String feedback;


}
