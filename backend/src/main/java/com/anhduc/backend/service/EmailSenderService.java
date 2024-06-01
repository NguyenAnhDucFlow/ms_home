package com.anhduc.backend.service;

import com.anhduc.backend.dto.MessageDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class EmailSenderService {

    private static final Logger logger = LoggerFactory.getLogger(EmailSenderService.class);

    private final JavaMailSender mailSender;

    @Autowired
    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendEmail(MessageDTO messageDTO, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            helper.setTo(messageDTO.getTo());
            helper.setText(content, true);
            helper.setSubject(messageDTO.getSubject());
            helper.setFrom(messageDTO.getFrom());

            // Embed logo image
            ClassPathResource resource = new ClassPathResource("/static/logoImage.png");
            helper.addInline("logoImage", resource);

            mailSender.send(message);
        } catch (MessagingException e) {
            logger.error("Error sending email", e);
        }
    }
}
