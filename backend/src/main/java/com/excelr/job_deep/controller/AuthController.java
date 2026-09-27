package com.excelr.job_deep.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.excelr.job_deep.dto.LoginRequest;
import com.excelr.job_deep.dto.LoginResponse;
import com.excelr.job_deep.entity.User;
import com.excelr.job_deep.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {

            User registeredUser = authService.register(user);

            registeredUser.setPassword(null);

            return new ResponseEntity<>(
                    registeredUser,
                    HttpStatus.CREATED
            );

        } catch (RuntimeException e) {

            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            LoginResponse response = authService.login(request);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.UNAUTHORIZED
            );
        }
    }
}