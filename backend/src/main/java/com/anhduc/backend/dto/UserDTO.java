package com.anhduc.backend.dto;



import com.anhduc.backend.entity.enums.AccountStatus;
import com.anhduc.backend.entity.enums.Gender;
import com.anhduc.backend.entity.enums.UserRole;
import lombok.Data;

import java.time.Instant;

@Data
public class UserDTO {

    private int id;

    private String username;

    private String email;

    private String password;

    private UserRole role;

    private String phone;

    private Instant created;

    private Instant last_login;

    private String profile_picture;

    private AccountStatus userStatus;

    private String address;

    private Gender gender;

    private Instant birthdate;

    private String confirmation_token;

    private boolean confirmed = false;

}
