package com.anhduc.backend.dto;

import lombok.Data;

@Data
public class MessageDTO {

    private String from;
    private String to;
    private String toName;
    private String message;
    private String subject;
}
