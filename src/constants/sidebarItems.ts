import { customerSidebar } from "@/config/customerSidebar";
import { Roles } from "./roles";
import { ownerSidebarItems } from "@/config/hotelOwnerSidebar";
import { adminSidebar } from "@/config/adminSidebar";

export const sidebarItems = {
  [Roles.Customer]: customerSidebar,
  [Roles.HotelOwner]: ownerSidebarItems,
  [Roles.Admin]: adminSidebar,
};