import { authRoutes } from "./AuthRoutes";
import { publicRoutes } from "./PublicRoutes";

export const routes = [...publicRoutes, ...authRoutes];
