import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiRequest } from "../services/api";

function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        const loadJob = async () => {

            try {

                const data = await apiRequest(`/jobs/${id}`);

                setJob(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        };

        loadJob();

    }, [id]);


    const handleApply = async () => {

        setApplying(true);
        setMessage("");
        setError("");

        try {

            await apiRequest(
                `/applications/job/${id}`,
                {
                    method: "POST"
                }
            );

            setMessage(
                "Application submitted successfully!"
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setApplying(false);
        }
    };


    if (loading) {

        return (
            <div className="details-loading-page">

                <div className="loading-spinner"></div>

                <p>
                    Loading job details...
                </p>

            </div>
        );
    }


    if (!job) {

        return (
            <div className="details-message-page">

                <div className="details-error-icon">
                    🔍
                </div>

                <h2>
                    Job not found
                </h2>

                <p>
                    {error || "The job you are looking for does not exist."}
                </p>

                <button
                    onClick={() => navigate("/jobs")}
                >
                    ← Back to Jobs
                </button>

            </div>
        );
    }


    return (

        <div className="job-details-page">

            {/* ================= NAVBAR ================= */}

            <nav className="details-navbar">

                <div
                    className="details-logo"
                    onClick={() => navigate("/")}
                >
                    JobPortal
                </div>

                <button
                    onClick={() => navigate("/jobs")}
                >
                    ← Back to Jobs
                </button>

            </nav>


            {/* ================= MAIN ================= */}

            <main className="job-details-container">

                {/* HEADER CARD */}

                <div className="job-details-header-card">

                    <div className="details-company-avatar">
                        {job.company?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "C"}
                    </div>

                    <div className="details-title-area">

                        <span className="details-label">
                            JOB OPPORTUNITY
                        </span>

                        <h1>
                            {job.title}
                        </h1>

                        <p className="details-company">
                            🏢 {job.company?.name}
                        </p>

                        <p className="details-location">
                            📍 {job.location}
                        </p>

                    </div>

                    <span className="details-job-type">
                        {job.jobType || "Full Time"}
                    </span>

                </div>


                {/* CONTENT LAYOUT */}

                <div className="job-details-layout">

                    {/* LEFT */}

                    <div className="job-details-main">

                        {/* JOB OVERVIEW */}

                        <section className="details-section">

                            <h2>
                                Job Overview
                            </h2>

                            <div className="overview-grid">

                                <div className="overview-item">

                                    <span>
                                        💰
                                    </span>

                                    <div>
                                        <small>
                                            Salary
                                        </small>

                                        <strong>
                                            {job.salary || "Not specified"}
                                        </strong>
                                    </div>

                                </div>


                                <div className="overview-item">

                                    <span>
                                        🎓
                                    </span>

                                    <div>
                                        <small>
                                            Experience
                                        </small>

                                        <strong>
                                            {job.experience || "Not specified"}
                                        </strong>
                                    </div>

                                </div>


                                <div className="overview-item">

                                    <span>
                                        💼
                                    </span>

                                    <div>
                                        <small>
                                            Job Type
                                        </small>

                                        <strong>
                                            {job.jobType || "Full Time"}
                                        </strong>
                                    </div>

                                </div>


                                <div className="overview-item">

                                    <span>
                                        📍
                                    </span>

                                    <div>
                                        <small>
                                            Location
                                        </small>

                                        <strong>
                                            {job.location}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* DESCRIPTION */}

                        <section className="details-section">

                            <h2>
                                About the Job
                            </h2>

                            <p className="details-description">
                                {job.description}
                            </p>

                        </section>


                        {/* SKILLS */}

                        <section className="details-section">

                            <h2>
                                Required Skills
                            </h2>

                            <div className="details-skills">

                                {job.skills
                                    ?.split(",")
                                    .map((skill, index) => (

                                        <span key={index}>
                                            {skill.trim()}
                                        </span>

                                    ))}

                            </div>

                        </section>


                        {/* COMPANY */}

                        <section className="details-section">

                            <h2>
                                About the Company
                            </h2>

                            <div className="company-details">

                                <div className="company-details-avatar">
                                    {job.company?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "C"}
                                </div>

                                <div>

                                    <h3>
                                        {job.company?.name}
                                    </h3>

                                    <p>
                                        {job.company?.description}
                                    </p>

                                    <p>
                                        📍 {job.company?.location}
                                    </p>

                                    {job.company?.website && (

                                        <a
                                            href={job.company.website}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            🌐 Visit Company Website
                                        </a>

                                    )}

                                </div>

                            </div>

                        </section>

                    </div>


                    {/* RIGHT / APPLY CARD */}

                    <aside className="apply-card">

                        <h2>
                            Interested in this job?
                        </h2>

                        <p>
                            Take the next step in your career
                            and submit your application.
                        </p>


                        {message && (

                            <div className="details-success">
                                ✓ {message}
                            </div>

                        )}


                        {error && (

                            <div className="details-error">
                                {error}
                            </div>

                        )}


                        <button
                            className="details-apply-button"
                            onClick={handleApply}
                            disabled={applying || !!message}
                        >

                            {applying
                                ? "Applying..."
                                : message
                                    ? "Applied ✓"
                                    : "Apply Now →"}

                        </button>


                        <div className="apply-info">

                            <div>
                                <span>📍</span>
                                <p>
                                    {job.location}
                                </p>
                            </div>

                            <div>
                                <span>💼</span>
                                <p>
                                    {job.jobType || "Full Time"}
                                </p>
                            </div>

                            <div>
                                <span>💰</span>
                                <p>
                                    {job.salary || "Salary not specified"}
                                </p>
                            </div>

                        </div>

                    </aside>

                </div>

            </main>

        </div>
    );
}

export default JobDetails;