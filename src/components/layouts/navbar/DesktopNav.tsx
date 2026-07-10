import { NavLink } from "react-router-dom";
import { navLinks } from "@/constants/constant";

export default function DesktopNav() {
  return (
    <div className="hidden lg:flex">
      <ul className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-0 py-1 shadow-sm">
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                [
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
