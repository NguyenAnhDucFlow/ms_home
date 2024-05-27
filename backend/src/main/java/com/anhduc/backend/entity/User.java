package com.anhduc.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String username;

    private String email;

    @Column(nullable = false, length = 255)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Role role = Role.STUDENT;

    @Column(length = 15)
    private String phone;

    @Column(length = 255)
    private String profilePicture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 8)
    private Status status = Status.PENDING;

    @Column(length = 255)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(length = 6)
    private Gender gender;

    private Date birthdate;

    @Column(length = 255)
    private String confirmationToken;

    private Boolean confirmed = false;

    private Boolean enabled = false;

    private Boolean addressVerified = false;

    private LocalDateTime expiresAt;
}

enum Gender {
    MALE, FEMALE, ORDER
}
