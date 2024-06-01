package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.jwt.JwtTokenService;
import com.anhduc.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final UserService userService;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JwtTokenService jwtTokenService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseDTO<JwtTokenService.TokenAndUser> login(@RequestParam("email") String email,
                                                           @RequestParam("password") String password) {
        try {
            if (!userService.isUserEmailConfirmed(email)) {
                return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                        .status(HttpStatus.UNAUTHORIZED)
                        .message("Please confirm your email to activate your account.")
                        .build();
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));

            return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                    .status(HttpStatus.OK)
                    .data(jwtTokenService.generateToken(email))
                    .build();

        } catch (AuthenticationException e) {
            return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                    .status(HttpStatus.UNAUTHORIZED)
                    .message("Invalid email or password.")
                    .build();
        }
    }
}
