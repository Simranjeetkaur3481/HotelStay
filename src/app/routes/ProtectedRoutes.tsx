import BookingSuccess from "@/pages/customer/BookingSuccess";
import ProtectedGuard from "../guards/ProtectedGuard";
import PaymentScreen from "@/pages/customer/PaymentPage";

export const protectedRoutes = [
  {
    element: <ProtectedGuard />,
    children: [
      {
        path: "/booking/:id/payment",
        element: <PaymentScreen />,
      },
      {
        path: "/payment/success",
        element: <BookingSuccess />,
      },
    ],
  },
];
