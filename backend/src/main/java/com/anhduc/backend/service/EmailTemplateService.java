package com.anhduc.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailTemplateService {

    private final SpringTemplateEngine templateEngine;

    @Autowired
    public EmailTemplateService(SpringTemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String buildEmail(String name, String content, String link, EmailType emailType) {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("content", content);
        context.setVariable("link", link);
        context.setVariable("emailType", emailType);
        return templateEngine.process("email-template", context);
    }
}
