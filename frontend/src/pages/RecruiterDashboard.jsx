import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

function RecruiterDashboard() {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [applicantCounts, setApplicantCounts] = useState({});
    const [totalApplicants, setTotalApplicants] = useState(0);

    const [loading, setLoading] = useState(true);
    const [creatingCompany, setCreatingCompany] = useState(false);
    const [error, setError] = useState("");

    const [companyForm, setCompanyForm] = useState({
        name: "",
        description: "",
        location: "",
        website: ""
    });


    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const companyResponse =
                await apiRequest("/companies/my");

            setCompany(companyResponse);

            const jobsResponse =
                await apiRequest("/jobs");

            const myJobs = jobsResponse.filter(
                job =>
                    job.company &&
                    job.company.id === companyResponse.id
            );

            setJobs(myJobs);


            /*
             * Get applicant count for every job
             */
            if (myJobs.length > 0) {

                const applicantResponses =
                    await Promise.all(
                        myJobs.map(job =>
                            apiRequest(
                                `/applications/job/${job.id}`
                            )
                        )
                    );

                const counts = {};

                let total = 0;

                applicantResponses.forEach(
                    (applications, index) => {

                        const jobId = myJobs[index].id;

                        counts[jobId] =
                            applications.length;

                        total += applications.length;
                    }
                );

                setApplicantCounts(counts);
                setTotalApplicants(total);

            } else {

                setApplicantCounts({});
                setTotalApplicants(0);
            }


        } catch (error) {

            /*
             * If recruiter doesn't have a company yet,
             * backend may return 404.
             */
            if (error.message.includes("404")) {

                setCompany(null);
                setJobs([]);
                setApplicantCounts({});
                setTotalApplicants(0);

            } else {

                setError(error.message);
            }

        } finally {

            setLoading(false);
        }
    };


    const handleCompanyChange = (e) => {

        const { name, value } = e.target;

        setCompanyForm({
            ...companyForm,
            [name]: value
        });
    };


    const handleCreateCompany = async (e) => {

        e.preventDefault();

        try {

            setCreatingCompany(true);
            setError("");

            const response = await apiRequest(
                "/companies",
                {
                    method: "POST",
                    body: JSON.stringify(companyForm)
                }
            );

            setCompany(response);

            setCompanyForm({
                name: "",
                description: "",
                location: "",
                website: ""
            });

        } catch (error) {

            setError(
                error.message ||
                "Unable to create company"
            );

        } finally {

            setCreatingCompany(false);
        }
    };


    const handleLogout = () => {

        logout();
        navigate("/");
    };


    const getApplicantCount = (jobId) => {

        return applicantCounts[jobId] || 0;
    };


    if (loading) {

        return (
            <div className="dashboard-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading recruiter dashboard...
                </p>

            </div>
        );
    }


    return (

        <div className="recruiter-page">

            {/* ================= NAVBAR ================= */}

            <nav className="recruiter-navbar">

                <div
                    className="recruiter-logo"
                    onClick={() => navigate("/")}
                >
                    JobPortal
                </div>

                <div className="recruiter-nav-right">

                    <span>
                        Welcome, {user?.name}
                    </span>

                    <button
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            <main className="recruiter-container">

                {/* ================= HEADER ================= */}

                <div className="recruiter-header">

                    <div>

                        <span className="dashboard-label">
                            RECRUITER PORTAL
                        </span>

                        <h1>
                            Recruiter Dashboard
                        </h1>

                        <p>
                            Manage your company, jobs and applicants.
                        </p>

                    </div>

                    {company && (

                        <button
                            className="dashboard-post-button"
                            onClick={() =>
                                navigate("/recruiter/jobs/new")
                            }
                        >
                            + Post New Job
                        </button>

                    )}

                </div>


                {/* ================= ERROR ================= */}

                {error && (

                    <div className="auth-error">
                        {error}
                    </div>

                )}


                {/* ================= NO COMPANY ================= */}

                {!company && (

                    <div className="company-setup-card">

                        <div className="company-setup-icon">
                            🏢
                        </div>

                        <h2>
                            Set up your company
                        </h2>

                        <p>
                            Before posting jobs, create your
                            company profile.
                        </p>

                        <form
                            className="company-form"
                            onSubmit={handleCreateCompany}
                        >

                            <div className="form-group">

                                <label>
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. ABC Technologies"
                                    value={companyForm.name}
                                    onChange={handleCompanyChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Tell us about your company"
                                    value={companyForm.description}
                                    onChange={handleCompanyChange}
                                    rows="4"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Hyderabad"
                                    value={companyForm.location}
                                    onChange={handleCompanyChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Website
                                </label>

                                <input
                                    type="url"
                                    name="website"
                                    placeholder="https://example.com"
                                    value={companyForm.website}
                                    onChange={handleCompanyChange}
                                />

                            </div>


                            <button
                                type="submit"
                                className="create-company-button"
                                disabled={creatingCompany}
                            >
                                {creatingCompany
                                    ? "Creating Company..."
                                    : "Create Company →"}
                            </button>

                        </form>

                    </div>

                )}


                {/* ================= COMPANY EXISTS ================= */}

                {company && (

                    <>

                        {/* COMPANY CARD */}

                        <div className="company-info-card">

                            <div className="company-info-header">

                                <div className="company-icon">
                                    🏢
                                </div>

                                <div>

                                    <h2>
                                        {company.name}
                                    </h2>

                                    <p>
                                        📍 {company.location}
                                    </p>

                                </div>

                            </div>

                            <p className="company-description">
                                {company.description}
                            </p>

                            {company.website && (

                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="company-website"
                                >
                                    🌐 Visit Website
                                </a>

                            )}

                        </div>


                        {/* ================= STATS ================= */}

                        <div className="recruiter-stats">

                            <div className="recruiter-stat-card">

                                <span>
                                    💼
                                </span>

                                <div>

                                    <strong>
                                        {jobs.length}
                                    </strong>

                                    <p>
                                        Posted Jobs
                                    </p>

                                </div>

                            </div>


                            <div className="recruiter-stat-card">

                                <span>
                                    👥
                                </span>

                                <div>

                                    <strong>
                                        {totalApplicants}
                                    </strong>

                                    <p>
                                        Total Applicants
                                    </p>

                                </div>

                            </div>


                            <div className="recruiter-stat-card">

                                <span>
                                    🎯
                                </span>

                                <div>

                                    <strong>
                                        {jobs.length}
                                    </strong>

                                    <p>
                                        Active Jobs
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ================= JOB HEADER ================= */}

                        <div className="jobs-section-header">

                            <div>

                                <span className="dashboard-label">
                                    JOB MANAGEMENT
                                </span>

                                <h2>
                                    My Jobs
                                </h2>

                                <p>
                                    Manage the jobs posted by your company.
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    navigate("/recruiter/jobs/new")
                                }
                            >
                                + Post New Job
                            </button>

                        </div>


                        {/* ================= JOBS ================= */}

                        {jobs.length === 0 ? (

                            <div className="empty-jobs">

                                <div className="empty-jobs-icon">
                                    💼
                                </div>

                                <h3>
                                    No jobs posted yet
                                </h3>

                                <p>
                                    Start hiring by posting your
                                    first job.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/recruiter/jobs/new")
                                    }
                                >
                                    Post Your First Job
                                </button>

                            </div>

                        ) : (

                            <div className="recruiter-jobs-grid">

                                {jobs.map(job => (

                                    <div
                                        className="recruiter-job-card"
                                        key={job.id}
                                    >

                                        {/* TOP */}

                                        <div className="job-card-top">

                                            <div>

                                                <h3>
                                                    {job.title}
                                                </h3>

                                                <p>
                                                    📍 {job.location}
                                                </p>

                                            </div>

                                            <span className="job-status">
                                                ACTIVE
                                            </span>

                                        </div>


                                        {/* DESCRIPTION */}

                                        <p className="job-description">
                                            {job.description}
                                        </p>


                                        {/* META */}

                                        <div className="job-meta">

                                            <span>
                                                💰 {job.salary}
                                            </span>

                                            <span>
                                                💼 {job.jobType}
                                            </span>

                                            <span>
                                                🎓 {job.experience}
                                            </span>

                                        </div>


                                        {/* APPLICANTS */}

                                        <div className="job-applicant-summary">

                                            <div>

                                                <span className="job-applicant-icon">
                                                    👥
                                                </span>

                                                <div>

                                                    <strong>
                                                        {getApplicantCount(job.id)}
                                                    </strong>

                                                    <span>
                                                        Applicant
                                                        {getApplicantCount(job.id) !== 1
                                                            ? "s"
                                                            : ""}
                                                    </span>

                                                </div>

                                            </div>

                                            <span className="application-status-text">
                                                {getApplicantCount(job.id) > 0
                                                    ? "Applications received"
                                                    : "No applications yet"}
                                            </span>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="job-actions">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/recruiter/jobs/${job.id}/edit`
                                                    )
                                                }
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/recruiter/jobs/${job.id}/applicants`
                                                    )
                                                }
                                            >
                                                👥 Applicants
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </>
                )}

            </main>

        </div>
    );
}

export default RecruiterDashboard;