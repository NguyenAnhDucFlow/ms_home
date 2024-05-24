package com.anhduc.backend.dto;



import com.anhduc.backend.entity.enums.AccountStatus;
import com.anhduc.backend.entity.enums.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

@Data
public class UserDTO {

    private int id;

    private String username;

    private String email;

    private String password;

    private RoleDTO role;

    private String phone;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Instant created;

    private Instant last_login;

    private String profile_picture;

    private AccountStatus userStatus;

    private String address;

    private Gender gender;

    private Instant birthdate;

    private String confirmation_token;

    private boolean confirmed = false;

    private boolean verified = false;

    private String verificationCode;

    @JsonIgnore
    private MultipartFile file;

}
