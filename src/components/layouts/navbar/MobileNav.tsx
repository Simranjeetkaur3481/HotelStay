
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants/constant";

export default function MobileNav() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72">
          <div className="space-y-8">

            <Logo />

            <nav>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}