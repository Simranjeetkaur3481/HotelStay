// components/layout/Navbar/Navbar.tsx

import DesktopNav from "./navbar/DesktopNav";
import Logo from "./navbar/Logo";
import MobileNav from "./navbar/MobileNav";
import UserMenu from "./navbar/UserMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Logo />

          <DesktopNav />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <UserMenu />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
