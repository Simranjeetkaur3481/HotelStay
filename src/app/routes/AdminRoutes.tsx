import DashboardLayout from "@/layouts/DashboardLayout";
import AdminHome from "@/pages/admin/AdminHome";

export const adminRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      {
        paht: "/admin",
        element: <AdminHome />,
      },
    ],
  },
];
