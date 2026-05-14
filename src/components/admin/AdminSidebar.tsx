import { CalendarDays, CreditCard, FileImage, FileText, Handshake, HelpCircle, LayoutDashboard, Megaphone, Trophy, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
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

export function AdminSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white p-4 lg:block">
      <div className="px-3 py-2 text-lg font-black text-slate-950">Admin GAMES</div>
      <nav className="mt-6 grid gap-1">
        {links.map(([label, to, Icon]) => (
          <NavLink
            key={to as string}
            to={to as string}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold ${
                isActive ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <Icon size={18} />
            {label as string}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
