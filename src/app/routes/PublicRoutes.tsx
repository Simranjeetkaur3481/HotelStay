import HotelDetails from "@/pages/public/HotelDetails";
import PublicLayout from "../../layouts/PublicLayout";
import Home from "../../pages/public/Home";
import HotelListPage from "@/pages/public/HotelList";
import SearchResultsPage from "@/pages/public/SearchResultPages";
import RoomDetailsPage from "@/pages/public/RoomDetailsPage";
import BookingPage from "@/pages/public/BookingPage";
import BookingAuthPage from "@/pages/public/BookingAuthPage";

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
      {
        path: "searchRooms",
        element: <SearchResultsPage />,
      },
      {
        path: "roomDetails/:id",
        element: <RoomDetailsPage />,
      },
      {
        path: "booking/:id",
        element: <BookingPage />,
      },
      {
            path: "/booking/auth",
            element: <BookingAuthPage />,
          },
    ],
  },
];
