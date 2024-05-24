package com.anhduc.backend.service;

import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.repository.UserRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface UserService {

    void addUser(UserDTO userDTO);

    User registerUser(UserDTO userDTO);

    void updateUser(UserDTO userDTO);

    void deleteUser(int id);

    void updatePassword(int id, String newPassword);

    UserDTO getUser(int id);

    List<UserDTO> getUsers();

}

@Service
class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    private final SmsService smsService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, SmsService smsService) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.smsService = smsService;
        configureModelMapper();
    }

    private void configureModelMapper() {
        modelMapper.typeMap(UserDTO.class, User.class)
                .addMappings(mapper -> mapper.skip(User::setPassword));
    }

    private User findUserById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new NoResultException("User not found " + id));
    }


    @Override
    @Transactional
    public void addUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);
    }

    @Override
    public User registerUser(UserDTO userDTO) {
        User user = new User();
        user.setPhone(userDTO.getPhone());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userRepository.save(user);
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
    public void deleteUser(int id) {
        User user = findUserById(id);
        userRepository.delete(user);
    }

    @Override
    @Transactional
    public void updatePassword(int id, String newPassword) {
        User user = findUserById(id);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUser(int id) {
        User user = findUserById(id);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

}
