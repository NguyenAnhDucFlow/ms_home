package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.dto.UserRegistrationDTO;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.jwt.JwtTokenService;
import com.anhduc.backend.repository.UserRepository;
import com.anhduc.backend.service.S3StorageService;
import com.anhduc.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    S3StorageService s3StorageService;

    @Autowired
    JwtTokenService jwtTokenService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/confirm-account")
    public ResponseDTO<String> confirmAccount(@RequestParam("token") String token) {
        if (userService.confirmedUser(token)) {
            return ResponseDTO.<String>builder()
                    .status(HttpStatus.OK)
                    .message("Account verified successfully")
                    .build();
        } else {
            return ResponseDTO.<String>builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .message("Invalid token")
                    .build();
        }
    }

    @PostMapping("/register")
    public ResponseDTO<String> registerUser(@RequestBody @Valid UserRegistrationDTO registrationDTO) {
        return ResponseDTO.<String>builder()
                .status(HttpStatus.CREATED)
                .data(userService.registerUser(registrationDTO))
                .build();
    }

    @PostMapping("/resend-confirmation")
    public ResponseDTO<String> resendConfirmation(@RequestParam("email") String email) {
        return ResponseDTO.<String>builder()
                .status(HttpStatus.OK)
                .data(userService.resendConfirmationEmail(email))
                .build();
    }

    @PutMapping
    public ResponseDTO<Void> updateUser(@RequestBody @Valid UserDTO userDTO) {
        userService.updateUser(userDTO);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .message("User updated successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.NO_CONTENT)
                .message("User deleted successfully")
                .build();
    }


    @GetMapping("/{id}")
    public ResponseDTO<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseDTO.<UserDTO>builder()
                .status(HttpStatus.OK)
                .data(userService.getUserById(id))
                .build();
    }

    @GetMapping
    public ResponseDTO<List<UserDTO>> getAllUsers() {
        return ResponseDTO.<List<UserDTO>>builder()
                .status(HttpStatus.OK)
                .data(userService.getAllUsers())
                .build();
    }

//    @GetMapping("/my-account")
//    public ResponseDTO<Map<String, UserDTO>> getMyAccount(@RequestHeader("Authorization") String token) {
//        String phone = jwtTokenService.getUsername(token.replace("Bearer ", ""));
//        UserDTO user = convert(userRepository.findByPhone(phone));
//        Map<String, UserDTO> userData = new HashMap<>();
//        userData.put("user", user);
//        return ResponseDTO.<Map<String, UserDTO>>builder()
//                .status(HttpStatus.OK)
//                .data(userData)
//                .build();
//    }

    @GetMapping("/my-account")
    public ResponseDTO<Optional<User>> getMyAccount(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return ResponseDTO.<Optional<User>>builder()
                .status(HttpStatus.OK)
                .data(userRepository.findByPhone(userDetails.getUsername()))
                .build();
    }

    @PutMapping("/{id}/password")
    public ResponseDTO<Void> updatePassword(@PathVariable Long id, @RequestBody String password) {
        userService.updatePassword(id, password);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .message("Password updated successfully")
                .build();
    }

    @PostMapping("/forgot-password")
    public ResponseDTO<String> forgotPassword(@RequestParam("email") String email) {
        return ResponseDTO.<String>builder()
                .status(HttpStatus.OK)
                .data(userService.createPasswordResetTokenForUser(email))
                .build();
    }

    @GetMapping("/reset-password")
    public ResponseDTO<String> validateResetToken(@RequestParam("token") String token) {
        String result = userService.validatePasswordResetToken(token);
        if (result.equals("Valid token.")) {
            return ResponseDTO.<String>builder()
                    .status(HttpStatus.OK)
                    .data(result)
                    .build();
        } else {
            return ResponseDTO.<String>builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .data(result)
                    .build();
        }
    }

    @PostMapping("/reset-password")
    public ResponseDTO<String> resetPassword(@RequestParam("token") String token
            , @RequestParam("newPassword") String newPassword) {
        String result = userService.resetPassword(token, newPassword);
        if (result.equals("Password reset successful.")) {
            return ResponseDTO.<String>builder()
                    .status(HttpStatus.OK)
                    .data(result)
                    .build();
        } else {
            return ResponseDTO.<String>builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .data(result)
                    .build();
        }
    }

}
