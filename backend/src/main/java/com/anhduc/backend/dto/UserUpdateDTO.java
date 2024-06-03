package com.anhduc.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class UserUpdateDTO {
    private Long id;
    private String username;
    private String email;
    private String profilePicture;
    private String phone;
    private String country;
    private String address;
    private String state;
    private String city;
    private String about;
    private Boolean isPublic;
    private String gender;
    @JsonIgnore
    private MultipartFile avatarFile;
}
