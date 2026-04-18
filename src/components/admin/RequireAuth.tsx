import { Navigate, useLocation } from "react-router-dom";

export const ADMIN_AUTH_KEY = "aurum_admin_auth";
export const ADMIN_PASSWORD = "admin123"; // demo only

export function isAdminAuthed() {
  return localStorage.getItem(ADMIN_AUTH_KEY) === "1";
}

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
