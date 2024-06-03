package com.anhduc.backend.jwt;


import com.anhduc.backend.entity.User;
import com.anhduc.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.persistence.NoResultException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtTokenService {

    private final UserRepository userRepository;

    @Value("${jwt.secret:123}")
    private String secretKey;

    private static final long VALIDITY_IN_MINUTES = 60;

    public JwtTokenService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public TokenAndUser generateToken(String email){
        User user = userRepository.findByEmail(email).
                orElseThrow(() -> new NoResultException("User not found"));

        Claims claims = Jwts.claims().setSubject(user.getId().toString());
        claims.put("email", email);

        Date now = new Date();
        Date exp = new Date(now.getTime() + VALIDITY_IN_MINUTES * 60 * 1000);

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return new TokenAndUser(token, user);
    }

    public String getEmailFromToken(String token) {
        try {
            return (String) Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("email");
        } catch (Exception e) {
            return null;
        }
    }

    public Long getUserIdFromToken(String token) {
        try {
            String userIdStr = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            return Long.parseLong(userIdStr);
        } catch (Exception e) {
            return null;
        }
    }



    public boolean inValidToken(String token){
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public record TokenAndUser(String accessToken, User user) {
    }

}
