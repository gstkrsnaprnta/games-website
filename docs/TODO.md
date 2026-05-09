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
- [x] Admin list peserta menampilkan data Supabase, join lomba, status badge, dan search.
- [x] Admin list competitions, timelines, faqs, announcements, sponsors, galleries menampilkan data Supabase.
- [x] Detail peserta admin.
- [x] Validasi status pendaftaran, pembayaran, berkas, dan admin note.
- [x] Export CSV data peserta.
- [x] Create/edit/delete competitions.
- [x] Create/edit/delete timelines.
- [x] Create/edit/delete FAQ.
- [x] Create/edit/publish/unpublish/delete announcements.
- [x] Create/edit/deactivate sponsors.
- [x] Create/edit/deactivate galleries.
- [x] CRUD events.
- [x] Set satu event aktif dan otomatis nonaktifkan event lain.
- [x] Pagination sederhana registrations.
- [x] Filter registrations berdasarkan lomba, status pembayaran, dan status berkas.
- [x] Confirm dialog reusable untuk aksi destructive/activation events.
- [ ] Terapkan migration `002_registration_status_rpc.sql` ke Supabase remote jika belum dijalankan.
- [ ] Hardening generator nomor registrasi agar aman dari race condition saat submit bersamaan.
- [ ] Tambahkan font Magic Retro Regular jika file font legal/resmi sudah tersedia.
- [ ] Tambahkan asset logo/mascot resmi GAMES jika sudah tersedia.
- [ ] Polish lanjutan visual admin setelah MVP public selesai.

## Future / Non-MVP

- [ ] Payment gateway otomatis.
- [ ] WhatsApp otomatis.
- [ ] Sertifikat otomatis.
- [ ] Penjurian online.
- [ ] Upload video besar.
- [ ] Ujian online.
- [ ] Dashboard juri.
- [ ] Scoring realtime.
