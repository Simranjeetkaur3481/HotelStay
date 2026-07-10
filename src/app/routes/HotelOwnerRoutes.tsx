import DashboardLayout from "@/layouts/DashboardLayout";
import HotelOwnerHome from "@/pages/hotelOwner/HotelOwnerHome";
import OwnerHotelsPage from "@/pages/hotelOwner/OwnerHotel";
import OwnerRooms from "@/pages/hotelOwner/OwnerRooms";
import OwnerPolicies from "@/pages/hotelOwner/OwnerPolicies";
import OwnerAmenities from "@/pages/hotelOwner/OwnerAmenities";
import OwnerBookings from "@/pages/hotelOwner/OwnerBookings";
import RoleRoute from "../guards/RoleRoute";
import { Roles } from "@/constants/roles";

export const hotelOwnerRoutes = [
  {
    element: <RoleRoute allowedRoles={[Roles.HotelOwner]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard/hotelOwner", element: <HotelOwnerHome /> },
          { path: "/hotelOwner/hotels", element: <OwnerHotelsPage /> },
          { path: "/hotelOwner/rooms", element: <OwnerRooms /> },
          { path: "/hotelOwner/policies", element: <OwnerPolicies /> },
          { path: "/hotelOwner/amenities", element: <OwnerAmenities /> },
          { path: "/hotelOwner/bookings", element: <OwnerBookings /> },
        ],
      },
    ],
  },
];
