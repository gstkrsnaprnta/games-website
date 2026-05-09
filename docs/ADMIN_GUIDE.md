# Admin Guide

## Login

Admin masuk melalui `/admin/login` menggunakan akun Supabase Auth.

## Role

Akses admin ditentukan oleh tabel `profiles`:

- `role` = `admin` atau `super_admin`
- `is_active` = `true`

## Modul Admin MVP

- Dashboard ringkasan.
- Events.
- Lomba.
- Timeline.
- FAQ.
- Pengumuman.
- Peserta.
- Sponsor/media partner.
- Galeri.
- Settings.

## Validasi Manual

Validasi pembayaran dan berkas dilakukan oleh panitia melalui data peserta. Payment gateway dan otomatisasi WhatsApp dicatat sebagai future improvement.

## Peserta

- Buka `/admin/registrations` untuk melihat daftar peserta.
- Klik kode registrasi untuk membuka detail peserta.
- Di detail peserta, admin dapat mengubah status pendaftaran, status pembayaran, status berkas, dan catatan admin.
- Tombol Export CSV di daftar peserta mengunduh data peserta yang sedang tampil.

## CMS Konten

- `/admin/events`: tambah, edit, hapus event tahunan, dan set satu event aktif. Saat satu event diaktifkan, event lain otomatis nonaktif.
- `/admin/competitions`: tambah, edit, dan hapus lomba.
- `/admin/timelines`: tambah, edit, dan hapus timeline.
- `/admin/faqs`: tambah, edit, dan hapus FAQ.
- `/admin/announcements`: tambah, edit, publish/unpublish, dan hapus pengumuman.
- `/admin/sponsors`: tambah, edit, dan nonaktifkan sponsor/media partner.
- `/admin/galleries`: tambah, edit, dan nonaktifkan galeri.

Jika operasi gagal karena relasi database atau RLS, pesan error akan tampil di halaman terkait.
