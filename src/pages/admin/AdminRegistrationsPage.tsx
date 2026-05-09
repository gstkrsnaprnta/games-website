import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CSVExportButton } from "../../components/admin/CSVExportButton";
import { DataTable } from "../../components/admin/DataTable";
import { FilterBar } from "../../components/admin/FilterBar";
import { FormSelect } from "../../components/admin/FormSelect";
import { SearchInput } from "../../components/admin/SearchInput";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { getAdminCompetitions } from "../../services/adminCompetitions";
import { getAdminRegistrations } from "../../services/adminRegistrations";
import { toCsv } from "../../utils/csv";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, TableCellMuted } from "./adminPageUtils";

export function AdminRegistrationsPage() {
  const { data, error, loading } = useAsyncData(getAdminRegistrations, []);
  const competitions = useAsyncData(getAdminCompetitions, []);
  const [search, setSearch] = useState("");
  const [competitionFilter, setCompetitionFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [submissionFilter, setSubmissionFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const rows = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return (data ?? []).filter((registration) => {
      const matchesSearch = normalized
        ? [
            registration.registration_code,
            registration.leader_name,
            registration.email,
            registration.institution,
          ].some((value) => value.toLowerCase().includes(normalized))
        : true;
      const matchesCompetition = competitionFilter ? registration.competition_id === competitionFilter : true;
      const matchesPayment = paymentFilter ? registration.payment_status === paymentFilter : true;
      const matchesSubmission = submissionFilter ? registration.submission_status === submissionFilter : true;
      return matchesSearch && matchesCompetition && matchesPayment && matchesSubmission;
    });
  }, [competitionFilter, data, paymentFilter, search, submissionFilter]);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const visibleRows = rows.slice((page - 1) * pageSize, page * pageSize);

  const csv = useMemo(
    () =>
      toCsv(
        rows.map((registration) => ({
          kode: registration.registration_code,
          nama: registration.team_name || registration.leader_name,
          ketua: registration.leader_name,
          email: registration.email,
          whatsapp: registration.whatsapp,
          instansi: registration.institution,
          jenjang: registration.level,
          lomba: registration.competitions?.name,
          kode_lomba: registration.competitions?.code,
          status_pendaftaran: registration.registration_status,
          status_pembayaran: registration.payment_status,
          status_berkas: registration.submission_status,
          catatan_admin: registration.admin_note,
          tanggal_daftar: registration.created_at,
        })),
      ),
    [rows],
  );

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Peserta</h1>
          <p className="mt-2 text-sm text-slate-600">Daftar peserta yang masuk dari form pendaftaran.</p>
        </div>
        <CSVExportButton filename="registrations-games.csv" csv={csv} />
      </div>
      <div className="mt-6">
        <FilterBar>
          <div className="w-full max-w-sm">
            <SearchInput
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari kode, nama, email, instansi..."
            />
          </div>
          <FormSelect
            label="Lomba"
            value={competitionFilter}
            onChange={(event) => {
              setCompetitionFilter(event.target.value);
              setPage(1);
            }}
            options={[{ label: "Semua lomba", value: "" }, ...(competitions.data?.map((competition) => ({ label: competition.name, value: competition.id })) ?? [])]}
          />
          <FormSelect
            label="Pembayaran"
            value={paymentFilter}
            onChange={(event) => {
              setPaymentFilter(event.target.value);
              setPage(1);
            }}
            options={[
              { label: "Semua pembayaran", value: "" },
              { label: "Belum Bayar", value: "unpaid" },
              { label: "Menunggu", value: "pending" },
              { label: "Valid", value: "valid" },
              { label: "Ditolak", value: "rejected" },
              { label: "Perlu Revisi", value: "revision_required" },
            ]}
          />
          <FormSelect
            label="Berkas"
            value={submissionFilter}
            onChange={(event) => {
              setSubmissionFilter(event.target.value);
              setPage(1);
            }}
            options={[
              { label: "Semua berkas", value: "" },
              { label: "Tidak Diperlukan", value: "not_required" },
              { label: "Belum Dikirim", value: "not_submitted" },
              { label: "Menunggu", value: "pending" },
              { label: "Valid", value: "valid" },
              { label: "Ditolak", value: "rejected" },
              { label: "Perlu Revisi", value: "revision_required" },
            ]}
          />
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
              {visibleRows.map((registration) => (
                <tr key={registration.id} className="border-t border-slate-100">
                  <td className="p-3 font-bold text-cyan-700">
                    <Link to={`/admin/registrations/${registration.id}`}>{registration.registration_code}</Link>
                  </td>
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
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p>
          Menampilkan {visibleRows.length} dari {rows.length} peserta
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-lg border border-slate-300 px-3 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <span className="font-semibold">Halaman {page} / {totalPages}</span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded-lg border border-slate-300 px-3 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </section>
  );
}
