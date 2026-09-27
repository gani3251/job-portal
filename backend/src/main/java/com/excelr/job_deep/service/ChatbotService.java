package com.excelr.job_deep.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.job_deep.entity.Job;
import com.excelr.job_deep.repository.JobRepository;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;

@Service
public class ChatbotService {

    private final Client client;

    @Autowired
    private JobRepository jobRepository;

    public ChatbotService() {
        client = new Client();
    }

    public String getResponse(String userMessage) {

        String systemInstruction =
                "You are Job Portal Assistant, an AI assistant inside a job portal. "
                + "Help users with jobs, careers, resumes, interviews, programming, "
                + "skills, applications, and general questions. "
                + "Answer naturally and conversationally. "
                + "Use the job data provided by the application when answering job-related questions. "
                + "Never invent jobs, companies, salaries, locations, or other job information. "
                + "If the provided job data does not contain an answer, clearly say that. "
                + "If the user asks something unrelated to jobs, answer helpfully.";

        String jobData = getJobData(userMessage);

        String finalPrompt =
                "User message:\n"
                + userMessage
                + "\n\n"
                + "Job data from the Job Portal database:\n"
                + jobData
                + "\n\n"
                + "Answer the user's question naturally and clearly.";

        Content systemInstructionContent =
                Content.fromParts(
                        Part.fromText(systemInstruction)
                );

        GenerateContentConfig config =
                GenerateContentConfig.builder()
                        .systemInstruction(systemInstructionContent)
                        .build();

        try {

            for (int attempt = 1; attempt <= 3; attempt++) {

                try {

                    GenerateContentResponse response =
                            client.models.generateContent(
                                    "gemini-3.8-flash",
                                    finalPrompt,
                                    config
                            );

                    return response.text();

                } catch (Exception e) {

                    System.out.println(
                            "Gemini attempt " + attempt
                            + " failed: " + e.getMessage()
                    );

                    if (attempt == 3) {
                        break;
                    }

                    try {
                        Thread.sleep(attempt * 2000);
                    } catch (InterruptedException ex) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            }

        } catch (Exception e) {

            System.out.println(
                    "Gemini API Error: " + e.getMessage()
            );
        }

        return "Sorry, the AI service is temporarily unavailable. "
                + "Please try again in a few seconds.";
    }

    private String getJobData(String userMessage) {

        String message = userMessage.toLowerCase();

        boolean jobQuestion =
                message.contains("job")
                || message.contains("jobs")
                || message.contains("vacancy")
                || message.contains("vacancies")
                || message.contains("opening")
                || message.contains("openings")
                || message.contains("position")
                || message.contains("career")
                || message.contains("work");

        if (!jobQuestion) {
            return "No job database lookup was required for this question.";
        }

        List<Job> jobs;

        String location = extractLocation(message);

        if (location != null) {

            jobs = jobRepository
                    .findByLocationContainingIgnoreCase(location);

        } else {

            jobs = jobRepository.findAll();
        }

        if (jobs.isEmpty()) {
            return "No jobs were found in the database.";
        }

        StringBuilder data = new StringBuilder();

        for (Job job : jobs) {

            data.append("Job ID: ")
                    .append(job.getId())
                    .append("\n");

            data.append("Title: ")
                    .append(job.getTitle())
                    .append("\n");

            data.append("Description: ")
                    .append(job.getDescription())
                    .append("\n");

            data.append("Location: ")
                    .append(job.getLocation())
                    .append("\n");

            data.append("Salary: ")
                    .append(job.getSalary())
                    .append("\n");

            data.append("Experience: ")
                    .append(job.getExperience())
                    .append("\n");

            data.append("Job Type: ")
                    .append(job.getJobType())
                    .append("\n");

            data.append("Skills: ")
                    .append(job.getSkills())
                    .append("\n");

            if (job.getCompany() != null) {

                data.append("Company: ")
                        .append(job.getCompany().getName())
                        .append("\n");
            }

            data.append("-------------------------\n");
        }

        return data.toString();
    }

    private String extractLocation(String message) {

        String[] locations = {
                "hyderabad",
                "bangalore",
                "bengaluru",
                "chennai",
                "mumbai",
                "delhi",
                "pune",
                "kolkata",
                "noida",
                "gurgaon",
                "gurugram"
        };

        for (String location : locations) {

            if (message.contains(location)) {

                return location;
            }
        }

        return null;
    }
}