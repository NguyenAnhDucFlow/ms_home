package com.anhduc.backend.repository;


import com.anhduc.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByPhone(String phone);
    Optional<User> findByConfirmationToken(String confirmationToken);
    List<User> findByEnabledFalseAndExpiresAtBefore(LocalDateTime now);
}