# Decisions

## 2026-05-09

- Menggunakan React + Vite + TypeScript sesuai instruksi MVP.
- Menggunakan Tailwind CSS v4 via plugin `@tailwindcss/vite`.
- Menggunakan Supabase client hanya dengan anon key dari environment variable.
- Phase 0 memakai data contoh lokal pada halaman publik agar struktur UI bisa dibuka sebelum Supabase project tersedia.
- Nomor registrasi disiapkan dengan helper frontend dan fungsi SQL `next_registration_code`; integrasi submit dilakukan pada Phase 1.
- Fitur non-MVP tidak diimplementasikan dan dicatat di TODO.
