-- Seed data mechanisms for existing competitions
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

  -- 1. Calculus
  if v_calc_id is not null and not exists (select 1 from public.competition_detail_mechanisms where competition_id = v_calc_id) then
    insert into public.competition_detail_mechanisms (competition_id, title, items, sort_order) values
    (v_calc_id, 'Sistem Pelaksanaan Ujian', array[
      'Penyisihan: Dikerjakan secara online serentak dengan pengawasan kamera menyala penuh via Zoom.',
      'Final: Dikerjakan secara tertulis offline di Kampus Baru UHO Kendari selama 120 menit.'
    ], 0),
    (v_calc_id, 'Sistem Penilaian', array[
      'Penilaian didasarkan pada ketepatan rumus, kelengkapan penjabaran langkah, serta hasil akhir.',
      'Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.',
      'Segala bentuk kecurangan akan dikenakan sanksi diskualifikasi secara sepihak oleh panitia.'
    ], 1);
  end if;

  -- 2. Mathematical Statistics
  if v_ms_id is not null and not exists (select 1 from public.competition_detail_mechanisms where competition_id = v_ms_id) then
    insert into public.competition_detail_mechanisms (competition_id, title, items, sort_order) values
    (v_ms_id, 'Pelaksanaan Ujian', array[
      'Penyisihan: Ujian online serentak pada pukul 07.30 - 09.30 WITA dengan pengawasan kamera penuh via Zoom.',
      'Final: Ujian tertulis offline di Kampus Baru UHO Kendari selama 120 menit (09.00 - 11.00 WITA).'
    ], 0),
    (v_ms_id, 'Sistem Penilaian', array[
      'Penilaian didasarkan pada ketepatan penjabaran rumus matematika dan hasil akhir.',
      'Keputusan dewan juri bersifat mutlak and tidak dapat diganggu gugat.'
    ], 1);
  end if;

  -- 3. LKTI
  if v_lkti_id is not null and not exists (select 1 from public.competition_detail_mechanisms where competition_id = v_lkti_id) then
    insert into public.competition_detail_mechanisms (competition_id, title, items, sort_order) values
    (v_lkti_id, 'Ketentuan Penulisan & Sistematika', array[
      'Format Abstrak: Maksimal 500 kata, font Times New Roman 12 pt, spasi 1, memuat Judul, Nama Anggota, Instansi, Kontak Ketua, dan Kata Kunci.',
      'Format Full Paper: Ditulis menggunakan kertas A4, font Times New Roman 12 pt, spasi 1.5, margin kiri/atas 4 cm, kanan/bawah 3 cm.',
      'Struktur Naskah Lengkap: Bagian Awal (Halaman Judul, Kata Pengantar, Daftar Isi, Abstrak) dan Bagian Inti (BAB I Pendahuluan, BAB II Tinjauan Pustaka, BAB III Metodologi, BAB IV Hasil & Pembahasan, BAB V Kesimpulan & Saran, Daftar Pustaka).'
    ], 0),
    (v_lkti_id, 'Sistem Presentasi Final', array[
      'Finalis 5 besar diwajibkan menyiapkan media (seperti PowerPoint) untuk memaparkan keunggulan karyanya secara offline.',
      'Durasi pemaparan karya maksimal 10 menit, diikuti sesi tanya jawab dewan juri selama 15 menit.',
      'Penilaian didasarkan pada orisinalitas ide, metodologi, kontribusi pemecahan masalah, dan performa presentasi.'
    ], 1);
  end if;

  -- 4. Esai
  if v_esai_id is not null and not exists (select 1 from public.competition_detail_mechanisms where competition_id = v_esai_id) then
    insert into public.competition_detail_mechanisms (competition_id, title, items, sort_order) values
    (v_esai_id, 'Ketentuan Penulisan', array[
      'Ditulis menggunakan kertas A4, font Times New Roman 12 pt, spasi 1.5, margin kiri/atas 4 cm, kanan/bawah 3 cm.',
      'Struktur naskah memuat: Halaman Judul, Lembar Orisinalitas Karya, Kata Pengantar, Pendahuluan (Latar Belakang, Identifikasi, Rumusan Masalah, Tujuan, Manfaat), Pembahasan, Penutup (Kesimpulan & Saran), dan Daftar Pustaka.',
      'Panjang naskah esai ditulis minimal 20 – 25 halaman.'
    ], 0),
    (v_esai_id, 'Sistem Presentasi Final', array[
      'Finalis 5 besar menyajikan karyanya secara offline menggunakan slide presentasi di hadapan dewan juri.',
      'Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.'
    ], 1);
  end if;

  -- 5. Olimpiade
  if v_olim_id is not null and not exists (select 1 from public.competition_detail_mechanisms where competition_id = v_olim_id) then
    insert into public.competition_detail_mechanisms (competition_id, title, items, sort_order) values
    (v_olim_id, 'Sistem Perlombaan', array[
      'Kompetisi diselenggarakan secara individu dan offline pada 16 Oktober 2026.',
      'Waktu pengerjaan soal adalah 120 menit (10.00 - 12.00 WITA).',
      'Peserta dilarang membawa alat bantu hitung (kalkulator, tabel matematika) atau perangkat komunikasi.'
    ], 0),
    (v_olim_id, 'Kriteria Juara', array[
      'Juara ditentukan berdasarkan skor tertinggi hasil pemeriksaan lembar jawaban ujian oleh juri.',
      'Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.'
    ], 1);
  end if;

  -- 6. LCTM
  if v_lctm_id is not null and not exists (select 1 from public.competition_detail_mechanisms where competition_id = v_lctm_id) then
    insert into public.competition_detail_mechanisms (competition_id, title, items, sort_order) values
    (v_lctm_id, 'Tahapan Pertandingan', array[
      'Babak Penyisihan: Terdiri dari penyisihan grup (Grup A sampai H) untuk menyaring semifinalis.',
      'Babak Semifinal: Sesi adu cepat yang mempertemukan pemenang grup.',
      'Babak Final: Final menggunakan sistem cepat tepat rebutan di panggung utama.'
    ], 0),
    (v_lctm_id, 'Sistem Poin', array[
      'Soal Rebutan: Jawaban benar mendapat poin (+100), jawaban salah mengurangi poin (-50).',
      'Keputusan dewan juri dan pembaca soal bersifat mutlak.'
    ], 1);
  end if;

end $$;
