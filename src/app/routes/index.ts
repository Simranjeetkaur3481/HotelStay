import { adminRoutes } from "./AdminRoutes";
import { authRoutes } from "./AuthRoutes";
import { customerRoutes } from "./CustomerRoutes";
import { hotelOwnerRoutes } from "./HotelOwnerRoutes";
import { publicRoutes } from "./PublicRoutes";

export const routes = [...publicRoutes, ...authRoutes, ...customerRoutes, ...hotelOwnerRoutes, ...adminRoutes];
