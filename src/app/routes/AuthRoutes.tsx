import RegisterScreen from "@/pages/auth/RegisterScreen";
import AuthLayout from "../../layouts/AuthLayout";
import LoginScreen from "../../pages/auth/LoginScreen";
import ForgotPasswordScreen from "@/pages/auth/ForgotPasswordScreen";
import { authHero } from "@/constants/constant";
import GuestRoute from "../guards/GuestRoutes";
import ResetPassword from "@/components/auth/ResetPassword";

export const authRoutes = [
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginScreen />,
            handle: {
              hero: authHero.login,
            },
          },
          {
            path: "register",
            element: <RegisterScreen />,
            handle: {
              hero: authHero.register,
            },
          },
          {
            path: "forgotPassword",
            element: <ForgotPasswordScreen />,
            handle: {
              hero: authHero.forgot,
            },
          },
          {
            path: "resetPassword",
            element: <ResetPassword />,
            handle: {
              hero: authHero.reset,
            },
          },
        ],
      },
    ],
  },
];
