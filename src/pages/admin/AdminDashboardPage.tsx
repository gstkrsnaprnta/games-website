import { useEffect, useState } from "react";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { supabase } from "../../lib/supabase";

type DashboardStats = {
  competitions: number;
  announcements: number;
  registrations: number;
  pendingRegistrations: number;
};

export function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      setLoading(true);
      const [competitions, announcements, registrations, pendingRegistrations] =
        await Promise.all([
          supabase
            .from("competitions")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("announcements")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("registrations")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("registrations")
            .select("id", { count: "exact", head: true })
            .eq("registration_status", "pending"),
        ]);

      const firstError = [
        competitions.error,
        announcements.error,
        registrations.error,
        pendingRegistrations.error,
      ].find(Boolean);

      if (!isMounted) return;
      setLoading(false);

      if (firstError) {
        setError(firstError.message);
        return;
      }

      setStats({
        competitions: competitions.count ?? 0,
        announcements: announcements.count ?? 0,
        registrations: registrations.count ?? 0,
        pendingRegistrations: pendingRegistrations.count ?? 0,
      });
    }

    void loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Dashboard</h1>
      <div className="mt-6">
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <StatCard label="Total lomba" value={stats?.competitions ?? 0} />
        <StatCard label="Total pengumuman" value={stats?.announcements ?? 0} />
        <StatCard label="Total peserta" value={stats?.registrations ?? 0} />
        <StatCard
          label="Peserta pending"
          value={stats?.pendingRegistrations ?? 0}
        />
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}
