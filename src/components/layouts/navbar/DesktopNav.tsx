import { NavLink } from "react-router-dom";
import { navLinks } from "@/constants/constant";

export default function DesktopNav() {
  return (
    <div className="hidden lg:flex">
      <ul className="flex items-center gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
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
