import DashboardLayout from "@/layouts/DashboardLayout";
import CustomerHome from "@/pages/customer/CustomerHome";
import RoleRoute from "../guards/RoleRoute";
import { Roles } from "@/constants/roles";

export const customerRoutes = [
  {
    element: <RoleRoute allowedRoles={[Roles.Customer]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/customer",
            element: <CustomerHome />,
          },
        ],
      },
    ],
  },
];
