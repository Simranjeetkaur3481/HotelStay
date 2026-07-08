// components/layout/Navbar/nav-links.ts

import { href } from "react-router-dom";

export interface NavLinkItem {
  label: string;
  href: string;
}

export const navLinks: NavLinkItem[] = [
  {
    label: "Hotels",
    href: "/hotels",
  },
  {
    label: "Destinations",
    href: "/destinations",
  },
  {
    label: "Deals",
    href: "/deals",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const authHero = {
  login: {
    title: "Welcome Back",
    description: "Sign in to continue",
    image: "/login.jpg",
  },

  register: {
    title: "Create Account",
    description: "Join us today",
    image: "/register.jpg",
  },

  forgot: {
    title: "Forgot Password",
    description: "Reset your password",
    image: "/forgotPassword.jpg",
  },

  reset: {
    title: "Reset Password",
    description: "Create a new password",
    image: "/reset.jpg",
  },
};