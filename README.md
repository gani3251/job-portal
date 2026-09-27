# 💼 Job Portal & Recruitment System

A full-stack web-based **Job Portal & Recruitment System** that connects job seekers with recruiters through a modern React frontend and Spring Boot backend.

The platform allows job seekers to discover jobs, apply for positions, manage their profiles and applications, while recruiters can create and manage job postings, view applicants, and update application statuses.

The system also includes **JWT-based authentication, email notifications, and an AI-powered chatbot using Google Gemini**.

---

## 🚀 Features

### 👤 Job Seeker

- User registration and login
- JWT-based authentication
- Browse available jobs
- Search jobs by title and location
- View detailed job information
- Apply for jobs
- Prevent duplicate applications
- View submitted applications
- Track application status
- Manage personal profile
- Add skills, education and experience
- Add resume URL
- Receive email notifications when application status changes
- AI chatbot for job and career-related assistance

### 🏢 Recruiter

- Recruiter authentication
- Create and manage company profile
- Create job postings
- Edit job postings
- Delete job postings
- View jobs posted by the recruiter
- View applicants for each job
- Update applicant status
- Application workflow management

### 🤖 AI Chatbot

The project includes an AI-powered chatbot integrated with **Google Gemini**.

The chatbot can help users with:

- Job-related questions
- Career guidance
- Resume-related questions
- Interview preparation
- Programming questions
- Skills and learning suggestions
- General questions

### 📧 Email Notifications

Applicants receive email notifications when their application status changes.

Supported statuses include:

- `APPLIED`
- `SHORTLISTED`
- `INTERVIEW`
- `SELECTED`
- `REJECTED`

---

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Fetch API

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

### Database

- MySQL

### AI

- Google Gemini API

### Email

- JavaMailSender
- Gmail SMTP

### Development Tools

- Eclipse / Spring Tools
- Visual Studio Code
- Postman
- Git
- GitHub

---

## 🏗️ Project Architecture

```text
job-portal/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/excelr/
│   │   │   │       ├── JobDeepApplication.java
│   │   │   │       └── job_deep/
│   │   │   │           ├── config/
│   │   │   │           ├── controller/
│   │   │   │           ├── dto/
│   │   │   │           ├── entity/
│   │   │   │           ├── repository/
│   │   │   │           ├── security/
│   │   │   │           └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
