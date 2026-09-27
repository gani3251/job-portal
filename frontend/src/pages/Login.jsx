import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await apiRequest(
                "/auth/login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            login(response);

            if (response.role === "RECRUITER") {
                navigate("/recruiter");
            } else {
                navigate("/");
            }

        } catch (error) {

            setError(
                error.message || "Invalid email or password"
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


            {/* LOGIN CARD */}

            <div className="login-card">

                {/* BRAND */}

                <div className="auth-brand">

                    <div className="auth-logo">
                        JobPortal
                    </div>

                    <p>
                        Find your next opportunity
                    </p>

                </div>


                {/* TITLE */}

                <div className="auth-heading">

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Login to continue to your account
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
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login →"}
                    </button>

                </form>


                {/* REGISTER */}

                <div className="auth-switch">

                    <span>
                        Don't have an account?
                    </span>

                    <button
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create an account
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

export default Login;