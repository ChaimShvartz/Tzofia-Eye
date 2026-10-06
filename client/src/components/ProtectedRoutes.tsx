import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import PermissionDenied from "../pages/PermissionDenied";
import Navbar from "./Navbar";

interface ProtectedRoutesProps {
    requiredManager?: boolean;
}

const ProtectedRoutes = ({ requiredManager = false }: ProtectedRoutesProps) => {
    const user = useUserStore((state) => state.user);
    if (!user) return <Navigate to={"/login"} />;
    if (requiredManager && user.role !== "admin") return <PermissionDenied />;
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default ProtectedRoutes;
