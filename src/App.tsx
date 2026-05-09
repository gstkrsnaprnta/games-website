import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminAnnouncementsPage } from "./pages/admin/AdminAnnouncementsPage";
import { AdminCompetitionsPage } from "./pages/admin/AdminCompetitionsPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminEventsPage } from "./pages/admin/AdminEventsPage";
import { AdminFaqsPage } from "./pages/admin/AdminFaqsPage";
import { AdminGalleriesPage } from "./pages/admin/AdminGalleriesPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminPlaceholderPage } from "./pages/admin/AdminPlaceholderPage";
import { AdminRegistrationDetailPage } from "./pages/admin/AdminRegistrationDetailPage";
import { AdminRegistrationsPage } from "./pages/admin/AdminRegistrationsPage";
import { AdminSponsorsPage } from "./pages/admin/AdminSponsorsPage";
import { AdminTimelinesPage } from "./pages/admin/AdminTimelinesPage";
import { AnnouncementDetailPage } from "./pages/public/AnnouncementDetailPage";
import { AnnouncementsPage } from "./pages/public/AnnouncementsPage";
import { CheckStatusPage } from "./pages/public/CheckStatusPage";
import { CompetitionDetailPage } from "./pages/public/CompetitionDetailPage";
import { CompetitionsPage } from "./pages/public/CompetitionsPage";
import { ContactPage } from "./pages/public/ContactPage";
import { FAQPage } from "./pages/public/FAQPage";
import { HomePage } from "./pages/public/HomePage";
import { PublicLayout } from "./pages/public/PublicLayout";
import { RegisterPage } from "./pages/public/RegisterPage";
import { TimelinePage } from "./pages/public/TimelinePage";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/lomba", element: <CompetitionsPage /> },
      { path: "/lomba/:slug", element: <CompetitionDetailPage /> },
      { path: "/timeline", element: <TimelinePage /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/pengumuman", element: <AnnouncementsPage /> },
      { path: "/pengumuman/:slug", element: <AnnouncementDetailPage /> },
      { path: "/daftar", element: <RegisterPage /> },
      { path: "/cek-status", element: <CheckStatusPage /> },
      { path: "/kontak", element: <ContactPage /> },
    ],
  },
  { path: "/admin/login", element: <AdminLoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "events", element: <AdminEventsPage /> },
          { path: "competitions", element: <AdminCompetitionsPage /> },
          { path: "timelines", element: <AdminTimelinesPage /> },
          { path: "faqs", element: <AdminFaqsPage /> },
          { path: "announcements", element: <AdminAnnouncementsPage /> },
          { path: "registrations", element: <AdminRegistrationsPage /> },
          { path: "registrations/:id", element: <AdminRegistrationDetailPage /> },
          { path: "sponsors", element: <AdminSponsorsPage /> },
          { path: "galleries", element: <AdminGalleriesPage /> },
          { path: "settings", element: <AdminPlaceholderPage title="Pengaturan" /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
