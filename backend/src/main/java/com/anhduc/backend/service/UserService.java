package com.anhduc.backend.service;

import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.dto.UserRegistrationDTO;
import com.anhduc.backend.entity.Status;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.exception.ResourceNotFoundException;
import com.anhduc.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

public interface UserService {

    void registerUser(UserRegistrationDTO registrationDTO);
    void confirmUser(String confirmationToken);
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    void createUser(UserDTO userDTO);
    void updateUser(UserDTO userDTO);
    void deleteUserById(Long id);
    void updatePassword(Long id, String newPassword);
}

@Service
class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final BCryptPasswordEncoder passwordEncoder;

    private final SmsService smsService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder passwordEncoder, SmsService smsService) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.smsService = smsService;
    }


    private User findUserById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found " + id));
    }


    @Override
    @Transactional
    public void registerUser(UserRegistrationDTO registrationDTO) {
        if (userRepository.findByPhone(registrationDTO.getPhone()).isPresent()) {
            throw new IllegalArgumentException("Phone number already in use");
        }
        User user = modelMapper.map(registrationDTO, User.class);
        user.setPasswordHash(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setConfirmationToken(UUID.randomUUID().toString());
        user.setExpiresAt(LocalDateTime.now().plusHours(24));
        user.setUsername(registrationDTO.getFullName());
        userRepository.save(user);
        sendConfirmationSms(registrationDTO.getPhone(), user.getConfirmationToken());
    }

    @Override
    @Transactional
    public void confirmUser(String confirmationToken) {

        Optional<User> optionalUser = userRepository.findByConfirmationToken(confirmationToken);
        if (optionalUser.isEmpty())
            throw new IllegalArgumentException("Invalid confirmation token");

        User user = optionalUser.get();

        if (user.getExpiresAt().isBefore(LocalDateTime.now())) {
            userRepository.delete(user);
            throw new IllegalArgumentException("Expired confirmation token");
        }

        user.setEnabled(true);
        user.setStatus(Status.ACTIVE);
        user.setConfirmationToken(null);
        user.setExpiresAt(null);
        userRepository.save(user);

    }

    private void sendConfirmationSms(String phoneNumber, String confirmationToken) {
        String message = "Your confirmation code is: " + confirmationToken;
        smsService.sendSms(phoneNumber, message);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        User user = findUserById(id);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    @Transactional
    public void createUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUser(UserDTO userDTO) {
        User user = findUserById(userDTO.getId());
        modelMapper.map(userDTO, user);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updatePassword(Long id, String newPassword) {
        User user = findUserById(id);
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
