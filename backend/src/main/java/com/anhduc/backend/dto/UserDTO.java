package com.anhduc.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
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
    private String country;
    private String state;
    private String city;
    private String about;
    private String gender;
    private Boolean confirmed;
    private Boolean addressVerified;
    private LocalDateTime confirmationSentAt;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Instant createdAt;

    @JsonIgnore
    private MultipartFile avatarFile;
}
