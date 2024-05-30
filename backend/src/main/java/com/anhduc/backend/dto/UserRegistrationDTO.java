package com.anhduc.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRegistrationDTO {

    @NotBlank
    private String fullName;
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
