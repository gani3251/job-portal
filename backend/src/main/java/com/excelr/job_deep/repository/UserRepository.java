package com.excelr.job_deep.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.job_deep.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}