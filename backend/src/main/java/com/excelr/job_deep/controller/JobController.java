package com.excelr.job_deep.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.excelr.job_deep.entity.Job;
import com.excelr.job_deep.service.JobService;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // CREATE JOB
    @PostMapping
    public ResponseEntity<?> createJob(
            @RequestBody Job job,
            Authentication authentication) {

        try {

            String email = authentication.getName();

            Job savedJob =
                    jobService.createJob(job, email);

            return new ResponseEntity<>(
                    savedJob,
                    HttpStatus.CREATED
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // GET ALL JOBS
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {

        return ResponseEntity.ok(
                jobService.getAllJobs()
        );
    }

    // GET JOB BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    jobService.getJobById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // SEARCH BY TITLE
    @GetMapping("/search/title")
    public ResponseEntity<List<Job>> searchByTitle(
            @RequestParam String title) {

        return ResponseEntity.ok(
                jobService.searchByTitle(title)
        );
    }

    // SEARCH BY LOCATION
    @GetMapping("/search/location")
    public ResponseEntity<List<Job>> searchByLocation(
            @RequestParam String location) {

        return ResponseEntity.ok(
                jobService.searchByLocation(location)
        );
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(
            @PathVariable Long id,
            @RequestBody Job job,
            Authentication authentication) {

        try {

            String email = authentication.getName();

            Job updatedJob =
                    jobService.updateJob(
                            id,
                            job,
                            email
                    );

            return ResponseEntity.ok(updatedJob);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(
            @PathVariable Long id,
            Authentication authentication) {

        try {

            String email = authentication.getName();

            jobService.deleteJob(id, email);

            return ResponseEntity.ok(
                    "Job deleted successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}