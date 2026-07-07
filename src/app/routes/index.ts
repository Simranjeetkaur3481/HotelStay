import { authRoutes } from "./AuthRoutes";
import { publicRoutes } from "./PublicRoutes";
import { CustomerRoutes } from "./CustomerRoutes";

export const routes = [...publicRoutes, ...authRoutes,...CustomerRoutes];
