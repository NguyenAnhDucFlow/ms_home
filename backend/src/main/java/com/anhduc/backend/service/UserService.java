package com.anhduc.backend.service;

import com.anhduc.backend.dto.MessageDTO;
import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.dto.UserRegistrationDTO;
import com.anhduc.backend.entity.PasswordResetToken;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.exception.ResourceNotFoundException;
import com.anhduc.backend.repository.PasswordResetTokenRepository;
import com.anhduc.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public interface UserService {

    String registerUser(UserRegistrationDTO registrationDTO);
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    void createUser(UserDTO userDTO);
    void updateUser(UserDTO userDTO);
    void deleteUserById(Long id);
    void updatePassword(Long id, String newPassword);
    boolean confirmedUser(String confirmationToken);
    String resendConfirmationEmail(String email);
    String createPasswordResetTokenForUser(String email);
    String validatePasswordResetToken(String token);
    String resetPassword(String token, String newPassword);
}

@Service
class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final SmsService smsService;
    private final EmailService emailService;
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository, ModelMapper modelMapper, BCryptPasswordEncoder passwordEncoder, SmsService smsService, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.smsService = smsService;
        this.emailService = emailService;
    }


    private User findUserById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found " + id));
    }


    private boolean isValidEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        return email != null && pattern.matcher(email).matches();
    }

    @Override
    @Transactional
    public String registerUser(UserRegistrationDTO registrationDTO) {

        if (!isValidEmail(registrationDTO.getEmail()))
            return "Invalid email format.";
        Optional<User> existingUser = userRepository.findByEmail(registrationDTO.getEmail());
        if (existingUser.isPresent()) {
            if (!existingUser.get().getConfirmed()) {
                return "Email already registed but not confirmed. Please check your email to confirm your account.";
            }
            return "Email already registered.";
        }

        if (registrationDTO.getPassword() == null || registrationDTO.getPassword().length() < 8)
            return "Password must be at least 8 characters long.";
        User user = modelMapper.map(registrationDTO, User.class);
        user.setUsername(registrationDTO.getFullName());
        user.setPasswordHash(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setConfirmationToken(UUID.randomUUID().toString());
        user.setConfirmationSentAt(LocalDateTime.now());
        userRepository.save(user);
        try {
            MessageDTO messageDTO = new MessageDTO();
            messageDTO.setFrom("ducnase161841@fpt.edu.vn");
            messageDTO.setTo(user.getEmail());
            messageDTO.setToName(user.getUsername());
            messageDTO.setSubject("Account confirmation");
            messageDTO.setMessage("To confirm your account, please click the link below:\n" +
                    "http://localhost:8080/users/confirm-account?token=" + user.getConfirmationToken());
            emailService.sendEmail(messageDTO);

        } catch (Exception e) {
            userRepository.delete(user);
            return "Error sending confirmation email. Please try again.";
        }
        return "Registration successful. Please check your email to confirm your account.";
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

    @Override
    @Transactional
    public boolean confirmedUser(String confirmationToken) {
        Optional<User> optionalUser = userRepository.findByConfirmationToken(confirmationToken);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getConfirmationSentAt().isBefore(LocalDateTime.now().minusDays(1)))
                return false;
            user.setConfirmed(true);
            user.setConfirmationToken(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public String resendConfirmationEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty())
            return "Email address does not exist.";

        User user = optionalUser.get();

        if (user.getConfirmed())
            return "Email address is already confirmed.";

        user.setConfirmationToken(UUID.randomUUID().toString());
        user.setConfirmationSentAt(LocalDateTime.now());
        userRepository.save(user);

        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setFrom("ducnase161841@fpt.edu.vn");
        messageDTO.setTo(user.getEmail());
        messageDTO.setToName(user.getUsername());
        messageDTO.setSubject("Account confirmation");
        messageDTO.setMessage("To confirm your account, please click the link below:\n" +
                "http://localhost:8080/users/confirm-account?token=" + user.getConfirmationToken());
        emailService.sendEmail(messageDTO);
        return "Confirmation successful. Please check your email to confirm your account.";
    }

    @Override
    @Transactional
    public String createPasswordResetTokenForUser(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            return "Email not found.";
        User user = optionalUser.get();
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(passwordResetToken);

        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setFrom("ducnase161841@fpt.edu.vn");
        messageDTO.setTo(user.getEmail());
        messageDTO.setToName(user.getUsername());
        messageDTO.setSubject("Password reset request");
        messageDTO.setMessage("To reset your password, please click the link below:\n" +
        "http://localhost:8080/reset-password?token=" + token);
        emailService.sendEmail(messageDTO);
        return "Password reset email sent. Please check your email to reset your password.";
    }

    @Override
    @Transactional
    public String validatePasswordResetToken(String token) {
        Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByToken(token);
        if (tokenOptional.isEmpty())
            return "Invalid token";
        PasswordResetToken passwordResetToken = tokenOptional.get();
        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now()))
            return "Token expired";
        return "Valid token.";
    }

    @Override
    @Transactional
    public String resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByToken(token);
        if (tokenOptional.isEmpty())
            return "Invalid token";
        PasswordResetToken passwordResetToken = tokenOptional.get();
        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now()))
            return "Token expired";
        User user = passwordResetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(passwordResetToken);
        return "Password reset successful.";
    }

}
