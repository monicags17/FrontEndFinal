import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");

    if (!isAuthenticated) {
        // Not logged in, redirect to login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (userRole !== "admin") {
        // Logged in but not admin, show unauthorized message and redirect
        toast.error("Access denied. Admin privileges required.");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
