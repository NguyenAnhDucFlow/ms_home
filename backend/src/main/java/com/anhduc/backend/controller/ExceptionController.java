package com.anhduc.backend.controller;

import com.anhduc.backend.dto.ResponseDTO;
import com.anhduc.backend.jwt.JwtTokenFilter;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.persistence.NoResultException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionController {

    private final JwtTokenFilter jwtTokenFilter;
    private final Logger logger = LoggerFactory.getLogger(ExceptionController.class);

    public ExceptionController(JwtTokenFilter jwtTokenFilter) {
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @ExceptionHandler({NoResultException.class, EmptyResultDataAccessException.class})
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public ResponseDTO<Void> noResult(Exception ex) {
        logger.error("NoResultException or EmptyResultDataAccessException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.NOT_FOUND).message("Resource Not Found").build();
    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(code = HttpStatus.FORBIDDEN)
    public ResponseDTO<Void> accessDeny(Exception ex) {
        logger.error("AccessDeniedException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.FORBIDDEN).message("Access Denied").build();
    }

    @ExceptionHandler({ExpiredJwtException.class, MalformedJwtException.class})
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseDTO<Void> unauthorized(Exception ex) {
        logger.error("ExpiredJwtException or MalformedJwtException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.UNAUTHORIZED).message("Unauthorized: JWT Expired or Malformed").build();
    }

    @ExceptionHandler({BadCredentialsException.class})
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseDTO<Void> badCredential(Exception ex) {
        logger.error("BadCredentialsException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.UNAUTHORIZED).message("Incorrect login credentials").build();
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    @ResponseStatus(code = HttpStatus.CONFLICT)
    public ResponseDTO<Void> conflict(Exception ex) {
        logger.error("DataIntegrityViolationException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.CONFLICT).message("Data Conflict").build();
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> badInput(MethodArgumentNotValidException ex) {
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();

        String message = errors.stream()
                .map(e -> ((FieldError) e).getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining("; "));

        logger.error("MethodArgumentNotValidException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.BAD_REQUEST).message("Invalid Input: " + message).build();
    }

    @ExceptionHandler({NullPointerException.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseDTO<Void> nullPointer(Exception ex) {
        logger.error("NullPointerException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.INTERNAL_SERVER_ERROR).message("Internal Server Error: Null Pointer Exception").build();
    }

    @ExceptionHandler({IllegalArgumentException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> illegalArgument(Exception ex) {
        logger.error("IllegalArgumentException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.BAD_REQUEST).message("Bad Request: Illegal Argument").build();
    }

    @ExceptionHandler({UnsupportedOperationException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> unsupportedOperation(Exception ex) {
        logger.error("UnsupportedOperationException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.BAD_REQUEST).message("Bad Request: Unsupported Operation").build();
    }

    @ExceptionHandler({NumberFormatException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> numberFormat(Exception ex) {
        logger.error("NumberFormatException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.BAD_REQUEST).message("Bad Request: Invalid Number Format").build();
    }

    @ExceptionHandler({RuntimeException.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseDTO<Void> runtimeException(Exception ex) {
        logger.error("RuntimeException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.INTERNAL_SERVER_ERROR).message("Internal Server Error: Runtime Exception").build();
    }


}
