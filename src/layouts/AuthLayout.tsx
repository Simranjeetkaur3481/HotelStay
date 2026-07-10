import AuthHero from "@/components/auth/AuthHero";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Outlet, useMatches } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const hero = current?.handle?.hero;
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm lg:grid lg:grid-cols-2">
        <AuthHero {...hero} />
        <div className="relative flex items-center justify-center p-4 sm:p-8">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full border border-border/70 bg-background/80"
            onClick={() => navigate("/")}
            aria-label="Close auth screen"
          >
            <X className="size-4" />
          </Button>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
