import DashboardLayout from "@/layouts/DashboardLayout";
import AdminHome from "@/pages/admin/AdminHome";
import AdminHotels from "@/pages/admin/AdminHotels";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminUsers from "@/pages/admin/AdminUsers";
import RoleRoute from "../guards/RoleRoute";
import { Roles } from "@/constants/roles";

export const adminRoutes = [
  {
    element: <RoleRoute allowedRoles={[Roles.Admin]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/admin", element: <AdminHome /> },
          { path: "/admin/users", element: <AdminUsers /> },
          { path: "/admin/hotels", element: <AdminHotels /> },
          { path: "/admin/bookings", element: <AdminBookings /> },
          { path: "/admin/analytics", element: <AdminAnalytics /> },
        ],
      },
    ],
  },
];
