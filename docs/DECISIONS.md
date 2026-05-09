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
