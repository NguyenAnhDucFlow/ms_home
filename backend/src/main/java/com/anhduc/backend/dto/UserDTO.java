package com.anhduc.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String phone;
    private String profilePicture;
    private String status;
    private String address;
    private String gender;
    private Date birthdate;
    private Boolean confirmed;
    private Boolean addressVerified;
    private LocalDateTime confirmationSentAt;

}
