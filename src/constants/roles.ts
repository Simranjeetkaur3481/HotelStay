export const Roles = {
  Admin: "ADMIN",
  HotelOwner: "HOTEL_OWNER",
  Customer: "CUSTOMER",
  Support: "SUPPORT",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const ROLE_DASHBOARD_PATHS: Record<Role, string> = {
  ADMIN: "/admin",
  HOTEL_OWNER: "/dashboard/hotelOwner",
  CUSTOMER: "/customer",
  SUPPORT: "/support",
};

export function getDashboardPathForRole(role: Role): string {
  return ROLE_DASHBOARD_PATHS[role];
}
export function normalizeRole(role: string): Role {
  const normalized = role.trim().replace(/\s+/g, "_").toUpperCase() as Role;

  if (normalized in ROLE_DASHBOARD_PATHS) {
    return normalized;
  }

  throw new Error(`Unknown role: ${role}`);
}
export function normalizeUser<T extends { role: string }>(
  user: T
): Omit<T, "role"> & { role: Role } {
  return {
    ...user,
    role: normalizeRole(user.role),
  };
}