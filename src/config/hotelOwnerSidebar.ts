import { Bed, CalendarDays, FileText, Hotel, LayoutDashboard, Sparkles } from "lucide-react";

export const ownerSidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard/hotelOwner",
    icon: LayoutDashboard,
  },
  {
    title: "Hotels",
    url: "/hotelOwner/hotels",
    icon: Hotel,
  },
  {
    title: "Rooms",
    url: "/hotelOwner/rooms",
    icon: Bed,
  },
  { title: "Policies", url: "/hotelOwner/policies", icon: FileText },
  { title: "Amenities", url: "/hotelOwner/amenities", icon: Sparkles },
  { title: "Bookings", url: "/hotelOwner/bookings", icon: CalendarDays },
  //   {
  //     title: "Bookings",
  //     url: "/hotelOwner/bookings",
  //     icon: Calendar,
  //   },
];
