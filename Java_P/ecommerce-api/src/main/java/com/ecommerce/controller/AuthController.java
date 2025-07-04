package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.AuthRequest;    // Corrected: Uses AuthRequest for login
import com.ecommerce.dto.AuthResponse;   // Corrected: Uses AuthResponse for JWT response
import com.ecommerce.dto.RegisterRequest; // Corrected: Uses RegisterRequest for registration
import com.ecommerce.service.AuthService; // Corrected: Uses the correct service package
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Marks this class as a REST controller, handling HTTP requests
@RequestMapping("/api/auth") // Base path for all endpoints in this controller
@RequiredArgsConstructor // Lombok annotation for constructor injection of final fields
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        AuthResponse authResponse = authService.register(registerRequest);
        return new ResponseEntity<>(
                ApiResponse.success("User registered successfully", authResponse),
                HttpStatus.CREATED
        );
    }

    @PostMapping("/login") // Maps POST requests to /api/auth/login
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateUser(@Valid @RequestBody AuthRequest authRequest) {
        // Call the 'login' method from AuthService, which now returns AuthResponse
        AuthResponse authResponse = authService.login(authRequest);
        return ResponseEntity.ok(
                ApiResponse.success("User logged in successfully", authResponse)
        );
    }
}
