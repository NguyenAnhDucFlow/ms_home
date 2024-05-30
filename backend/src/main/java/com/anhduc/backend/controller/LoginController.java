package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.jwt.JwtTokenService;
import com.anhduc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenService jwtTokenService;

    @Autowired
    UserRepository userRepository;

    private boolean isUserConfirmed(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.isPresent() && userOptional.get().getConfirmed();
    }

    @PostMapping("/login")
    public ResponseDTO<JwtTokenService.TokenAndUser> login(
            @RequestParam("email") String email,
            @RequestParam("password")  String password)  {

        if (!isUserConfirmed(email)) {
            return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                    .status(HttpStatus.UNAUTHORIZED)
                    .message("Please confirm your email to activate your account.")
                    .build();
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                .status(HttpStatus.OK)
                .data(jwtTokenService.createToken(email))
                .build();
    }


}
