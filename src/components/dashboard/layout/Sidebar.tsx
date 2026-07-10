import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/slices/authSlice";
import useAuth from "@/hooks/useAuth";
import { API_BASE_URL } from "@/constants/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SidebarItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

const DashBoardSidebar = ({ items }: { items: SidebarItem[] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  const handleGoOnHome = () => navigate("/");
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader>
        <Link to="/">
          <div className="flex items-center gap-3 px-3 py-3 group-data-[collapsible=icon]:justify-center">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
              HS
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="font-bold text-base leading-none">HotelStay</p>
              <p className="text-xs text-muted-foreground mt-0.5">Enterprise Portal</p>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url + "/"));
              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="group-data-[collapsible=icon]:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-muted transition-colors">
                <Avatar className="size-9">
                  <AvatarImage src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user?.fullName?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-sm font-medium truncate">{user?.fullName}</span>
                  <span className="text-xs text-muted-foreground capitalize truncate">
                    {user?.role?.replace("_", " ").toLowerCase()}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="top" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleGoOnHome}>
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashBoardSidebar;
