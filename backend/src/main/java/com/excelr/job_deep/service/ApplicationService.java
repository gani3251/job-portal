package com.excelr.job_deep.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.excelr.job_deep.entity.Application;
import com.excelr.job_deep.entity.Company;
import com.excelr.job_deep.entity.Job;
import com.excelr.job_deep.entity.User;
import com.excelr.job_deep.repository.ApplicationRepository;
import com.excelr.job_deep.repository.JobRepository;
import com.excelr.job_deep.repository.UserRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final EmailService emailService;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobRepository jobRepository,
            EmailService emailService) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.emailService = emailService;
    }

    // APPLY FOR JOB
    public Application applyForJob(
            Long jobId,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!"JOB_SEEKER".equals(user.getRole())) {
            throw new RuntimeException(
                    "Only job seekers can apply for jobs");
        }

        Job job = jobRepository
                .findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (applicationRepository
                .findByJobAndUser(job, user)
                .isPresent()) {

            throw new RuntimeException(
                    "You have already applied for this job");
        }

        Application application = new Application();

        application.setJob(job);
        application.setUser(user);
        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    // MY APPLICATIONS
    public List<Application> getMyApplications(
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return applicationRepository.findByUser(user);
    }

    // RECRUITER VIEW APPLICANTS
    public List<Application> getJobApplicants(
            Long jobId,
            String email) {

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        if (!"RECRUITER".equals(recruiter.getRole())) {
            throw new RuntimeException(
                    "Only recruiters can view applicants");
        }

        Job job = jobRepository
                .findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (!job.getCompany()
                .getRecruiter()
                .getId()
                .equals(recruiter.getId())) {

            throw new RuntimeException(
                    "You are not authorized to view these applicants");
        }

        return applicationRepository.findByJob(job);
    }

    // UPDATE APPLICATION STATUS
    public Application updateStatus(
            Long applicationId,
            String status,
            String email) {

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        if (!"RECRUITER".equals(recruiter.getRole())) {
            throw new RuntimeException(
                    "Only recruiters can update application status");
        }

        Application application = applicationRepository
                .findById(applicationId)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));

        Job job = application.getJob();

        Company company = job.getCompany();

        if (!company.getRecruiter()
                .getId()
                .equals(recruiter.getId())) {

            throw new RuntimeException(
                    "You are not authorized to update this application");
        }

        String newStatus = status.toUpperCase();

        application.setStatus(newStatus);

        // Save status first
        Application updatedApplication =
                applicationRepository.save(application);

        // Send email to applicant
        try {

            User applicant = application.getUser();

            String applicantEmail = applicant.getEmail();
            String applicantName = applicant.getName();

            String jobTitle = job.getTitle();
            String companyName = company.getName();

            emailService.sendApplicationStatusEmail(
                    applicantEmail,
                    applicantName,
                    jobTitle,
                    companyName,
                    newStatus
            );

            System.out.println(
                    "Status email sent to: " + applicantEmail);

        } catch (Exception e) {

            // Email failure should not undo the status update
            System.out.println(
                    "Application status updated, but email could not be sent.");

            System.out.println(
                    "Email error: " + e.getMessage());
        }

        return updatedApplication;
    }
}