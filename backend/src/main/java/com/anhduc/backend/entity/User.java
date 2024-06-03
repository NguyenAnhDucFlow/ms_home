package com.anhduc.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "users")
public class User extends Auditable{

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

    private String country;

    private String state;

    private String city;

    private String about;

    @Enumerated(EnumType.STRING)
    @Column(length = 6)
    private Gender gender;

    @Column(length = 255)
    private String confirmationToken;

    private Boolean confirmed = false;

    private Boolean addressVerified = false;

    private LocalDateTime confirmationSentAt; //time confirm email
}

enum Gender {
    MALE, FEMALE, ORDER
}
