import { adminRoutes } from "./AdminRoutes";
import { authRoutes } from "./AuthRoutes";
import { customerRoutes } from "./CustomerRoutes";
import { hotelOwnerRoutes } from "./HotelOwnerRoutes";
import { publicRoutes } from "./PublicRoutes";
import { CustomerRoutes } from "./CustomerRoutes";

export const routes = [...publicRoutes, ...authRoutes, ...customerRoutes, ...hotelOwnerRoutes, ...adminRoutes];
