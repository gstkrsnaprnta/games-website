import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOutAdmin } from "../../services/auth";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOutAdmin();
    navigate("/admin/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-3">
        {/* Hamburger — hanya muncul di mobile */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          aria-label="Buka menu"
        >
          <Menu size={22} />
        </button>
        <p className="font-bold text-slate-950">Panel Panitia</p>
      </div>
      <button
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold"
        onClick={() => void handleLogout()}
      >
        <LogOut size={16} /> Logout
      </button>
    </header>
  );
}
