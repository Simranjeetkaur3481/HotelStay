import { getDashboardPathForRole } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RoleRoute = ({ allowedRoles }) => {
  console.log("RoleRoute Mounted");
  const { isAuthenticated, user } = useAuth();
 console.log("auth",isAuthenticated);
  console.log(getDashboardPathForRole(user.role.toUpperCase()));
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
