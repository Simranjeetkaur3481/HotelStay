import DashboardLayout from "@/layouts/DashboardLayout";
import HotelOwnerHome from "@/pages/hotelOwner/HotelOwnerHome";

export const hotelOwnerRoutes = [
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
