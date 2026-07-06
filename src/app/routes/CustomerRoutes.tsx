import DashboardLayout from "@/layouts/DashboardLayout";
import CustomerHome from "@/pages/customer/CustomerHome";
import RoleRoute from "../guards/RoleRoute";

export const CustomerRoutes = [
  {
    element: <RoleRoute allowedRoles={["customer"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            paht: "/customer",
            element: <CustomerHome />,
          },
        ],
      },
    ],
  },
];
