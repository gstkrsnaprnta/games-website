# HANDOFF GAMES WEB

## Status Terakhir

Public website redesign selesai. Halaman publik sekarang memakai branding GAMES 2026 dengan palet cream, teal, mint, maroon, dan pink; homepage terasa seperti landing page event; halaman lomba, timeline, FAQ, pengumuman, daftar, cek status, dan kontak sudah dipoles. Logic Supabase, auth, admin workflow, RLS, registration submit, dan check-status RPC tidak diubah.

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4
- React Router
- Supabase JS
- lucide-react

## File Penting

- `src/App.tsx`: konfigurasi route publik dan admin.
- `src/lib/supabase.ts`: Supabase client frontend.
- `src/pages/public/*`: halaman publik MVP.
- `src/components/public/*`: komponen visual public seperti navbar, footer, hero, cards, timeline, page hero, dan section heading.
- `src/pages/admin/*`: halaman admin dashboard, list, detail peserta, dan CRUD ringan konten.
- `src/services/admin*.ts`: service admin untuk list dan mutation tanpa filter publik.
- `src/components/*`: komponen publik, admin, dan shared.
- `supabase/migrations/001_initial_schema.sql`: schema awal + RLS.
- `supabase/migrations/002_registration_status_rpc.sql`: RPC cek status peserta tanpa membuka read public registrations.
- `supabase/seed/seed.sql`: seed event, lomba, FAQ, timeline, pengumuman.

## Fitur Selesai

- [x] Website publik mengambil data dari Supabase untuk homepage, lomba, detail lomba, timeline, FAQ, dan pengumuman.
- [x] Form pendaftaran menyimpan registrations dan anggota tim ke Supabase.
- [x] Nomor registrasi dibuat melalui RPC `next_registration_code`.
- [x] Cek status peserta memakai RPC `check_registration_status`.
- [x] Admin login page memakai Supabase Auth.
- [x] Admin protected route memeriksa session dan role `profiles`.
- [x] Dashboard admin awal berisi count lomba, pengumuman, peserta, dan peserta pending.
- [x] Admin registrations list menampilkan data peserta dan join competition.
- [x] Admin competitions, timelines, faqs, announcements, sponsors, galleries list menampilkan data Supabase.
- [x] Admin registration detail dan validasi manual status/catatan.
- [x] Export CSV registrasi.
- [x] Create/edit/delete competitions, timelines, FAQs, announcements.
- [x] Publish/unpublish announcements.
- [x] Create/edit/deactivate sponsors dan galleries.
- [x] CRUD events dan active-event management.
- [x] Filter registrations berdasarkan lomba, pembayaran, dan berkas.
- [x] Pagination sederhana registrations.
- [x] Confirm dialog reusable untuk aksi event.
- [x] Public website redesign sesuai branding GAMES 2026.
- [x] Mobile navbar responsive dan landing-style homepage.
- [x] Public registration/check-status UI dipoles tanpa mengubah logic submit/RPC.
- [x] Supabase schema awal dan RLS awal.
- [x] Dokumentasi awal.

## Fitur Belum Selesai

- [ ] Pagination server-side untuk data admin besar.
- [ ] UI polish modal/dialog untuk CRUD agar lebih nyaman.
- [ ] Terapkan migration 002 di Supabase remote bila belum diterapkan.
- [ ] Tambahkan font Magic Retro Regular jika file legal tersedia.
- [ ] Tambahkan logo/mascot resmi GAMES jika asset tersedia.

## Masalah / Bug

- RPC `check_registration_status` ada di migration 002. Jika halaman cek status menampilkan error 404/function not found, jalankan migration tersebut di Supabase.
- Generator nomor registrasi masih berbasis count+1. Catatan race condition sudah masuk TODO.
- Sponsors dan galleries bisa tampil empty state jika memang belum ada data di Supabase.
- Delete competitions/timelines/FAQs/announcements bisa ditolak database jika ada data yang masih mereferensikan row tersebut; error akan tampil di UI.
- Visual hero memakai placeholder logo/mascot huruf `G` sampai asset resmi tersedia.

## Cara Menjalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Supabase

Tabel migration awal: `profiles`, `events`, `competitions`, `timelines`, `faqs`, `announcements`, `registrations`, `registration_members`, `sponsors`, `galleries`.

RLS sudah diaktifkan untuk semua tabel. Public read dibatasi ke konten aktif/published. Public insert hanya untuk registrations dan registration_members. Admin policy menggunakan helper `public.is_admin()`. RPC tambahan `check_registration_status` dibuat untuk cek status tanpa membuka data sensitif.

## Langkah Lanjut Paling Disarankan

1. Jalankan migration `002_registration_status_rpc.sql` di Supabase remote jika belum.
2. Uji pendaftaran end-to-end dengan data dummy yang boleh tersimpan.
3. Uji cek status memakai nomor registrasi hasil pendaftaran.
4. Tambahkan logo/mascot resmi dan font Magic Retro bila asset legal tersedia.
5. Tambahkan pagination/filter server-side untuk registrasi jika data mulai besar.
6. Gunakan ConfirmDialog reusable untuk aksi destructive di modul admin lain.
7. Rapikan UI CRUD ke modal/dialog reusable.
8. Hardening nomor registrasi memakai sequence/transaction.
9. Uji mobile dan build production.

## Catatan Penting untuk AI Berikutnya

Jangan gunakan service role key di frontend. Fitur non-MVP cukup dicatat di TODO. Pertahankan struktur sederhana dulu karena prioritas MVP adalah alur berjalan.
