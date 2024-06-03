package com.anhduc.backend.service;

import com.anhduc.backend.dto.MessageDTO;
import com.anhduc.backend.dto.UserDTO;
import com.anhduc.backend.dto.UserRegistrationDTO;
import com.anhduc.backend.dto.UserUpdateDTO;
import com.anhduc.backend.entity.PasswordResetToken;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.exception.ResourceNotFoundException;
import com.anhduc.backend.repository.PasswordResetTokenRepository;
import com.anhduc.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    void updateUser(UserUpdateDTO userUpdateDTO);
    void deleteUserById(Long id);
    void updatePassword(Long id, String newPassword);
    boolean confirmedUser(String confirmationToken);
    String resendConfirmationEmail(String email);
    String createPasswordResetTokenForUser(String email);
    String validatePasswordResetToken(String token);
    String resetPassword(String token, String newPassword);
    UserDTO getUserByEmail(String email);
}

@Service
class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final SmsService smsService;
    private final EmailSenderService emailSenderService;
    private final EmailTemplateService emailTemplateService;

    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    private static final String EMAIL_SUBJECT_CONFIRMATION = "Account confirmation";
    private static final String EMAIL_SUBJECT_PASSWORD_RESET = "Password reset request";

    @Value("${app.email.from}")
    private String emailFrom;

    @Value("${app.url.confirmation}")
    private String confirmationUrl;

    @Value("${app.url.reset-password}")
    private String resetPasswordUrl;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository, ModelMapper modelMapper, BCryptPasswordEncoder passwordEncoder, SmsService smsService, EmailSenderService emailSenderService, EmailTemplateService emailTemplateService) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.smsService = smsService;
        this.emailSenderService = emailSenderService;
        this.emailTemplateService = emailTemplateService;
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
        logger.info("Registering user with email: {}", registrationDTO.getEmail());

        if (!isValidEmail(registrationDTO.getEmail())) {
            logger.warn("Invalid email format for email: {}", registrationDTO.getEmail());
            return "Invalid email format.";
        }

        Optional<User> existingUser = userRepository.findByEmail(registrationDTO.getEmail());
        if (existingUser.isPresent()) {
            String message = existingUser.get().getConfirmed()
                    ? "Email already registered."
                    : "Email already registered but not confirmed. Please check your email to confirm your account.";
            logger.warn(message);
            return message;
        }

        if (registrationDTO.getPassword() == null || registrationDTO.getPassword().length() < 8) {
            logger.warn("Password must be at least 8 characters long.");
            return "Password must be at least 8 characters long.";
        }

        User user = modelMapper.map(registrationDTO, User.class);
        user.setUsername(registrationDTO.getFullName());
        user.setPasswordHash(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setConfirmationToken(UUID.randomUUID().toString());
        user.setConfirmationSentAt(LocalDateTime.now());

        userRepository.save(user);
        try {
            String emailContent = emailTemplateService.buildEmail(user.getUsername(), "To confirm your account, please click the link below:", confirmationUrl + user.getConfirmationToken(), EmailType.CONFIRMATION);
            MessageDTO messageDTO = createMessageDTO(user, EMAIL_SUBJECT_CONFIRMATION, "To confirm your account, please click the link below:");
            emailSenderService.sendEmail(messageDTO, emailContent);
        } catch (Exception e) {
            userRepository.delete(user);
            logger.error("Error sending confirmation email", e);
            return "Error sending confirmation email. Please try again.";
        }
        logger.info("Registered user with email: {}", registrationDTO.getEmail());
        return "Registration successful. Please check your email to confirm your account.";
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        logger.info("Fetching all users");
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        logger.info("Fetching user with id: {}", id);
        User user = findUserById(id);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    @Transactional
    public void updateUser(UserUpdateDTO userUpdateDTO) {
        logger.info("Updating user with id: {}", userUpdateDTO.getId());
        User user = findUserById(userUpdateDTO.getId());
        modelMapper.map(userUpdateDTO, user);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        logger.info("Deleting user with id: {}", id);
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updatePassword(Long id, String newPassword) {
        logger.info("Updating password for user with id: {}", id);
        User user = findUserById(id);
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    @Transactional
    public boolean confirmedUser(String confirmationToken) {
        logger.info("Confirming user with confirmation token: {}", confirmationToken);
        Optional<User> optionalUser = userRepository.findByConfirmationToken(confirmationToken);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getConfirmationSentAt().isBefore(LocalDateTime.now().minusDays(1))) {
                logger.info("Confirmation token expired for user with email: {}", user.getEmail());
                return false;
            }
            user.setConfirmed(true);
            user.setConfirmationToken(null);
            userRepository.save(user);
            return true;
        }
        logger.warn("Invalid confirmation token: {}", confirmationToken);
        return false;
    }

    @Override
    @Transactional
    public String resendConfirmationEmail(String email) {
        logger.info("Resending confirmation email to: {}", email);
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            logger.warn("Email not found for user with email: {}", email);
            return "Email address does not exist.";
        }

        User user = optionalUser.get();
        if (user.getConfirmed()) {
            logger.warn("Email address is already confirmed: {}", email);
            return "Email address is already confirmed.";
        }

        user.setConfirmationToken(UUID.randomUUID().toString());
        user.setConfirmationSentAt(LocalDateTime.now());
        userRepository.save(user);

        String emailContent = emailTemplateService.buildEmail(user.getUsername(), "To confirm your account, please click the link below:", confirmationUrl + user.getConfirmationToken(), EmailType.CONFIRMATION);
        MessageDTO messageDTO = createMessageDTO(user, EMAIL_SUBJECT_CONFIRMATION, "To confirm your account, please click the link below:");
        emailSenderService.sendEmail(messageDTO, emailContent);
        return "Confirmation email resent. Please check your email to confirm your account.";
    }

    @Override
    @Transactional
    public String createPasswordResetTokenForUser(String email) {
        logger.info("Created password reset token for user with email: {}", email);
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            logger.info("Email not found for user with email: {}", email);
            return "Email not found.";
        }

        User user = optionalUser.get();
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(passwordResetToken);

        String emailContent = emailTemplateService.buildEmail(user.getUsername(), "To reset your password, please click the link below:", resetPasswordUrl + token, EmailType.PASSWORD_RESET);
        MessageDTO messageDTO = createMessageDTO(user, EMAIL_SUBJECT_PASSWORD_RESET, "To reset your password, please click the link below:");
        emailSenderService.sendEmail(messageDTO, emailContent);
        return "Password reset email sent. Please check your email to reset your password.";
    }

    @Override
    @Transactional
    public String validatePasswordResetToken(String token) {
        logger.info("Validating password reset token for user with token: {}", token);
        Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByToken(token);
        if (tokenOptional.isEmpty()) {
            logger.warn("Invalid token for user with token: {}", token);
            return "Invalid token";
        }
        PasswordResetToken passwordResetToken = tokenOptional.get();
        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            logger.warn("Validate password reset token expired: {}", token);
            return "Token expired";
        }
        return "Valid token.";
    }

    @Override
    @Transactional
    public String resetPassword(String token, String newPassword) {
        logger.info("Resetting password for user with token: {}", token);
        Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByToken(token);
        if (tokenOptional.isEmpty()) {
            logger.warn("Invalid password reset token: {}", token);
            return "Invalid token";
        }
        PasswordResetToken passwordResetToken = tokenOptional.get();
        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            logger.warn("Password reset token expired: {}", token);
            return "Token expired";
        }
        User user = passwordResetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(passwordResetToken);
        return "Password reset successful.";
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserByEmail(String email) {
        logger.info("Fetching user by email: {}", email);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return modelMapper.map(user, UserDTO.class);
    }

    private MessageDTO createMessageDTO(User user, String subject, String message) {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setFrom(emailFrom);
        messageDTO.setTo(user.getEmail());
        messageDTO.setToName(user.getUsername());
        messageDTO.setSubject(subject);
        messageDTO.setMessage(message);
        return messageDTO;

    }

}

