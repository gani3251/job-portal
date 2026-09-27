package com.excelr.job_deep.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.job_deep.entity.User;
import com.excelr.job_deep.repository.UserRepository;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;


    // =========================
    // GET MY PROFILE
    // =========================

    @GetMapping
    public ResponseEntity<?> getProfile(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                    new RuntimeException("User not found")
                );

        return ResponseEntity.ok(user);
    }


    // =========================
    // UPDATE MY PROFILE
    // =========================

    @PutMapping
    public ResponseEntity<?> updateProfile(
            @RequestBody User profileData,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                    new RuntimeException("User not found")
                );


        user.setName(profileData.getName());
        user.setPhone(profileData.getPhone());

        user.setHeadline(
            profileData.getHeadline()
        );

        user.setSkills(
            profileData.getSkills()
        );

        user.setEducation(
            profileData.getEducation()
        );

        user.setExperience(
            profileData.getExperience()
        );

        user.setResumeUrl(
            profileData.getResumeUrl()
        );


        User updatedUser =
                userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }
}