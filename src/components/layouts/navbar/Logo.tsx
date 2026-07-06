
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink
      to="/"
      className="flex items-center gap-2 font-bold text-xl"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        H
      </span>

      <span className="hidden sm:block">
        HotelHub
      </span>
    </NavLink>
  );
}