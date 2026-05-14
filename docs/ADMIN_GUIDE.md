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
- Metode pembayaran.
- Sponsor/media partner.
- Galeri.
- Settings.

## Validasi Manual

Validasi pembayaran dan berkas dilakukan oleh panitia melalui data peserta. Payment gateway dan otomatisasi WhatsApp dicatat sebagai future improvement.

## Metode Pembayaran Manual

- Buka `/admin/payment-methods`.
- Untuk QRIS, pilih tipe `QRIS`, isi label, URL gambar QRIS, catatan instruksi, urutan, dan aktifkan metode.
- Untuk transfer bank, pilih tipe `Transfer Bank`, isi label, nama bank, nomor rekening, nama pemilik rekening, catatan instruksi, urutan, dan aktifkan metode.
- Metode aktif akan tampil di halaman `/daftar` setelah peserta memilih lomba pada event yang sama.
- Nonaktifkan metode jika tidak ingin ditampilkan ke peserta baru.
- Hapus metode hanya jika belum pernah dipakai peserta. Jika sudah dipakai, database akan menolak agar riwayat pendaftaran tetap utuh.

## Alur Peserta Membayar

1. Peserta memilih lomba di `/daftar`.
2. Website menampilkan biaya lomba dan metode pembayaran aktif.
3. Peserta memilih QRIS atau transfer bank.
4. Peserta membayar manual sesuai instruksi.
5. Peserta menempel link bukti pembayaran pada field bukti pembayaran.
6. Sistem menyimpan `payment_method_id` dan `payment_proof_url` ke pendaftaran.

## Peserta

- Buka `/admin/registrations` untuk melihat daftar peserta.
- Klik kode registrasi untuk membuka detail peserta.
- Di detail peserta, admin dapat mengubah status pendaftaran, status pembayaran, status berkas, dan catatan admin.
- Detail peserta menampilkan metode pembayaran yang dipilih, instruksi terkait, link bukti pembayaran, dan tombol buka bukti pembayaran.
- Tombol Export CSV di daftar peserta mengunduh data peserta yang sedang tampil.

## CMS Konten

- `/admin/events`: tambah, edit, hapus event tahunan, dan set satu event aktif. Saat satu event diaktifkan, event lain otomatis nonaktif.
- `/admin/payment-methods`: tambah, edit, nonaktifkan, dan hapus metode pembayaran manual.
- `/admin/competitions`: tambah, edit, dan hapus lomba.
- `/admin/timelines`: tambah, edit, dan hapus timeline.
- `/admin/faqs`: tambah, edit, dan hapus FAQ.
- `/admin/announcements`: tambah, edit, publish/unpublish, dan hapus pengumuman.
- `/admin/sponsors`: tambah, edit, dan nonaktifkan sponsor/media partner.
- `/admin/galleries`: tambah, edit, dan nonaktifkan galeri.

Jika operasi gagal karena relasi database atau RLS, pesan error akan tampil di halaman terkait.
