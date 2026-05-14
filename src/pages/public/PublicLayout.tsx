import { Outlet } from "react-router-dom";
import { Footer } from "../../components/public/Footer";
import { Navbar } from "../../components/public/Navbar";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
