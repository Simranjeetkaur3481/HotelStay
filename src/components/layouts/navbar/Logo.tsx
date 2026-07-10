import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-sky-400 text-primary-foreground shadow-sm sm:h-10 sm:w-10">
        H
      </span>

      <span className="sm:block tracking-tight sm:text-xl">HotelHub</span>
    </NavLink>
  );
}
