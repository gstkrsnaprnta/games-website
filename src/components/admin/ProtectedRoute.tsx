import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentAdminProfile, getCurrentSession, signOutAdmin } from "../../services/auth";

export function ProtectedRoute() {
  const [status, setStatus] = useState<"loading" | "anonymous" | "allowed" | "denied">("loading");

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      const { data: sessionResult } = await getCurrentSession();
      const session = sessionResult.session;

      if (!session) {
        if (isMounted) setStatus("anonymous");
        return;
      }

      const { data: profile, error } = await getCurrentAdminProfile(session);
      if (error || !profile) {
        await signOutAdmin();
        if (isMounted) setStatus("denied");
        return;
      }

      if (isMounted) setStatus("allowed");
    }

    void checkAccess();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-600">Memeriksa akses admin...</div>;
  }

  if (status === "anonymous") {
    return <Navigate to="/admin/login" replace />;
  }

  if (status === "denied") {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-100 px-4">
        <div className="max-w-md rounded-lg border border-rose-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-black text-slate-950">Akses ditolak</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Akun ini belum terdaftar sebagai admin aktif di tabel profiles.
          </p>
        </div>
      </main>
    );
  }

  return <Outlet />;
}
