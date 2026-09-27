package com.excelr.job_deep.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.job_deep.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByLocationContainingIgnoreCase(String location);

    List<Job> findByTitleContainingIgnoreCase(String title);

}