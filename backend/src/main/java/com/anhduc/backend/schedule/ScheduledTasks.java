package com.anhduc.backend.schedule;

import com.anhduc.backend.entity.User;
import com.anhduc.backend.repository.PasswordResetTokenRepository;
import com.anhduc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class ScheduledTasks {

    private final UserRepository userRepository;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public ScheduledTasks(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Scheduled(fixedRate = 86400000) // 1 day
    public void deleteUnconfirmedUsers() {
        List<User> unconfirmedUsers = userRepository.findAll();
        for (User user : unconfirmedUsers) {
            if (!user.getConfirmed() && user.getCreatedAt().isBefore(Instant.now().minus(1, ChronoUnit.DAYS))) {
                userRepository.delete(user);
            }
        }
    }

    @Scheduled(cron = "0 0 * * * *") // chạy mỗi giờ 1 lần
    public void deleteExpiredUsers() {
        passwordResetTokenRepository.deleteAllByExpiryDateBefore(LocalDateTime.now());
    }
}
