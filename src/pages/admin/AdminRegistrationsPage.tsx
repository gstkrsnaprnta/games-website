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
  const [filtersOpen, setFiltersOpen] = useState(false);
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
      const matchesCompetition = competitionFilter
        ? registration.competition_id === competitionFilter
        : true;
      const matchesPayment = paymentFilter
        ? registration.payment_status === paymentFilter
        : true;
      const matchesSubmission = submissionFilter
        ? registration.submission_status === submissionFilter
        : true;
      return (
        matchesSearch &&
        matchesCompetition &&
        matchesPayment &&
        matchesSubmission
      );
    });
  }, [competitionFilter, data, paymentFilter, search, submissionFilter]);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const visibleRows = rows.slice((page - 1) * pageSize, page * pageSize);

  const activeFilterCount = [
    competitionFilter,
    paymentFilter,
    submissionFilter,
  ].filter(Boolean).length;

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
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 sm:text-2xl">
            Peserta
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Daftar peserta yang masuk dari form pendaftaran.
          </p>
        </div>
        <CSVExportButton filename="registrations-games.csv" csv={csv} />
      </div>

      {/* ── Search + Filter ── */}
      <div className="mt-5 space-y-3">
        {/* Search + toggle filter button (mobile) */}
        <div className="flex gap-2">
          <div className="flex-1">
            <SearchInput
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari kode, nama, email, instansi..."
            />
          </div>
          {/* Filter toggle — mobile only */}
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="relative flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V17a1 1 0 01-.553.894l-4-2A1 1 0 018 15v-4.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Filter
            {activeFilterCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-600 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter selects — always visible on desktop, collapsible on mobile */}
        <div
          className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-3 sm:flex sm:flex-row sm:flex-wrap sm:items-end`}
        >
          <FormSelect
            label="Lomba"
            value={competitionFilter}
            onChange={(event) => {
              setCompetitionFilter(event.target.value);
              setPage(1);
            }}
            options={[
              { label: "Semua lomba", value: "" },
              ...(competitions.data?.map((competition) => ({
                label: competition.name,
                value: competition.id,
              })) ?? []),
            ]}
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
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setCompetitionFilter("");
                setPaymentFilter("");
                setSubmissionFilter("");
                setPage(1);
              }}
              className="text-sm font-semibold text-rose-600 hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!rows.length}
        emptyDescription={
          search
            ? "Data peserta tidak cocok dengan pencarian."
            : "Belum ada peserta terdaftar."
        }
      />

      {visibleRows.length > 0 && (
        <>
          {/* ── Mobile: card list ── */}
          <div className="mt-4 grid gap-3 sm:hidden">
            {visibleRows.map((registration) => (
              <div
                key={registration.id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                {/* Top row: kode + tanggal */}
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to={`/admin/registrations/${registration.id}`}
                    className="text-sm font-bold text-cyan-700 hover:underline"
                  >
                    {registration.registration_code}
                  </Link>
                  <span className="shrink-0 text-xs text-slate-400">
                    {formatDate(registration.created_at)}
                  </span>
                </div>

                {/* Nama + email */}
                <p className="mt-1.5 font-semibold text-slate-900">
                  {registration.team_name || registration.leader_name}
                </p>
                <p className="text-xs text-slate-500">{registration.email}</p>
                <p className="text-xs text-slate-500">
                  {registration.whatsapp}
                </p>

                {/* Lomba + instansi */}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                  {registration.competitions && (
                    <span>
                      🏆 {registration.competitions.name} (
                      {registration.competitions.code})
                    </span>
                  )}
                  <span>🏫 {registration.institution}</span>
                </div>

                {/* Status badges */}
                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold text-slate-400">
                      Pendaftaran
                    </span>
                    <StatusBadge status={registration.registration_status} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold text-slate-400">
                      Pembayaran
                    </span>
                    <StatusBadge status={registration.payment_status} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold text-slate-400">
                      Berkas
                    </span>
                    <StatusBadge status={registration.submission_status} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop: table ── */}
          <div className="mt-4 hidden sm:block">
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
                    <tr
                      key={registration.id}
                      className="border-t border-slate-100"
                    >
                      <td className="p-3 font-bold text-cyan-700">
                        <Link to={`/admin/registrations/${registration.id}`}>
                          {registration.registration_code}
                        </Link>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-slate-900">
                          {registration.team_name || registration.leader_name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {registration.email} / {registration.whatsapp}
                        </p>
                      </td>
                      <td className="p-3">
                        {registration.competitions ? (
                          `${registration.competitions.name} (${registration.competitions.code})`
                        ) : (
                          <TableCellMuted>-</TableCellMuted>
                        )}
                      </td>
                      <td className="p-3">{registration.institution}</td>
                      <td className="p-3">
                        <StatusBadge
                          status={registration.registration_status}
                        />
                      </td>
                      <td className="p-3">
                        <StatusBadge status={registration.payment_status} />
                      </td>
                      <td className="p-3">
                        <StatusBadge status={registration.submission_status} />
                      </td>
                      <td className="p-3">
                        {formatDate(registration.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTable>
          </div>
        </>
      )}

      {/* ── Pagination ── */}
      {rows.length > 0 && (
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
              ←
            </button>
            <span className="font-semibold">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
