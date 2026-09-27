import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import Home from "./pages/Home";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

import Chatbot from "./components/Chatbot";
import { useAuth } from "./context/AuthContext";

function App() {

    const { isLoggedIn, user } = useAuth();

    return (
        <BrowserRouter>

            <Routes>

                {/* DEFAULT */}

                <Route
                    path="/"
                    element={<Home />}
                />

                {/* PUBLIC */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* JOB SEEKER */}

                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute role="JOB_SEEKER">
                            <Jobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/:id"
                    element={
                        <ProtectedRoute role="JOB_SEEKER">
                            <JobDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/applications"
                    element={
                        <ProtectedRoute role="JOB_SEEKER">
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute role="JOB_SEEKER">
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* RECRUITER */}

                <Route
                    path="/recruiter"
                    element={
                        <ProtectedRoute role="RECRUITER">
                            <RecruiterDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/jobs/new"
                    element={
                        <ProtectedRoute role="RECRUITER">
                            <CreateJob />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/jobs/:id/edit"
                    element={
                        <ProtectedRoute role="RECRUITER">
                            <EditJob />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/jobs/:jobId/applicants"
                    element={
                        <ProtectedRoute role="RECRUITER">
                            <Applicants />
                        </ProtectedRoute>
                    }
                />

            </Routes>

            {/* JOB SEEKER CHATBOT */}

            {isLoggedIn && user?.role === "JOB_SEEKER" && (
                <Chatbot />
            )}

        </BrowserRouter>
    );
}

export default App;