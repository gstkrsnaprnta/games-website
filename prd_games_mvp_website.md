# PRD Website Gebyar Matematika Sains (GAMES)

## 1. Ringkasan Produk

### 1.1 Nama Produk
**Website Gebyar Matematika Sains (GAMES)**

### 1.2 Deskripsi Singkat
Gebyar Matematika Sains (GAMES) adalah website resmi untuk program kerja tahunan Divisi Pendidikan. Website ini digunakan untuk menyampaikan informasi lomba, mengelola konten event tahunan, menerima pendaftaran peserta, menampilkan pengumuman, serta membantu panitia melakukan validasi data peserta secara manual.

GAMES merupakan wujud pengabdian mahasiswa Matematika terhadap masyarakat dan peningkatan kualitas pendidikan, khususnya di bidang Matematika, dengan cakupan peserta dari SD, SMP, SMA, hingga mahasiswa di seluruh Indonesia.

### 1.3 Tujuan Produk
Website ini dibuat untuk:

1. Menjadi pusat informasi resmi GAMES.
2. Menampilkan daftar lomba, detail lomba, timeline, biaya, syarat, guidebook, dan kontak panitia.
3. Memudahkan peserta melakukan pendaftaran secara online.
4. Memudahkan panitia mengelola data lomba dan peserta melalui admin panel.
5. Menyediakan sistem validasi manual untuk pembayaran dan berkas peserta.
6. Menyediakan pengumuman resmi seperti finalis, pemenang, perubahan jadwal, dan informasi penting lainnya.
7. Menyimpan arsip event dari tahun ke tahun.

### 1.4 Target Pengguna

#### Pengunjung Umum
Orang yang ingin mengetahui informasi tentang GAMES.

#### Peserta
Siswa SD/sederajat, SMP/sederajat, SMA/sederajat, dan mahasiswa yang ingin mengikuti lomba.

#### Panitia/Admin
Tim internal yang mengelola informasi lomba, pendaftaran, pembayaran, berkas, dan pengumuman.

#### Super Admin
Admin utama yang memiliki akses penuh untuk mengelola seluruh data website dan admin lain.

---

## 2. Konteks Event GAMES

### 2.1 Deskripsi GAMES
Gebyar Matematika Sains (GAMES) merupakan program kerja tahunan dari Divisi Pendidikan. Kegiatan ini merupakan bentuk pengabdian mahasiswa Matematika kepada masyarakat dan upaya peningkatan kualitas pendidikan, khususnya di bidang Matematika di seluruh Indonesia.

GAMES terdiri dari berbagai lomba seperti:

1. Lomba Cepat Tepat (LCT) Matematika.
2. Olimpiade Matematika.
3. Ranking 1.
4. LKTI.
5. Calculus Competition.
6. Lomba lain yang setingkat nasional.

Peserta lomba berasal dari jenjang SD, SMP, SMA, dan mahasiswa di seluruh Indonesia, dengan beberapa lomba dapat memiliki cakupan wilayah tertentu sesuai ketentuan panitia.

### 2.2 Lomba Cepat Tepat (LCT) Matematika
Lomba Cepat Tepat (LCT) Matematika adalah kompetisi yang menguji kecepatan dan ketepatan peserta dalam menyelesaikan soal-soal matematika.

Peserta LCT Matematika:

1. SD/sederajat.
2. SMP/sederajat.
3. SMA/sederajat.

LCT tidak hanya menguji kemampuan kognitif, tetapi juga kemampuan pemecahan masalah, kerja sama tim, dan kecepatan berpikir.

### 2.3 Olimpiade Matematika
Olimpiade Matematika adalah kompetisi yang menguji kemampuan matematika, pemecahan masalah, serta kecerdasan siswa dalam menyelesaikan soal-soal matematika yang kompleks dan menantang.

Peserta Olimpiade Matematika:

1. SD/sederajat.
2. SMP/sederajat.
3. SMA/sederajat.

Cakupan awal: se-Sulawesi Tenggara, atau sesuai ketentuan panitia pada tahun berjalan.

### 2.4 Ranking 1
Ranking 1 adalah kompetisi antar siswa SD/sederajat. Peserta akan bersaing menjawab pertanyaan dengan benar hingga tersisa satu kontestan sebagai pemenang.

Kompetisi ini menguji ketepatan, konsentrasi, dan pengetahuan peserta.

---

## 3. Prinsip Pengembangan

### 3.1 Fokus Utama
Produk harus mengutamakan MVP terlebih dahulu. Fitur harus sederhana, stabil, mudah digunakan panitia, dan tidak terlalu bergantung pada layanan berbayar.

### 3.2 Prinsip MVP
MVP harus:

1. Bisa dipakai untuk menampilkan informasi lomba.
2. Bisa dipakai untuk menerima pendaftaran peserta.
3. Bisa dipakai admin untuk mengelola konten lomba.
4. Bisa dipakai panitia untuk memvalidasi peserta secara manual.
5. Bisa di-host dengan biaya seminimal mungkin.
6. Bisa dikembangkan lagi setelah event berjalan.

### 3.3 Strategi Biaya
Untuk tahap awal, maksimalkan layanan gratis:

1. Frontend hosting: Cloudflare Pages atau Vercel Free.
2. Backend/database: Supabase Free.
3. File besar: Google Drive link.
4. Domain: menggunakan domain yang sudah tersedia atau dibeli terpisah.

### 3.4 Fitur yang Tidak Masuk MVP
Fitur berikut tidak dikerjakan pada MVP:

1. Payment gateway otomatis.
2. WhatsApp otomatis.
3. Sertifikat otomatis.
4. Penjurian online.
5. Upload video besar.
6. Ujian online.
7. Fitur kompleks tambahan di luar scope MVP.

---

## 4. Stack Teknologi yang Direkomendasikan

### 4.1 Frontend
Gunakan salah satu:

1. **Next.js** jika ingin struktur aplikasi yang rapi dan siap berkembang.
2. **React + Vite** jika ingin cepat, ringan, dan sederhana.
3. **Astro** jika fokus utama adalah website informasi yang sangat ringan.

Rekomendasi untuk AI agent:

**React + Vite + TypeScript** untuk MVP cepat.

Alasan:

1. Cepat dibuat.
2. Mudah di-deploy ke Cloudflare Pages/Vercel.
3. Cocok untuk frontend publik dan admin panel.
4. Tidak perlu server sendiri.

### 4.2 Styling
Gunakan:

1. Tailwind CSS.
2. Component kecil reusable.
3. Responsive mobile-first.

### 4.3 Backend
Gunakan:

**Supabase** sebagai backend utama.

Supabase digunakan untuk:

1. Database PostgreSQL.
2. Auth admin.
3. Storage file kecil.
4. API otomatis.
5. Row Level Security.

### 4.4 Storage File
Gunakan kombinasi:

1. Supabase Storage untuk file kecil seperti poster, logo sponsor, dan guidebook kecil.
2. Google Drive untuk file besar seperti karya peserta, video, atau dokumen besar.

### 4.5 Hosting
Gunakan salah satu:

1. Cloudflare Pages.
2. Vercel.

Rekomendasi:

**Cloudflare Pages** untuk frontend static.

---

## 5. Scope MVP

### 5.1 Fitur Publik MVP

#### 5.1.1 Homepage
Homepage harus menampilkan:

1. Nama event: Gebyar Matematika Sains (GAMES).
2. Deskripsi singkat event.
3. Banner utama.
4. Tombol daftar.
5. Tombol lihat lomba.
6. Ringkasan lomba.
7. Timeline singkat.
8. Pengumuman terbaru.
9. Kontak panitia.

Acceptance Criteria:

1. Pengunjung dapat melihat informasi utama event tanpa login.
2. Tombol daftar mengarah ke halaman daftar lomba atau form pendaftaran.
3. Homepage responsif di mobile dan desktop.

#### 5.1.2 Halaman Daftar Lomba
Halaman ini menampilkan semua cabang lomba yang aktif pada tahun berjalan.

Data yang ditampilkan:

1. Nama lomba.
2. Jenjang peserta.
3. Deskripsi singkat.
4. Biaya pendaftaran jika ada.
5. Status pendaftaran: buka/tutup.
6. Tombol detail.
7. Tombol daftar.

Acceptance Criteria:

1. Lomba dapat ditampilkan berdasarkan data dari Supabase.
2. Lomba yang tidak aktif tidak ditampilkan di halaman publik.
3. Setiap lomba memiliki link detail.

#### 5.1.3 Halaman Detail Lomba
Halaman detail lomba berisi:

1. Nama lomba.
2. Deskripsi lengkap.
3. Jenjang peserta.
4. Syarat peserta.
5. Biaya pendaftaran.
6. Timeline khusus lomba jika ada.
7. Hadiah jika ada.
8. Link guidebook.
9. Kontak person.
10. Tombol daftar.

Acceptance Criteria:

1. Detail lomba bisa dibuka berdasarkan slug.
2. Jika lomba ditutup, tombol daftar menampilkan status pendaftaran ditutup.
3. Jika guidebook tersedia, peserta bisa membuka/mengunduhnya.

#### 5.1.4 Halaman Timeline
Halaman timeline menampilkan jadwal event.

Data timeline:

1. Judul kegiatan.
2. Tanggal mulai.
3. Tanggal selesai jika ada.
4. Deskripsi singkat.
5. Cabang lomba terkait jika ada.

Acceptance Criteria:

1. Timeline ditampilkan urut berdasarkan tanggal.
2. Timeline bisa bersifat umum atau khusus per lomba.

#### 5.1.5 Halaman FAQ
FAQ berisi pertanyaan umum.

Contoh FAQ:

1. Bagaimana cara mendaftar?
2. Apa saja syarat peserta?
3. Bagaimana cara upload bukti pembayaran?
4. Bagaimana cara mengetahui status pendaftaran?
5. Siapa kontak panitia?

Acceptance Criteria:

1. FAQ ditampilkan dalam format accordion atau daftar yang mudah dibaca.
2. Data FAQ diambil dari Supabase.

#### 5.1.6 Halaman Pengumuman
Halaman ini menampilkan pengumuman resmi.

Jenis pengumuman:

1. Informasi umum.
2. Finalis.
3. Pemenang.
4. Perubahan jadwal.
5. Informasi teknis.

Acceptance Criteria:

1. Hanya pengumuman berstatus published yang muncul di publik.
2. Pengumuman dapat difilter berdasarkan lomba atau kategori.
3. Pengumuman memiliki halaman detail.

#### 5.1.7 Halaman Kontak
Halaman kontak menampilkan:

1. Nama panitia/kontak person.
2. Nomor WhatsApp.
3. Email.
4. Instagram.
5. Lokasi jika diperlukan.

Acceptance Criteria:

1. Tombol WhatsApp membuka chat ke nomor yang benar.
2. Kontak bisa dikelola dari admin panel atau config awal.

---

## 6. Fitur Pendaftaran MVP

### 6.1 Form Pendaftaran Peserta
Form pendaftaran digunakan peserta untuk mendaftar lomba.

Field minimal:

1. Cabang lomba.
2. Jenjang peserta.
3. Nama ketua/peserta utama.
4. Email.
5. Nomor WhatsApp.
6. Asal sekolah/kampus.
7. Nama tim jika lomba tim.
8. Nama anggota tim jika ada.
9. Bukti pembayaran kecil atau link bukti pembayaran.
10. Link karya/berkas Google Drive jika lomba membutuhkan berkas.
11. Persetujuan syarat dan ketentuan.

Acceptance Criteria:

1. Peserta dapat memilih lomba yang aktif.
2. Peserta tidak dapat daftar pada lomba yang ditutup.
3. Sistem membuat nomor registrasi otomatis.
4. Setelah berhasil daftar, peserta melihat halaman sukses berisi kode registrasi.
5. Data masuk ke Supabase.

### 6.2 Nomor Registrasi Otomatis
Format nomor registrasi disarankan:

`GAMES-{YEAR}-{COMPETITION_CODE}-{NUMBER}`

Contoh:

1. GAMES-2026-LCT-0001
2. GAMES-2026-OLIM-0001
3. GAMES-2026-R1-0001

Acceptance Criteria:

1. Nomor registrasi unik.
2. Nomor registrasi muncul setelah peserta daftar.
3. Nomor registrasi disimpan di database.

### 6.3 Cek Status Peserta
Peserta dapat mengecek status pendaftaran melalui halaman publik.

Input:

1. Nomor registrasi.
2. Email atau nomor WhatsApp sebagai verifikasi sederhana.

Output:

1. Nama peserta/tim.
2. Cabang lomba.
3. Status pendaftaran.
4. Status pembayaran.
5. Status berkas.
6. Catatan admin jika ada.

Acceptance Criteria:

1. Data peserta tidak bisa dilihat hanya dengan menebak nomor registrasi.
2. Harus ada kombinasi kode registrasi dan email/WhatsApp.
3. Data sensitif seperti bukti pembayaran tidak ditampilkan ke publik.

---

## 7. Fitur Admin MVP

### 7.1 Login Admin
Admin login menggunakan Supabase Auth.

Acceptance Criteria:

1. Admin harus login sebelum mengakses `/admin`.
2. User yang bukan admin tidak boleh mengakses dashboard.
3. Setelah logout, admin tidak bisa membuka halaman admin tanpa login ulang.

### 7.2 Dashboard Admin
Dashboard menampilkan ringkasan:

1. Total peserta.
2. Total peserta per lomba.
3. Jumlah peserta pending.
4. Jumlah pembayaran menunggu validasi.
5. Jumlah berkas menunggu validasi.
6. Pengumuman terbaru.

Acceptance Criteria:

1. Dashboard menampilkan data dari Supabase.
2. Data berubah ketika ada pendaftaran baru.

### 7.3 Kelola Event/Tahun
Admin dapat mengelola event tahunan.

Field:

1. Tahun.
2. Nama event.
3. Tema.
4. Deskripsi.
5. Tanggal mulai.
6. Tanggal selesai.
7. Status aktif.

Acceptance Criteria:

1. Hanya satu event yang dapat ditandai aktif untuk homepage utama.
2. Event lama tetap tersimpan sebagai arsip.

### 7.4 Kelola Lomba
Admin dapat menambah, mengedit, dan menonaktifkan lomba.

Field:

1. Event ID.
2. Nama lomba.
3. Slug.
4. Kode lomba.
5. Deskripsi pendek.
6. Deskripsi panjang.
7. Jenjang peserta.
8. Tipe lomba: individu/tim.
9. Minimal anggota.
10. Maksimal anggota.
11. Biaya pendaftaran.
12. Status pendaftaran.
13. Tanggal buka pendaftaran.
14. Tanggal tutup pendaftaran.
15. Link guidebook.
16. Poster URL.
17. Contact person.
18. Status aktif.

Acceptance Criteria:

1. Admin dapat membuat lomba baru.
2. Admin dapat mengubah status pendaftaran buka/tutup.
3. Lomba yang tidak aktif tidak muncul di publik.
4. Slug unik.

### 7.5 Kelola Timeline
Admin dapat mengelola jadwal event.

Field:

1. Event ID.
2. Competition ID optional.
3. Judul.
4. Deskripsi.
5. Tanggal mulai.
6. Tanggal selesai optional.
7. Urutan.
8. Status tampil.

Acceptance Criteria:

1. Timeline dapat ditampilkan secara umum dan per lomba.
2. Timeline publik hanya menampilkan data yang aktif.

### 7.6 Kelola FAQ
Admin dapat mengelola FAQ.

Field:

1. Pertanyaan.
2. Jawaban.
3. Urutan.
4. Status aktif.

Acceptance Criteria:

1. FAQ bisa ditambah, diedit, dan dinonaktifkan.
2. FAQ publik diurutkan berdasarkan nomor urut.

### 7.7 Kelola Pengumuman
Admin dapat membuat dan mengedit pengumuman.

Field:

1. Event ID.
2. Competition ID optional.
3. Judul.
4. Slug.
5. Kategori.
6. Isi pengumuman.
7. Lampiran URL optional.
8. Status: draft/published.
9. Tanggal publish.

Acceptance Criteria:

1. Draft tidak muncul di publik.
2. Published muncul di halaman pengumuman.
3. Pengumuman dapat difilter berdasarkan lomba/kategori.

### 7.8 Kelola Peserta
Admin dapat melihat dan memvalidasi peserta.

Fitur:

1. Tabel peserta.
2. Filter berdasarkan lomba.
3. Filter berdasarkan status pembayaran.
4. Filter berdasarkan status berkas.
5. Pencarian nama/kode registrasi/sekolah.
6. Detail peserta.
7. Validasi pembayaran.
8. Validasi berkas.
9. Catatan admin.
10. Export CSV.

Acceptance Criteria:

1. Admin dapat melihat semua pendaftar.
2. Admin dapat mengubah status pembayaran.
3. Admin dapat mengubah status berkas.
4. Admin dapat menambahkan catatan.
5. Data dapat diexport ke CSV.

---

## 8. Status dan Alur Data

### 8.1 Status Pendaftaran
Gunakan status:

1. `pending` = pendaftaran masuk, belum dicek.
2. `verified` = data peserta valid.
3. `rejected` = pendaftaran ditolak.
4. `revision_required` = perlu perbaikan.

### 8.2 Status Pembayaran
Gunakan status:

1. `unpaid` = belum bayar/belum upload bukti.
2. `pending` = bukti sudah dikirim, menunggu validasi.
3. `valid` = pembayaran valid.
4. `rejected` = bukti ditolak.
5. `revision_required` = perlu upload ulang/perbaikan.

### 8.3 Status Berkas
Gunakan status:

1. `not_required` = lomba tidak butuh berkas.
2. `not_submitted` = belum mengirim berkas.
3. `pending` = berkas menunggu validasi.
4. `valid` = berkas valid.
5. `rejected` = berkas ditolak.
6. `revision_required` = perlu revisi.

---

## 9. Data Model Supabase

### 9.1 Tabel `profiles`
Menyimpan data user admin.

Columns:

1. `id` uuid primary key, references auth.users(id)
2. `full_name` text
3. `role` text default `admin`
4. `is_active` boolean default true
5. `created_at` timestamptz default now()

Role:

1. `super_admin`
2. `admin`

### 9.2 Tabel `events`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `year` integer not null
3. `name` text not null
4. `theme` text
5. `description` text
6. `start_date` date
7. `end_date` date
8. `is_active` boolean default false
9. `created_at` timestamptz default now()
10. `updated_at` timestamptz default now()

### 9.3 Tabel `competitions`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `event_id` uuid references events(id)
3. `name` text not null
4. `slug` text unique not null
5. `code` text not null
6. `short_description` text
7. `description` text
8. `participant_levels` text[]
9. `competition_type` text default `individual`
10. `min_members` integer default 1
11. `max_members` integer default 1
12. `registration_fee` integer default 0
13. `registration_status` text default `closed`
14. `registration_open_at` timestamptz
15. `registration_close_at` timestamptz
16. `guidebook_url` text
17. `poster_url` text
18. `contact_person` text
19. `is_active` boolean default true
20. `created_at` timestamptz default now()
21. `updated_at` timestamptz default now()

### 9.4 Tabel `timelines`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `event_id` uuid references events(id)
3. `competition_id` uuid references competitions(id), nullable
4. `title` text not null
5. `description` text
6. `start_date` date not null
7. `end_date` date
8. `sort_order` integer default 0
9. `is_active` boolean default true
10. `created_at` timestamptz default now()

### 9.5 Tabel `faqs`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `event_id` uuid references events(id)
3. `question` text not null
4. `answer` text not null
5. `sort_order` integer default 0
6. `is_active` boolean default true
7. `created_at` timestamptz default now()

### 9.6 Tabel `announcements`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `event_id` uuid references events(id)
3. `competition_id` uuid references competitions(id), nullable
4. `title` text not null
5. `slug` text unique not null
6. `category` text default `general`
7. `content` text not null
8. `attachment_url` text
9. `status` text default `draft`
10. `published_at` timestamptz
11. `created_at` timestamptz default now()
12. `updated_at` timestamptz default now()

### 9.7 Tabel `registrations`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `event_id` uuid references events(id)
3. `competition_id` uuid references competitions(id)
4. `registration_code` text unique not null
5. `participant_type` text default `individual`
6. `team_name` text
7. `leader_name` text not null
8. `email` text not null
9. `whatsapp` text not null
10. `institution` text not null
11. `level` text
12. `payment_proof_url` text
13. `submission_url` text
14. `registration_status` text default `pending`
15. `payment_status` text default `unpaid`
16. `submission_status` text default `not_required`
17. `admin_note` text
18. `created_at` timestamptz default now()
19. `updated_at` timestamptz default now()

### 9.8 Tabel `registration_members`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `registration_id` uuid references registrations(id) on delete cascade
3. `name` text not null
4. `role` text
5. `created_at` timestamptz default now()

### 9.9 Tabel `sponsors`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `event_id` uuid references events(id)
3. `name` text not null
4. `logo_url` text
5. `website_url` text
6. `sponsor_type` text default `sponsor`
7. `sort_order` integer default 0
8. `is_active` boolean default true
9. `created_at` timestamptz default now()

### 9.10 Tabel `galleries`
Columns:

1. `id` uuid primary key default gen_random_uuid()
2. `event_id` uuid references events(id)
3. `title` text
4. `image_url` text not null
5. `description` text
6. `sort_order` integer default 0
7. `is_active` boolean default true
8. `created_at` timestamptz default now()

---

## 10. Keamanan dan RLS Supabase

### 10.1 Prinsip RLS
Aktifkan Row Level Security pada semua tabel.

### 10.2 Data Publik yang Boleh Dibaca Tanpa Login
Publik boleh membaca:

1. `events` yang aktif.
2. `competitions` yang aktif.
3. `timelines` yang aktif.
4. `faqs` yang aktif.
5. `announcements` dengan status `published`.
6. `sponsors` yang aktif.
7. `galleries` yang aktif.

### 10.3 Data yang Boleh Diinsert Publik
Publik boleh insert:

1. `registrations` untuk pendaftaran.
2. `registration_members` untuk anggota tim.

Namun publik tidak boleh:

1. Membaca semua data peserta.
2. Mengubah data peserta sembarangan.
3. Menghapus data.
4. Melihat bukti pembayaran peserta lain.

### 10.4 Data Admin
Admin yang login boleh:

1. CRUD events.
2. CRUD competitions.
3. CRUD timelines.
4. CRUD faqs.
5. CRUD announcements.
6. CRUD sponsors.
7. CRUD galleries.
8. Read/update registrations.
9. Read/update registration_members.

Super admin boleh mengelola profiles/admin.

### 10.5 Secret Key
Jangan pernah menaruh `SUPABASE_SERVICE_ROLE_KEY` di frontend.

Frontend hanya boleh memakai:

1. Supabase URL.
2. Supabase anon key.

Keamanan harus dikendalikan oleh RLS.

---

## 11. Routing Aplikasi

### 11.1 Public Routes

1. `/` = homepage.
2. `/lomba` = daftar lomba.
3. `/lomba/:slug` = detail lomba.
4. `/timeline` = timeline.
5. `/faq` = FAQ.
6. `/pengumuman` = daftar pengumuman.
7. `/pengumuman/:slug` = detail pengumuman.
8. `/daftar` = form pendaftaran.
9. `/cek-status` = cek status peserta.
10. `/kontak` = kontak panitia.
11. `/arsip/:year` = arsip event tahun tertentu, optional untuk fase setelah MVP.

### 11.2 Admin Routes

1. `/admin/login` = login admin.
2. `/admin` = dashboard.
3. `/admin/events` = kelola event/tahun.
4. `/admin/competitions` = kelola lomba.
5. `/admin/timelines` = kelola timeline.
6. `/admin/faqs` = kelola FAQ.
7. `/admin/announcements` = kelola pengumuman.
8. `/admin/registrations` = kelola peserta.
9. `/admin/registrations/:id` = detail peserta.
10. `/admin/sponsors` = kelola sponsor/media partner.
11. `/admin/galleries` = kelola galeri.
12. `/admin/settings` = pengaturan dasar.

---

## 12. UX dan UI Requirements

### 12.1 Gaya Visual
Website harus terlihat:

1. Edukatif.
2. Modern.
3. Profesional.
4. Ramah untuk siswa dan mahasiswa.
5. Mudah dipakai dari HP.

### 12.2 Rekomendasi Warna
Gunakan kombinasi warna yang identik dengan pendidikan, sains, dan matematika.

Contoh:

1. Biru sebagai warna utama.
2. Kuning/oranye sebagai aksen.
3. Putih untuk background utama.
4. Abu-abu untuk teks sekunder.

### 12.3 Responsiveness
Website harus nyaman digunakan pada:

1. Mobile.
2. Tablet.
3. Desktop.

### 12.4 Admin Panel
Admin panel harus sederhana.

Prinsip:

1. Jangan terlalu banyak menu.
2. Gunakan tabel yang jelas.
3. Gunakan form yang mudah dipahami.
4. Gunakan badge warna untuk status.
5. Gunakan tombol aksi yang jelas.

---

## 13. Prioritas Pengerjaan

## 13.1 Phase 0: Setup Awal
Target: hari pertama.

Tasks:

1. Setup project React + Vite + TypeScript.
2. Setup Tailwind CSS.
3. Setup Supabase client.
4. Setup environment variable.
5. Setup routing.
6. Setup layout public.
7. Setup layout admin.
8. Setup repository Git.
9. Setup deploy preview.

Deliverables:

1. Project berjalan lokal.
2. Routing dasar tersedia.
3. Koneksi Supabase berhasil.
4. Tampilan awal publik dan admin tersedia.

---

## 13.2 Phase 1: MVP Cepat 1–3 Hari
Target: versi demo fungsional awal.

### Hari 1
Fokus:

1. Setup project.
2. Setup database Supabase.
3. Buat tabel utama.
4. Buat homepage statis/dinamis sederhana.
5. Buat daftar lomba dari database.
6. Buat detail lomba.

Output hari 1:

1. Website bisa dibuka.
2. Homepage tampil.
3. Lomba bisa tampil dari Supabase.
4. Detail lomba bisa dibuka.

### Hari 2
Fokus:

1. Admin login.
2. Admin dashboard sederhana.
3. CRUD lomba.
4. CRUD timeline.
5. CRUD FAQ.
6. CRUD pengumuman sederhana.

Output hari 2:

1. Admin bisa login.
2. Admin bisa tambah/edit lomba.
3. Admin bisa tambah/edit timeline.
4. Admin bisa tambah/edit FAQ.
5. Admin bisa publish pengumuman.

### Hari 3
Fokus:

1. Form pendaftaran peserta.
2. Generate nomor registrasi.
3. Data peserta masuk Supabase.
4. Dashboard peserta sederhana.
5. Validasi pembayaran manual.
6. Cek status peserta.

Output hari 3:

1. Peserta bisa daftar.
2. Peserta mendapat nomor registrasi.
3. Admin bisa melihat pendaftar.
4. Admin bisa ubah status pembayaran.
5. Peserta bisa cek status.

### Scope 1–3 Hari
Fitur yang harus selesai:

1. Homepage.
2. Daftar lomba.
3. Detail lomba.
4. Admin login.
5. CRUD lomba.
6. CRUD timeline.
7. CRUD FAQ.
8. CRUD pengumuman.
9. Form pendaftaran.
10. Nomor registrasi otomatis.
11. Dashboard peserta.
12. Validasi pembayaran manual.
13. Cek status peserta.

Fitur yang boleh sederhana dulu:

1. Desain UI.
2. Galeri.
3. Sponsor.
4. Export CSV.
5. Upload file.

---

## 13.3 Phase 2: Full MVP 1–2 Minggu
Target: versi siap dipakai panitia.

### Minggu 1
Fokus:

1. Rapikan UI public website.
2. Rapikan admin panel.
3. Lengkapi CRUD semua konten.
4. Tambahkan sponsor/media partner.
5. Tambahkan galeri.
6. Tambahkan upload poster/guidebook kecil.
7. Tambahkan filter dan search di admin peserta.
8. Tambahkan export CSV.
9. Tambahkan validasi form.
10. Tambahkan loading, empty state, dan error state.

Output minggu 1:

1. Semua fitur konten berjalan.
2. Admin panel nyaman dipakai.
3. Pendaftaran stabil.
4. Data peserta bisa difilter dan diexport.

### Minggu 2
Fokus:

1. Implement RLS dengan benar.
2. Testing role admin.
3. Testing alur peserta.
4. Testing alur panitia.
5. Optimasi mobile.
6. SEO dasar.
7. Open Graph image.
8. Deploy final.
9. Dokumentasi penggunaan admin.
10. Backup/export data awal.

Output minggu 2:

1. Website siap digunakan.
2. Admin bisa mengelola event.
3. Peserta bisa daftar dan cek status.
4. Data peserta aman.
5. Dokumentasi tersedia.

---

## 14. Detail User Flow

### 14.1 Flow Peserta Daftar Lomba

1. Peserta membuka website.
2. Peserta membaca informasi di homepage.
3. Peserta membuka halaman lomba.
4. Peserta memilih lomba.
5. Peserta membaca detail lomba dan guidebook.
6. Peserta klik tombol daftar.
7. Peserta mengisi form.
8. Peserta mengirim bukti pembayaran atau link bukti.
9. Peserta mengirim link karya jika dibutuhkan.
10. Peserta klik submit.
11. Sistem membuat nomor registrasi.
12. Peserta melihat halaman sukses.
13. Peserta menyimpan nomor registrasi.
14. Peserta dapat cek status di halaman cek status.

### 14.2 Flow Admin Kelola Lomba

1. Admin membuka `/admin/login`.
2. Admin login.
3. Admin masuk dashboard.
4. Admin membuka menu lomba.
5. Admin menambah lomba baru.
6. Admin mengisi detail lomba.
7. Admin menyimpan lomba.
8. Lomba muncul di halaman publik jika aktif.

### 14.3 Flow Admin Validasi Peserta

1. Admin login.
2. Admin membuka menu peserta.
3. Admin melihat daftar peserta.
4. Admin filter berdasarkan lomba/status.
5. Admin membuka detail peserta.
6. Admin memeriksa bukti pembayaran.
7. Admin mengubah status pembayaran.
8. Admin menambahkan catatan jika perlu.
9. Peserta bisa melihat status terbaru melalui halaman cek status.

---

## 15. Acceptance Criteria Global MVP

Website dianggap MVP selesai jika:

1. Pengunjung dapat melihat homepage.
2. Pengunjung dapat melihat daftar lomba.
3. Pengunjung dapat melihat detail lomba.
4. Pengunjung dapat melihat timeline.
5. Pengunjung dapat melihat FAQ.
6. Pengunjung dapat melihat pengumuman.
7. Peserta dapat mendaftar lomba.
8. Peserta mendapat nomor registrasi.
9. Peserta dapat cek status pendaftaran.
10. Admin dapat login.
11. Admin dapat mengelola lomba.
12. Admin dapat mengelola timeline.
13. Admin dapat mengelola FAQ.
14. Admin dapat mengelola pengumuman.
15. Admin dapat melihat data peserta.
16. Admin dapat memvalidasi pembayaran manual.
17. Admin dapat memvalidasi berkas manual.
18. Admin dapat export data peserta.
19. Data peserta tidak bisa dibaca bebas oleh publik.
20. Website responsif di HP.
21. Website berhasil deploy ke domain/subdomain.

---

## 16. Non-Functional Requirements

### 16.1 Performance
1. Halaman utama harus cepat dibuka.
2. Gambar harus dikompres.
3. Jangan load data peserta di halaman publik.
4. Gunakan pagination untuk data peserta di admin.

### 16.2 Security
1. Semua tabel penting menggunakan RLS.
2. Data peserta tidak boleh public.
3. Admin routes harus protected.
4. Service role key tidak boleh ada di frontend.
5. File bukti pembayaran jangan dibuat public jika sensitif.

### 16.3 Reliability
1. Data peserta harus tersimpan dengan benar.
2. Form pendaftaran harus menampilkan error jika gagal submit.
3. Admin harus bisa export data sebagai backup manual.

### 16.4 Usability
1. Bahasa harus mudah dipahami non-IT.
2. Admin panel tidak boleh membingungkan.
3. Status harus memakai label jelas seperti Menunggu, Valid, Ditolak, Revisi.
4. Form harus punya validasi dan pesan error.

---

## 17. Seed Data Awal

### 17.1 Event
Nama: Gebyar Matematika Sains (GAMES)

Deskripsi:
Gebyar Matematika Sains (GAMES) merupakan program kerja tahunan dari Divisi Pendidikan sebagai wujud pengabdian mahasiswa Matematika terhadap masyarakat dan peningkatan kualitas pendidikan, khususnya di bidang Matematika di seluruh Indonesia.

### 17.2 Lomba Awal

#### LCT Matematika
Kode: LCT
Slug: `lct-matematika`
Jenjang: SD/sederajat, SMP/sederajat, SMA/sederajat
Tipe: Tim atau sesuai ketentuan panitia
Deskripsi:
Lomba Cepat Tepat (LCT) Matematika adalah kompetisi yang menguji kecepatan dan ketepatan peserta dalam menyelesaikan soal-soal matematika dalam waktu terbatas.

#### Olimpiade Matematika
Kode: OLIM
Slug: `olimpiade-matematika`
Jenjang: SD/sederajat, SMP/sederajat, SMA/sederajat
Tipe: Individu
Deskripsi:
Olimpiade Matematika merupakan kompetisi yang menguji kemampuan matematika, pemecahan masalah, dan kecerdasan siswa dalam menyelesaikan soal-soal matematika yang kompleks dan menantang.

#### Ranking 1
Kode: R1
Slug: `ranking-1`
Jenjang: SD/sederajat
Tipe: Individu
Deskripsi:
Ranking 1 adalah kompetisi antar siswa SD/sederajat di mana peserta bersaing menjawab pertanyaan dengan benar hingga tersisa satu kontestan sebagai pemenang.

#### LKTI
Kode: LKTI
Slug: `lkti`
Jenjang: SMA/sederajat atau mahasiswa sesuai ketentuan panitia
Tipe: Tim
Deskripsi:
LKTI adalah lomba karya tulis ilmiah yang menguji kemampuan peserta dalam berpikir ilmiah, menulis, dan menyampaikan gagasan.

#### Calculus Competition
Kode: CALC
Slug: `calculus-competition`
Jenjang: Mahasiswa atau sesuai ketentuan panitia
Tipe: Individu/tim sesuai ketentuan panitia
Deskripsi:
Calculus Competition adalah kompetisi yang menguji kemampuan peserta dalam memahami dan menyelesaikan persoalan kalkulus.

---

## 18. Component Requirements

### 18.1 Public Components
Buat komponen:

1. `Navbar`
2. `Footer`
3. `HeroSection`
4. `CompetitionCard`
5. `TimelineItem`
6. `FAQAccordion`
7. `AnnouncementCard`
8. `SponsorGrid`
9. `GalleryGrid`
10. `StatusBadge`
11. `LoadingState`
12. `EmptyState`
13. `ErrorState`

### 18.2 Admin Components
Buat komponen:

1. `AdminLayout`
2. `AdminSidebar`
3. `AdminTopbar`
4. `ProtectedRoute`
5. `DataTable`
6. `FormInput`
7. `FormTextarea`
8. `FormSelect`
9. `StatusSelect`
10. `ConfirmDialog`
11. `CSVExportButton`
12. `Pagination`
13. `SearchInput`
14. `FilterBar`

---

## 19. Prompt Eksekusi untuk AI Agent

### 19.1 Prompt Umum untuk Codex/Antigravity
Gunakan prompt berikut sebagai instruksi utama:

```text
Bangun website MVP untuk Gebyar Matematika Sains (GAMES) menggunakan React + Vite + TypeScript + Tailwind CSS + Supabase.

Prioritaskan fitur MVP:
1. Public website: homepage, daftar lomba, detail lomba, timeline, FAQ, pengumuman, kontak.
2. Admin panel: login, dashboard, CRUD event, CRUD lomba, CRUD timeline, CRUD FAQ, CRUD pengumuman.
3. Pendaftaran peserta: form daftar, nomor registrasi otomatis, simpan ke Supabase.
4. Dashboard peserta admin: list peserta, filter, search, validasi pembayaran manual, validasi berkas manual, catatan admin, export CSV.
5. Cek status peserta: input nomor registrasi + email/WhatsApp, tampilkan status.

Gunakan Supabase sebagai backend. Jangan gunakan service role key di frontend. Buat struktur kode rapi, reusable component, dan mobile responsive.

Jangan kerjakan fitur non-MVP: payment gateway otomatis, WhatsApp otomatis, sertifikat otomatis, penjurian online, upload video besar, ujian online.
```

### 19.2 Prompt Database
```text
Buat SQL migration untuk Supabase berdasarkan PRD GAMES. Tabel wajib:
profiles, events, competitions, timelines, faqs, announcements, registrations, registration_members, sponsors, galleries.

Aktifkan RLS. Buat policy public read untuk konten aktif/published. Buat policy public insert untuk registrations dan registration_members. Buat policy admin full access untuk user yang memiliki profile role admin atau super_admin.

Tambahkan seed data awal untuk event GAMES dan lomba LCT Matematika, Olimpiade Matematika, Ranking 1, LKTI, dan Calculus Competition.
```

### 19.3 Prompt UI Public
```text
Buat halaman publik website GAMES dengan desain modern, edukatif, responsive, dan mobile-first. Gunakan Tailwind CSS. Halaman wajib:
/, /lomba, /lomba/:slug, /timeline, /faq, /pengumuman, /pengumuman/:slug, /daftar, /cek-status, /kontak.

Data harus diambil dari Supabase. Tambahkan loading state, empty state, dan error state.
```

### 19.4 Prompt Admin Panel
```text
Buat admin panel GAMES di route /admin. Admin harus login menggunakan Supabase Auth. Lindungi semua route admin dengan ProtectedRoute.

Menu admin:
Dashboard, Events, Lomba, Timeline, FAQ, Pengumuman, Peserta, Sponsor, Galeri.

Setiap menu CRUD harus memiliki tabel, tombol tambah, edit, hapus/nonaktifkan, search/filter jika diperlukan, dan form validasi.
```

### 19.5 Prompt Pendaftaran
```text
Buat form pendaftaran peserta GAMES. Peserta memilih lomba aktif, mengisi data peserta/tim, mengisi email, WhatsApp, instansi, bukti pembayaran/link bukti, dan link karya jika diperlukan.

Setelah submit, generate registration_code dengan format GAMES-{YEAR}-{COMPETITION_CODE}-{NUMBER}. Simpan data ke Supabase dan tampilkan halaman sukses berisi kode registrasi.
```

---

## 20. Risiko dan Mitigasi

### 20.1 Storage Supabase Penuh
Risiko:
File peserta terlalu banyak atau terlalu besar.

Mitigasi:
Gunakan Google Drive link untuk file besar. Supabase hanya menyimpan URL.

### 20.2 RLS Salah
Risiko:
Data peserta dapat terbaca publik.

Mitigasi:
Aktifkan RLS sejak awal. Test akses public dan admin sebelum deploy.

### 20.3 Scope Melebar
Risiko:
Pengerjaan molor.

Mitigasi:
Tunda fitur non-MVP. Gunakan daftar fitur tidak termasuk sebagai batas resmi.

### 20.4 Panitia Bingung Menggunakan Admin
Risiko:
Admin panel tidak terpakai optimal.

Mitigasi:
Buat UI sederhana dan dokumentasi penggunaan.

### 20.5 Free Tier Tidak Cukup
Risiko:
Limit layanan gratis tercapai.

Mitigasi:
Pantau usage Supabase. Gunakan Drive untuk file besar. Upgrade hanya jika terbukti perlu.

---

## 21. Dokumentasi yang Harus Dibuat

Buat file `README.md` berisi:

1. Deskripsi project.
2. Stack teknologi.
3. Cara install.
4. Cara setup `.env`.
5. Cara menjalankan lokal.
6. Cara deploy.
7. Struktur folder.
8. Daftar fitur MVP.
9. Cara membuat admin pertama.
10. Catatan keamanan Supabase.

Buat file `ADMIN_GUIDE.md` berisi:

1. Cara login admin.
2. Cara tambah lomba.
3. Cara edit timeline.
4. Cara membuat pengumuman.
5. Cara melihat peserta.
6. Cara validasi pembayaran.
7. Cara export data.
8. Cara mengubah status lomba.

---

## 22. Definition of Done

Project dianggap selesai untuk MVP jika:

1. Semua route publik berjalan.
2. Semua route admin MVP berjalan.
3. Admin login berjalan.
4. CRUD konten utama berjalan.
5. Form pendaftaran berjalan.
6. Nomor registrasi otomatis berjalan.
7. Admin bisa validasi peserta.
8. Peserta bisa cek status.
9. Export CSV berjalan.
10. RLS aktif dan diuji.
11. Website responsif.
12. Website berhasil deploy.
13. README tersedia.
14. ADMIN_GUIDE tersedia.

---

## 23. Roadmap Setelah MVP

Fitur yang bisa ditambahkan nanti:

1. Login peserta.
2. Upload file private yang lebih rapi.
3. Email notifikasi sederhana.
4. QR code peserta.
5. Sertifikat otomatis.
6. Payment gateway otomatis.
7. Dashboard juri.
8. Penjurian online.
9. WhatsApp gateway.
10. Multi-role admin lebih detail.
11. Audit log perubahan admin.
12. Backup otomatis.
13. Statistik lanjutan.
14. Halaman arsip tahunan yang lebih lengkap.

---

## 24. Catatan Final untuk Eksekusi

Prioritas utama adalah membuat sistem yang bisa dipakai dulu, bukan sistem yang terlalu sempurna.

Urutan kerja terbaik:

1. Buat database.
2. Buat website publik dasar.
3. Buat admin login.
4. Buat CRUD lomba dan konten utama.
5. Buat pendaftaran peserta.
6. Buat dashboard validasi peserta.
7. Amankan RLS.
8. Rapikan UI.
9. Deploy.
10. Dokumentasikan.

Jangan menambahkan fitur berat sebelum MVP selesai.

Fokus MVP:

**Website informasi + CMS admin + pendaftaran peserta + validasi manual + cek status + export data.**

