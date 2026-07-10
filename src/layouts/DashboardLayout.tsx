import Header from "@/components/dashboard/layout/Header";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { sidebarItems } from "@/constants/sidebarItems";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useAuth();
  const items = user?.role ? (sidebarItems[user.role as keyof typeof sidebarItems] ?? []) : [];;

  return (
    <SidebarProvider>
      <Sidebar items={items} />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
