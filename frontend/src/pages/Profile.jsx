import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        headline: "",
        skills: "",
        education: "",
        experience: "",
        resumeUrl: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =========================
    // LOAD PROFILE
    // =========================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data =
                    await apiRequest("/profile");

                setProfile({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    headline: data.headline || "",
                    skills: data.skills || "",
                    education: data.education || "",
                    experience: data.experience || "",
                    resumeUrl: data.resumeUrl || ""
                });

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        };

        loadProfile();

    }, []);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile({
            ...profile,
            [name]: value
        });

        setMessage("");
        setError("");
    };


    // =========================
    // SAVE PROFILE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setMessage("");
            setError("");

            const updatedProfile =
                await apiRequest(
                    "/profile",
                    {
                        method: "PUT",
                        body: JSON.stringify(profile)
                    }
                );

            setProfile({
                name: updatedProfile.name || "",
                email: updatedProfile.email || "",
                phone: updatedProfile.phone || "",
                headline: updatedProfile.headline || "",
                skills: updatedProfile.skills || "",
                education: updatedProfile.education || "",
                experience: updatedProfile.experience || "",
                resumeUrl: updatedProfile.resumeUrl || ""
            });

            setMessage(
                "Profile updated successfully!"
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setSaving(false);
        }
    };


    // =========================
    // PROFILE COMPLETION
    // =========================

    const calculateCompletion = () => {

        const fields = [
            profile.name,
            profile.phone,
            profile.headline,
            profile.skills,
            profile.education,
            profile.experience,
            profile.resumeUrl
        ];

        const completed =
            fields.filter(
                field => field && field.trim() !== ""
            ).length;

        return Math.round(
            (completed / fields.length) * 100
        );
    };


    const completion =
        calculateCompletion();


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="profile-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading your profile...
                </p>

            </div>
        );
    }


    return (

        <div className="profile-page">

            {/* =========================
                NAVBAR
            ========================= */}

            <nav className="profile-navbar">

                <div
                    className="profile-logo"
                    onClick={() => navigate("/")}
                >
                    JobPortal
                </div>

                <div className="profile-nav-actions">

                    <button
                        onClick={() => navigate("/jobs")}
                    >
                        🔎 Find Jobs
                    </button>

                    <button
                        onClick={() =>
                            navigate("/applications")
                        }
                    >
                        📄 My Applications
                    </button>

                    <button
                        className="profile-home-button"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>

                </div>

            </nav>


            {/* =========================
                MAIN
            ========================= */}

            <main className="profile-container">

                {/* HEADER */}

                <div className="profile-header">

                    <div>

                        <span className="profile-label">
                            MY CAREER
                        </span>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            Keep your professional information
                            up to date for recruiters.
                        </p>

                    </div>

                </div>


                {/* =========================
                    PROFILE SUMMARY
                ========================= */}

                <div className="profile-summary">

                    <div className="profile-avatar">
                        {profile.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                    </div>

                    <div className="profile-summary-info">

                        <h2>
                            {profile.name || "Your Name"}
                        </h2>

                        <p>
                            {profile.headline ||
                                "Add your professional headline"}
                        </p>

                        <span>
                            📧 {profile.email}
                        </span>

                    </div>


                    <div className="profile-completion">

                        <div className="completion-top">

                            <span>
                                Profile Completion
                            </span>

                            <strong>
                                {completion}%
                            </strong>

                        </div>

                        <div className="completion-bar">

                            <div
                                className="completion-progress"
                                style={{
                                    width: `${completion}%`
                                }}
                            ></div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    MESSAGES
                ========================= */}

                {message && (

                    <div className="profile-success">
                        ✓ {message}
                    </div>

                )}

                {error && (

                    <div className="profile-error">
                        {error}
                    </div>

                )}


                {/* =========================
                    PROFILE FORM
                ========================= */}

                <form
                    className="profile-form"
                    onSubmit={handleSubmit}
                >

                    {/* PERSONAL */}

                    <section className="profile-section">

                        <div className="profile-section-heading">

                            <span>
                                👤
                            </span>

                            <div>

                                <h2>
                                    Personal Information
                                </h2>

                                <p>
                                    Your basic contact information.
                                </p>

                            </div>

                        </div>


                        <div className="profile-form-grid">

                            <div className="profile-field">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="profile-field">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                />

                                <small>
                                    Email cannot be changed here.
                                </small>

                            </div>


                            <div className="profile-field">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />

                            </div>

                        </div>

                    </section>


                    {/* PROFESSIONAL */}

                    <section className="profile-section">

                        <div className="profile-section-heading">

                            <span>
                                💼
                            </span>

                            <div>

                                <h2>
                                    Professional Information
                                </h2>

                                <p>
                                    Tell recruiters about your professional
                                    background.
                                </p>

                            </div>

                        </div>


                        <div className="profile-form-grid">

                            <div className="profile-field profile-full">

                                <label>
                                    Professional Headline
                                </label>

                                <input
                                    type="text"
                                    name="headline"
                                    value={profile.headline}
                                    onChange={handleChange}
                                    placeholder="e.g. Java Full Stack Developer"
                                />

                            </div>


                            <div className="profile-field profile-full">

                                <label>
                                    Skills
                                </label>

                                <input
                                    type="text"
                                    name="skills"
                                    value={profile.skills}
                                    onChange={handleChange}
                                    placeholder="e.g. Java, Spring Boot, React, MySQL"
                                />

                                <small>
                                    Separate multiple skills with commas.
                                </small>

                            </div>


                            <div className="profile-field">

                                <label>
                                    Education
                                </label>

                                <input
                                    type="text"
                                    name="education"
                                    value={profile.education}
                                    onChange={handleChange}
                                    placeholder="e.g. B.Tech Computer Science"
                                />

                            </div>


                            <div className="profile-field">

                                <label>
                                    Experience
                                </label>

                                <input
                                    type="text"
                                    name="experience"
                                    value={profile.experience}
                                    onChange={handleChange}
                                    placeholder="e.g. Fresher / 2 Years"
                                />

                            </div>

                        </div>

                    </section>


                    {/* RESUME */}

                    <section className="profile-section">

                        <div className="profile-section-heading">

                            <span>
                                📄
                            </span>

                            <div>

                                <h2>
                                    Resume
                                </h2>

                                <p>
                                    Add a link to your online resume.
                                </p>

                            </div>

                        </div>


                        <div className="profile-field">

                            <label>
                                Resume URL
                            </label>

                            <input
                                type="url"
                                name="resumeUrl"
                                value={profile.resumeUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/my-resume.pdf"
                            />

                            <small>
                                Add a publicly accessible link to your
                                PDF/DOC/DOCX resume.
                            </small>

                            {profile.resumeUrl && (

                                <a
                                    href={profile.resumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="resume-link"
                                >
                                    🔗 Open Resume
                                </a>

                            )}

                        </div>

                    </section>


                    {/* SAVE */}

                    <div className="profile-save-area">

                        <button
                            type="button"
                            className="profile-cancel-button"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="profile-save-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Profile"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}

export default Profile;