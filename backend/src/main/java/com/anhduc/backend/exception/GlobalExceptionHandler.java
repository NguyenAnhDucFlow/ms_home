package com.anhduc.backend.exception;

import com.anhduc.backend.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseDTO<Void> handleResourceNotFoundException(ResourceNotFoundException e) {
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.NOT_FOUND)
                .message(e.getMessage())
                .build();
    }
}
