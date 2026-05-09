# HANDOFF GAMES WEB

## Status Terakhir

Phase 0 selesai sebagai fondasi proyek. React + Vite + TypeScript sudah terpasang, Tailwind aktif, route publik/admin tersedia, Supabase client disiapkan, migration/seed awal dibuat, dan docs awal tersedia.

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
- `src/pages/admin/*`: skeleton halaman admin MVP.
- `src/components/*`: komponen publik, admin, dan shared.
- `supabase/migrations/001_initial_schema.sql`: schema awal + RLS.
- `supabase/seed/seed.sql`: seed event, lomba, FAQ, timeline, pengumuman.

## Fitur Selesai

- [x] Website publik bisa dibuka dengan data contoh lokal.
- [x] Homepage, lomba, detail lomba, timeline, FAQ, pengumuman, daftar, cek status, kontak.
- [x] Admin login page.
- [x] Skeleton admin dashboard dan modul wajib.
- [x] Supabase schema awal dan RLS awal.
- [x] Dokumentasi awal.

## Fitur Belum Selesai

- [ ] Fetch data publik dari Supabase.
- [ ] Pendaftaran peserta tersimpan ke Supabase.
- [ ] Nomor registrasi otomatis terintegrasi saat submit.
- [ ] Cek status peserta dari Supabase.
- [ ] Auth guard admin berbasis session dan role profile.
- [ ] CRUD CMS admin.
- [ ] Validasi pembayaran/berkas manual.
- [ ] Export CSV nyata.

## Masalah / Bug

- Admin protected route saat ini masih guard environment, belum memeriksa session dan role Supabase.
- Halaman publik memakai sample data lokal sampai integrasi Supabase Phase 1.

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

RLS sudah diaktifkan untuk semua tabel. Public read dibatasi ke konten aktif/published. Public insert hanya untuk registrations dan registration_members. Admin policy menggunakan helper `public.is_admin()`.

## Langkah Lanjut Paling Disarankan

1. Jalankan migration dan seed di Supabase project.
2. Lengkapi type database dari Supabase CLI setelah schema aktif.
3. Ganti sample data publik menjadi fetching dari services.
4. Implementasi submit pendaftaran dengan RPC `next_registration_code`.
5. Implementasi cek status dengan policy/RPC yang aman untuk peserta.
6. Implementasi auth guard admin dengan session dan profile role.
7. Bangun CRUD lomba, timeline, FAQ, pengumuman.
8. Bangun dashboard peserta, filter/search, validasi manual, export CSV.
9. Uji mobile dan build production.

## Catatan Penting untuk AI Berikutnya

Jangan gunakan service role key di frontend. Fitur non-MVP cukup dicatat di TODO. Pertahankan struktur sederhana dulu karena prioritas MVP adalah alur berjalan.
