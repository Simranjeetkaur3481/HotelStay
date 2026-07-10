import DashboardLayout from "@/layouts/DashboardLayout";
import CustomerHome from "@/pages/customer/CustomerHome";
import CustomerBookings from "@/pages/customer/CustomerBookings";
import CustomerWishlist from "@/pages/customer/CustomerWishlist";
import CustomerReviews from "@/pages/customer/CustomerReviews";
import CustomerProfile from "@/pages/customer/CustomerProfile";
import RoleRoute from "../guards/RoleRoute";
import { Roles } from "@/constants/roles";

export const customerRoutes = [
  {
    element: <RoleRoute allowedRoles={[Roles.Customer]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/customer", element: <CustomerHome /> },
          { path: "/customer/bookings", element: <CustomerBookings /> },
          { path: "/customer/wishlist", element: <CustomerWishlist /> },
          { path: "/customer/reviews", element: <CustomerReviews /> },
          { path: "/customer/profile", element: <CustomerProfile /> },
        ],
      },
    ],
  },
];
