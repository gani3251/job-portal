import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {

    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();

    const handleGetStarted = () => {

        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        if (user?.role === "RECRUITER") {
            navigate("/recruiter");
        } else {
            navigate("/jobs");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="home-page">

            {/* ================= NAVBAR ================= */}

            <nav className="home-navbar">

                <div
                    className="home-logo"
                    onClick={() => navigate("/")}
                >
                    JobPortal
                </div>

                <div className="home-nav-links">

                    {/* JOB SEEKER NAVIGATION */}

                    {isLoggedIn && user?.role === "JOB_SEEKER" && (
                        <>
                            <button
                                onClick={() => navigate("/jobs")}
                            >
                                Find Jobs
                            </button>
                            <button onClick={() => navigate("/profile")}>
    Profile
</button>

                            <button
                                onClick={() =>
                                    navigate("/applications")
                                }
                            >
                                My Applications
                            </button>

                            <button
                                className="nav-register"
                                onClick={() => navigate("/jobs")}
                            >
                                Dashboard
                            </button>

                            <button
                                className="nav-login"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {/* RECRUITER NAVIGATION */}

                    {isLoggedIn && user?.role === "RECRUITER" && (
                        <>
                            <button
                                onClick={() =>
                                    navigate("/recruiter")
                                }
                            >
                                My Jobs
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/recruiter")
                                }
                            >
                                Applicants
                            </button>

                            <button
                                className="nav-register"
                                onClick={() =>
                                    navigate("/recruiter")
                                }
                            >
                                Dashboard
                            </button>

                            <button
                                className="nav-login"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {/* LOGGED OUT NAVIGATION */}

                    {!isLoggedIn && (
                        <>
                            <button
                                onClick={() => navigate("/jobs")}
                            >
                                Find Jobs
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                For Recruiters
                            </button>

                            <button
                                className="nav-login"
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Login
                            </button>

                            <button
                                className="nav-register"
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                Register
                            </button>
                        </>
                    )}

                </div>

            </nav>


            {/* ================= HERO ================= */}

            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-tag">
                        🚀 Your career starts here
                    </span>

                    <h1>
                        Find Your
                        <span> Dream Job</span>
                    </h1>

                    <p>
                        Discover opportunities that match your
                        skills, experience and career goals.
                        Connect with companies looking for
                        talented people like you.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="hero-primary"
                            onClick={handleGetStarted}
                        >
                            {isLoggedIn
                                ? "Go to Dashboard →"
                                : "Find Jobs →"}
                        </button>

                        {!isLoggedIn && (
                            <button
                                className="hero-secondary"
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                Create Account
                            </button>
                        )}

                    </div>

                </div>


                {/* HERO VISUAL */}

                <div className="hero-visual">

                    <div className="floating-card card-one">

                        <span>💼</span>

                        <div>
                            <strong>
                                Java Developer
                            </strong>

                            <small>
                                Hyderabad · 8-12 LPA
                            </small>
                        </div>

                    </div>


                    <div className="floating-card card-two">

                        <span>🎯</span>

                        <div>
                            <strong>
                                New Opportunity
                            </strong>

                            <small>
                                Perfect match found
                            </small>
                        </div>

                    </div>


                    <div className="hero-circle">
                        <span>💼</span>
                    </div>

                </div>

            </section>


            {/* ================= STATS ================= */}

            <section className="stats-section">

                <div className="stat">
                    <h2>1000+</h2>
                    <p>Job Opportunities</p>
                </div>

                <div className="stat">
                    <h2>500+</h2>
                    <p>Companies</p>
                </div>

                <div className="stat">
                    <h2>5000+</h2>
                    <p>Job Seekers</p>
                </div>

                <div className="stat">
                    <h2>24/7</h2>
                    <p>Career Opportunities</p>
                </div>

            </section>


            {/* ================= FEATURES ================= */}

            <section className="features-section">

                <div className="section-title">

                    <span>
                        WHY JOBPORTAL?
                    </span>

                    <h2>
                        Everything you need to
                        build your career
                    </h2>

                    <p>
                        A simple platform connecting talented
                        professionals with growing companies.
                    </p>

                </div>


                <div className="features-grid">

                    <div className="feature-card">

                        <div className="feature-icon">
                            🔎
                        </div>

                        <h3>
                            Easy Job Search
                        </h3>

                        <p>
                            Search jobs by title and location
                            and find opportunities that match
                            your skills.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            💼
                        </div>

                        <h3>
                            Apply Easily
                        </h3>

                        <p>
                            Apply to jobs with just a few clicks
                            and keep track of every application.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📊
                        </div>

                        <h3>
                            Track Applications
                        </h3>

                        <p>
                            Stay updated with application statuses
                            from applied to selected.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🚀
                        </div>

                        <h3>
                            Recruit Faster
                        </h3>

                        <p>
                            Recruiters can post jobs, manage
                            applicants and find the right talent.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="cta-section">

                <div>

                    <h2>
                        Ready to take the next step?
                    </h2>

                    <p>
                        Start exploring opportunities today.
                    </p>

                </div>

                <button
                    onClick={handleGetStarted}
                >
                    {isLoggedIn
                        ? "Open Dashboard →"
                        : "Get Started →"}
                </button>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="home-footer">

                <div className="footer-logo">
                    JobPortal
                </div>

                <p>
                    Connecting talent with opportunity.
                </p>

                <span>
                    © 2026 JobPortal. All rights reserved.
                </span>

            </footer>

        </div>
    );
}

export default Home;