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
