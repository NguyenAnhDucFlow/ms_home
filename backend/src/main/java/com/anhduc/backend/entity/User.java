package com.anhduc.backend.entity;


import com.anhduc.backend.entity.enums.AccountStatus;
import com.anhduc.backend.entity.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Getter
@Setter
@Table(indexes = {
        @Index(columnList = "email", name = "index_email"),
        @Index(columnList = "confirmation_token", name = "index_confirmation_token"),
        @Index(columnList = "phone", name = "index_phone")
})
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Instant created;

    private Instant last_login;

    private String profile_picture;

    @Enumerated(EnumType.STRING)
    private AccountStatus userStatus = AccountStatus.PENDING;

    private String address;

    private Gender gender;

    private Instant birthdate;

    private String confirmation_token;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean confirmed = false;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean verified = false;

    private String verificationCode;

    @ManyToOne
    private Role role;

}
