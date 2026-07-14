// FILE: src/pages/admin/AdminCompetitionsPage.tsx
import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import {
  deleteAdminCompetition,
  getAdminCompetitions,
  saveAdminCompetition,
} from "../../services/adminCompetitions";
import { replaceAdminCompetitionStages } from "../../services/admincompetitionstages";
import { replaceAdminCompetitionMechanisms } from "../../services/adminCompetitionMechanisms";
import { replaceAdminTimelines } from "../../services/adminTimelines";
import type { Competition } from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimelineForm = {
  id?: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
};

// Tahapan Kompetisi (mis. Pendaftaran → Verifikasi → Pelaksanaan → Pengumuman),
// tampil di section "Tahapan Kompetisi" halaman detail lomba.
type StageForm = {
  id?: string;
  title: string;
  description: string;
};

const emptyStageItem: StageForm = {
  title: "",
  description: "",
};

// Mekanisme Lomba (mis. Sistem Pelaksanaan Ujian, Sistem Penilaian),
// tampil di section "Mekanisme Lomba" halaman detail lomba.
type MechanismForm = {
  id?: string;
  title: string;
  items: string; // newline-separated string
};

const emptyMechanismItem: MechanismForm = {
  title: "",
  items: "",
};

// Representasi form untuk satu kontak WhatsApp CP.
// `level` "" = berlaku untuk semua jenjang (dipakai sebagai fallback).
type ContactForm = {
  level: string;
  name: string;
  phone: string;
};

type CompetitionForm = {
  id?: string;
  name: string;
  code: string;
  participant_levels: string;
  registration_status: "open" | "closed";
  is_active: boolean;
  registration_fee: string;
  competition_type: "individual" | "team";
  min_members: string;
  max_members: string;
  whatsapp_contacts: ContactForm[];
  short_description: string;
  description: string;
  max_teams_per_school: string;
  total_quota: string;
  has_work_submission: boolean;
  main_theme: string;
  subthemes: string;
  timelines: TimelineForm[];
  stages: StageForm[];
  mechanisms: MechanismForm[];
};

const emptyTimelineItem: TimelineForm = {
  title: "",
  description: "",
  start_date: "",
  end_date: "",
};

const emptyContactItem: ContactForm = {
  level: "",
  name: "",
  phone: "",
};

const CONTACT_LEVEL_OPTIONS = [
  { label: "Semua jenjang (default)", value: "" },
  { label: "SD/sederajat", value: "SD" },
  { label: "SMP/sederajat", value: "SMP" },
  { label: "SMA/sederajat", value: "SMA" },
  { label: "Mahasiswa", value: "Mahasiswa" },
];

const emptyForm: CompetitionForm = {
  name: "",
  code: "",
  participant_levels: "",
  registration_status: "closed",
  is_active: true,
  registration_fee: "0",
  competition_type: "individual",
  min_members: "1",
  max_members: "1",
  whatsapp_contacts: [],
  short_description: "",
  description: "",
  max_teams_per_school: "",
  total_quota: "",
  has_work_submission: false,
  main_theme: "",
  subthemes: "",
  timelines: [],
  stages: [],
  mechanisms: [],
};

// ─── Contact Editor (Kontak WhatsApp CP per jenjang) ──────────────────────────

type ContactEditorProps = {
  contacts: ContactForm[];
  onChange: (contacts: ContactForm[]) => void;
};

function ContactEditor({ contacts, onChange }: ContactEditorProps) {
  function addItem() {
    onChange([...contacts, { ...emptyContactItem }]);
  }
  function removeItem(index: number) {
    onChange(contacts.filter((_, i) => i !== index));
  }
  function updateItem(index: number, patch: Partial<ContactForm>) {
    onChange(
      contacts.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }

  return (
    <div className="md:col-span-2 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-slate-800">
            Kontak WhatsApp CP
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Tujuan tombol "Konfirmasi via WhatsApp" di halaman sukses peserta.
            Bisa beda nomor per jenjang, atau satu nomor untuk semua jenjang
            lewat opsi "Semua jenjang (default)".
          </p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-50 border border-cyan-200 px-3 py-1.5 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100 shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Kontak
        </button>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-4 py-6 text-center">
          <p className="text-xs font-semibold text-slate-400">
            Belum ada kontak CP. Tanpa kontak, tombol WhatsApp di halaman sukses
            peserta tidak akan muncul.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Jenjang
                  </label>
                  <select
                    value={item.level}
                    onChange={(e) =>
                      updateItem(index, { level: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  >
                    {CONTACT_LEVEL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Nama CP{" "}
                    <span className="font-normal text-slate-400">
                      (opsional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="cth. Mila"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(index, { name: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-300 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Nomor WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0822-9628-7360"
                    value={item.phone}
                    onChange={(e) =>
                      updateItem(index, { phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-300 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-200 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Timeline Editor ──────────────────────────────────────────────────────────

type TimelineEditorProps = {
  timelines: TimelineForm[];
  onChange: (timelines: TimelineForm[]) => void;
};

function TimelineEditor({ timelines, onChange }: TimelineEditorProps) {
  function addItem() {
    onChange([...timelines, { ...emptyTimelineItem }]);
  }
  function removeItem(index: number) {
    onChange(timelines.filter((_, i) => i !== index));
  }
  function updateItem(index: number, patch: Partial<TimelineForm>) {
    onChange(
      timelines.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }
  function moveItem(index: number, direction: -1 | 1) {
    const next = [...timelines];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="md:col-span-2 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-slate-800">
            Timeline Kompetisi
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Jadwal tahapan yang tampil di halaman detail lomba.
          </p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-50 border border-cyan-200 px-3 py-1.5 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Item
        </button>
      </div>

      {timelines.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-4 py-6 text-center">
          <p className="text-xs font-semibold text-slate-400">
            Belum ada timeline —{" "}
            <span className="font-bold text-slate-500">Tambah Item</span> untuk
            mulai mengisi.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {timelines.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-[11px] font-black text-cyan-700">
                  {index + 1}
                </span>
                <span className="flex-1 truncate text-xs font-bold text-slate-500">
                  {item.title || (
                    <span className="italic text-slate-400">
                      Belum ada judul
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-white hover:text-slate-600 disabled:opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === timelines.length - 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-white hover:text-slate-600 disabled:opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Judul <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="cth. Pembukaan Pendaftaran"
                    value={item.title}
                    onChange={(e) =>
                      updateItem(index, { title: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-300 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Tanggal Mulai <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={item.start_date}
                    onChange={(e) =>
                      updateItem(index, { start_date: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Tanggal Selesai{" "}
                    <span className="font-normal text-slate-400">
                      (opsional)
                    </span>
                  </label>
                  <input
                    type="date"
                    value={item.end_date}
                    min={item.start_date || undefined}
                    onChange={(e) =>
                      updateItem(index, { end_date: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Deskripsi{" "}
                    <span className="font-normal text-slate-400">
                      (opsional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, { description: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-300 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Stage Editor (Tahapan Kompetisi) ──────────────────────────────────────────

type StageEditorProps = {
  stages: StageForm[];
  onChange: (stages: StageForm[]) => void;
};

function StageEditor({ stages, onChange }: StageEditorProps) {
  function addItem() {
    onChange([...stages, { ...emptyStageItem }]);
  }
  function removeItem(index: number) {
    onChange(stages.filter((_, i) => i !== index));
  }
  function updateItem(index: number, patch: Partial<StageForm>) {
    onChange(stages.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }
  function moveItem(index: number, direction: -1 | 1) {
    const next = [...stages];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="md:col-span-2 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-slate-800">
            Tahapan Kompetisi
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Langkah-langkah (mis. Pendaftaran → Verifikasi → Pelaksanaan →
            Pengumuman) yang tampil di section "Tahapan Kompetisi" halaman
            detail lomba.
          </p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-50 border border-cyan-200 px-3 py-1.5 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100 shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Tahapan
        </button>
      </div>

      {stages.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-4 py-6 text-center">
          <p className="text-xs font-semibold text-slate-400">
            Belum ada tahapan —{" "}
            <span className="font-bold text-slate-500">Tambah Tahapan</span>{" "}
            untuk mulai mengisi.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {stages.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-[11px] font-black text-cyan-700">
                  {index + 1}
                </span>
                <span className="flex-1 truncate text-xs font-bold text-slate-500">
                  {item.title || (
                    <span className="italic text-slate-400">
                      Belum ada judul
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-white hover:text-slate-600 disabled:opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === stages.length - 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-white hover:text-slate-600 disabled:opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Judul <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="cth. Verifikasi Berkas"
                    value={item.title}
                    onChange={(e) =>
                      updateItem(index, { title: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-300 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Deskripsi{" "}
                    <span className="font-normal text-slate-400">
                      (opsional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="cth. Panitia memeriksa data peserta dan bukti pembayaran."
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, { description: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-300 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Mechanism Editor (Mekanisme Lomba) ────────────────────────────────────────

type MechanismEditorProps = {
  mechanisms: MechanismForm[];
  onChange: (mechanisms: MechanismForm[]) => void;
};

function MechanismEditor({ mechanisms, onChange }: MechanismEditorProps) {
  function addItem() {
    onChange([...mechanisms, { ...emptyMechanismItem }]);
  }
  function removeItem(index: number) {
    onChange(mechanisms.filter((_, i) => i !== index));
  }
  function updateItem(index: number, patch: Partial<MechanismForm>) {
    onChange(mechanisms.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }
  function moveItem(index: number, direction: -1 | 1) {
    const next = [...mechanisms];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="md:col-span-2 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-slate-800">
            Mekanisme Lomba
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Mekanisme, kriteria penilaian, atau sistem poin untuk cabang lomba ini.
            Tuliskan butir-butir mekanisme pada kolom "Isi Mekanisme" (satu baris per ketentuan/poin).
          </p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-50 border border-cyan-200 px-3 py-1.5 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100 shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Mekanisme
        </button>
      </div>

      {mechanisms.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-4 py-6 text-center">
          <p className="text-xs font-semibold text-slate-400">
            Belum ada mekanisme —{" "}
            <span className="font-bold text-slate-500">Tambah Mekanisme</span>{" "}
            untuk mulai mengisi.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {mechanisms.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-[11px] font-black text-cyan-700">
                  {index + 1}
                </span>
                <span className="flex-1 truncate text-xs font-bold text-slate-500">
                  {item.title || (
                    <span className="italic text-slate-400">
                      Belum ada judul
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-white hover:text-slate-600 disabled:opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === mechanisms.length - 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-white hover:text-slate-600 disabled:opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Judul Mekanisme <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="cth. Sistem Pelaksanaan Ujian"
                    value={item.title}
                    onChange={(e) =>
                      updateItem(index, { title: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-300 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-600">
                    Isi Mekanisme (satu baris per ketentuan/poin) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    placeholder="Penyisihan: Dikerjakan secara online...&#10;Final: Dikerjakan secara tertulis..."
                    value={item.items}
                    onChange={(e) =>
                      updateItem(index, { items: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-300 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 font-sans"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Modal Form ───────────────────────────────────────────────────────────────


type FormModalProps = {
  isOpen: boolean;
  form: CompetitionForm;
  formError: string;
  saving: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (updated: Partial<CompetitionForm>) => void;
};

function FormModal({
  isOpen,
  form,
  formError,
  saving,
  onClose,
  onSubmit,
  onChange,
}: FormModalProps) {
  if (!isOpen) return null;
  const isEditing = Boolean(form.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.15s ease-out" }}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
        style={{ animation: "scaleUp 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              {isEditing ? "Edit Lomba" : "Tambah Lomba"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? "Perbarui informasi cabang lomba."
                : "Isi detail untuk menambahkan cabang lomba baru."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="grid gap-4 p-6 md:grid-cols-2">
          {/* ── Bagian 1: Info Dasar ── */}
          <div className="md:col-span-2">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              Info Dasar
            </p>
          </div>

          <FormInput
            label="Nama lomba"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
          />
          <FormInput
            label="Kode"
            placeholder="cth. LCTM"
            value={form.code}
            onChange={(e) => onChange({ code: e.target.value })}
            required
          />
          <FormInput
            label="Jenjang peserta (pisahkan koma)"
            placeholder="SD, SMP, SMA, Mahasiswa"
            value={form.participant_levels}
            onChange={(e) => onChange({ participant_levels: e.target.value })}
          />
          <FormInput
            label="Biaya pendaftaran (Rp)"
            type="number"
            value={form.registration_fee}
            onChange={(e) => onChange({ registration_fee: e.target.value })}
          />
          <FormSelect
            label="Tipe lomba"
            value={form.competition_type}
            onChange={(e) =>
              onChange({
                competition_type: e.target
                  .value as CompetitionForm["competition_type"],
              })
            }
            options={[
              { label: "Individu", value: "individual" },
              { label: "Tim", value: "team" },
            ]}
          />
          <FormSelect
            label="Status pendaftaran"
            value={form.registration_status}
            onChange={(e) =>
              onChange({
                registration_status: e.target
                  .value as CompetitionForm["registration_status"],
              })
            }
            options={[
              { label: "Buka", value: "open" },
              { label: "Tutup", value: "closed" },
            ]}
          />
          <FormInput
            label="Min. anggota"
            type="number"
            value={form.min_members}
            onChange={(e) => onChange({ min_members: e.target.value })}
          />
          <FormInput
            label="Maks. anggota"
            type="number"
            value={form.max_members}
            onChange={(e) => onChange({ max_members: e.target.value })}
          />

          {/* ── Bagian 1.5: Kontak WhatsApp CP ── */}
          <div className="md:col-span-2 border-t border-slate-100 pt-2" />
          <ContactEditor
            contacts={form.whatsapp_contacts}
            onChange={(whatsapp_contacts) => onChange({ whatsapp_contacts })}
          />

          {/* ── Bagian 2: Kuota ── */}
          <div className="md:col-span-2 border-t border-slate-100 pt-2">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              Kuota & Batasan
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              Kosongkan jika tidak ada batasan.
            </p>
          </div>

          <FormInput
            label="Maks. tim per sekolah"
            type="number"
            placeholder="cth. 2 (kosongkan = bebas)"
            value={form.max_teams_per_school}
            onChange={(e) => onChange({ max_teams_per_school: e.target.value })}
          />
          <FormInput
            label="Kuota total lomba"
            type="number"
            placeholder="cth. 24 (kosongkan = tak terbatas)"
            value={form.total_quota}
            onChange={(e) => onChange({ total_quota: e.target.value })}
          />

          {/* ── Bagian 3: Karya Tulis ── */}
          <div className="md:col-span-2 border-t border-slate-100 pt-2">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              Karya Tulis
            </p>
          </div>

          <label className="md:col-span-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={form.has_work_submission}
              onChange={(e) =>
                onChange({ has_work_submission: e.target.checked })
              }
              className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
            />
            Lomba ini memerlukan pengumpulan karya tulis
          </label>

          {form.has_work_submission && (
            <>
              <div className="md:col-span-2">
                <FormTextarea
                  label="Tema utama lomba"
                  placeholder="cth. Breaking the Code: Mengasah Logika Matematika sebagai Senjata Kreatif di Era Kompetisi Global"
                  value={form.main_theme}
                  onChange={(e) => onChange({ main_theme: e.target.value })}
                />
                <p className="mt-1 text-xs text-slate-400">
                  Ditampilkan sebagai informasi tema di form pendaftaran
                  peserta. Kosongkan jika tidak ada tema khusus.
                </p>
              </div>
              <div className="md:col-span-2">
                <FormTextarea
                  label="Subtema karya (satu subtema per baris)"
                  placeholder={"Sains & Media\nSosial Budaya\nEnergi dan Alam"}
                  value={form.subthemes}
                  onChange={(e) => onChange({ subthemes: e.target.value })}
                />
                <p className="mt-1 text-xs text-slate-400">
                  Setiap baris akan menjadi satu pilihan subtema di form
                  pendaftaran.
                </p>
              </div>
            </>
          )}

          {/* ── Bagian 4: Deskripsi ── */}
          <div className="md:col-span-2 border-t border-slate-100 pt-2">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              Deskripsi
            </p>
          </div>

          <FormTextarea
            label="Deskripsi singkat"
            value={form.short_description}
            onChange={(e) => onChange({ short_description: e.target.value })}
          />
          <FormTextarea
            label="Deskripsi lengkap"
            value={form.description}
            onChange={(e) => onChange({ description: e.target.value })}
          />

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => onChange({ is_active: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
            />
            Aktif
          </label>

          {/* ── Bagian 5: Timeline ── */}
          <div className="md:col-span-2 border-t border-slate-100 pt-2" />
          <TimelineEditor
            timelines={form.timelines}
            onChange={(timelines) => onChange({ timelines })}
          />

          {/* ── Bagian 6: Tahapan Kompetisi ── */}
          <div className="md:col-span-2 border-t border-slate-100 pt-2" />
          <StageEditor
            stages={form.stages}
            onChange={(stages) => onChange({ stages })}
          />

          {/* ── Bagian 7: Mekanisme Lomba ── */}
          <div className="md:col-span-2 border-t border-slate-100 pt-2" />
          <MechanismEditor
            mechanisms={form.mechanisms}
            onChange={(mechanisms) => onChange({ mechanisms })}
          />

          {formError ? (
            <div className="md:col-span-2">
              <ErrorState message={formError} />
            </div>
          ) : null}

          <div className="md:col-span-2 flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {saving
                ? "Menyimpan..."
                : isEditing
                  ? "Update Lomba"
                  : "Tambah Lomba"}
            </button>
          </div>
        </form>
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

// ─── Delete Modal ─────────────────────────────────────────────────────────────

type DeleteModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteModal({ isOpen, onConfirm, onCancel }: DeleteModalProps) {
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
        <h2 className="text-base font-black text-slate-950">Hapus Lomba?</h2>
        <p className="mt-2 text-sm text-slate-500">
          Data lomba ini akan dihapus secara permanen dan tidak dapat
          dikembalikan.
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
            className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timelinesFromCompetition(competition: Competition): TimelineForm[] {
  if (
    !Array.isArray(competition.timelines) ||
    competition.timelines.length === 0
  )
    return [];
  return competition.timelines.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description ?? "",
    start_date: t.start_date,
    end_date: t.end_date ?? "",
  }));
}

function stagesFromCompetition(competition: Competition): StageForm[] {
  if (!Array.isArray(competition.stages) || competition.stages.length === 0)
    return [];
  return competition.stages.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description ?? "",
  }));
}

function contactsFromCompetition(competition: Competition): ContactForm[] {
  if (!Array.isArray(competition.whatsapp_cp)) return [];
  return competition.whatsapp_cp.map((c) => ({
    level: c.level ?? "",
    name: c.name ?? "",
    phone: c.phone,
  }));
}

function mechanismsFromCompetition(competition: Competition): MechanismForm[] {
  if (!Array.isArray(competition.mechanisms) || competition.mechanisms.length === 0)
    return [];
  return competition.mechanisms.map((m) => ({
    id: m.id,
    title: m.title,
    items: m.items.join("\n"),
  }));
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminCompetitionsPage() {
  const { data, error, loading, reload } = useAsyncData(
    getAdminCompetitions,
    [],
  );

  const [form, setForm] = useState<CompetitionForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  function openCreateModal() {
    setForm(emptyForm);
    setFormError("");
    setIsFormOpen(true);
  }

  function openEditModal(competition: Competition) {
    setForm({
      id: competition.id,
      name: competition.name,
      code: competition.code,
      participant_levels: competition.participant_levels?.join(", ") ?? "",
      registration_status: competition.registration_status,
      is_active: competition.is_active,
      registration_fee: String(competition.registration_fee),
      competition_type: competition.competition_type,
      min_members: String(competition.min_members ?? 1),
      max_members: String(competition.max_members ?? 1),
      whatsapp_contacts: contactsFromCompetition(competition),
      short_description: competition.short_description ?? "",
      description: competition.description ?? "",
      max_teams_per_school:
        competition.max_teams_per_school != null
          ? String(competition.max_teams_per_school)
          : "",
      total_quota:
        competition.total_quota != null ? String(competition.total_quota) : "",
      has_work_submission: competition.has_work_submission ?? false,
      main_theme: competition.main_theme ?? "",
      subthemes: (competition.subthemes ?? []).join("\n"),
      timelines: timelinesFromCompetition(competition),
      stages: stagesFromCompetition(competition),
      mechanisms: mechanismsFromCompetition(competition),
    });
    setFormError("");
    setIsFormOpen(true);
  }

  function closeFormModal() {
    setIsFormOpen(false);
    setForm(emptyForm);
    setFormError("");
  }

  function handleFormChange(updated: Partial<CompetitionForm>) {
    setForm((current) => ({ ...current, ...updated }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.code.trim()) {
      setFormError("Nama dan kode lomba wajib diisi.");
      return;
    }

    const invalidTimeline = form.timelines.find(
      (t) => !t.title.trim() || !t.start_date,
    );
    if (invalidTimeline) {
      setFormError(
        "Setiap item timeline wajib memiliki judul dan tanggal mulai.",
      );
      return;
    }

    const invalidStage = form.stages.find((s) => !s.title.trim());
    if (invalidStage) {
      setFormError("Setiap tahapan kompetisi wajib memiliki judul.");
      return;
    }

    const invalidMechanism = form.mechanisms.find(
      (m) => !m.title.trim() || !m.items.trim(),
    );
    if (invalidMechanism) {
      setFormError(
        "Setiap item mekanisme wajib memiliki judul dan ketentuan/butir poin.",
      );
      return;
    }

    const invalidContact = form.whatsapp_contacts.find((c) => !c.phone.trim());
    if (invalidContact) {
      setFormError(
        "Nomor WhatsApp wajib diisi untuk setiap kontak CP yang ditambahkan.",
      );
      return;
    }

    if (form.has_work_submission && !form.subthemes.trim()) {
      setFormError(
        "Isi minimal satu subtema karya, atau nonaktifkan opsi karya tulis.",
      );
      return;
    }

    setSaving(true);

    const { data: savedId, error: saveError } = await saveAdminCompetition(
      {
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        participant_levels: form.participant_levels
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        registration_status: form.registration_status,
        is_active: form.is_active,
        registration_fee: Number(form.registration_fee || 0),
        competition_type: form.competition_type,
        min_members: Number(form.min_members || 1),
        max_members: Number(form.max_members || 1),
        whatsapp_cp: form.whatsapp_contacts.map((c) => ({
          level: c.level.trim() || null,
          name: c.name.trim() || null,
          phone: c.phone.trim(),
        })),
        short_description: form.short_description || null,
        description: form.description || null,
        max_teams_per_school: form.max_teams_per_school.trim()
          ? Number(form.max_teams_per_school)
          : null,
        total_quota: form.total_quota.trim() ? Number(form.total_quota) : null,
        has_work_submission: form.has_work_submission,
        main_theme:
          form.has_work_submission && form.main_theme.trim()
            ? form.main_theme.trim()
            : null,
        subthemes: form.has_work_submission
          ? form.subthemes
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      },
      form.id,
    );

    if (saveError) {
      setSaving(false);
      setFormError(saveError.message);
      return;
    }

    const competitionId = form.id ?? savedId;
    if (competitionId) {
      const { error: timelineError } = await replaceAdminTimelines(
        competitionId,
        form.timelines.map((t, index) => ({
          title: t.title.trim(),
          description: t.description.trim() || null,
          start_date: t.start_date,
          end_date: t.end_date || null,
          sort_order: index,
          is_active: true,
        })),
      );
      if (timelineError) {
        setSaving(false);
        setFormError(
          `Lomba tersimpan, tapi gagal menyimpan timeline: ${timelineError.message}`,
        );
        reload();
        return;
      }

      const { error: stageError } = await replaceAdminCompetitionStages(
        competitionId,
        form.stages.map((s, index) => ({
          title: s.title.trim(),
          description: s.description.trim() || null,
          sort_order: index,
          is_active: true,
        })),
      );
      if (stageError) {
        setSaving(false);
        setFormError(
          `Lomba tersimpan, tapi gagal menyimpan tahapan: ${stageError.message}`,
        );
        reload();
        return;
      }

      const { error: mechanismError } = await replaceAdminCompetitionMechanisms(
        competitionId,
        form.mechanisms.map((m, index) => ({
          title: m.title.trim(),
          items: m.items
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
          sort_order: index,
        })),
      );
      if (mechanismError) {
        setSaving(false);
        setFormError(
          `Lomba tersimpan, tapi gagal menyimpan mekanisme: ${mechanismError.message}`,
        );
        reload();
        return;
      }
    }

    setSaving(false);
    closeFormModal();
    reload();
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    const { error: deleteError } = await deleteAdminCompetition(deleteTargetId);
    setDeleteTargetId(null);
    if (deleteError) setFormError(deleteError.message);
    reload();
  }

  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Lomba</h1>
          <p className="mt-1 text-sm text-slate-600">
            Semua cabang lomba, termasuk yang nonaktif atau pendaftaran
            tertutup.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Lomba
        </button>
      </div>

      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!data?.length}
        emptyDescription="Belum ada lomba."
      />

      <div className="mt-6">
        <DataTable>
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">Kode</th>
                <th className="p-3">Jenjang</th>
                <th className="p-3">Tipe</th>
                <th className="p-3">Anggota</th>
                <th className="p-3">Kuota/Sekolah</th>
                <th className="p-3">Kuota Total</th>
                <th className="p-3">Karya</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Biaya</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((competition) => (
                <tr key={competition.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-950">
                    {competition.name}
                  </td>
                  <td className="p-3 font-bold text-cyan-700">
                    {competition.code}
                  </td>
                  <td className="p-3">
                    {competition.participant_levels?.join(", ") || "—"}
                  </td>
                  <td className="p-3 capitalize">
                    {competition.competition_type === "team"
                      ? "Tim"
                      : "Individu"}
                  </td>
                  <td className="p-3 text-slate-600">
                    {competition.min_members === competition.max_members
                      ? competition.min_members
                      : `${competition.min_members}–${competition.max_members}`}
                  </td>
                  <td className="p-3">
                    {competition.max_teams_per_school != null ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                        Maks. {competition.max_teams_per_school}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Bebas</span>
                    )}
                  </td>
                  <td className="p-3">
                    {competition.total_quota != null ? (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800">
                        {competition.total_quota} tim
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Tak terbatas
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {competition.has_work_submission ? (
                      <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-800">
                        Ya ({(competition.subthemes ?? []).length} subtema)
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Tidak</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={
                        competition.registration_status === "open"
                          ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800"
                          : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"
                      }
                    >
                      {competition.registration_status === "open"
                        ? "Buka"
                        : "Tutup"}
                    </span>
                  </td>
                  <td className="p-3">
                    <BooleanBadge value={competition.is_active} />
                  </td>
                  <td className="p-3">
                    Rp{competition.registration_fee.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(competition)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(competition.id)}
                        className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>

      <FormModal
        isOpen={isFormOpen}
        form={form}
        formError={formError}
        saving={saving}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
      />

      <DeleteModal
        isOpen={Boolean(deleteTargetId)}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setDeleteTargetId(null)}
      />
    </section>
  );
}