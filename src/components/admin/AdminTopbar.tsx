import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOutAdmin } from "../../services/auth";

export function AdminTopbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOutAdmin();
    navigate("/admin/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
      <p className="font-bold text-slate-950">Panel Panitia</p>
      <button
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold"
        onClick={() => void handleLogout()}
      >
        <LogOut size={16} /> Logout
      </button>
    </header>
  );
}
