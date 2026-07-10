 "use client";

import { CalendarDays, Heart, LayoutDashboard, Search, Star, UserCircle } from "lucide-react";

export const customerSidebar = [
  {
    title: "Dashboard",
    url: "/customer",
    icon: LayoutDashboard,
  },
  {
    title: "My Bookings",
    url: "/customer/bookings",
    icon: CalendarDays,
  },
  {
    title: "Wishlist",
    url: "/customer/wishlist",
    icon: Heart,
  },
  {
    title: "My Reviews",
    url: "/customer/reviews",
    icon: Star,
  }, {
    title: "Profile",
    url: "/customer/profile",
    icon: UserCircle,
  },{
    title: "Explore Hotels",
    url: "/hotels",
    icon: Search,
  },
];