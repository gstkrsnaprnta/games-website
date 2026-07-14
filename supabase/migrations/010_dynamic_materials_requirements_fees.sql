-- FILE: supabase/migrations/010_dynamic_materials_requirements_fees.sql

-- 1. Menambah kolom visibilitas & pendukung di tabel competitions
alter table public.competitions
  add column if not exists requirements text[] default '{}',
  add column if not exists required_uploads text[] default '{}',
  add column if not exists rules text[] default '{}',
  add column if not exists writing_abstract text[] default '{}',
  add column if not exists writing_initial text[] default '{}',
  add column if not exists writing_core text[] default '{}',
  add column if not exists writing_requirements text[] default '{}',
  add column if not exists fee_wave_1_label text default 'Pendaftaran Gelombang I',
  add column if not exists fee_wave_1_period text,
  add column if not exists fee_wave_1_price numeric,
  add column if not exists fee_wave_2_label text default 'Pendaftaran Gelombang II',
  add column if not exists fee_wave_2_period text,
  add column if not exists fee_wave_2_price numeric;

-- 2. Membuat tabel competition_syllabus
create table if not exists public.competition_syllabus (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  title text,
  items text[] not null default '{}',
  sort_order integer default 0,
  created_at timestamptz default now()
);

create index if not exists idx_competition_syllabus_competition
  on public.competition_syllabus (competition_id, sort_order);

-- Aktifkan RLS
alter table public.competition_syllabus enable row level security;

-- Drop policy jika sudah ada
drop policy if exists "Public read active competition syllabus" on public.competition_syllabus;
drop policy if exists "Admin all competition syllabus" on public.competition_syllabus;

-- Buat policy baru
create policy "Public read active competition syllabus" on public.competition_syllabus
  for select using (true);

create policy "Admin all competition syllabus" on public.competition_syllabus
  for all using (public.is_admin()) with check (public.is_admin());

-- 3. Seeding data awal untuk 6 kompetisi yang sudah ada
do $$
declare
  v_calc_id uuid;
  v_ms_id uuid;
  v_lkti_id uuid;
  v_esai_id uuid;
  v_olim_id uuid;
  v_lctm_id uuid;
begin
  select id into v_calc_id from public.competitions where slug = 'calculus-competition' or slug = 'calculus' limit 1;
  select id into v_ms_id from public.competitions where slug = 'mathematical-statistics' limit 1;
  select id into v_lkti_id from public.competitions where slug = 'lomba-karya-tulis-ilmiah-nasional' or slug = 'lkti-nasional' or slug = 'lkti' limit 1;
  select id into v_esai_id from public.competitions where slug = 'lomba-esai-regional' or slug = 'esai-regional' or slug = 'esai' limit 1;
  select id into v_olim_id from public.competitions where slug = 'olimpiade-matematika' or slug = 'olimpiade' limit 1;
  select id into v_lctm_id from public.competitions where slug = 'lomba-cepat-tepat-matematika' or slug = 'lctm' or slug = 'lct-matematika' limit 1;

  -- ==========================================
  -- 1. CALCULUS COMPETITION
  -- ==========================================
  if v_calc_id is not null then
    update public.competitions set
      requirements = array[
        'Peserta merupakan mahasiswa aktif program D-III, D-IV, dan S-1 PTN/PTS se-Indonesia.',
        'Pendaftaran bersifat individu atau perorangan.',
        'Peserta dibebaskan dari jurusan/program studi mana saja.',
        'Mahasiswa pendaftar telah menyelesaikan biaya administrasi pendaftaran.'
      ],
      required_uploads = array[
        'Scan Kartu Tanda Mahasiswa (KTM) aktif/berlaku',
        'Bukti Pembayaran Pendaftaran'
      ],
      fee_wave_1_label = 'Pendaftaran Gelombang I',
      fee_wave_1_period = '15 Juni – 15 Agustus 2026',
      fee_wave_1_price = 75000,
      fee_wave_2_label = 'Pendaftaran Gelombang II',
      fee_wave_2_period = '17 Agustus – 11 September 2026',
      fee_wave_2_price = 90000
    where id = v_calc_id;

    if not exists (select 1 from public.competition_syllabus where competition_id = v_calc_id) then
      insert into public.competition_syllabus (competition_id, title, items, sort_order) values
      (v_calc_id, null, array[
        'Sistem Bilangan Real dan Fungsi',
        'Limit dan Kekontinuan Fungsi',
        'Turunan dan Aplikasi Turunan',
        'Teorema Dasar Kalkulus',
        'Integral dan Aplikasi Integral',
        'Jumlah Riemann',
        'Teorema Nilai Rata-Rata',
        'Fungsi Transenden',
        'Vektor di Bidang dan Ruang',
        'Fungsi Parameter',
        'Turunan Parsial dan Keterdiferensialan',
        'Aturan Rantai dan Turunan Berarah',
        'Ekstrim Fungsi dan Metode Lagrange',
        'Integral Lipat di Ruang Dimensi-n dan Aplikasinya',
        'Medan Vektor',
        'Integral Garis',
        'Teorema Green',
        'Curl dan Divergen'
      ], 0);
    end if;
  end if;

  -- ==========================================
  -- 2. MATHEMATICAL STATISTICS
  -- ==========================================
  if v_ms_id is not null then
    update public.competitions set
      requirements = array[
        'Peserta merupakan mahasiswa aktif program D-III, D-IV, dan S-1 PTN/PTS se-Indonesia.',
        'Pendaftaran bersifat individu atau perorangan.',
        'Peserta dibebaskan dari jurusan/program studi mana saja.',
        'Mahasiswa pendaftar telah menyelesaikan biaya administrasi pendaftaran.'
      ],
      required_uploads = array[
        'Scan Kartu Tanda Mahasiswa (KTM) aktif/berlaku',
        'Bukti Pembayaran Pendaftaran'
      ],
      fee_wave_1_label = 'Pendaftaran Gelombang I',
      fee_wave_1_period = '15 Juni – 15 Agustus 2026',
      fee_wave_1_price = 75000,
      fee_wave_2_label = 'Pendaftaran Gelombang II',
      fee_wave_2_period = '17 Agustus – 11 September 2026',
      fee_wave_2_price = 90000
    where id = v_ms_id;

    if not exists (select 1 from public.competition_syllabus where competition_id = v_ms_id) then
      insert into public.competition_syllabus (competition_id, title, items, sort_order) values
      (v_ms_id, null, array[
        'Estimasi Parameter',
        'Uji Hipotesis',
        'Regresi Linear'
      ], 0);
    end if;
  end if;

  -- ==========================================
  -- 3. LKTI NASIONAL
  -- ==========================================
  if v_lkti_id is not null then
    update public.competitions set
      requirements = array[
        'Peserta merupakan mahasiswa aktif program D-III, D-IV, dan S-1 PTN/PTS se-Indonesia.',
        'Peserta bersifat perorangan (individu) atau kelompok/tim maksimal 3 orang.',
        'Seluruh anggota tim harus berasal dari instansi yang sama.',
        'Peserta lomba dibebaskan dari jurusan/program studi mana saja.',
        'Peserta hanya diperbolehkan tergabung dalam satu tim saja.',
        'Peserta/tim hanya diperkenankan mengirimkan satu karya tulis.',
        'Mahasiswa pendaftar telah menyelesaikan biaya administrasi pendaftaran.'
      ],
      required_uploads = array[
        'Scan Kartu Tanda Mahasiswa (KTM) aktif seluruh anggota',
        'Softcopy Abstrak (untuk pendaftaran awal) & Full Paper (untuk tahap berikutnya) format PDF',
        'Bukti Pembayaran Pendaftaran'
      ],
      rules = array[
        'Sesuai dengan tema dan subtema yang telah ditentukan.',
        'Isi naskah LKTI merupakan hasil penelitian atau gagasan kreatif yang didukung oleh fakta dan temuan yang objektif.',
        'Naskah LKTI bersifat objektif, tidak mengandung unsur SARA, serta memberikan kontribusi nyata dalam pemecahan masalah.',
        'Tiap langkah penulisan dilakukan secara sistematis mengikuti kaidah yang benar, mencakup: Abstrak, Pendahuluan, Tinjauan Pustaka, Metodologi Penelitian, Hasil dan Pembahasan, Penutup, Daftar Pustaka.',
        'Karya harus bersifat asli, menunjukkan kebaruan ide (novelty), bukan hasil plagiat, dan belum pernah menjuarai ajang lomba lain.',
        'Ditulis menggunakan Bahasa Indonesia yang baik dan benar sesuai EYD, dengan penggunaan konsep serta istilah yang tepat dan konsisten.',
        'Karya yang dikirimkan akan diseleksi untuk menentukan finalis yang berhak mengikuti tahap presentasi di hadapan dewan juri.',
        'Peserta yang lolos diwajibkan menyiapkan media (seperti PowerPoint) untuk memaparkan keunggulan karyanya saat sesi presentasi.'
      ],
      writing_abstract = array[
        'Seluruh bagian abstrak ditulis menggunakan font Times New Roman, jarak satu spasi, baik dalam bahasa Indonesia maupun bahasa Inggris (jika ada).',
        'Judul Penelitian: Ditulis dengan huruf kapital, font 14, rata tengah (center), dan dicetak tebal (bold).',
        'Sub judul: (Jika ada) ditulis dengan font 12, rata tengah (center), dan dicetak tebal (bold).',
        'Nama Penulis: Mencantumkan nama anggota tim. Nama masing-masing peserta diberi nomor urut superscript di akhir nama, font 12, rata tengah (center), dan dicetak tebal (bold).',
        'Nama PTN/PTS: Ditulis rata tengah (center), font 12, dan dicetak tebal (bold).',
        'Kontak: Mencantumkan nomor HP dan alamat email ketua tim, rata tengah (center), font 12, dan dicetak tebal (bold).',
        'Judul ''ABSTRAK'': Ditulis dengan huruf kapital, rata tengah (center), font 12, dan dicetak tebal (bold).',
        'Isi Abstrak: Dibuat dengan format rata kanan-kiri (justify), maksimal 500 kata, menggunakan font 12.',
        'Kata Kunci: Ditulis di bawah isi abstrak dengan format rata kanan-kiri (justify).'
      ],
      writing_initial = array[
        'Halaman Judul: Memuat judul karya tulis yang bersifat ekspresif, logo universitas, nama peserta, NIM, dan tahun penulisan.',
        'Kata Pengantar',
        'Daftar Isi: Serta daftar lainnya jika diperlukan (Daftar tabel, Daftar Gambar, dsb).',
        'Abstrak: Ringkasan karya tulis, maksimal 500 kata.'
      ],
      writing_core = array[
        'BAB I PENDAHULUAN: Latar Belakang (alasan/urgensi mengangkat masalah), Identifikasi Masalah (inti pembahasan), Rumusan Masalah (rangkaian pertanyaan analisis), Tujuan Penulisan (sasaran), Manfaat Penulisan.',
        'BAB II TINJAUAN PUSTAKA: Uraian landasan teori dan konsep-konsep yang relevan.',
        'BAB III METODOLOGI PENELITIAN: Uraian cermat mengenai cara pengumpulan, pengolahan, analisis data, kesimpulan, dan saran/rekomendasi.',
        'BAB IV HASIL DAN PEMBAHASAN: Analisis permasalahan berdasarkan data/informasi serta telaah pustaka untuk menghasilkan alternatif pemecahan masalah.',
        'BAB V KESIMPULAN DAN SARAN: Kesimpulan (konsisten dengan pembahasan) & Saran (kemungkinan transfer gagasan/adopsi teknologi).',
        'DAFTAR PUSTAKA & Lampiran.'
      ],
      fee_wave_1_label = 'Pendaftaran Gelombang I',
      fee_wave_1_period = '15 Juni – 31 Juli 2026',
      fee_wave_1_price = 75000,
      fee_wave_2_label = 'Pendaftaran Gelombang II',
      fee_wave_2_period = '03 Agustus – 28 Agustus 2026',
      fee_wave_2_price = 90000
    where id = v_lkti_id;

    if not exists (select 1 from public.competition_syllabus where competition_id = v_lkti_id) then
      insert into public.competition_syllabus (competition_id, title, items, sort_order) values
      (v_lkti_id, null, array[
        'Matematika untuk solusi lingkungan',
        'Pemodelan matematika berkelanjutan',
        'Inovasi data untuk pembangunan',
        'Efisiensi sumber daya berbasis matematika',
        'AI dalam pembangunan berkelanjutan'
      ], 0);
    end if;
  end if;

  -- ==========================================
  -- 4. LOMBA ESAI REGIONAL
  -- ==========================================
  if v_esai_id is not null then
    update public.competitions set
      requirements = array[
        'Peserta merupakan siswa/i aktif jenjang SMA/Sederajat di Indonesia (dibuktikan dengan mengirimkan scan kartu identitas pelajar yang masih berlaku).',
        'Sekolah telah menyelesaikan biaya administrasi pendaftaran.',
        'Peserta bersifat perorangan ataupun grup yang terdiri dari 2 orang.',
        'Tidak boleh menggunakan karya yang sudah pernah diperlombakan sebelumnya.',
        'Tiap sekolah hanya bisa mendaftarkan maksimal dua tim.',
        'Peserta tidak boleh tergabung dalam dua tim yang berbeda.',
        'Peserta hanya diperbolehkan mengirim satu karya.'
      ],
      required_uploads = array[
        'Scan Kartu Pelajar aktif dari seluruh anggota tim',
        'File naskah esai lengkap dalam format PDF',
        'Bukti Pembayaran Pendaftaran',
        'Formulir Pendaftaran terisi lengkap'
      ],
      rules = array[
        'Sesuai dengan tema dan subtema yang telah ditentukan.',
        'Isi naskah essay merupakan hasil pendapat, tanggapan atau pengetahuan, dan pola pikir seseorang dalam menanggapi suatu fenomena.',
        'Naskah essay bersifat objektif dan tidak mengandung unsur SARA serta didukung oleh fakta.',
        'Tiap langkah tulisan naskah essay dilakukan secara sistematis sesuai dengan kaidah penulisan naskah essay yang benar (dapat dilihat pada sistematika penulisan).',
        'Naskah essay harus bersifat asli, bukan plagiat, belum pernah dipublikasikan, dan tidak sedang diikutsertakan dalam ajang lomba lain.',
        'Ditulis dalam Bahasa Indonesia yang baik dan benar sesuai EYD.',
        'Karya yang telah dikirimkan akan diseleksi dan diambil 5 karya terbaik yang akan dipresentasikan di hadapan dewan juri secara offline.',
        'Untuk masing-masing 5 besar karya terbaik diharuskan membuat media PowerPoint untuk presentasi karya. Hasil final lomba akan diumumkan kemudian.',
        'Naskah essay merupakan karya asli yang belum pernah menjadi juara dan tidak sedang diikutkan dalam lomba lain.'
      ],
      writing_abstract = array[
        'Seluruh bagian naskah ditulis dengan menggunakan font Times New Roman dengan jarak spasi satu.',
        'Judul Essay: Ditulis dengan huruf kapital, font 14, rata tengah (center), dan dicetak tebal (bold).',
        'Sub Judul: (Jika ada) ditulis dengan font 12, rata tengah (center), dan dicetak tebal (bold).',
        'Identitas Penulis: Mencantumkan nama anggota tim (jika berkelompok). Nama diberi nomor urut superscript di akhir nama, rata tengah (center), font 12, dan dicetak tebal (bold).',
        'Isi Karya: Dibuat dengan format rata kanan-kiri (justify), menggunakan font 12.',
        'Kata Kunci: Dibuat rata kanan-kiri (justify).'
      ],
      writing_initial = array[
        'Halaman Judul: memuat judul karya tulis yang ditulis dengan dengan huruf kapital dan bersifat ekspresif, logo Sekolah, nama penulis (peserta), nama sekolah dan tahun penulisan.',
        'Lembar Orisinalitas Karya.',
        'Kata Pengantar'
      ],
      writing_core = array[
        'PENDAHULUAN: Mencakup Latar Belakang (alasan mengangkat masalah), Identifikasi Masalah, Rumusan Masalah, Tujuan, dan Manfaat Penulisan.',
        'PEMBAHASAN: Analisis permasalahan berdasarkan data, informasi, atau telaah pustaka untuk menghasilkan gagasan kreatif.',
        'PENUTUP: Kesimpulan yang konsisten dengan analisis serta saran berupa prediksi transfer gagasan.',
        'DAFTAR PUSTAKA'
      ],
      writing_requirements = array[
        'Panjang naskah ditulis minimal 20 – 25 halaman.',
        'Menggunakan Bahasa Indonesia yang baik dan benar.',
        'Penomoran halaman pada bagian awal menggunakan angka Romawi kecil (i, ii, iii) dan bagian isi menggunakan angka Arab (1, 2, 3) di sebelah kanan atas.',
        'Format dokumen font Times New Roman 12 pt, spasi 1.5, pada kertas A4.',
        'Margin Kiri 4 cm, Atas 4 cm, Kanan 3 cm, dan Bawah 3 cm.',
        'Pengiriman karya dikumpulkan dalam bentuk softcopy PDF pada saat pendaftaran.'
      ],
      fee_wave_1_label = 'Pendaftaran Gelombang I',
      fee_wave_1_period = '13 Juli – 29 Agustus 2026',
      fee_wave_1_price = 75000,
      fee_wave_2_label = 'Pendaftaran Gelombang II',
      fee_wave_2_period = '31 Agustus – 25 September 2026',
      fee_wave_2_price = 90000
    where id = v_esai_id;

    if not exists (select 1 from public.competition_syllabus where competition_id = v_esai_id) then
      insert into public.competition_syllabus (competition_id, title, items, sort_order) values
      (v_esai_id, null, array[
        'Sains & Media',
        'Sosial Budaya',
        'Energi dan Alam',
        'Edu-Teknologi',
        'Finansial'
      ], 0);
    end if;
  end if;

  -- ==========================================
  -- 5. OLIMPIADE MATEMATIKA
  -- ==========================================
  if v_olim_id is not null then
    update public.competitions set
      requirements = array[
        'Peserta merupakan siswa/i aktif tingkat SD/MI, SMP/MTs, dan SMA/MA se-Sulawesi Tenggara (dibuktikan dengan kartu pelajar atau surat keterangan kepala sekolah).',
        'Pendaftaran bersifat perorangan/individu.',
        'Peserta hanya diperbolehkan mendaftar pada jenjang sekolah yang sesuai.',
        'Pendaftar telah menyelesaikan biaya registrasi.'
      ],
      required_uploads = array[
        'Scan Kartu Pelajar aktif / Surat Keterangan dari Kepala Sekolah',
        'Bukti Pembayaran Pendaftaran'
      ],
      fee_wave_1_label = 'Biaya Registrasi',
      fee_wave_1_period = '13 Juli – 09 Oktober 2026',
      fee_wave_1_price = 60000,
      fee_wave_2_label = 'Pendaftaran Gelombang II',
      fee_wave_2_period = null,
      fee_wave_2_price = null
    where id = v_olim_id;

    if not exists (select 1 from public.competition_syllabus where competition_id = v_olim_id) then
      insert into public.competition_syllabus (competition_id, title, items, sort_order) values
      (v_olim_id, 'SILABUS OLIMPIADE SD', array[
        'Bilangan: bilangan bulat, bilangan rasional, bilangan prima, KPK, FPB, pola bilangan.',
        'Aritmatika: operasi bilangan, persamaan linear satu variabel, sistem pertidaksamaan linear.',
        'Geometri: bidang datar dan geometri ruang.',
        'Statistika, Data dan Pengukuran: rata-rata, perbandingan, diagram batang, lingkaran dan garis, persentase, pengukuran dan kecepatan.',
        'Kombinatorik: penggunaan kombinasi dengan teknik counting problem.'
      ], 0),
      (v_olim_id, 'SILABUS OLIMPIADE SMP/MTS', array[
        'Bilangan: operasi bilangan bulat dan sifat-sifatnya, FPB, KPK, sifat-sifat bilangan berpangkat, basis bilangan.',
        'Aljabar: pengertian, notasi, dan operasi himpunan, relasi dan fungsi, perbandingan senilai dan berbalik nilai, operasi aljabar yang melibatkan bilangan rasional, pangkat, maupun akar, persamaan dan pertidaksamaan, sistem persamaan linear dua peubah, barisan dan deret.',
        'Geometri: garis dan sudut, bangun datar, teorema phytagoras, transformasi, bangun ruang.',
        'Statistika dan Peluang: rata-rata, median, modus data tunggal dan penafsirannya, penyajian data, percobaan dan ruang sampel, aturan pencacahan, peluang suatu kejadian.'
      ], 1),
      (v_olim_id, 'SILABUS OLIMPIADE SMA/MA', array[
        'Aljabar: sistem bilangan real, ketaksamaan, persamaan dan sistem persamaan, barisan dan deret, fungsi.',
        'Geometri: sifat-sifat bangun datar segitiga, segiempat dan lingkaran, kesebangunan dan kekongruenan, dalil ceva, dalil stewart, dalil ptolemy, dalil menelaus, lingkaran dalam dan lingkaran luar segitiga, trigonometri.',
        'Kombinatorika: definisi peluang, prinsip pencacahan, prinsip paritas, prinsip binomial.',
        'Teori Bilangan: sistem bilangan bulat, keterbagian, FPB, KPK, relatif prima, algoritma euclid, bilangan prima, faktorisasi prima, persamaan dan sistem persamaan bilangan bulat.'
      ], 2);
    end if;
  end if;

  -- ==========================================
  -- 6. LOMBA CEPAT TEPAT MATEMATIKA (LCTM)
  -- ==========================================
  if v_lctm_id is not null then
    update public.competitions set
      requirements = array[
        'Peserta merupakan siswa/i SMP/MTs dan SMA/MA se-Sulawesi Tenggara.',
        'Pendaftaran bersifat tim/beregu yang terdiri dari 3 orang.',
        'Anggota tim harus berasal dari sekolah yang sama.',
        'Tiap sekolah hanya bisa mengirimkan maksimal 2 tim per jenjang.',
        'Pendaftar telah menyelesaikan biaya registrasi.'
      ],
      required_uploads = array[
        'Scan Kartu Pelajar aktif dari masing-masing 3 anggota tim',
        'Bukti Pembayaran Pendaftaran',
        'Formulir Pendaftaran terisi lengkap'
      ],
      fee_wave_1_label = 'Biaya Registrasi',
      fee_wave_1_period = '13 Juli – 09 Oktober 2026',
      fee_wave_1_price = 230000,
      fee_wave_2_label = 'Pendaftaran Gelombang II',
      fee_wave_2_period = null,
      fee_wave_2_price = null
    where id = v_lctm_id;

    if not exists (select 1 from public.competition_syllabus where competition_id = v_lctm_id) then
      insert into public.competition_syllabus (competition_id, title, items, sort_order) values
      (v_lctm_id, 'SILABUS LCTM SMP', array[
        'Bilangan bulat dan pecahan',
        'Himpunan',
        'Operasi bentuk aljabar',
        'Persamaan dan pertidaksamaan linear satu variabel',
        'Perbandingan',
        'Aritmetika sosial',
        'Garis dan sudut',
        'Bangun datar',
        'Penyajian data',
        'Fungsi dan relasi',
        'Persamaan garis lurus',
        'Sistem Persamaan linear dua variabel',
        'Koordinat kartesius',
        'Persamaan kuadrat',
        'Bangun ruang',
        'Kesebangunan dan kekongruenan',
        'Statistika dan peluang',
        'Barisan dan deret'
      ], 0),
      (v_lctm_id, 'SILABUS LCTM SMA', array[
        'Eksponen, akar dan logaritma',
        'Persamaan dan pertidaksamaan nilai mutlak',
        'Sistem persamaan dan pertidaksamaan linier dua variabel, dan sistem persamaan linier tiga variabel',
        'Matriks',
        'Relasi dan fungsi',
        'Barisan dan deret',
        'Persamaan dan fungsi kuadrat',
        'Geometri',
        'Trigonometri',
        'Limit',
        'Turunan',
        'Integral',
        'Statistika',
        'Peluang',
        'Fungsi komposisi dan invers fungsi',
        'Program linear',
        'Transformasi geometri',
        'Persamaan lingkaran',
        'Suku banyak',
        'Vektor'
      ], 1);
    end if;
  end if;

end $$;
