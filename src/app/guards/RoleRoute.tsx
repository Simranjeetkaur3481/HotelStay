import type { Role } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getDashboardPathForRole } from "@/constants/roles";

const RoleRoute = ({ allowedRoles }: { allowedRoles: Role[] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={user ? getDashboardPathForRole(user.role) : "/"} replace />;
  }
  return <Outlet />;
};

export default RoleRoute;
