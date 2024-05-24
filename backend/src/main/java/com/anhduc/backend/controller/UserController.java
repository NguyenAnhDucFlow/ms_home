package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.jwt.JwtTokenService;
import com.anhduc.backend.repository.UserRepository;
import com.anhduc.backend.service.S3StorageService;
import com.anhduc.backend.service.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    ModelMapper modelMapper;

    @PostMapping
    ResponseDTO<Void> createUser(@RequestBody @Valid UserDTO userDTO) {
        userService.addUser(userDTO);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.CREATED)
                .message("User created successfully ")
                .build();
    }

    @PostMapping("/register")
    ResponseDTO<User> registerUser(@RequestBody @Valid UserDTO userDTO) {
        userService.registerUser(userDTO);
        return ResponseDTO.<User>builder()
                .status(HttpStatus.CREATED)
                .message("User register successfully ")
                .build();
    }

    @PutMapping
    ResponseDTO<Void> updateUser(@RequestBody @Valid UserDTO userDTO) {
        userService.updateUser(userDTO);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .message("User updated successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    ResponseDTO<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.NO_CONTENT)
                .message("User deleted successfully")
                .build();
    }


    @GetMapping("/{id}")
    ResponseDTO<UserDTO> getUserById(@PathVariable int id) {
        return ResponseDTO.<UserDTO>builder()
                .status(HttpStatus.OK)
                .data(userService.getUser(id))
                .build();
    }

    @GetMapping
    ResponseDTO<List<UserDTO>> getAllUsers() {
        return ResponseDTO.<List<UserDTO>>builder()
                .status(HttpStatus.OK)
                .data(userService.getUsers())
                .build();
    }

    @GetMapping("/my-account")
    public ResponseDTO<Map<String, UserDTO>> getMyAccount(@RequestHeader("Authorization") String token) {
        String phone = jwtTokenService.getUsername(token.replace("Bearer ", ""));
        UserDTO user = convert(userRepository.findByPhone(phone));
        Map<String, UserDTO> userData = new HashMap<>();
        userData.put("user", user);
        return ResponseDTO.<Map<String, UserDTO>>builder()
                .status(HttpStatus.OK)
                .data(userData)
                .build();
    }

    private  UserDTO convert(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}
