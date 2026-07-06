type Role = "ADMIN" | "HOTEL_OWNER" | "CUSTOMER" | "SUPPORT";
// const roleMap: Record<string, Role> = {
//   ADMIN: "ADMIN",
//   HOTEL_OWNER: "HOTEL_OWNER",
//   CUSTOMER: "CUSTOMER",
//   SUPPORT: "SUPPORT",
// };

// export function normalizeRole(role: string): Role {
//   const normalized = role.trim().toUpperCase().replace(/\s+/g, "_");
//   return roleMap[normalized] ?? "CUSTOMER";
// }
export const ROLE_DASHBOARD_PATHS: Record<Role, string> = {
  ADMIN: "/admin",
  HOTEL_OWNER: "/hotelOwner",
  CUSTOMER: "/customer",
  SUPPORT: "/support",
};

export function getDashboardPathForRole(role: Role): string {
  return ROLE_DASHBOARD_PATHS[role];
}