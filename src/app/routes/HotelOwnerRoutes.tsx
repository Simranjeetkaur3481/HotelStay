import DashboardLayout from "@/layouts/DashboardLayout";
import HotelOwnerHome from "@/pages/hotelOwner/HotelOwnerHome";

export const HotelOwnerRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/hotelOwner",
        element: <HotelOwnerHome />,
      },
    ],
  },
];
