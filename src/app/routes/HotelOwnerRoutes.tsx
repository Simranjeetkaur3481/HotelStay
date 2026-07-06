import DashboardLayout from "@/layouts/DashboardLayout";
import HotelOwnerHome from "@/pages/hotelOwner/HotelOwnerHome";

export const HotelOwnerRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      {
        paht: "/hotelOwner",
        element: <HotelOwnerHome />,
      },
    ],
  },
];
