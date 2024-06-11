package com.anhduc.backend.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class ServiceDTO {

    private Long serviceId;

    private String serviceName;

    private UserDTO provider;

    private String name;

    private String phone;

    private String startAddress;

    private String endAddress;

    private LocalTime startTime;

    private LocalTime endTime;

    private String area;

    private String discountCode;

    private String notes;
}
