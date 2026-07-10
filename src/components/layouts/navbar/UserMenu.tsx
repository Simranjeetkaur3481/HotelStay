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
import { BookIcon, Hotel, LayoutDashboard, LogOut, Save, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/slices/authSlice";
import { Roles, getDashboardPathForRole } from "@/constants/roles";
import { API_BASE_URL } from "@/constants/api";
import { useGetProfileQuery } from "@/store/api/profileApi";

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { data } = useGetProfileQuery(user?.id, {
    skip: !user || !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });
  const userProfile = data?.data ?? {};

  const handleLogout = () => {
    dispatch(logOut());
  };

  if (!user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
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
            <AvatarImage src={userProfile?.avatarUrl ? `${API_BASE_URL}${userProfile.avatarUrl}` : undefined} />
            <AvatarFallback>{userProfile?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <p className="font-bold">{userProfile?.fullName}</p>
          <p className="text-xs text-muted-foreground">{userProfile?.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <NavLink to="/customer/profile" className="flex items-center">
            <User className="h-4 w-4 shrink-0" /> Profile
          </NavLink>
        </DropdownMenuItem>

        {userProfile?.role === Roles.Customer && (
          <>
            <DropdownMenuItem asChild>
              <NavLink to="/customer/bookings" className="flex items-center">
                <BookIcon /> My Bookings
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink to="/customer/wishlist" className="flex items-center">
                <Save /> Wishlist
              </NavLink>
            </DropdownMenuItem>
          </>
        )}

        {userProfile?.role === Roles.HotelOwner && (
          <>
            <DropdownMenuItem asChild>
              <NavLink to="/dashboard/hotelOwner" className="flex items-center">
                <LayoutDashboard /> Dashboard
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink to="/hotelOwner/hotels" className="flex items-center">
                <Hotel /> My Hotels
              </NavLink>
            </DropdownMenuItem>
          </>
        )}

        {userProfile?.role === Roles.Admin && (
          <DropdownMenuItem asChild>
            <NavLink to="/admin" className="flex items-center">
              <LayoutDashboard /> Dashboard
            </NavLink>
          </DropdownMenuItem>
        )}

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem asChild>
          <NavLink to={getDashboardPathForRole(userProfile.role)} className="flex items-center">
            <LayoutDashboard className="h-4 w-4 shrink-0" /> Go to Dashboard
          </NavLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-red-700  hover:bg-muted"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
