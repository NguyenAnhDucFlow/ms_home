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
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        User userEntity = userRepository.findByPhone(phone);
        if (userEntity == null) {
            throw new UsernameNotFoundException("User with phone " + phone + " not found");
        }
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(userEntity.getRole().getName());
        return new org.springframework.security.core.userdetails.User(phone, userEntity.getPassword(), Collections.singletonList(simpleGrantedAuthority));
    }
}