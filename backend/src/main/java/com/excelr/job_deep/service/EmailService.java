package com.excelr.job_deep.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Application status email
    public void sendApplicationStatusEmail(
            String to,
            String applicantName,
            String jobTitle,
            String companyName,
            String status) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);

        message.setSubject(
                "Application Update - " + jobTitle);

        String emailBody =
                "Hello " + applicantName + ",\n\n"
                + "There is an update regarding your job application.\n\n"
                + "Job: " + jobTitle + "\n"
                + "Company: " + companyName + "\n"
                + "Application Status: " + status + "\n\n"
                + getStatusMessage(status)
                + "\n\n"
                + "Regards,\n"
                + "Job Portal Team";

        message.setText(emailBody);

        mailSender.send(message);
    }

    private String getStatusMessage(String status) {

        switch (status) {

            case "SHORTLISTED":
                return "Congratulations! Your application has been shortlisted.";

            case "INTERVIEW":
                return "Your application has moved to the interview stage. The recruiter may contact you with further details.";

            case "SELECTED":
                return "Congratulations! You have been selected for this position.";

            case "REJECTED":
                return "Thank you for your interest. Unfortunately, your application was not selected for this position.";

            case "APPLIED":
                return "Your application has been received successfully.";

            default:
                return "Your application status has been updated.";
        }
    }
}