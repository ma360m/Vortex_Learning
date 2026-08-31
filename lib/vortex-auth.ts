export type VortexRole = "student" | "parent" | "instructor" | "admin" | "developer";

export type VortexProfile = {
  id?: string;
  name: string;
  email: string;
  role: VortexRole;
  phone?: string;
  avatarUrl?: string;
};

export const roleLabels: Record<VortexRole, string> = {
  student: "Student LMS",
  parent: "Parent Portal",
  instructor: "Instructor LMS",
  admin: "Admin Console",
  developer: "Developer Panel",
};

export function dashboardForRole(role: VortexRole) {
  const dashboards: Record<VortexRole, string> = {
    student: "/dashboard/student",
    parent: "/dashboard/parent",
    instructor: "/dashboard/instructor",
    admin: "/dashboard/admin",
    developer: "/developer",
  };

  return dashboards[role];
}

export function roleFromPath(path: string): VortexRole | null {
  if (path.startsWith("/dashboard/student")) return "student";
  if (path.startsWith("/dashboard/parent")) return "parent";
  if (path.startsWith("/dashboard/instructor")) return "instructor";
  if (path.startsWith("/dashboard/admin")) return "admin";
  if (path.startsWith("/developer")) return "developer";
  return null;
}

export function canAccessPath(role: VortexRole, path: string) {
  const requiredRole = roleFromPath(path);
  return !requiredRole || requiredRole === role;
}
