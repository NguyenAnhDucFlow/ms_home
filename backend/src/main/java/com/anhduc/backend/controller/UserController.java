package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.dto.UserRegistrationDTO;
import com.anhduc.backend.dto.UserUpdateDTO;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.jwt.JwtTokenService;
import com.anhduc.backend.repository.UserRepository;
import com.anhduc.backend.service.S3StorageService;
import com.anhduc.backend.service.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    private final S3StorageService s3StorageService;

    private final JwtTokenService jwtTokenService;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public UserController(UserService userService, S3StorageService s3StorageService, JwtTokenService jwtTokenService, UserRepository userRepository, ModelMapper modelMapper) {
        this.userService = userService;
        this.s3StorageService = s3StorageService;
        this.jwtTokenService = jwtTokenService;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

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
    public ResponseDTO<String> registerUser(@Valid @RequestBody UserRegistrationDTO registrationDTO) {
        String result = userService.registerUser(registrationDTO);
        return ResponseDTO.<String>builder()
                .status(result.contains("successful") ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .data(result)
                .build();
    }
    @PostMapping("/register-landlord")
    public ResponseDTO<String> registerUserLandlord(@Valid @RequestBody UserRegistrationDTO registrationDTO) {
        String result = userService.registerUserLandlord(registrationDTO);
        return ResponseDTO.<String>builder()
                .status(result.contains("successful") ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .data(result)
                .build();
    }

    @PostMapping("/resend-confirmation")
    public ResponseDTO<String> resendConfirmation(@RequestParam("email") String email) {
        String result = userService.resendConfirmationEmail(email);
        return ResponseDTO.<String>builder()
                .status(result.contains("resent") ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .data(userService.resendConfirmationEmail(email))
                .build();
    }

    @PutMapping
    public ResponseDTO<Void> updateUser(@Valid @ModelAttribute UserUpdateDTO userUpdateDTO, @RequestHeader("Authorization") String token) throws IOException {
        Long userId = jwtTokenService.getUserIdFromToken(token.replace("Bearer ", ""));

        if (userUpdateDTO.getAvatarFile() != null && !userUpdateDTO.getAvatarFile().isEmpty()) {
            String fileName = userUpdateDTO.getAvatarFile().getOriginalFilename();
            if (fileName == null) {
                throw new IllegalArgumentException("File name cannot be null");
            }
            String extension = fileName.substring(fileName.lastIndexOf("."));
            String newFileName = UUID.randomUUID().toString() + extension;
            String avatarUrl = s3StorageService.uploadFile(newFileName, userUpdateDTO.getAvatarFile());
            userUpdateDTO.setProfilePicture(avatarUrl);
        }

        userUpdateDTO.setId(userId);
        userService.updateUser(userUpdateDTO);

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

    @GetMapping("/my-account")
    public ResponseDTO<Map<String, UserDTO>> getMyAccount(@RequestHeader("Authorization") String token) {
        String email = jwtTokenService.getEmailFromToken(token.replace("Bearer ", ""));
        Optional<User> user = userRepository.findByEmail(email);
        UserDTO userDTO = modelMapper.map(user.orElse(null), UserDTO.class);
        Map<String, UserDTO> userData = new HashMap<>();
        userData.put("user", userDTO);
        return ResponseDTO.<Map<String, UserDTO>>builder()
                .status(HttpStatus.OK)
                .data(userData)
                .build();
    }

//    @GetMapping("/my-account")
//    public ResponseDTO<Optional<User>> getMyAccount(Authentication authentication) {
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//        return ResponseDTO.<Optional<User>>builder()
//                .status(HttpStatus.OK)
//                .data(userRepository.findByEmail(userDetails.getUsername()))
//                .build();
//    }

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
        String result = userService.createPasswordResetTokenForUser(email);
        return ResponseDTO.<String>builder()
                .status(result.contains("sent") ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .data(userService.createPasswordResetTokenForUser(email))
                .build();
    }

    @GetMapping("/reset-password")
    public ResponseDTO<String> validateResetToken(@RequestParam("token") String token) {
        String result = userService.validatePasswordResetToken(token);
            return ResponseDTO.<String>builder()
                    .status(result.equals("Valid token.") ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                    .data(result)
                    .build();
    }

    @PostMapping("/reset-password")
    public ResponseDTO<String> resetPassword(@RequestParam("token") String token
            , @RequestParam("newPassword") String newPassword) {
        String result = userService.resetPassword(token, newPassword);
            return ResponseDTO.<String>builder()
                    .status(result.equals("Password reset successful.") ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                    .data(result)
                    .build();
    }

}
