import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function GuestRoute() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
