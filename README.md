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
- `supabase/migrations/003_manual_payment_methods.sql`

Jalankan migration 002 agar halaman `/cek-status` bisa membaca status peserta melalui RPC tanpa membuka akses read publik ke tabel `registrations`.
Jalankan migration 003 agar metode pembayaran manual QRIS/transfer tersedia dan `registrations.payment_method_id` bisa disimpan.

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
- Buka `/admin/payment-methods` untuk menambah QRIS atau rekening transfer manual.
- Di `/daftar`, pilih lomba, pilih metode pembayaran, ikuti instruksi, lalu isi link bukti pembayaran.
- Buka `/cek-status`, masukkan nomor registrasi dan email/WhatsApp pendaftar.
- Buka `/admin/login`, login dengan akun admin Supabase, lalu cek dashboard `/admin`.
- Buka `/admin/registrations`, klik kode registrasi, lalu ubah status validasi manual.
- Test tombol Export CSV di `/admin/registrations`.
- Test filter dan pagination di `/admin/registrations`.
- Test create/edit/set active event di `/admin/events`.
- Test tambah/edit konten di `/admin/competitions`, `/admin/timelines`, `/admin/faqs`, `/admin/announcements`, `/admin/sponsors`, dan `/admin/galleries`.

## Pembayaran Manual

Payment gateway otomatis tidak digunakan pada MVP. Admin mengelola instruksi pembayaran di `/admin/payment-methods`:

- QRIS: isi label, URL gambar QRIS, catatan, dan status aktif.
- Transfer bank: isi label, nama bank, nomor rekening, nama pemilik rekening, catatan, dan status aktif.

Peserta melihat metode aktif di halaman `/daftar`, melakukan pembayaran manual, lalu menempel link bukti pembayaran. Admin membuka detail peserta di `/admin/registrations/:id`, mengecek metode dan bukti pembayaran, lalu mengubah `payment_status` secara manual.
