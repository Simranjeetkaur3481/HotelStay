import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";

import Notification from "@/components/common/Notification";
import { API_BASE_URL } from "@/constants/api";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="-ml-1" />

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search bookings, hotels..." className="h-9 rounded-xl border-muted bg-muted/40 pl-9" />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Notification />

        <div className="hidden items-center gap-3 rounded-xl border bg-muted/30 px-3 py-1.5 sm:flex">
          <Avatar className="size-8">
            <AvatarImage src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {user?.fullName?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium leading-none">{user?.fullName}</p>
            <p className="mt-0.5 text-xs capitalize text-muted-foreground">
              {user?.role?.replace("_", " ").toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
