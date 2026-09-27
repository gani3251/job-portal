import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";

function CreateJob() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "FULL_TIME",
        skills: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await apiRequest(
                "/jobs",
                {
                    method: "POST",
                    body: JSON.stringify(form)
                }
            );

            navigate("/recruiter");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="create-job-page">

            <nav className="navbar">

                <div className="logo">
                    Job Portal
                </div>

                <button
                    onClick={() =>
                        navigate("/recruiter")
                    }
                >
                    ← Dashboard
                </button>

            </nav>

            <main className="create-job-container">

                <div className="create-job-card">

                    <h1>Post a New Job</h1>

                    <p className="form-subtitle">
                        Create a new job opening for candidates.
                    </p>

                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <label>
                            Job Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Java Developer"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Job Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Describe the job..."
                            value={form.description}
                            onChange={handleChange}
                            rows="5"
                            required
                        />

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Hyderabad"
                            value={form.location}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Salary
                        </label>

                        <input
                            type="text"
                            name="salary"
                            placeholder="e.g. 6-10 LPA"
                            value={form.salary}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Experience
                        </label>

                        <input
                            type="text"
                            name="experience"
                            placeholder="e.g. 1-3 Years"
                            value={form.experience}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Job Type
                        </label>

                        <select
                            name="jobType"
                            value={form.jobType}
                            onChange={handleChange}
                        >
                            <option value="FULL_TIME">
                                Full Time
                            </option>

                            <option value="PART_TIME">
                                Part Time
                            </option>

                            <option value="INTERNSHIP">
                                Internship
                            </option>

                            <option value="CONTRACT">
                                Contract
                            </option>

                            <option value="REMOTE">
                                Remote
                            </option>
                        </select>

                        <label>
                            Skills
                        </label>

                        <input
                            type="text"
                            name="skills"
                            placeholder="Java, Spring Boot, MySQL"
                            value={form.skills}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="submit-job-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Posting..."
                                : "Post Job"}
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CreateJob;