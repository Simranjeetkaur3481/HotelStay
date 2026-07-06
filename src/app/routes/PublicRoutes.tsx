import HotelDetails from "@/pages/public/HotelDetails";
import PublicLayout from "../../layouts/PublicLayout";
import Home from "../../pages/public/Home";
import HotelListPage from "@/pages/public/HotelList";
import ProtectedRoutes from "../guards/ProtectedRoutes";

export const publicRoutes = [
  // {
    // element: <ProtectedRoutes />,
    // children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/hotelDetails/:id",
            element: <HotelDetails />,
          },
          {
            path: "/hotelLists",
            element: <HotelListPage />,
          },
        ],
      },
    // ],
  // },
];
