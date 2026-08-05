import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../../components/public/Footer";
import { Navbar } from "../../components/public/Navbar";

export function PublicLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Otomatis reset scroll ke paling atas setiap kali berpindah halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={isHome ? "public-theme-home" : "public-theme-inner"}>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className={isHome ? "flex-1" : ""}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}