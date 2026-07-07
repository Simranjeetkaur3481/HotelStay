// components/layout/Navbar/UserMenu.tsx

import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useLogoutMutation } from "@/store/api/authApi";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/slices/authSlice";

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logOut());
  };
  console.log("user", user);
  // Guest
  if (!user) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <Button variant="ghost" asChild>
          <NavLink to="/login">Login</NavLink>
        </Button>

        <Button asChild>
          <NavLink to="/register">Register</NavLink>
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

            <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <p>{user?.fullName}</p>

          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <NavLink to="/profile">Profile</NavLink>
        </DropdownMenuItem>

        {user?.role === "Customer" && (
          <>
            <DropdownMenuItem asChild>
              <NavLink to="/my-bookings">My Bookings</NavLink>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </DropdownMenuItem>
          </>
        )}

        {user?.role === "owner" && (
          <>
            <DropdownMenuItem asChild>
              <NavLink to="/owner">Dashboard</NavLink>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <NavLink to="/owner/hotels">My Hotels</NavLink>
            </DropdownMenuItem>
          </>
        )}

        {user?.role === "admin" && (
          <DropdownMenuItem asChild>
            <NavLink to="/admin">Dashboard</NavLink>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <button
            type="button"
            // role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
