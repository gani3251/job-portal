package com.excelr.job_deep.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.job_deep.entity.Company;
import com.excelr.job_deep.entity.User;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findByRecruiter(User recruiter);

}