# GAMES Web

MVP website Gebyar Matematika Sains (GAMES) berbasis React, Vite, TypeScript, Tailwind CSS, dan Supabase.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Supabase Database/Auth/RLS
- Target deploy: Cloudflare Pages atau Vercel

## Cara Menjalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi `.env.local` dengan:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Jangan gunakan service role key di frontend.

## Supabase

Migration awal tersedia di `supabase/migrations/001_initial_schema.sql`.
Seed awal tersedia di `supabase/seed/seed.sql`.

Migration tambahan Phase 1:

- `supabase/migrations/002_registration_status_rpc.sql`

Jalankan migration 002 agar halaman `/cek-status` bisa membaca status peserta melalui RPC tanpa membuka akses read publik ke tabel `registrations`.

Admin wajib memiliki row di `public.profiles` dengan:

- `role`: `admin` atau `super_admin`
- `is_active`: `true`

## Script

```bash
npm run dev
npm run build
npm run lint
```

## Test Manual Cepat

- Buka `/lomba`, `/timeline`, `/faq`, dan `/pengumuman` untuk cek data publik dari Supabase.
- Buka `/daftar`, isi form, lalu simpan nomor registrasi yang muncul.
- Buka `/cek-status`, masukkan nomor registrasi dan email/WhatsApp pendaftar.
- Buka `/admin/login`, login dengan akun admin Supabase, lalu cek dashboard `/admin`.
- Buka `/admin/registrations`, klik kode registrasi, lalu ubah status validasi manual.
- Test tombol Export CSV di `/admin/registrations`.
- Test tambah/edit konten di `/admin/competitions`, `/admin/timelines`, `/admin/faqs`, `/admin/announcements`, `/admin/sponsors`, dan `/admin/galleries`.
