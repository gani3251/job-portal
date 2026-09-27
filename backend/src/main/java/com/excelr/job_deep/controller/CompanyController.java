package com.excelr.job_deep.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.excelr.job_deep.entity.Company;
import com.excelr.job_deep.service.CompanyService;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public ResponseEntity<?> createCompany(
            @RequestBody Company company,
            Authentication authentication) {

        try {

            String email = authentication.getName();

            Company savedCompany =
                    companyService.createCompany(
                            company,
                            email
                    );

            return new ResponseEntity<>(
                    savedCompany,
                    HttpStatus.CREATED
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyCompany(
            Authentication authentication) {

        try {

            String email = authentication.getName();

            return ResponseEntity.ok(
                    companyService.getMyCompany(email)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}