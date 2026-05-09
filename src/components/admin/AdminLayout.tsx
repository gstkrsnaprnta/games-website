import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminTopbar />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
