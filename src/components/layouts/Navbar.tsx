// components/layout/Navbar/Navbar.tsx

import Notification from "../common/Notification";
import DesktopNav from "./navbar/DesktopNav";
import Logo from "./navbar/Logo";
import MobileNav from "./navbar/MobileNav";
import UserMenu from "./navbar/UserMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/65">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-4 md:gap-8">
          <Logo />

          <DesktopNav />
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Notification />
          <div className="hidden sm:block">
            <UserMenu />
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
