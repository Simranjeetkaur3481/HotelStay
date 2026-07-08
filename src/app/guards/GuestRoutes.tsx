import { getDashboardPathForRole } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function GuestRoute() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (isAuthenticated && user) {
    const redirectTo = location.state?.redirectTo;
    const bookingData = location.state?.bookingData;

    if (redirectTo) {
      return <Navigate to={redirectTo} state={bookingData} replace />;
    }
    const from = location.state?.from?.pathname;

    return <Navigate to={from || getDashboardPathForRole(user.role)} replace />;
  }

  return <Outlet />;
}
