package com.ecommerce.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<Map<String, Object>> handleResourceNotFoundException(
          ResourceNotFoundException ex, WebRequest request) {
    logger.warn("Resource not found: {}", ex.getMessage());

    Map<String, Object> response = createErrorResponse(
            HttpStatus.NOT_FOUND,
            "Not Found",
            ex.getMessage(),
            request.getDescription(false)
    );

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  @ExceptionHandler(DuplicateResourceException.class)
  public ResponseEntity<Map<String, Object>> handleDuplicateResourceException(
          DuplicateResourceException ex, WebRequest request) {
    logger.warn("Duplicate resource: {}", ex.getMessage());

    Map<String, Object> response = createErrorResponse(
            HttpStatus.CONFLICT,
            "Conflict",
            ex.getMessage(),
            request.getDescription(false)
    );

    return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<Map<String, Object>> handleBadCredentialsException(
          BadCredentialsException ex, WebRequest request) {
    logger.warn("Bad credentials attempt: {}", ex.getMessage());

    Map<String, Object> response = createErrorResponse(
            HttpStatus.UNAUTHORIZED,
            "Unauthorized",
            "Invalid username or password",
            request.getDescription(false)
    );

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<Map<String, Object>> handleAccessDeniedException(
          AccessDeniedException ex, WebRequest request) {
    logger.warn("Access denied: {}", ex.getMessage());

    Map<String, Object> response = createErrorResponse(
            HttpStatus.FORBIDDEN,
            "Forbidden",
            "Access denied",
            request.getDescription(false)
    );

    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> handleValidationException(
          MethodArgumentNotValidException ex, WebRequest request) {
    logger.warn("Validation failed: {}", ex.getMessage());

    Map<String, String> fieldErrors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach(error -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      fieldErrors.put(fieldName, errorMessage);
    });

    Map<String, Object> response = createErrorResponse(
            HttpStatus.BAD_REQUEST,
            "Validation Failed",
            "Invalid input data",
            request.getDescription(false)
    );
    response.put("fieldErrors", fieldErrors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(
          IllegalArgumentException ex, WebRequest request) {
    logger.warn("Invalid argument: {}", ex.getMessage());

    Map<String, Object> response = createErrorResponse(
            HttpStatus.BAD_REQUEST,
            "Bad Request",
            ex.getMessage(),
            request.getDescription(false)
    );

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, Object>> handleGenericException(
          Exception ex, WebRequest request) {
    logger.error("Unexpected error occurred", ex);

    Map<String, Object> response = createErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Internal Server Error",
            "An unexpected error occurred",
            request.getDescription(false)
    );

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }

  private Map<String, Object> createErrorResponse(HttpStatus status, String error, String message, String path) {
    Map<String, Object> response = new HashMap<>();
    response.put("timestamp", LocalDateTime.now());
    response.put("status", status.value());
    response.put("error", error);
    response.put("message", message);
    response.put("path", path.replace("uri=", ""));
    return response;
  }
}
