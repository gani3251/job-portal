package com.excelr.job_deep.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.excelr.job_deep.entity.Company;
import com.excelr.job_deep.entity.Job;
import com.excelr.job_deep.entity.User;
import com.excelr.job_deep.repository.CompanyRepository;
import com.excelr.job_deep.repository.JobRepository;
import com.excelr.job_deep.repository.UserRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public JobService(
            JobRepository jobRepository,
            UserRepository userRepository,
            CompanyRepository companyRepository) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    // CREATE JOB
    public Job createJob(Job job, String email) {

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        if (!"RECRUITER".equals(recruiter.getRole())) {
            throw new RuntimeException(
                    "Only recruiters can create jobs");
        }

        Company company = companyRepository
                .findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Create a company first"));

        job.setId(null);
        job.setCompany(company);

        return jobRepository.save(job);
    }

    // GET ALL JOBS
    public List<Job> getAllJobs() {

        return jobRepository.findAll();
    }

    // GET JOB BY ID
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));
    }

    // SEARCH BY TITLE
    public List<Job> searchByTitle(String title) {

        return jobRepository
                .findByTitleContainingIgnoreCase(title);
    }

    // SEARCH BY LOCATION
    public List<Job> searchByLocation(String location) {

        return jobRepository
                .findByLocationContainingIgnoreCase(location);
    }
 // UPDATE JOB
    public Job updateJob(Long jobId, Job updatedJob, String email) {

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Job existingJob = jobRepository
                .findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        Company company = companyRepository
                .findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException("Company not found"));

        // Check job ownership
        if (!existingJob.getCompany().getId()
                .equals(company.getId())) {

            throw new RuntimeException(
                    "You are not authorized to update this job"
            );
        }

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());
        existingJob.setExperience(updatedJob.getExperience());
        existingJob.setJobType(updatedJob.getJobType());
        existingJob.setSkills(updatedJob.getSkills());

        return jobRepository.save(existingJob);
    }


    // DELETE JOB
    public void deleteJob(Long jobId, String email) {

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Job existingJob = jobRepository
                .findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        Company company = companyRepository
                .findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException("Company not found"));

        // Check job ownership
        if (!existingJob.getCompany().getId()
                .equals(company.getId())) {

            throw new RuntimeException(
                    "You are not authorized to delete this job"
            );
        }

        jobRepository.delete(existingJob);
    }
}
