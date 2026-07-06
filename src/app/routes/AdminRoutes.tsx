import DashboardLayout from "@/layouts/DashboardLayout";
import AdminHome from "@/pages/admin/AdminHome";

export const AdminRoutes = [
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
