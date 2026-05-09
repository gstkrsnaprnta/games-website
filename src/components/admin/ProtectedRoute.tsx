import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const hasEnv = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  if (!hasEnv) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
