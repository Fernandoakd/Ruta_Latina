import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticatedState, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <div>Cargando...</div>;

    return isAuthenticatedState ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
