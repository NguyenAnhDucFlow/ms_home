package com.anhduc.backend.jwt;


import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.persistence.NoResultException;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class JwtTokenService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Value("${jwt.secret:123}")
    private String secretKey;

    private long validity = 60;

    public TokenAndUser createToken(String phone){
        Claims claims = Jwts.claims().setSubject(phone);
        Date now = new Date();
        Date exp = new Date(now.getTime() + validity * 60 * 1000);

        String token = Jwts.builder().setClaims(claims).setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        User user = userRepository.findByPhone(phone).orElseThrow(() -> new NoResultException("User not found"));

        return new TokenAndUser(token, user);
    }



    public boolean inValidToken(String token){
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception e){
            //ko lam gi
        }
        return false;
    }

    public record TokenAndUser(String accessToken, User user) {
    }

    public String getUsername(String token){
        try{
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                    .getBody().getSubject();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }




}
