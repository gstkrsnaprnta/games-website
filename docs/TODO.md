# TODO

## Phase 0

- [x] Setup React + Vite + TypeScript.
- [x] Setup Tailwind.
- [x] Setup router.
- [x] Setup Supabase client.
- [x] Setup `.env.example`.
- [x] Setup layout publik dan admin.
- [x] Setup docs awal.
- [x] Setup migration dan seed awal sebagai fondasi Supabase.

## Phase 1

- [x] Hubungkan halaman publik ke data Supabase.
- [x] Implementasi form pendaftaran dan insert anggota tim.
- [x] Generate nomor registrasi otomatis dari Supabase RPC.
- [x] Implementasi cek status peserta via RPC sesuai RLS.
- [x] Implementasi admin session guard berbasis Supabase Auth.
- [x] Implementasi role check dari tabel `profiles`.
- [x] Dashboard admin awal berisi count lomba, pengumuman, peserta, dan peserta pending.
- [ ] CRUD events, competitions, timelines, faqs, announcements.
- [ ] Dashboard peserta/admin list peserta lengkap.
- [ ] Validasi pembayaran dan berkas manual.
- [ ] Export CSV data peserta.
- [ ] Terapkan migration `002_registration_status_rpc.sql` ke Supabase remote jika belum dijalankan.
- [ ] Hardening generator nomor registrasi agar aman dari race condition saat submit bersamaan.

## Future / Non-MVP

- [ ] Payment gateway otomatis.
- [ ] WhatsApp otomatis.
- [ ] Sertifikat otomatis.
- [ ] Penjurian online.
- [ ] Upload video besar.
- [ ] Ujian online.
- [ ] Dashboard juri.
- [ ] Scoring realtime.
