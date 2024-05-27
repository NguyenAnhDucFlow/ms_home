package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.jwt.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenService jwtTokenService;

    @PostMapping("/login")
    public ResponseDTO<JwtTokenService.TokenAndUser> login(
            @RequestParam("phone") String phone,
            @RequestParam("password")  String password)  {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phone, password));

        return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                .status(HttpStatus.OK)
                .data(jwtTokenService.createToken(phone))
                .build();
    }


}
