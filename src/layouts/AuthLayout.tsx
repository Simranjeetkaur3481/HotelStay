import AuthHero from "@/components/auth/AuthHero";
import { Outlet, useMatches } from "react-router-dom";

const AuthLayout = () => {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const hero = current?.handle?.hero;
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <AuthHero {...hero} />
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
