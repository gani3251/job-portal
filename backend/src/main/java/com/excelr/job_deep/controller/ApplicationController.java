package com.excelr.job_deep.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.excelr.job_deep.entity.Application;
import com.excelr.job_deep.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    // APPLY FOR JOB
    @PostMapping("/job/{jobId}")
    public ResponseEntity<?> applyForJob(
            @PathVariable Long jobId,
            Authentication authentication) {

        try {

            String email = authentication.getName();

            Application application =
                    applicationService.applyForJob(
                            jobId,
                            email
                    );

            return new ResponseEntity<>(
                    application,
                    HttpStatus.CREATED
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // MY APPLICATIONS
    @GetMapping("/my")
    public ResponseEntity<?> getMyApplications(
            Authentication authentication) {

        try {

            String email = authentication.getName();

            List<Application> applications =
                    applicationService.getMyApplications(
                            email
                    );

            return ResponseEntity.ok(applications);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // RECRUITER VIEW APPLICANTS
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getJobApplicants(
            @PathVariable Long jobId,
            Authentication authentication) {

        try {

            String email = authentication.getName();

            List<Application> applications =
                    applicationService.getJobApplicants(
                            jobId,
                            email
                    );

            return ResponseEntity.ok(applications);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status,
            Authentication authentication) {

        Application application = applicationService.updateStatus(
                applicationId,
                status,
                authentication.getName()
        );

        return ResponseEntity.ok(application);
    }
}	