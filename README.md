Awesome 🔥 Here is the **polished, recruiter-friendly README** for your combined repository.

Replace the root file:

```text
C:\Users\Admin\job-portal-fullstack\README.md
```

with the following:

````markdown
# 💼 Job Portal & Recruitment System

A full-stack web-based **Job Portal & Recruitment System** built using **React, Spring Boot, MySQL, JWT Authentication, Google Gemini AI, and Email Notifications**.

The platform connects **job seekers and recruiters** through a secure and user-friendly application. Job seekers can discover and apply for jobs, track applications, manage their profiles, and interact with an AI career assistant. Recruiters can create job postings, manage jobs, view applicants, and update application statuses.

---

## 🌟 Project Highlights

- 🔐 JWT-based authentication and role-based authorization
- 👤 Separate workflows for Job Seekers and Recruiters
- 🔎 Job search by title and location
- 📋 Job application management
- 📊 Application status tracking
- 🏢 Recruiter company and job management
- 📧 Email notifications for application status updates
- 🤖 AI-powered chatbot using Google Gemini
- 👤 User profile management
- 📄 Resume URL support
- 🔒 Protected REST APIs using Spring Security

---

## 🖥️ Application Overview

```text
                    JOB PORTAL
                        │
          ┌─────────────┴─────────────┐
          │                           │
      JOB SEEKER                  RECRUITER
          │                           │
     ┌────┴────┐                ┌────┴────┐
     │         │                │         │
   Search    Profile          Company    Jobs
     │         │                │         │
   Apply    Applications       Create    Manage
     │         │                │         │
     └────┬────┘                └────┬────┘
          │                           │
          └─────────────┬─────────────┘
                        │
                  Spring Boot API
                        │
             ┌──────────┼──────────┐
             │          │          │
           MySQL      Gemini     Email
````

---

# ✨ Features

## 👤 Job Seeker

Job seekers can:

* Register an account
* Login securely
* Browse available jobs
* Search jobs by title
* Search jobs by location
* View complete job details
* Apply for jobs
* Prevent duplicate applications
* View submitted applications
* Track application status
* Manage personal profile
* Add skills
* Add education
* Add experience
* Add resume URL
* Receive email notifications
* Use the AI chatbot for career assistance

---

## 🏢 Recruiter

Recruiters can:

* Login securely
* Create a company profile
* Create job postings
* Edit job postings
* Delete job postings
* View their posted jobs
* View applicants
* Manage applications
* Update application status

### Application statuses

```text
APPLIED
   ↓
SHORTLISTED
   ↓
INTERVIEW
   ↓
SELECTED
```

Applications can also be marked:

```text
REJECTED
```

---

# 🤖 AI Career Assistant

The application includes an AI-powered chatbot integrated with **Google Gemini**.

The chatbot can assist users with:

* Career questions
* Job-related questions
* Resume guidance
* Interview preparation
* Programming questions
* Skill recommendations
* Learning guidance
* General questions

Example questions:

```text
What is Java?

How should I prepare for a Java interview?

What skills are required for a backend developer?

How can I improve my resume?

What is Spring Boot?
```

The React chatbot communicates with the Spring Boot backend, which handles the Gemini API integration.

---

# 📧 Email Notification System

The system sends email notifications when a recruiter updates an applicant's status.

For example:

```text
Job: Senior Java Developer
Company: ABC Technologies
Application Status: SHORTLISTED
```

The applicant receives an email containing the application update.

Supported statuses:

* APPLIED
* SHORTLISTED
* INTERVIEW
* SELECTED
* REJECTED

---

# 🔐 Authentication & Security

The backend uses:

* Spring Security
* JWT Authentication
* BCrypt Password Hashing
* Role-based authorization
* Protected REST APIs
* CORS configuration

### Authentication Flow

```text
Register / Login
       ↓
Spring Boot
       ↓
Authentication
       ↓
JWT Token
       ↓
React Frontend
       ↓
Authorization Header
       ↓
Protected API
```

Protected endpoints require a valid JWT token.

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose               |
| ------------ | --------------------- |
| React        | User interface        |
| Vite         | Frontend build tool   |
| JavaScript   | Application logic     |
| HTML5        | Page structure        |
| CSS3         | Styling               |
| React Router | Client-side routing   |
| Fetch API    | Backend communication |

## Backend

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| Java            | Backend programming            |
| Spring Boot     | REST API                       |
| Spring Security | Authentication & authorization |
| JWT             | Token-based authentication     |
| Spring Data JPA | Database access                |
| Hibernate       | ORM                            |
| Maven           | Dependency management          |

## Database

```text
MySQL
```

## AI

```text
Google Gemini API
```

## Email

```text
Spring JavaMailSender
Gmail SMTP
```

## Development Tools

```text
Eclipse / Spring Tools
Visual Studio Code
Postman
Git
GitHub
```

---

# 🏗️ Project Architecture

```text
job-portal/
│
├── backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/excelr/
│   │   │   │       ├── JobDeepApplication.java
│   │   │   │       │
│   │   │   │       └── job_deep/
│   │   │   │           ├── config/
│   │   │   │           │   └── SecurityConfig.java
│   │   │   │           │
│   │   │   │           ├── controller/
│   │   │   │           │   ├── AuthController.java
│   │   │   │           │   ├── JobController.java
│   │   │   │           │   ├── CompanyController.java
│   │   │   │           │   ├── ApplicationController.java
│   │   │   │           │   ├── ProfileController.java
│   │   │   │           │   └── ChatbotController.java
│   │   │   │           │
│   │   │   │           ├── dto/
│   │   │   │           │
│   │   │   │           ├── entity/
│   │   │   │           │
│   │   │   │           ├── repository/
│   │   │   │           │
│   │   │   │           ├── security/
│   │   │   │           │
│   │   │   │           └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chatbot.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── MyApplications.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── RecruiterDashboard.jsx
│   │   │   ├── CreateJob.jsx
│   │   │   ├── EditJob.jsx
│   │   │   └── Applicants.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🔄 Application Workflow

## Job Seeker

```text
Register
   ↓
Login
   ↓
Browse Jobs
   ↓
Search / Filter
   ↓
View Job Details
   ↓
Apply
   ↓
Application Created
   ↓
Recruiter Reviews Application
   ↓
Status Updated
   ↓
Email Notification
   ↓
Track Application
```

## Recruiter

```text
Login
   ↓
Create Company
   ↓
Create Job
   ↓
Manage Job
   ↓
View Applicants
   ↓
Update Application Status
   ↓
Applicant Receives Email
```

---

# 🔗 REST API

Backend base URL:

```text
http://localhost:8080/api
```

## Authentication

```text
POST /auth/register
POST /auth/login
```

## Companies

```text
POST /companies
GET  /companies/my
```

## Jobs

```text
GET    /jobs
GET    /jobs/{id}
POST   /jobs
PUT    /jobs/{id}
DELETE /jobs/{id}
```

## Job Search

```text
GET /jobs/search/title?title=Java
GET /jobs/search/location?location=Hyderabad
```

## Applications

```text
POST /applications/job/{jobId}
GET  /applications/my
GET  /applications/job/{jobId}
PUT  /applications/{applicationId}/status
```

## Profile

```text
GET /profile
PUT /profile
```

## AI Chatbot

```text
POST /chatbot/message
```

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure you have installed:

* Java 21
* Maven
* MySQL 8
* Node.js
* npm
* Git

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/gani3251/job-portal.git
```

Enter the project:

```bash
cd job-portal
```

---

# ☕ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create the database:

```sql
CREATE DATABASE job_portal;
```

Create your local:

```text
backend/src/main/resources/application.properties
```

Do **not** upload this file to GitHub.

Example structure:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/job_portal
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update

server.port=8080

jwt.secret=YOUR_JWT_SECRET
jwt.expiration=86400000

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL
spring.mail.password=YOUR_APP_PASSWORD

spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

Configure your Gemini API access using the credentials required by the project.

### Run the backend

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

# ⚛️ Frontend Setup

Open another terminal.

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 Testing with Postman

The backend APIs can be tested using Postman.

Typical workflow:

```text
Register
   ↓
Login
   ↓
Copy JWT Token
   ↓
Authorization → Bearer Token
   ↓
Test Protected APIs
```

Example protected endpoint:

```text
GET /api/test/hello
```

---

# 📱 Frontend Pages

### Public Pages

* Home
* Login
* Register

### Job Seeker Pages

* Jobs
* Job Details
* My Applications
* Profile

### Recruiter Pages

* Recruiter Dashboard
* Create Job
* Edit Job
* Applicants

### Components

* Protected Route
* AI Chatbot
* Authentication Context

---

# 🔒 Security

Sensitive configuration is intentionally excluded from GitHub.

The following should never be committed:

```text
application.properties
.env
.env.local
API keys
Database passwords
Email passwords
JWT secrets
```

The project contains `.gitignore` rules to help prevent sensitive files from being uploaded.

---

# 📸 Screenshots

Screenshots can be added here to demonstrate the application.

### 🏠 Home Page

*Add screenshot here*

### 🔐 Login

*Add screenshot here*

### 💼 Jobs

*Add screenshot here*

### 📋 Job Details

*Add screenshot here*

### 📊 My Applications

*Add screenshot here*

### 🏢 Recruiter Dashboard

*Add screenshot here*

### 👥 Applicants

*Add screenshot here*

### 👤 Profile

*Add screenshot here*

### 🤖 AI Chatbot

*Add screenshot here*

---

# 🚀 Future Enhancements

Possible future improvements:

* 📄 Resume PDF upload
* 📑 Resume parsing
* 🔎 Advanced job filtering
* ⭐ Saved jobs
* 🔔 Job alerts
* 🤖 AI-powered job recommendations
* 📊 Recruiter analytics
* 👨‍💼 Admin dashboard
* 📱 Responsive/mobile improvements
* 🔔 Real-time notifications
* ☁️ Cloud deployment
* 🗄️ Cloud database integration
* 📈 Application analytics

---

# 🎯 Project Objective

The main objective of this project is to develop a complete recruitment platform that simplifies the interaction between job seekers and recruiters.

The project demonstrates practical implementation of:

* Full-stack web development
* REST API development
* Authentication and authorization
* Database management
* Role-based access control
* Third-party API integration
* AI integration
* Email communication
* Frontend-backend integration

---

# 👨‍💻 Project Information

**Project:** Job Portal & Recruitment System

**Type:** Full-Stack Web Application

**Frontend:** React + Vite

**Backend:** Java + Spring Boot

**Database:** MySQL

**Authentication:** Spring Security + JWT

**AI:** Google Gemini

**Email:** JavaMailSender + Gmail SMTP

---

# 🔗 GitHub Repository

**GitHub:**

[https://github.com/gani3251/job-portal](https://github.com/gani3251/job-portal)

---

## ⭐ Technologies

```text
React
Java
Spring Boot
Spring Security
JWT
MySQL
Hibernate
JPA
Google Gemini
JavaMailSender
Maven
Git
GitHub
```

---

## 📌 Author

**Ganesh**

Full-Stack Java Developer

````

### Then save it

Your root README should be:

```text
C:\Users\Admin\job-portal-fullstack\README.md
````

After saving, from:

```text
C:\Users\Admin\job-portal-fullstack>
```

run:

```cmd
git add README.md
```

Then:

```cmd
git commit -m "Add professional project README"
```

Then:

```cmd
git push
```
