import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiRequest } from "../services/api";

function EditJob() {

    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadJob = async () => {

            try {

                const job = await apiRequest(`/jobs/${id}`);

                setForm({
                    title: job.title || "",
                    description: job.description || "",
                    location: job.location || "",
                    salary: job.salary || "",
                    experience: job.experience || "",
                    jobType: job.jobType || "FULL_TIME",
                    skills: job.skills || ""
                });

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        };

        loadJob();

    }, [id]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setError("");

        try {

            await apiRequest(
                `/jobs/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(form)
                }
            );

            navigate("/recruiter");

        } catch (error) {

            setError(error.message);

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                Loading job...
            </div>
        );
    }

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

                    <h1>Edit Job</h1>

                    <p className="form-subtitle">
                        Update the details of your job opening.
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
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Job Description
                        </label>

                        <textarea
                            name="description"
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
                            value={form.skills}
                            onChange={handleChange}
                            required
                        />

                        <div className="edit-actions">

                            <button
                                type="submit"
                                className="submit-job-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() =>
                                    navigate("/recruiter")
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default EditJob;