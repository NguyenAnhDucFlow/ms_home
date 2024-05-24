package com.anhduc.backend.controller;

import com.anhduc.backend.dto.LoginDTO;
import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.jwt.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenService jwtTokenService;

    @PostMapping("/login")
    public ResponseDTO<JwtTokenService.TokenAndUser> login(
            @RequestBody @Valid LoginDTO loginDTO)  {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getPhone(), loginDTO.getPassword()));

        List<String> authorities = authentication.getAuthorities().stream()
                .map(e -> e.getAuthority()).collect(Collectors.toList());

        return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                .status(HttpStatus.OK)
                .data(jwtTokenService.createToken(loginDTO.getPhone(), authorities))
                .build();
    }


    @GetMapping("/loginSuccess")
    public String loginSuccess(OAuth2AuthenticationToken authentication) {
        Map<String, Object> userAttributes = authentication.getPrincipal().getAttributes();
        // Xử lý thông tin người dùng
        return "Login Success: " + userAttributes;
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        // Xác thực và xử lý token, lấy thông tin người dùng
        // Trả về thông tin người dùng và accessToken
    }

}
