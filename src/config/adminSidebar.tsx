import { BarChart3, Building2, CalendarDays, LayoutDashboard, Users } from "lucide-react";

export const adminSidebar = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Hotel Management",
    url: "/admin/hotels",
    icon: Building2,
  },
  {
    title: "Bookings",
    url: "/admin/bookings",
    icon: CalendarDays,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
];
