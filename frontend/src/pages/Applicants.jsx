import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiRequest } from "../services/api";

function Applicants() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadApplicants = async () => {

            try {

                const jobData = await apiRequest(
                    `/jobs/${jobId}`
                );

                setJob(jobData);

                const applicationsData = await apiRequest(
                    `/applications/job/${jobId}`
                );

                setApplications(applicationsData);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        };

        loadApplicants();

    }, [jobId]);


    const updateStatus = async (applicationId, status) => {

        try {

            setError("");

            const updatedApplication =
                await apiRequest(
                    `/applications/${applicationId}/status?status=${status}`,
                    {
                        method: "PUT"
                    }
                );

            setApplications((currentApplications) =>
                currentApplications.map((application) =>
                    application.id === applicationId
                        ? updatedApplication
                        : application
                )
            );

        } catch (error) {

            setError(error.message);
        }
    };


    const getStatusClass = (status) => {

        switch (status) {

            case "APPLIED":
                return "status-applied";

            case "SHORTLISTED":
                return "status-shortlisted";

            case "INTERVIEW":
                return "status-interview";

            case "SELECTED":
                return "status-selected";

            case "REJECTED":
                return "status-rejected";

            default:
                return "status-applied";
        }
    };


    const getStatusIcon = (status) => {

        switch (status) {

            case "APPLIED":
                return "📨";

            case "SHORTLISTED":
                return "⭐";

            case "INTERVIEW":
                return "📅";

            case "SELECTED":
                return "🎉";

            case "REJECTED":
                return "❌";

            default:
                return "📨";
        }
    };


    const getInitial = (name) => {

        if (!name) {
            return "U";
        }

        return name.charAt(0).toUpperCase();
    };


    const getSkills = (skills) => {

        if (!skills) {
            return [];
        }

        return skills
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill);
    };


    if (loading) {

        return (
            <div className="applicants-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading applicants...
                </p>

            </div>
        );
    }


    return (

        <div className="applicants-page">

            {/* ================= NAVBAR ================= */}

            <nav className="applicants-navbar">

                <div
                    className="applicants-logo"
                    onClick={() => navigate("/")}
                >
                    JobPortal
                </div>

                <button
                    onClick={() =>
                        navigate("/recruiter")
                    }
                >
                    ← Dashboard
                </button>

            </nav>


            <main className="applicants-container">

                {/* ERROR */}

                {error && (

                    <div className="applicants-error">
                        {error}
                    </div>

                )}


                {/* HEADER */}

                <div className="applicants-header">

                    <div>

                        <span className="applicants-label">
                            RECRUITMENT
                        </span>

                        <h1>
                            Applicants
                        </h1>

                        {job && (

                            <p>
                                Candidates who applied for{" "}
                                <strong>
                                    {job.title}
                                </strong>
                            </p>

                        )}

                    </div>


                    <div className="applicant-count">

                        <strong>
                            {applications.length}
                        </strong>

                        <span>
                            Applicant
                            {applications.length !== 1
                                ? "s"
                                : ""}
                        </span>

                    </div>

                </div>


                {/* JOB SUMMARY */}

                {job && (

                    <div className="applicant-job-summary">

                        <div className="summary-company-avatar">

                            {job.company?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "C"}

                        </div>

                        <div>

                            <h2>
                                {job.title}
                            </h2>

                            <p>
                                🏢 {job.company?.name}
                            </p>

                            <p>
                                📍 {job.location}
                            </p>

                        </div>

                    </div>

                )}


                {/* NO APPLICANTS */}

                {applications.length === 0 ? (

                    <div className="no-applicants">

                        <div className="no-applicants-icon">
                            👥
                        </div>

                        <h2>
                            No applicants yet
                        </h2>

                        <p>
                            Candidates who apply for this
                            job will appear here.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/recruiter")
                            }
                        >
                            ← Back to Dashboard
                        </button>

                    </div>

                ) : (

                    <div className="applicants-list">

                        {applications.map(
                            (application) => {

                                const candidate =
                                    application.user;

                                const skills =
                                    getSkills(
                                        candidate?.skills
                                    );

                                return (

                                    <div
                                        className="modern-applicant-card"
                                        key={application.id}
                                    >

                                        {/* =================
                                            CANDIDATE HEADER
                                        ================= */}

                                        <div className="candidate-info">

                                            <div className="candidate-avatar">

                                                {getInitial(
                                                    candidate?.name
                                                )}

                                            </div>


                                            <div>

                                                <h2>
                                                    {candidate?.name ||
                                                        "Unknown Candidate"}
                                                </h2>

                                                <p className="candidate-headline">

                                                    {candidate?.headline ||
                                                        "No professional headline added"}

                                                </p>

                                                <p>
                                                    📧{" "}
                                                    {candidate?.email}
                                                </p>

                                                {candidate?.phone && (

                                                    <p>
                                                        📱{" "}
                                                        {candidate.phone}
                                                    </p>

                                                )}

                                                <p className="candidate-applied-date">

                                                    Applied on{" "}

                                                    {application.appliedAt
                                                        ? new Date(
                                                            application.appliedAt
                                                        ).toLocaleDateString(
                                                            undefined,
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )
                                                        : "N/A"}

                                                </p>

                                            </div>

                                        </div>


                                        {/* =================
                                            PROFILE DETAILS
                                        ================= */}

                                        <div className="candidate-profile-details">

                                            {/* SKILLS */}

                                            {skills.length > 0 && (

                                                <div className="candidate-detail">

                                                    <span className="candidate-detail-label">
                                                        💡 SKILLS
                                                    </span>

                                                    <div className="candidate-skills">

                                                        {skills.map(
                                                            (skill, index) => (

                                                                <span
                                                                    key={index}
                                                                    className="candidate-skill-tag"
                                                                >
                                                                    {skill}
                                                                </span>

                                                            )
                                                        )}

                                                    </div>

                                                </div>

                                            )}


                                            {/* EDUCATION */}

                                            {candidate?.education && (

                                                <div className="candidate-detail">

                                                    <span className="candidate-detail-label">
                                                        🎓 EDUCATION
                                                    </span>

                                                    <p>
                                                        {candidate.education}
                                                    </p>

                                                </div>

                                            )}


                                            {/* EXPERIENCE */}

                                            {candidate?.experience && (

                                                <div className="candidate-detail">

                                                    <span className="candidate-detail-label">
                                                        💼 EXPERIENCE
                                                    </span>

                                                    <p>
                                                        {candidate.experience}
                                                    </p>

                                                </div>

                                            )}


                                            {/* RESUME */}

                                            {candidate?.resumeUrl && (

                                                <div className="candidate-detail">

                                                    <span className="candidate-detail-label">
                                                        📄 RESUME
                                                    </span>

                                                    <a
                                                        href={
                                                            candidate.resumeUrl
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="candidate-resume-link"
                                                    >
                                                        View Resume ↗
                                                    </a>

                                                </div>

                                            )}

                                        </div>


                                        {/* =================
                                            STATUS
                                        ================= */}

                                        <div className="candidate-status">

                                            <span className="candidate-status-label">
                                                CURRENT STATUS
                                            </span>

                                            <span
                                                className={`modern-status-badge ${getStatusClass(
                                                    application.status
                                                )}`}
                                            >
                                                {getStatusIcon(
                                                    application.status
                                                )}

                                                {application.status}

                                            </span>

                                        </div>


                                        {/* =================
                                            ACTION
                                        ================= */}

                                        <div className="candidate-action">

                                            <label>
                                                Update Status
                                            </label>

                                            <select
                                                value={
                                                    application.status
                                                }
                                                onChange={(e) =>
                                                    updateStatus(
                                                        application.id,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="APPLIED">
                                                    APPLIED
                                                </option>

                                                <option value="SHORTLISTED">
                                                    SHORTLISTED
                                                </option>

                                                <option value="INTERVIEW">
                                                    INTERVIEW
                                                </option>

                                                <option value="SELECTED">
                                                    SELECTED
                                                </option>

                                                <option value="REJECTED">
                                                    REJECTED
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                );
                            }
                        )}

                    </div>

                )}

            </main>

        </div>
    );
}

export default Applicants;