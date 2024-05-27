package com.anhduc.backend.schedule;

import com.anhduc.backend.entity.User;
import com.anhduc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ScheduledTasks {

    @Autowired
    private UserRepository userRepository;

    @Scheduled(fixedRate = 3600000) // run every hour
    public void deleteExpiredUnconfirmedUsers() {
        List<User> expiredUsers = userRepository.findByEnabledFalseAndExpiresAtBefore(LocalDateTime.now());
        userRepository.deleteAll(expiredUsers);
    }
}
