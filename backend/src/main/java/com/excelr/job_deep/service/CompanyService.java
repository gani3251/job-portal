package com.excelr.job_deep.service;

import org.springframework.stereotype.Service;

import com.excelr.job_deep.entity.Company;
import com.excelr.job_deep.entity.User;
import com.excelr.job_deep.repository.CompanyRepository;
import com.excelr.job_deep.repository.UserRepository;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public CompanyService(
            CompanyRepository companyRepository,
            UserRepository userRepository) {

        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    public Company createCompany(Company company, String email) {

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        if (!"RECRUITER".equals(recruiter.getRole())) {
            throw new RuntimeException(
                    "Only recruiters can create companies"
            );
        }

        if (companyRepository.findByRecruiter(recruiter).isPresent()) {
            throw new RuntimeException(
                    "You already have a company"
            );
        }

        company.setId(null);
        company.setRecruiter(recruiter);

        return companyRepository.save(company);
    }

    public Company getMyCompany(String email) {

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return companyRepository
                .findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company not found"
                        ));
    }
}