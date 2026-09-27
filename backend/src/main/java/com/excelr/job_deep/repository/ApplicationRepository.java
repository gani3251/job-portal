package com.excelr.job_deep.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.job_deep.entity.Application;
import com.excelr.job_deep.entity.Job;
import com.excelr.job_deep.entity.User;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    Optional<Application> findByJobAndUser(
            Job job,
            User user
    );

    List<Application> findByUser(User user);

    List<Application> findByJob(Job job);

}