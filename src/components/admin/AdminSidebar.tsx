import {
  CalendarDays,
  CreditCard,
  FileImage,
  FileText,
  Handshake,
  HelpCircle,
  LayoutDashboard,
  Megaphone,
  Trophy,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const links: [string, string, LucideIcon][] = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Events", "/admin/events", CalendarDays],
  ["Lomba", "/admin/competitions", Trophy],
  ["Timeline", "/admin/timelines", FileText],
  ["FAQ", "/admin/faqs", HelpCircle],
  ["Pengumuman", "/admin/announcements", Megaphone],
  ["Peserta", "/admin/registrations", Users],
  ["Pembayaran", "/admin/payment-methods", CreditCard],
  ["Sponsor", "/admin/sponsors", Handshake],
  ["Galeri", "/admin/galleries", FileImage],
];

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navContent = (
    <>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-lg font-black text-slate-950">Admin GAMES</span>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          aria-label="Tutup menu"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="mt-6 grid gap-1">
        {links.map(([label, to, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-cyan-50 text-cyan-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-4 lg:block">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Menu navigasi"
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="absolute inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white p-4 shadow-xl">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
