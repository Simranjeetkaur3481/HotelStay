import { LogOut, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants/constant";
import useAuth from "@/hooks/useAuth";
import { Roles, getDashboardPathForRole } from "@/constants/roles";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/slices/authSlice";

export default function MobileNav() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-xl border border-border/70 bg-card/80 shadow-sm">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 border-r border-border/70 bg-background/95 backdrop-blur-lg pt-5">
          <div className="grid space-y-5 px-6">
            <Logo />

            <nav>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          cn(
                            "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-border/70 pt-1.5">
              {!user ? (
                <>
                  <SheetClose asChild>
                    <NavLink to="/login" className="block rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-muted">
                      Login
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink to="/register" className="block rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-muted">
                      Create Account
                    </NavLink>
                  </SheetClose>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <NavLink
                      to={getDashboardPathForRole(user.role)}
                      className="block rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-muted"
                    >
                      Dashboard
                    </NavLink>
                  </SheetClose>
                  {user.role === Roles.Customer && (
                    <SheetClose asChild>
                      <NavLink
                        to="/customer/bookings"
                        className="block rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-muted"
                      >
                        My Bookings
                      </NavLink>
                    </SheetClose>
                  )}
                  <SheetClose asChild>
                    <button
                      type="button"
                      onClick={() => dispatch(logOut())}
                      className="flex items-center  w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </SheetClose>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
