# HANDOFF GAMES WEB

## Status Terakhir

Pembayaran manual MVP ditambahkan. Admin bisa mengelola metode pembayaran QRIS/transfer di `/admin/payment-methods`; peserta memilih metode di `/daftar`, melihat instruksi, dan menyimpan link bukti pembayaran; admin melihat metode dan bukti pembayaran di detail peserta lalu tetap memvalidasi `payment_status` secara manual.

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
- `src/services/paymentMethods.ts`: service public untuk membaca metode pembayaran aktif.
- `src/components/*`: komponen publik, admin, dan shared.
- `supabase/migrations/001_initial_schema.sql`: schema awal + RLS.
- `supabase/migrations/002_registration_status_rpc.sql`: RPC cek status peserta tanpa membuka read public registrations.
- `supabase/migrations/003_manual_payment_methods.sql`: tabel `payment_methods`, kolom `registrations.payment_method_id`, RLS, dan seed contoh pembayaran manual.
- `supabase/seed/seed.sql`: seed event, lomba, FAQ, timeline, pengumuman, dan metode pembayaran contoh.

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
- [x] Admin CRUD metode pembayaran manual di `/admin/payment-methods`.
- [x] Form pendaftaran menampilkan biaya lomba, metode pembayaran aktif, instruksi QRIS/transfer, dan menyimpan `payment_method_id`.
- [x] Admin registration detail menampilkan metode pembayaran dan tombol buka bukti pembayaran.
- [x] Supabase schema awal dan RLS awal.
- [x] Dokumentasi awal.

## Fitur Belum Selesai

- [ ] Pagination server-side untuk data admin besar.
- [ ] UI polish modal/dialog untuk CRUD agar lebih nyaman.
- [ ] Terapkan migration 002 di Supabase remote bila belum diterapkan.
- [ ] Terapkan migration 003 di Supabase remote bila belum diterapkan.
- [ ] Tambahkan font Magic Retro Regular jika file legal tersedia.
- [ ] Tambahkan logo/mascot resmi GAMES jika asset tersedia.

## Masalah / Bug

- RPC `check_registration_status` ada di migration 002. Jika halaman cek status menampilkan error 404/function not found, jalankan migration tersebut di Supabase.
- Tabel `payment_methods` dan kolom `registrations.payment_method_id` ada di migration 003. Jika `/daftar` atau `/admin/payment-methods` menampilkan error tabel/kolom tidak ditemukan, jalankan migration 003 di Supabase.
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

Tabel migration awal: `profiles`, `events`, `competitions`, `timelines`, `faqs`, `announcements`, `registrations`, `registration_members`, `sponsors`, `galleries`. Migration 003 menambah `payment_methods` dan `registrations.payment_method_id`.

RLS sudah diaktifkan untuk semua tabel. Public read dibatasi ke konten aktif/published, termasuk `payment_methods.is_active = true`. Public insert hanya untuk registrations dan registration_members. Admin policy menggunakan helper `public.is_admin()`. RPC tambahan `check_registration_status` dibuat untuk cek status tanpa membuka data sensitif.

## Langkah Lanjut Paling Disarankan

1. Jalankan migration `002_registration_status_rpc.sql` dan `003_manual_payment_methods.sql` di Supabase remote jika belum.
2. Isi metode pembayaran resmi panitia di `/admin/payment-methods`, ganti URL QRIS/rekening contoh.
3. Uji pendaftaran end-to-end dengan data dummy yang boleh tersimpan.
4. Uji cek status memakai nomor registrasi hasil pendaftaran.
5. Uji detail peserta dan validasi pembayaran manual.
6. Tambahkan logo/mascot resmi dan font Magic Retro bila asset legal tersedia.
7. Tambahkan pagination/filter server-side untuk registrasi jika data mulai besar.
8. Rapikan UI CRUD ke modal/dialog reusable.
9. Hardening nomor registrasi memakai sequence/transaction.
10. Uji mobile dan build production.

## Catatan Penting untuk AI Berikutnya

Jangan gunakan service role key di frontend. Fitur non-MVP cukup dicatat di TODO. Pertahankan struktur sederhana dulu karena prioritas MVP adalah alur berjalan.
