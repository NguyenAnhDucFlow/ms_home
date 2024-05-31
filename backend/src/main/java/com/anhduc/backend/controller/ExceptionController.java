package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.jwt.JwtTokenFilter;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.persistence.NoResultException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.TypeMismatchException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class ExceptionController {

    private final JwtTokenFilter jwtTokenFilter;

    public ExceptionController(JwtTokenFilter jwtTokenFilter) {
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @ExceptionHandler({NoResultException.class, EmptyResultDataAccessException.class})
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public ResponseDTO<Void> noResult(Exception ex) {
        log.error("Resource Not Found: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.NOT_FOUND)
                .message("Resource not found")
                .build();
    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(code = HttpStatus.FORBIDDEN)
    public ResponseDTO<Void> accessDeny(Exception ex) {
        log.error("Access Denied: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.FORBIDDEN)
                .message("Access denied")
                .build();
    }

    @ExceptionHandler({ExpiredJwtException.class, MalformedJwtException.class})
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseDTO<Void> unauthorized(Exception ex) {
        log.error("Unauthorized: JWT Expired or Malformed: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.UNAUTHORIZED)
                .message("Unauthorized: JWT expired or malformed")
                .build();
    }

    @ExceptionHandler({BadCredentialsException.class})
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseDTO<Void> badCredential(Exception ex) {
        log.error("Incorrect Login Credentials: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.UNAUTHORIZED)
                .message("Incorrect login credentials")
                .build();
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    @ResponseStatus(code = HttpStatus.CONFLICT)
    public ResponseDTO<Void> conflict(Exception ex) {
        log.error("Data Conflict: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.CONFLICT)
                .message("Data conflict")
                .build();
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> badInput(MethodArgumentNotValidException ex) {
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();

        String message = errors.stream()
                .map(e -> ((FieldError) e).getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining("; "));

        log.error("Invalid Input: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Invalid input: " + message)
                .build();
    }

    @ExceptionHandler({BindException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> bindException(BindException ex) {
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();

        String message = errors.stream()
                .map(e -> ((FieldError) e).getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining("; "));

        log.error("BindException: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Binding error: " + message)
                .build();
    }

    @ExceptionHandler({ConstraintViolationException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> constraintViolationException(ConstraintViolationException ex) {
        String message = ex.getConstraintViolations().stream()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                .collect(Collectors.joining("; "));

        log.error("ConstraintViolationException: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Constraint violation: " + message)
                .build();
    }

    @ExceptionHandler({MissingServletRequestParameterException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> missingServletRequestParameterException(MissingServletRequestParameterException ex) {
        log.error("Missing Request Parameter: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Missing request parameter: " + ex.getParameterName())
                .build();
    }

    @ExceptionHandler({TypeMismatchException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> typeMismatchException(TypeMismatchException ex) {
        log.error("Type Mismatch: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Type mismatch: " + ex.getPropertyName())
                .build();
    }

    @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
    @ResponseStatus(code = HttpStatus.METHOD_NOT_ALLOWED)
    public ResponseDTO<Void> httpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        log.error("Request Method Not Supported: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.METHOD_NOT_ALLOWED)
                .message("Request method not supported")
                .build();
    }

    @ExceptionHandler({HttpMediaTypeNotSupportedException.class})
    @ResponseStatus(code = HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    public ResponseDTO<Void> httpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException ex) {
        log.error("Media Type Not Supported: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                .message("Media type not supported")
                .build();
    }

    @ExceptionHandler({HttpMediaTypeNotAcceptableException.class})
    @ResponseStatus(code = HttpStatus.NOT_ACCEPTABLE)
    public ResponseDTO<Void> httpMediaTypeNotAcceptableException(HttpMediaTypeNotAcceptableException ex) {
        log.error("Media Type Not Acceptable: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.NOT_ACCEPTABLE)
                .message("Media type not acceptable")
                .build();
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> httpMessageNotReadableException(HttpMessageNotReadableException ex) {
        log.error("Message Not Readable: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Message not readable")
                .build();
    }

    @ExceptionHandler({HttpMessageNotWritableException.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseDTO<Void> httpMessageNotWritableException(HttpMessageNotWritableException ex) {
        log.error("Message Not Writable: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message("Message not writable")
                .build();
    }

    @ExceptionHandler({NullPointerException.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseDTO<Void> nullPointer(Exception ex) {
        log.error("Internal Server Error: Null Pointer Exception: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message("Internal server error")
                .build();
    }

    @ExceptionHandler({IllegalArgumentException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> illegalArgument(Exception ex) {
        log.error("Bad Request: Illegal Argument: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Bad request: illegal argument")
                .build();
    }

    @ExceptionHandler({UnsupportedOperationException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> unsupportedOperation(Exception ex) {
        log.error("Bad Request: Unsupported Operation: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Bad request: unsupported operation")
                .build();
    }

    @ExceptionHandler({NumberFormatException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> numberFormat(Exception ex) {
        log.error("Bad Request: Invalid Number Format: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Bad request: invalid number format")
                .build();
    }

    @ExceptionHandler({RuntimeException.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseDTO<Void> runtimeException(Exception ex) {
        log.error("Internal Server Error: Runtime Exception: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message("Internal server error")
                .build();
    }

    @ExceptionHandler({Exception.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseDTO<Void> generalException(Exception ex) {
        log.error("Internal Server Error: ", ex);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message("Internal server error")
                .build();
    }
}
