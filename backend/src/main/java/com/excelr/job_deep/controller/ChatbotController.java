package com.excelr.job_deep.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.excelr.job_deep.dto.ChatbotRequest;
import com.excelr.job_deep.service.ChatbotService;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/message")
    public String chat(@RequestBody ChatbotRequest request) {

        return chatbotService.getResponse(request.getMessage());
    }
}