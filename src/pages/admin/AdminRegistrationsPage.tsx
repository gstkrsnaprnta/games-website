import { useMemo, useState } from "react";
import { CSVExportButton } from "../../components/admin/CSVExportButton";
import { DataTable } from "../../components/admin/DataTable";
import { FilterBar } from "../../components/admin/FilterBar";
import { SearchInput } from "../../components/admin/SearchInput";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { getAdminRegistrations } from "../../services/adminRegistrations";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, TableCellMuted } from "./adminPageUtils";

export function AdminRegistrationsPage() {
  const { data, error, loading } = useAsyncData(getAdminRegistrations, []);
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return data ?? [];
    return (data ?? []).filter((registration) =>
      [
        registration.registration_code,
        registration.leader_name,
        registration.email,
        registration.institution,
      ].some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [data, search]);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Peserta</h1>
          <p className="mt-2 text-sm text-slate-600">Daftar peserta yang masuk dari form pendaftaran.</p>
        </div>
        <CSVExportButton />
      </div>
      <div className="mt-6">
        <FilterBar>
          <div className="w-full max-w-sm">
            <SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari kode, nama, email, instansi..."
            />
          </div>
        </FilterBar>
      </div>
      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!rows.length}
        emptyDescription={search ? "Data peserta tidak cocok dengan pencarian." : "Belum ada peserta terdaftar."}
      />
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Kode</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Lomba</th>
                <th className="p-3">Instansi</th>
                <th className="p-3">Status Pendaftaran</th>
                <th className="p-3">Status Pembayaran</th>
                <th className="p-3">Status Berkas</th>
                <th className="p-3">Tanggal Daftar</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((registration) => (
                <tr key={registration.id} className="border-t border-slate-100">
                  <td className="p-3 font-bold text-slate-950">{registration.registration_code}</td>
                  <td className="p-3">
                    <p className="font-semibold text-slate-900">{registration.team_name || registration.leader_name}</p>
                    <p className="text-xs text-slate-500">{registration.email} / {registration.whatsapp}</p>
                  </td>
                  <td className="p-3">{registration.competitions ? `${registration.competitions.name} (${registration.competitions.code})` : <TableCellMuted>-</TableCellMuted>}</td>
                  <td className="p-3">{registration.institution}</td>
                  <td className="p-3"><StatusBadge status={registration.registration_status} /></td>
                  <td className="p-3"><StatusBadge status={registration.payment_status} /></td>
                  <td className="p-3"><StatusBadge status={registration.submission_status} /></td>
                  <td className="p-3">{formatDate(registration.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
