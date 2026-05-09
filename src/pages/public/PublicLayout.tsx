import { Outlet } from "react-router-dom";
import { Footer } from "../../components/public/Footer";
import { Navbar } from "../../components/public/Navbar";

export function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
