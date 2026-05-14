# Decisions

## 2026-05-09

- Menggunakan React + Vite + TypeScript sesuai instruksi MVP.
- Menggunakan Tailwind CSS v4 via plugin `@tailwindcss/vite`.
- Menggunakan Supabase client hanya dengan anon key dari environment variable.
- Phase 0 memakai data contoh lokal pada halaman publik agar struktur UI bisa dibuka sebelum Supabase project tersedia.
- Nomor registrasi disiapkan dengan helper frontend dan fungsi SQL `next_registration_code`; integrasi submit dilakukan pada Phase 1.
- Fitur non-MVP tidak diimplementasikan dan dicatat di TODO.

## 2026-05-09 Phase 1

- Halaman publik sekarang mengambil data langsung dari Supabase dan tetap menampilkan loading, empty, dan error state.
- Pendaftaran publik membuat UUID registrasi di browser agar anggota tim bisa diinsert tanpa perlu membaca row `registrations` yang dilindungi RLS.
- Nomor registrasi Phase 1 memakai RPC `next_registration_code` berbasis `count(*) + 1`; ini cukup untuk MVP awal tetapi perlu diganti dengan mekanisme atomic/sequence sebelum traffic tinggi.
- Cek status peserta memakai RPC `check_registration_status` dengan `security definer` agar publik tetap tidak bisa membaca tabel `registrations` secara bebas.
- Admin route dijaga dengan Supabase session dan role `admin`/`super_admin` aktif dari tabel `profiles`.

## 2026-05-09 Admin Lists Fix

- Halaman list admin tidak lagi memakai placeholder untuk competitions, timelines, faqs, announcements, sponsors, dan galleries.
- Query list admin memakai service terpisah `admin*` agar tidak memakai filter publik seperti `is_active = true` atau `status = published`.
- Tidak ada perubahan RLS karena policy admin yang ada sudah mengizinkan akun admin aktif membaca tabel yang dibutuhkan.

## 2026-05-09 Phase 2

- Admin registration detail ditambahkan untuk validasi manual status pendaftaran, pembayaran, berkas, dan catatan admin.
- Export CSV registrasi dilakukan di browser dari data yang sudah diizinkan RLS untuk admin.
- CRUD konten admin dibuat langsung dari frontend dengan anon/publishable key dan session admin, tetap mengandalkan RLS.
- Competitions, timelines, FAQs, dan announcements mendukung delete; sponsors dan galleries memakai deactivate agar arsip sponsor/galeri tidak hilang tanpa sengaja.
- Tidak ada perubahan RLS pada Phase 2 karena policy admin existing sudah mencakup operasi yang digunakan.

## 2026-05-09 Events and Registration Filters

- `/admin/events` memakai service admin khusus dan update dua langkah saat set aktif: nonaktifkan event lain, lalu aktifkan event terpilih.
- Validasi event minimal dilakukan di UI: `year` dan `name` wajib.
- Registrations memakai filter client-side dan pagination sederhana karena volume MVP masih kecil; server-side pagination tetap dicatat untuk skala lebih besar.
- Confirm dialog reusable mulai dipakai untuk aksi set active/delete event.

## 2026-05-09 Public Website Redesign

- Public website memakai palet GAMES 2026: cream `#f2efeb`, dark teal `#004551`, soft mint `#c2e1df`, maroon `#770525`, dan pink `#faadb6`.
- Font utama diganti ke Montserrat via Google Fonts; Magic Retro Regular belum dipakai karena file font legal belum tersedia di project.
- Redesign dibatasi ke public pages dan shared visual states; logic Supabase, auth, RLS, admin workflow, registration submit, dan check-status RPC tidak diubah.
- Motif visual memakai blob organik, cards lembut, glass surface, dan gradient halus agar terasa seperti event modern, bukan admin dashboard.

## 2026-05-12 Manual Payment Methods

- Pembayaran MVP tetap manual; tidak ada payment gateway, callback, Midtrans, atau Xendit.
- Metode pembayaran dipisah ke tabel `payment_methods` agar panitia bisa mengubah QRIS/rekening tanpa edit kode.
- Form pendaftaran menyimpan `payment_method_id` dan tetap memakai `payment_proof_url` sebagai link bukti pembayaran.
- Public hanya bisa membaca payment method aktif, sedangkan admin CRUD tetap dikontrol RLS melalui `public.is_admin()`.
- Delete payment method dibiarkan ke database agar gagal jika sudah direferensikan pendaftaran; untuk menyembunyikan dari peserta digunakan deactivate.
