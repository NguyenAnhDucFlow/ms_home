package com.anhduc.backend.service;


import com.anhduc.backend.entity.User;
import com.anhduc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

public interface CustomUserDetailsService extends UserDetailsService {
    // Add any custom methods if necessary
}
@Service
class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }
        User user = optionalUser.get();
        if (!user.getConfirmed()) {
            throw new UsernameNotFoundException("User with email " + email + " is not confirmed");
        }
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(user.getRole().name());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPasswordHash(), Collections.singletonList(simpleGrantedAuthority));
    }
}