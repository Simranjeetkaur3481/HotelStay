// components/layout/Navbar/UserMenu.tsx

import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Replace this with Redux later
const user = {
  name: "Prince",
  email: "prince@gmail.com",
  role: "customer",
  avatar: "",
};

export default function UserMenu() {
  // Guest
  if (user) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <Button variant="ghost" asChild>
          <NavLink to="/login">
            Login
          </NavLink>
        </Button>

        <Button asChild>
          <NavLink to="/register">
            Register
          </NavLink>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatar} />

            <AvatarFallback>
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60"
      >
        <DropdownMenuLabel>
          <p>{user?.name}</p>

          <p className="text-xs text-muted-foreground">
            {user?.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <NavLink to="/profile">
            Profile
          </NavLink>
        </DropdownMenuItem>

        {user?.role === "customer" && (
          <>
            <DropdownMenuItem asChild>
              <NavLink to="/my-bookings">
                My Bookings
              </NavLink>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <NavLink to="/wishlist">
                Wishlist
              </NavLink>
            </DropdownMenuItem>
          </>
        )}

        {user?.role === "owner" && (
          <>
            <DropdownMenuItem asChild>
              <NavLink to="/owner">
                Dashboard
              </NavLink>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <NavLink to="/owner/hotels">
                My Hotels
              </NavLink>
            </DropdownMenuItem>
          </>
        )}

        {user?.role === "admin" && (
          <DropdownMenuItem asChild>
            <NavLink to="/admin">
              Dashboard
            </NavLink>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}