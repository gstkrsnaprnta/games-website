import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CSVExportButton } from "../../components/admin/CSVExportButton";
import { DataTable } from "../../components/admin/DataTable";
import { FormSelect } from "../../components/admin/FormSelect";
import { SearchInput } from "../../components/admin/SearchInput";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { getAdminCompetitions } from "../../services/adminCompetitions";
import {
  deleteAdminRegistration,
  getAdminRegistrations,
} from "../../services/adminRegistrations";
import { toCsv } from "../../utils/csv";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, TableCellMuted } from "./adminPageUtils";

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

type DeleteModalProps = {
  isOpen: boolean;
  registrationCode: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteModal({
  isOpen,
  registrationCode,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.15s ease-out" }}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 text-center"
        style={{ animation: "scaleUp 0.2s ease-out" }}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="h-7 w-7 text-rose-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h2 className="text-base font-black text-slate-950">Hapus Peserta?</h2>
        <p className="mt-2 text-sm text-slate-500">
          Data pendaftaran{" "}
          <span className="font-bold text-slate-700">{registrationCode}</span>{" "}
          akan dihapus secara permanen dan tidak dapat dikembalikan.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 active:bg-rose-800"
          >
            Ya, Hapus
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminRegistrationsPage() {
  const { data, error, loading, reload } = useAsyncData(
    getAdminRegistrations,
    [],
  );
  const competitions = useAsyncData(getAdminCompetitions, []);

  const [search, setSearch] = useState("");
  const [competitionFilter, setCompetitionFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [submissionFilter, setSubmissionFilter] = useState("");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    code: string;
  } | null>(null);
  const [deleteError, setDeleteError] = useState("");

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

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleteError("");
    const { error: err } = await deleteAdminRegistration(deleteTarget.id);
    if (err) {
      setDeleteError(err.message);
      setDeleteTarget(null);
      return;
    }
    setDeleteTarget(null);
    reload();
  }

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

      {/* Delete error banner */}
      {deleteError && (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          Gagal menghapus peserta: {deleteError}
        </div>
      )}

      {/* ── Search + Filter ── */}
      <div className="mt-5 space-y-3">
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
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to={`/admin/registrations/${registration.id}`}
                    className="text-sm font-bold text-cyan-700 hover:underline"
                  >
                    {registration.registration_code}
                  </Link>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-400">
                      {formatDate(registration.created_at)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          id: registration.id,
                          code: registration.registration_code,
                        })
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Hapus pendaftaran"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="mt-1.5 font-semibold text-slate-900">
                  {registration.team_name || registration.leader_name}
                </p>
                <p className="text-xs text-slate-500">{registration.email}</p>
                <p className="text-xs text-slate-500">
                  {registration.whatsapp}
                </p>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                  {registration.competitions && (
                    <span>
                      🏆 {registration.competitions.name} (
                      {registration.competitions.code})
                    </span>
                  )}
                  <span>🏫 {registration.institution}</span>
                </div>

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
              <table className="w-full min-w-[1020px] text-left text-sm">
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
                    <th className="p-3">Aksi</th>
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
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({
                              id: registration.id,
                              code: registration.registration_code,
                            })
                          }
                          className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
                        >
                          Hapus
                        </button>
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

      {/* ── Delete Modal ── */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        registrationCode={deleteTarget?.code ?? ""}
        onConfirm={() => void confirmDelete()}
        onCancel={() => {
          setDeleteTarget(null);
          setDeleteError("");
        }}
      />
    </section>
  );
}
