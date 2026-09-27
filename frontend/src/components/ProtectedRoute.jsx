import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {

    const { isLoggedIn, user } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (role && user?.role !== role) {
        if (user?.role === "RECRUITER") {
            return <Navigate to="/recruiter" replace />;
        }

        return <Navigate to="/jobs" replace />;
    }

    return children;
}

export default ProtectedRoute;