import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Jobs() {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [jobs, setJobs] = useState([]);

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadJobs = async () => {

        setLoading(true);
        setError("");

        try {

            const data = await apiRequest("/jobs");

            setJobs(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleSearch = async () => {

        setLoading(true);
        setError("");

        try {

            let data;

            /*
             * Search by title + location is not currently
             * available as one backend endpoint.
             *
             * So we preserve your existing logic.
             */

            if (title.trim()) {

                data = await apiRequest(
                    `/jobs/search/title?title=${encodeURIComponent(title)}`
                );

                // Extra frontend filtering by location
                if (location.trim()) {

                    data = data.filter((job) =>
                        job.location
                            ?.toLowerCase()
                            .includes(location.toLowerCase())
                    );
                }

            } else if (location.trim()) {

                data = await apiRequest(
                    `/jobs/search/location?location=${encodeURIComponent(location)}`
                );

            } else {

                data = await apiRequest("/jobs");
            }

            setJobs(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    const handleClear = () => {

        setTitle("");
        setLocation("");

        loadJobs();
    };

    const handleLogout = () => {

        logout();
        navigate("/");
    };

    return (

        <div className="jobs-page">

            {/* ================= NAVBAR ================= */}

            <nav className="jobs-navbar">

                <div
                    className="jobs-logo"
                    onClick={() => navigate("/")}
                >
                    JobPortal
                </div>

                <div className="jobs-nav-right">

                    <span>
                        Hi, {user?.name}
                    </span>

                    <button
                        onClick={() =>
                            navigate("/applications")
                        }
                    >
                        My Applications
                    </button>

                    <button
                        className="jobs-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* ================= HERO / SEARCH ================= */}

            <section className="jobs-hero">

                <div className="jobs-hero-content">

                    <span className="jobs-tag">
                        🔎 EXPLORE OPPORTUNITIES
                    </span>

                    <h1>
                        Find Your
                        <span> Dream Job</span>
                    </h1>

                    <p>
                        Discover jobs that match your skills,
                        experience and career goals.
                    </p>


                    {/* SEARCH */}

                    <div className="jobs-search-box">

                        <div className="search-field">

                            <span>
                                🔎
                            </span>

                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />

                        </div>


                        <div className="search-divider"></div>


                        <div className="search-field">

                            <span>
                                📍
                            </span>

                            <input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) =>
                                    setLocation(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />

                        </div>


                        <button
                            className="jobs-search-button"
                            onClick={handleSearch}
                        >
                            Search Jobs
                        </button>

                    </div>


                    {/* CLEAR */}

                    {(title || location) && (
                        <button
                            className="search-clear"
                            onClick={handleClear}
                        >
                            Clear search
                        </button>
                    )}

                </div>

            </section>


            {/* ================= MAIN ================= */}

            <main className="jobs-main">

                <div className="jobs-results-header">

                    <div>

                        <h2>
                            Available Jobs
                        </h2>

                        <p>
                            {loading
                                ? "Finding opportunities..."
                                : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} found`
                            }
                        </p>

                    </div>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="jobs-error">
                        {error}
                    </div>
                )}


                {/* LOADING */}

                {loading && (

                    <div className="jobs-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading jobs...
                        </p>

                    </div>

                )}


                {/* NO JOBS */}

                {!loading && jobs.length === 0 && (

                    <div className="jobs-empty">

                        <div className="empty-icon">
                            🔍
                        </div>

                        <h2>
                            No jobs found
                        </h2>

                        <p>
                            Try searching with a different
                            job title or location.
                        </p>

                        <button
                            onClick={handleClear}
                        >
                            View All Jobs
                        </button>

                    </div>

                )}


                {/* JOBS */}

                {!loading && jobs.length > 0 && (

                    <div className="modern-jobs-grid">

                        {jobs.map((job) => (

                            <div
                                className="modern-job-card"
                                key={job.id}
                            >

                                {/* CARD HEADER */}

                                <div className="modern-job-header">

                                    <div className="company-avatar">
                                        {job.company?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "C"}
                                    </div>

                                    <div className="job-heading">

                                        <h3>
                                            {job.title}
                                        </h3>

                                        <p>
                                            {job.company?.name ||
                                                "Company"}
                                        </p>

                                    </div>

                                </div>


                                {/* JOB TYPE */}

                                <div className="job-type-row">

                                    <span className="modern-job-type">
                                        {job.jobType || "Full Time"}
                                    </span>

                                </div>


                                {/* DETAILS */}

                                <div className="modern-job-details">

                                    <span>
                                        📍 {job.location}
                                    </span>

                                    <span>
                                        💰 {job.salary}
                                    </span>

                                    <span>
                                        🎓 {job.experience}
                                    </span>

                                </div>


                                {/* SKILLS */}

                                {job.skills && (

                                    <div className="job-skills">

                                        {job.skills
                                            .split(",")
                                            .slice(0, 5)
                                            .map((skill, index) => (

                                                <span key={index}>
                                                    {skill.trim()}
                                                </span>

                                            ))}

                                    </div>

                                )}


                                {/* DESCRIPTION */}

                                <p className="modern-job-description">

                                    {job.description?.length > 130
                                        ? `${job.description.substring(0, 130)}...`
                                        : job.description}

                                </p>


                                {/* FOOTER */}

                                <div className="modern-job-footer">

                                    <span className="posted-label">
                                        Recently posted
                                    </span>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/jobs/${job.id}`
                                            )
                                        }
                                    >
                                        View Details →
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

export default Jobs;