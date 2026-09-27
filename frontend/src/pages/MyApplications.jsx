import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";

function MyApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadApplications = async () => {

            try {

                const data = await apiRequest(
                    "/applications/my"
                );

                setApplications(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        };

        loadApplications();

    }, []);


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


    if (loading) {

        return (
            <div className="applications-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading your applications...
                </p>

            </div>
        );
    }


    return (

        <div className="applications-page">

            {/* ================= NAVBAR ================= */}

            <nav className="applications-navbar">

                <div
                    className="applications-logo"
                    onClick={() => navigate("/")}
                >
                    JobPortal
                </div>

                <div className="applications-nav-actions">

                    <button
                        onClick={() => navigate("/jobs")}
                    >
                        🔎 Find Jobs
                    </button>

                    <button
                        className="applications-home-button"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>

                </div>

            </nav>


            {/* ================= MAIN ================= */}

            <main className="applications-container">

                {/* HEADER */}

                <div className="applications-header">

                    <div>

                        <span className="applications-label">
                            MY CAREER
                        </span>

                        <h1>
                            My Applications
                        </h1>

                        <p>
                            Keep track of your job applications
                            and their current status.
                        </p>

                    </div>

                    <div className="application-count">

                        <strong>
                            {applications.length}
                        </strong>

                        <span>
                            Applications
                        </span>

                    </div>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="applications-error">
                        {error}
                    </div>

                )}


                {/* EMPTY */}

                {!error && applications.length === 0 && (

                    <div className="applications-empty">

                        <div className="empty-application-icon">
                            📄
                        </div>

                        <h2>
                            No Applications Yet
                        </h2>

                        <p>
                            You haven't applied for any jobs yet.
                            Start exploring opportunities today.
                        </p>

                        <button
                            onClick={() => navigate("/jobs")}
                        >
                            Browse Jobs →
                        </button>

                    </div>

                )}


                {/* APPLICATIONS */}

                {!error && applications.length > 0 && (

                    <div className="applications-list">

                        {applications.map((application) => (

                            <div
                                className="modern-application-card"
                                key={application.id}
                            >

                                {/* LEFT */}

                                <div className="application-main">

                                    <div className="application-company-avatar">
                                        {application.job?.company?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "C"}
                                    </div>


                                    <div className="application-info">

                                        <h2>
                                            {application.job?.title}
                                        </h2>

                                        <h3>
                                            🏢{" "}
                                            {application.job?.company?.name}
                                        </h3>


                                        <div className="application-details">

                                            <span>
                                                📍{" "}
                                                {application.job?.location}
                                            </span>

                                            <span>
                                                💰{" "}
                                                {application.job?.salary}
                                            </span>

                                            <span>
                                                🎓{" "}
                                                {application.job?.experience}
                                            </span>

                                        </div>


                                        <p className="applied-date">

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


                                {/* RIGHT */}

                                <div className="application-status-area">

                                    <span className="status-label">
                                        APPLICATION STATUS
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


                                    <button
                                        className="application-view-button"
                                        onClick={() =>
                                            navigate(
                                                `/jobs/${application.job?.id}`
                                            )
                                        }
                                    >
                                        View Job →
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default MyApplications;