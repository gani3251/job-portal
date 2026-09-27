import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "JOB_SEEKER"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await apiRequest(
                "/auth/register",
                {
                    method: "POST",
                    body: JSON.stringify(formData)
                }
            );

            /*
             * Registration response from your backend
             * may return the created user.
             *
             * We don't automatically log the user in here.
             * Instead, send them to Login.
             */

            alert(
                "Registration successful! Please login."
            );

            navigate("/login");

        } catch (error) {

            setError(
                error.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="auth-page">

            {/* BACK TO HOME */}

            <button
                className="auth-back-button"
                onClick={() => navigate("/")}
            >
                ← Back to Home
            </button>


            {/* REGISTER CARD */}

            <div className="register-card">

                {/* BRAND */}

                <div className="auth-brand">

                    <div className="auth-logo">
                        JobPortal
                    </div>

                    <p>
                        Start your career journey today
                    </p>

                </div>


                {/* HEADING */}

                <div className="auth-heading">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Join JobPortal and discover new opportunities
                    </p>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}


                {/* FORM */}

                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >

                    {/* NAME */}

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* PHONE */}

                    <div className="form-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="6"
                            required
                        />

                    </div>


                    {/* ROLE */}

                    <div className="form-group">

                        <label>
                            I want to
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >

                            <option value="JOB_SEEKER">
                                Find a Job
                            </option>

                            <option value="RECRUITER">
                                Hire Employees
                            </option>

                        </select>

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account →"}
                    </button>

                </form>


                {/* LOGIN LINK */}

                <div className="auth-switch">

                    <span>
                        Already have an account?
                    </span>

                    <button
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login here
                    </button>

                </div>


                {/* FOOTER */}

                <div className="auth-footer">
                    © 2026 JobPortal
                </div>

            </div>

        </div>
    );
}

export default Register;