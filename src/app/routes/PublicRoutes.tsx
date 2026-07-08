import HotelDetails from "@/pages/public/HotelDetails";
import PublicLayout from "../../layouts/PublicLayout";
import Home from "../../pages/public/Home";
import HotelListPage from "@/pages/public/HotelList";

export const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "hotelDetails/:id",
        element: <HotelDetails />,
      },
      {
        path: "hotels",
        element: <HotelListPage />,
      },
    ],
  },
];
