// Path: src/data/competitionDetails.ts
import type { DetailedCompetition } from "../types/models";

const GENERAL_CONTACTS = {
  phone: "0822-5941-9645",
  email: "hmpsmath.fmipauho@gmail.com",
  instagram: "@games.uho",
};

export const COMPETITION_DETAILS: Record<string, DetailedCompetition> = {
  "calculus-competition": {
    slug: "calculus-competition",
    code: "CALC",
    fullName: "Calculus Competition",
    category: "Nasional",
    participantLevels: ["Mahasiswa"],
    participationMode: "individual",
    memberLimits: { min: 1, max: 1 },
    shortDescription: "Kompetisi kalkulus individu tingkat nasional untuk mahasiswa yang menguji pemahaman teori limit, turunan, integral, hingga analisis medan vektor.",
    description: "Calculus Competition merupakan ajang pembuktian pemahaman kalkulus bagi mahasiswa D-III, D-IV, dan S-1 se-Indonesia. Kompetisi ini mencakup uji pemahaman teoritis, analitis, dan pemecahan persoalan kalkulus tingkat tinggi yang diselenggarakan secara hybrid (penyisihan online, final offline).",
    requirements: [
      "Peserta merupakan mahasiswa aktif program D-III, D-IV, dan S-1 PTN/PTS se-Indonesia.",
      "Pendaftaran bersifat individu atau perorangan.",
      "Peserta dibebaskan dari jurusan/program studi mana saja.",
      "Mahasiswa pendaftar telah menyelesaikan biaya administrasi pendaftaran."
    ],
    requiredUploads: [
      "Scan Kartu Tanda Mahasiswa (KTM) aktif/berlaku",
      "Bukti Pembayaran Pendaftaran"
    ],
    materials: [
      "Sistem Bilangan Real dan Fungsi",
      "Limit dan Kekontinuan Fungsi",
      "Turunan dan Aplikasi Turunan",
      "Teorema Dasar Kalkulus",
      "Integral dan Aplikasi Integral",
      "Jumlah Riemann",
      "Teorema Nilai Rata-Rata",
      "Fungsi Transenden",
      "Vektor di Bidang dan Ruang",
      "Fungsi Parameter",
      "Turunan Parsial dan Keterdiferensialan",
      "Aturan Rantai dan Turunan Berarah",
      "Ekstrim Fungsi dan Metode Lagrange",
      "Integral Lipat di Ruang Dimensi-n dan Aplikasinya",
      "Medan Vektor",
      "Integral Garis",
      "Teorema Green",
      "Curl dan Divergen"
    ],
    stages: [
      { title: "Pendaftaran Gelombang I", description: "Dibuka pada 15 Juni – 15 Agustus 2026." },
      { title: "Pendaftaran Gelombang II", description: "Dibuka pada 17 Agustus – 11 September 2026." },
      { title: "Technical Meeting", description: "Pengarahan teknis pelaksanaan ujian daring via Zoom (12 September 2026, 09.30 - 12.00)." },
      { title: "Babak Penyisihan", description: "Ujian tertulis secara online melalui Zoom (14 September 2026, 07.30 - 09.30)." },
      { title: "Babak Final", description: "Ujian tertulis secara offline di Aula dan R. Senat FMIPA UHO (12 Oktober 2026, 13.30 - 15.30)." },
      { title: "Pengumuman Juara", description: "Diumumkan pada acara penutupan GAMES 2026 (17 Oktober 2026)." }
    ],
    mechanisms: [
      {
        title: "Sistem Pelaksanaan Ujian",
        items: [
          "Penyisihan: Dikerjakan secara online serentak dengan pengawasan kamera menyala penuh via Zoom.",
          "Final: Dikerjakan secara tertulis offline di Kampus Baru UHO Kendari selama 120 menit."
        ]
      },
      {
        title: "Sistem Penilaian",
        items: [
          "Penilaian didasarkan pada ketepatan rumus, kelengkapan penjabaran langkah, serta hasil akhir.",
          "Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.",
          "Segala bentuk kecurangan akan dikenakan sanksi diskualifikasi secara sepihak oleh panitia."
        ]
      }
    ],
    timelines: [
      { title: "Pendaftaran Gelombang I", dateLabel: "15 Juni – 15 Agustus 2026", description: "Pendaftaran online dengan biaya Gelombang I." },
      { title: "Pendaftaran Gelombang II", dateLabel: "17 Agustus – 11 September 2026", description: "Batas akhir registrasi tingkat nasional." },
      { title: "Technical Meeting", dateLabel: "12 September 2026", description: "Arahan teknis pengerjaan via Zoom (09.30 - 12.00)." },
      { title: "Babak Penyisihan", dateLabel: "14 September 2026", description: "Ujian online berbasis Zoom pukul 07.30 - 09.30 WITA." },
      { title: "Babak Final", dateLabel: "12 Oktober 2026", description: "Ujian tertulis offline di Aula & R. Senat FMIPA UHO pukul 13.30 - 15.30 WITA." },
      { title: "Pengumuman Juara & Awarding", dateLabel: "17 Oktober 2026", description: "Penyerahan piala dan penghargaan pada acara penutupan GAMES." }
    ],
    fees: [
      { label: "Pendaftaran Gelombang I", period: "15 Juni – 15 Agustus 2026", price: "Rp 75.000 / orang" },
      { label: "Pendaftaran Gelombang II", period: "17 Agustus – 11 September 2026", price: "Rp 90.000 / orang" }
    ],
    contactPersons: [
      { name: "Mila (Calculus CP)", phone: "0822-9628-7360", waUrl: "https://wa.me/6282296287360" }
    ],
    downloads: [
      { title: "Guidebook Nasional GAMES 2026", meta: "PDF · Panduan & Ketentuan Lengkap", url: "https://drive.google.com/drive/folders/1m79FvIwAUj5De740G9i0EMVVk2Iz7Cnc" }
    ],
    faq: [],
    generalContacts: GENERAL_CONTACTS,
  },

  "mathematical-statistics": {
    slug: "mathematical-statistics",
    code: "MS",
    fullName: "Mathematical Statistics Competition",
    category: "Nasional",
    participantLevels: ["Mahasiswa"],
    participationMode: "individual",
    memberLimits: { min: 1, max: 1 },
    shortDescription: "Kompetisi statistika individu tingkat nasional untuk menguji kemampuan analitis mahasiswa dalam estimasi parameter, uji hipotesis, dan regresi linear.",
    description: "Mathematical Statistics Competition menguji daya nalar teoritis dan pemecahan kasus statistika matematis serta teori peluang. Lomba ini ditujukan untuk mengukur kesiapan akademik mahasiswa di bidang statistika di era kecerdasan data.",
    requirements: [
      "Peserta merupakan mahasiswa aktif program D-III, D-IV, dan S-1 PTN/PTS se-Indonesia.",
      "Pendaftaran bersifat individu atau perorangan.",
      "Peserta dibebaskan dari jurusan/program studi mana saja.",
      "Mahasiswa pendaftar telah menyelesaikan biaya administrasi pendaftaran."
    ],
    requiredUploads: [
      "Scan Kartu Tanda Mahasiswa (KTM) aktif/berlaku",
      "Bukti Pembayaran Pendaftaran"
    ],
    materials: [
      "Estimasi Parameter",
      "Uji Hipotesis",
      "Regresi Linear"
    ],
    stages: [
      { title: "Pendaftaran Gelombang I", description: "Dibuka pada 15 Juni – 15 Agustus 2026." },
      { title: "Pendaftaran Gelombang II", description: "Dibuka pada 17 Agustus – 11 September 2026." },
      { title: "Technical Meeting", description: "Pengarahan teknis pelaksanaan ujian daring via Zoom (12 September 2026, 09.30 - 12.00)." },
      { title: "Babak Penyisihan", description: "Ujian tertulis secara online melalui Zoom (14 September 2026, 07.30 - 09.30)." },
      { title: "Babak Final", description: "Ujian tertulis secara offline di Aula dan R. Senat FMIPA UHO (12 Oktober 2026, 09.00 - 11.00)." },
      { title: "Pengumuman Juara", description: "Diumumkan pada acara penutupan GAMES 2026 (17 Oktober 2026)." }
    ],
    mechanisms: [
      {
        title: "Pelaksanaan Ujian",
        items: [
          "Penyisihan: Ujian online serentak pada pukul 07.30 - 09.30 WITA dengan pengawasan kamera penuh via Zoom.",
          "Final: Ujian tertulis offline di Kampus Baru UHO Kendari selama 120 menit (09.00 - 11.00 WITA)."
        ]
      },
      {
        title: "Sistem Penilaian",
        items: [
          "Penilaian didasarkan pada ketepatan penjabaran rumus matematika dan hasil akhir.",
          "Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat."
        ]
      }
    ],
    timelines: [
      { title: "Pendaftaran Gelombang I", dateLabel: "15 Juni – 15 Agustus 2026", description: "Pendaftaran online dengan biaya Gelombang I." },
      { title: "Pendaftaran Gelombang II", dateLabel: "17 Agustus – 11 September 2026", description: "Batas akhir registrasi tingkat nasional." },
      { title: "Technical Meeting", dateLabel: "12 September 2026", description: "Arahan teknis pengerjaan via Zoom (09.30 - 12.00)." },
      { title: "Babak Penyisihan", dateLabel: "14 September 2026", description: "Ujian daring via Zoom pukul 07.30 - 09.30 WITA." },
      { title: "Babak Final", dateLabel: "12 Oktober 2026", description: "Ujian tertulis offline di Aula & R. Senat FMIPA UHO pukul 09.00 - 11.00 WITA." },
      { title: "Pengumuman Juara & Awarding", dateLabel: "17 Oktober 2026", description: "Penyerahan piala dan penghargaan pada acara penutupan GAMES." }
    ],
    fees: [
      { label: "Pendaftaran Gelombang I", period: "15 Juni – 15 Agustus 2026", price: "Rp 75.000 / orang" },
      { label: "Pendaftaran Gelombang II", period: "17 Agustus – 11 September 2026", price: "Rp 90.000 / orang" }
    ],
    contactPersons: [
      { name: "Zulkaeda (Statistics CP)", phone: "0822-9225-8977", waUrl: "https://wa.me/6282292258977" }
    ],
    downloads: [
      { title: "Guidebook Nasional GAMES 2026", meta: "PDF · Silabus & Ketentuan Statistika", url: "https://drive.google.com/drive/folders/1m79FvIwAUj5De740G9i0EMVVk2Iz7Cnc" }
    ],
    faq: [],
    generalContacts: GENERAL_CONTACTS,
  },

  "lomba-karya-tulis-ilmiah-nasional": {
    slug: "lomba-karya-tulis-ilmiah-nasional",
    code: "LKTI",
    fullName: "Lomba Karya Tulis Ilmiah Nasional",
    category: "Nasional",
    participantLevels: ["Mahasiswa"],
    participationMode: "team",
    memberLimits: { min: 1, max: 3, notes: "Setiap tim harus berasal dari universitas/instansi yang sama." },
    sloganTheme: "Advancing Sustainable Development through Mathematical Thinking and Innovation",
    rules: [
      "Sesuai dengan tema dan subtema yang telah ditentukan.",
      "Isi naskah LKTI merupakan hasil penelitian atau gagasan kreatif yang didukung oleh fakta dan temuan yang objektif.",
      "Naskah LKTI bersifat objektif, tidak mengandung unsur SARA, serta memberikan kontribusi nyata dalam pemecahan masalah.",
      "Tiap langkah penulisan dilakukan secara sistematis mengikuti kaidah yang benar, mencakup: Abstrak, Pendahuluan, Tinjauan Pustaka, Metodologi Penelitian, Hasil dan Pembahasan, Penutup, Daftar Pustaka.",
      "Karya harus bersifat asli, menunjukkan kebaruan ide (novelty), bukan hasil plagiat, dan belum pernah menjuarai ajang lomba lain.",
      "Ditulis menggunakan Bahasa Indonesia yang baik dan benar sesuai EYD, dengan penggunaan konsep serta istilah yang tepat dan konsisten.",
      "Karya yang dikirimkan akan diseleksi untuk menentukan finalis yang berhak mengikuti tahap presentasi di hadapan dewan juri.",
      "Peserta yang lolos diwajibkan menyiapkan media (seperti PowerPoint) untuk memaparkan keunggulan karyanya saat sesi presentasi."
    ],
    writingSystem: {
      abstract: [
        "Seluruh bagian abstrak ditulis menggunakan font Times New Roman, jarak satu spasi, baik dalam bahasa Indonesia maupun bahasa Inggris (jika ada).",
        "Judul Penelitian: Ditulis dengan huruf kapital, font 14, rata tengah (center), dan dicetak tebal (bold).",
        "Sub judul: (Jika ada) ditulis dengan font 12, rata tengah (center), dan dicetak tebal (bold).",
        "Nama Penulis: Mencantumkan nama anggota tim. Nama masing-masing peserta diberi nomor urut superscript di akhir nama, font 12, rata tengah (center), dan dicetak tebal (bold).",
        "Nama PTN/PTS: Ditulis rata tengah (center), font 12, dan dicetak tebal (bold).",
        "Kontak: Mencantumkan nomor HP dan alamat email ketua tim, rata tengah (center), font 12, dan dicetak tebal (bold).",
        "Judul 'ABSTRAK': Ditulis dengan huruf kapital, rata tengah (center), font 12, dan dicetak tebal (bold).",
        "Isi Abstrak: Dibuat dengan format rata kanan-kiri (justify), maksimal 500 kata, menggunakan font 12.",
        "Kata Kunci: Ditulis di bawah isi abstrak dengan format rata kanan-kiri (justify)."
      ],
      initial: [
        "Halaman Judul: Memuat judul karya tulis yang bersifat ekspresif, logo universitas, nama peserta, NIM, dan tahun penulisan.",
        "Kata Pengantar",
        "Daftar Isi: Serta daftar lainnya jika diperlukan (Daftar tabel, Daftar Gambar, dsb).",
        "Abstrak: Ringkasan karya tulis, maksimal 500 kata."
      ],
      core: [
        "BAB I PENDAHULUAN: Latar Belakang (alasan/urgensi mengangkat masalah), Identifikasi Masalah (inti pembahasan), Rumusan Masalah (rangkaian pertanyaan analisis), Tujuan Penulisan (sasaran), Manfaat Penulisan.",
        "BAB II TINJAUAN PUSTAKA: Uraian landasan teori dan konsep-konsep yang relevan.",
        "BAB III METODOLOGI PENELITIAN: Uraian cermat mengenai cara pengumpulan, pengolahan, analisis data, kesimpulan, dan saran/rekomendasi.",
        "BAB IV HASIL DAN PEMBAHASAN: Analisis permasalahan berdasarkan data/informasi serta telaah pustaka untuk menghasilkan alternatif pemecahan masalah.",
        "BAB V KESIMPULAN DAN SARAN: Kesimpulan (konsisten dengan pembahasan) & Saran (kemungkinan transfer gagasan/adopsi teknologi).",
        "DAFTAR PUSTAKA & Lampiran."
      ]
    },
    shortDescription: "Kompetisi karya tulis ilmiah mahasiswa tingkat nasional untuk mendorong inovasi pembangunan berkelanjutan berbasis matematika.",
    description: "LKTI Nasional GAMES 2026 memberikan tantangan bagi mahasiswa se-Indonesia untuk menyumbang gagasan inovatif berupa hasil penelitian atau kajian kritis teoritis berbasis matematika. Solusi yang dirancang diharapkan berkontribusi pada pencapaian Tujuan Pembangunan Berkelanjutan (SDGs).",
    requirements: [
      "Peserta merupakan mahasiswa aktif program D-III, D-IV, dan S-1 PTN/PTS se-Indonesia.",
      "Peserta bersifat perorangan (individu) atau kelompok/tim maksimal 3 orang.",
      "Seluruh anggota tim harus berasal dari instansi yang sama.",
      "Peserta lomba dibebaskan dari jurusan/program studi mana saja.",
      "Peserta hanya diperbolehkan tergabung dalam satu tim saja.",
      "Peserta/tim hanya diperkenankan mengirimkan satu karya tulis.",
      "Mahasiswa pendaftar telah menyelesaikan biaya administrasi pendaftaran."
    ],
    requiredUploads: [
      "Scan Kartu Tanda Mahasiswa (KTM) aktif seluruh anggota",
      "Softcopy Abstrak (untuk pendaftaran awal) & Full Paper (untuk tahap berikutnya) format PDF",
      "Bukti Pembayaran Pendaftaran"
    ],
    materials: [
      "Matematika untuk solusi lingkungan",
      "Pemodelan matematika berkelanjutan",
      "Inovasi data untuk pembangunan",
      "Efisiensi sumber daya berbasis matematika",
      "AI dalam pembangunan berkelanjutan"
    ],
    stages: [
      { title: "Pendaftaran & Unggah Abstrak", description: "Pengumpulan abstrak karya tulis (Gel I: 15 Juni - 31 Juli, Gel II: 03 Agt - 28 Agt 2026)." },
      { title: "Pengumuman Lolos Abstrak", description: "Pengumuman tim yang melaju ke tahap Full Paper pada 04 September 2026." },
      { title: "Pengumpulan Full Paper", description: "Batas akhir penyerahan naskah lengkap karya tulis bagi yang lolos (07 – 25 September 2026)." },
      { title: "Technical Meeting", description: "Pengarahan teknis presentasi final melalui Zoom (12 September 2026, 09.30 - 12.00)." },
      { title: "Pengumuman Finalis 5 Besar", description: "Pengumuman lima karya terbaik yang diundang mempresentasikan karyanya secara offline (02 Oktober 2026)." },
      { title: "Babak Final Presentasi", description: "Pemaparan karya offline di depan juri di Aula FMIPA UHO (12 Oktober 2026, 13.30 - 15.30)." }
    ],
    mechanisms: [
      {
        title: "Ketentuan Penulisan & Sistematika",
        items: [
          "Format Abstrak: Maksimal 500 kata, font Times New Roman 12 pt, spasi 1, memuat Judul, Nama Anggota, Instansi, Kontak Ketua, dan Kata Kunci.",
          "Format Full Paper: Ditulis menggunakan kertas A4, font Times New Roman 12 pt, spasi 1.5, margin kiri/atas 4 cm, kanan/bawah 3 cm.",
          "Struktur Naskah Lengkap: Bagian Awal (Halaman Judul, Kata Pengantar, Daftar Isi, Abstrak) dan Bagian Inti (BAB I Pendahuluan, BAB II Tinjauan Pustaka, BAB III Metodologi, BAB IV Hasil & Pembahasan, BAB V Kesimpulan & Saran, Daftar Pustaka)."
        ]
      },
      {
        title: "Sistem Presentasi Final",
        items: [
          "Finalis 5 besar diwajibkan menyiapkan media (seperti PowerPoint) untuk memaparkan keunggulan karyanya secara offline.",
          "Durasi pemaparan karya maksimal 10 menit, diikuti sesi tanya jawab dewan juri selama 15 menit.",
          "Penilaian didasarkan pada orisinalitas ide, metodologi, kontribusi pemecahan masalah, dan performa presentasi."
        ]
      }
    ],
    timelines: [
      { title: "Pendaftaran & Pengumpulan Abstrak Gel I", dateLabel: "15 Juni – 31 Juli 2026", description: "Batas pengiriman naskah abstrak gelombang pertama." },
      { title: "Pendaftaran & Pengumpulan Abstrak Gel II", dateLabel: "03 Agustus – 28 Agustus 2026", description: "Batas pengiriman naskah abstrak gelombang kedua." },
      { title: "Pengumuman Lolos Seleksi Abstrak", dateLabel: "04 September 2026", description: "Pengumuman tim yang melaju ke babak pengumpulan Full Paper." },
      { title: "Pengumpulan Naskah Lengkap (Full Paper)", dateLabel: "07 – 25 September 2026", description: "Batas unggah naskah lengkap karya tulis." },
      { title: "Technical Meeting", dateLabel: "12 September 2026", description: "Arahan teknis babak final via Zoom (09.30 - 12.00)." },
      { title: "Pengumuman Finalis 5 Besar", dateLabel: "02 Oktober 2026", description: "Pengumuman 5 besar finalis yang berhak mempresentasikan karyanya secara offline." },
      { title: "Babak Final Presentasi", dateLabel: "12 Oktober 2026", description: "Presentasi naskah offline di Aula FMIPA UHO pukul 13.30 - 15.30." },
      { title: "Pengumuman Juara & Awarding", dateLabel: "17 Oktober 2026", description: "Pengumuman juara akhir saat Penutupan GAMES." }
    ],
    fees: [
      { label: "Pendaftaran Gelombang I", period: "15 Juni – 31 Juli 2026", price: "Rp 75.000 / orang" },
      { label: "Pendaftaran Gelombang II", period: "03 Agustus – 28 Agustus 2026", price: "Rp 90.000 / orang" }
    ],
    contactPersons: [
      { name: "Selfi (LKTI CP)", phone: "0853-4011-5288", waUrl: "https://wa.me/6285340115288" }
    ],
    downloads: [
      { title: "Guidebook Nasional GAMES 2026", meta: "PDF · Ketentuan & Template LKTI", url: "https://drive.google.com/drive/folders/1m79FvIwAUj5De740G9i0EMVVk2Iz7Cnc" }
    ],
    faq: [],
    generalContacts: GENERAL_CONTACTS,
  },

  "esai-regional": {
    slug: "esai-regional",
    code: "ESAI",
    fullName: "Lomba Esai Regional",
    category: "Regional",
    participantLevels: ["SMA"],
    participationMode: "team",
    memberLimits: { min: 1, max: 2, notes: "Maksimal mengirimkan 2 tim per sekolah. Anggota kelompok harus dari sekolah yang sama." },
    sloganTheme: "Breaking the Code: Mengasah Logika Matematika sebagai Senjata Kreatif di Era Kompetisi Global",
    shortDescription: "Kompetisi menulis esai kreatif jenjang SMA/sederajat se-Indonesia untuk mengembangkan solusi berbasis logika matematika dalam era kompetisi global.",
    description: "Lomba Esai GAMES 2026 mengundang siswa SMA sederajat untuk menuliskan gagasan solutif, analitis, dan aplikatif seputar tantangan global berbasis matematika. Karya terbaik disaring menjadi 5 besar untuk dipresentasikan langsung di depan dewan juri.",
    requirements: [
      "Peserta merupakan siswa/i aktif jenjang SMA/Sederajat di Indonesia (dibuktikan dengan mengirimkan scan kartu identitas pelajar yang masih berlaku).",
      "Sekolah telah menyelesaikan biaya administrasi pendaftaran.",
      "Peserta bersifat perorangan ataupun grup yang terdiri dari 2 orang.",
      "Tidak boleh menggunakan karya yang sudah pernah diperlombakan sebelumnya.",
      "Tiap sekolah hanya bisa mendaftarkan maksimal dua tim.",
      "Peserta tidak boleh tergabung dalam dua tim yang berbeda.",
      "Peserta hanya diperbolehkan mengirim satu karya."
    ],
    requiredUploads: [
      "Scan Kartu Pelajar aktif dari seluruh anggota tim",
      "File naskah esai lengkap dalam format PDF",
      "Bukti Pembayaran Pendaftaran",
      "Formulir Pendaftaran terisi lengkap"
    ],
    materials: [
      "Sains & Media",
      "Sosial Budaya",
      "Energi dan Alam",
      "Edu-Teknologi",
      "Finansial"
    ],
    stages: [
      { title: "Pendaftaran & Pengumpulan Karya", description: "Registrasi dan pengiriman naskah (Gel I: 13 Juli – 29 Agt, Gel II: 31 Agt – 25 Sept 2026)." },
      { title: "Pengumuman 5 Besar", description: "Penyaringan 5 karya esai terbaik pada 02 Oktober 2026." },
      { title: "Pengumpulan PPT & Naskah Revisi", description: "Finalis terpilih mengumpulkan file materi presentasi (05 – 09 Oktober 2026)." },
      { title: "Technical Meeting", description: "Penjelasan tata tertib presentasi final di Aula FMIPA UHO (10 Oktober 2026)." },
      { title: "Babak Final Presentasi", description: "Pemaparan karya offline menggunakan slide (PPT) di Aula FMIPA UHO (15 Oktober 2026, 13.00 - 15.00)." }
    ],
    mechanisms: [
      {
        title: "Ketentuan Penulisan",
        items: [
          "Ditulis menggunakan kertas A4, font Times New Roman 12 pt, spasi 1.5, margin kiri/atas 4 cm, kanan/bawah 3 cm.",
          "Struktur naskah memuat: Halaman Judul, Lembar Orisinalitas Karya, Kata Pengantar, Pendahuluan (Latar Belakang, Identifikasi, Rumusan Masalah, Tujuan, Manfaat), Pembahasan, Penutup (Kesimpulan & Saran), dan Daftar Pustaka.",
          "Panjang naskah esai ditulis minimal 20 – 25 halaman."
        ]
      },
      {
        title: "Sistem Presentasi Final",
        items: [
          "Finalis 5 besar menyajikan karyanya secara offline menggunakan slide presentasi di hadapan dewan juri.",
          "Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat."
        ]
      }
    ],
    rules: [
      "Sesuai dengan tema dan subtema yang telah ditentukan.",
      "Isi naskah essay merupakan hasil pendapat, tanggapan atau pengetahuan, dan pola pikir seseorang dalam menanggapi suatu fenomena.",
      "Naskah essay bersifat objektif dan tidak mengandung unsur SARA serta didukung oleh fakta.",
      "Tiap langkah tulisan naskah essay dilakukan secara sistematis sesuai dengan kaidah penulisan naskah essay yang benar (dapat dilihat pada sistematika penulisan).",
      "Naskah essay harus bersifat asli, bukan plagiat, belum pernah dipublikasikan, dan tidak sedang diikutsertakan dalam ajang lomba lain.",
      "Ditulis dalam Bahasa Indonesia yang baik dan benar sesuai EYD.",
      "Karya yang telah dikirimkan akan diseleksi dan diambil 5 karya terbaik yang akan dipresentasikan di hadapan dewan juri secara offline.",
      "Untuk masing-masing 5 besar karya terbaik diharuskan membuat media PowerPoint untuk presentasi karya. Hasil final lomba akan diumumkan kemudian.",
      "Naskah essay merupakan karya asli yang belum pernah menjadi juara dan tidak sedang diikutkan dalam lomba lain."
    ],
    writingSystem: {
      abstract: [
        "Seluruh bagian naskah ditulis dengan menggunakan font Times New Roman dengan jarak spasi satu.",
        "Judul Essay: Ditulis dengan huruf kapital, font 14, rata tengah (center), dan dicetak tebal (bold).",
        "Sub Judul: (Jika ada) ditulis dengan font 12, rata tengah (center), dan dicetak tebal (bold).",
        "Identitas Penulis: Mencantumkan nama anggota tim (jika berkelompok). Nama diberi nomor urut superscript di akhir nama, rata tengah (center), font 12, dan dicetak tebal (bold).",
        "Isi Karya: Dibuat dengan format rata kanan-kiri (justify), menggunakan font 12.",
        "Kata Kunci: Dibuat rata kanan-kiri (justify)."
      ],
      initial: [
        "Halaman Judul: memuat judul karya tulis yang ditulis dengan dengan huruf kapital dan bersifat ekspresif, logo Sekolah, nama penulis (peserta), nama sekolah dan tahun penulisan.",
        "Lembar Orisinalitas Karya.",
        "Kata Pengantar"
      ],
      core: [
        "PENDAHULUAN: Mencakup Latar Belakang (alasan mengangkat masalah), Identifikasi Masalah, Rumusan Masalah, Tujuan, dan Manfaat Penulisan.",
        "PEMBAHASAN: Analisis permasalahan berdasarkan data, informasi, atau telaah pustaka untuk menghasilkan gagasan kreatif.",
        "PENUTUP: Kesimpulan yang konsisten dengan analisis serta saran berupa prediksi transfer gagasan.",
        "DAFTAR PUSTAKA"
      ],
      requirements: [
        "Panjang naskah ditulis minimal 20 – 25 halaman.",
        "Menggunakan Bahasa Indonesia yang baik dan benar.",
        "Penomoran halaman pada bagian awal menggunakan angka Romawi kecil (i, ii, iii) dan bagian isi menggunakan angka Arab (1, 2, 3) di sebelah kanan atas.",
        "Format dokumen font Times New Roman 12 pt, spasi 1.5, pada kertas A4.",
        "Margin Kiri 4 cm, Atas 4 cm, Kanan 3 cm, dan Bawah 3 cm.",
        "Pengiriman karya dikumpulkan dalam bentuk softcopy PDF pada saat pendaftaran."
      ]
    },
    timelines: [
      { title: "Pendaftaran Gelombang I", dateLabel: "13 Juli – 29 Agustus 2026", description: "Registrasi dan submit naskah dengan biaya Gelombang I." },
      { title: "Pendaftaran Gelombang II", dateLabel: "31 Agustus – 25 September 2026", description: "Registrasi dan submit naskah dengan biaya Gelombang II." },
      { title: "Pengumuman Finalis 5 Besar", dateLabel: "02 Oktober 2026", description: "Pengumuman karya terbaik yang berhak masuk ke babak presentasi." },
      { title: "Pengumpulan PPT & Naskah Revisi", dateLabel: "05 – 09 Oktober 2026", description: "Batas pengumpulan file materi presentasi finalis." },
      { title: "Technical Meeting", dateLabel: "10 Oktober 2026", description: "Penjelasan tata tertib dan giliran tampil di Aula FMIPA UHO." },
      { title: "Babak Final Presentasi", dateLabel: "15 Oktober 2026", description: "Presentasi karya offline di Aula FMIPA UHO pukul 13.00 - 15.00." },
      { title: "Penutupan & Awarding", dateLabel: "17 Oktober 2026", description: "Pengumuman juara akhir saat penutupan GAMES." }
    ],
    fees: [
      { label: "Pendaftaran Gelombang I", period: "13 Juli – 29 Agustus 2026", price: "Rp 60.000 / tim" },
      { label: "Pendaftaran Gelombang II", period: "31 Agustus – 25 September 2026", price: "Rp 75.000 / tim" }
    ],
    contactPersons: [
      { name: "Syalza (Esai SMA CP)", phone: "0878-8506-2787", waUrl: "https://wa.me/6287885062787" }
    ],
    downloads: [
      { title: "Guidebook Regional GAMES 2026", meta: "PDF · Ketentuan & Aturan Esai", url: "https://drive.google.com/drive/folders/1m79FvIwAUj5De740G9i0EMVVk2Iz7Cnc" }
    ],
    faq: [],
    generalContacts: GENERAL_CONTACTS,
  },

  "olimpiade-matematika": {
    slug: "olimpiade-matematika",
    code: "OLIM",
    fullName: "Olimpiade Matematika",
    category: "Regional",
    participantLevels: ["SD", "SMP", "SMA"],
    participationMode: "individual",
    memberLimits: { min: 1, max: 1, notes: "Maksimal mengirimkan 7 siswa per sekolah." },
    shortDescription: "Kompetisi matematika individu tingkat regional se-Sulawesi Tenggara yang menguji kemampuan logika, penalaran, dan pemecahan masalah secara kreatif.",
    description: "Olimpiade Matematika GAMES 2026 merupakan wadah kompetisi bagi siswa SD, SMP, dan SMA sederajat untuk menantang diri dalam menyelesaikan persoalan matematika non-rutin. Kompetisi ini bertujuan memotivasi siswa untuk berpikir kritis, mengaplikasikan ilmu matematika secara kreatif, dan melahirkan generasi berdaya saing tinggi.",
    requirements: [
      "SD/Sederajat: Tiap sekolah SD/Sederajat dapat mengirimkan paling banyak 7 siswa. Peserta kelas 4, 5, dan 6 (dibuktikan dengan scan kartu identitas pelajar).",
      "SMP/Sederajat: Tiap sekolah SMP/Sederajat dapat mengirimkan paling banyak 7 siswa. Peserta kelas 7, 8, dan 9 (dibuktikan dengan scan kartu identitas pelajar).",
      "SMA/Sederajat: Tiap sekolah SMA/Sederajat dapat mengirimkan paling banyak 7 siswa. Peserta kelas 10, 11, dan 12 (dibuktikan dengan scan kartu identitas pelajar).",
      "Tidak ada perubahan peserta dadakan (perubahan paling lambat 9 Oktober 2026).",
      "Peserta wajib menggunakan seragam sekolah saat mengikuti lomba.",
      "Sekolah telah menyelesaikan biaya administrasi pendaftaran."
    ],
    requiredUploads: [
      "Scan Kartu Pelajar yang masih aktif/berlaku",
      "Bukti Pembayaran Pendaftaran",
      "Formulir Pendaftaran terisi lengkap"
    ],
    materials: [
      "Materi meliputi konsep Bilangan, Aritmatika, Geometri, Statistika, Data, Pengukuran, Aljabar, Kombinatorika, dan Teori Bilangan sesuai tingkat jenjang SD, SMP, dan SMA."
    ],
    syllabus: [
      {
        title: "SILABUS OLIMPIADE SD",
        items: [
          "Bilangan: bilangan bulat, bilangan rasional, bilangan prima, KPK, FPB, pola bilangan.",
          "Aritmatika: operasi bilangan, persamaan linear satu variabel, sistem pertidaksamaan linear.",
          "Geometri: bidang datar dan geometri ruang.",
          "Statistika, Data dan Pengukuran: rata-rata, perbandingan, diagram batang, lingkaran dan garis, persentase, pengukuran dan kecepatan.",
          "Kombinatorik: penggunaan kombinasi dengan teknik counting problem."
        ]
      },
      {
        title: "SILABUS OLIMPIADE SMP/MTS",
        items: [
          "Bilangan: operasi bilangan bulat dan sifat-sifatnya, FPB, KPK, sifat-sifat bilangan berpangkat, basis bilangan.",
          "Aljabar: pengertian, notasi, dan operasi himpunan, relasi dan fungsi, perbandingan senilai dan berbalik nilai, operasi aljabar yang melibatkan bilangan rasional, pangkat, maupun akar, persamaan dan pertidaksamaan, sistem persamaan linear dua peubah, barisan dan deret.",
          "Geometri: garis dan sudut, bangun datar, teorema phytagoras, transformasi, bangun ruang.",
          "Statistika dan Peluang: rata-rata, median, modus data tunggal dan penafsirannya, penyajian data, percobaan dan ruang sampel, aturan pencacahan, peluang suatu kejadian."
        ]
      },
      {
        title: "SILABUS OLIMPIADE SMA/MA",
        items: [
          "Aljabar: sistem bilangan real, ketaksamaan, persamaan dan sistem persamaan, barisan dan deret, fungsi.",
          "Geometri: sifat-sifat bangun datar segitiga, segiempat dan lingkaran, kesebangunan dan kekongruenan, dalil ceva, dalil stewart, dalil ptolemy, dalil menelaus, lingkaran dalam dan lingkaran luar segitiga, trigonometri.",
          "Kombinatorika: definisi peluang, prinsip pencacahan, prinsip paritas, prinsip binomial.",
          "Teori Bilangan: sistem bilangan bulat, keterbagian, FPB, KPK, relatif prima, algoritma euclid, bilangan prima, faktorisasi prima, persamaan dan sistem persamaan bilangan bulat."
        ]
      }
    ],
    stages: [
      { title: "Pendaftaran Peserta", description: "Pengisian berkas pendaftaran online atau offline (13 Juli - 09 Oktober 2026)." },
      { title: "Technical Meeting", description: "Penjelasan tata cara ujian tertulis di Aula FMIPA UHO pada 10 Oktober 2026." },
      { title: "Pelaksanaan Ujian", description: "Pengerjaan soal ujian secara offline di Gedung B Lt. 3 FMIPA UHO pada 16 Oktober 2026 (10.00 - 12.00)." },
      { title: "Pengumuman Juara", description: "Pengumuman juara dirilis pukul 19.30 WITA via WhatsApp Group resmi (16 Oktober 2026)." },
      { title: "Penutupan & Awarding", description: "Penyerahan hadiah piala dan uang pembinaan di Aula FMIPA UHO (17 Oktober 2026)." }
    ],
    mechanisms: [
      {
        title: "Sistem Perlombaan",
        items: [
          "Kompetisi diselenggarakan secara individu dan offline pada 16 Oktober 2026.",
          "Waktu pengerjaan soal adalah 120 menit (10.00 - 12.00 WITA).",
          "Peserta dilarang membawa alat bantu hitung (kalkulator, tabel matematika) atau perangkat komunikasi."
        ]
      },
      {
        title: "Kriteria Juara",
        items: [
          "Juara ditentukan berdasarkan skor tertinggi hasil pemeriksaan lembar jawaban ujian oleh juri.",
          "Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat."
        ]
      }
    ],
    timelines: [
      { title: "Pendaftaran Peserta", dateLabel: "13 Juli – 09 Oktober 2026", description: "Pendaftaran online melalui Google Form atau offline di Sekretariat GAMES." },
      { title: "Technical Meeting", dateLabel: "10 Oktober 2026", description: "Penjelasan tata tertib ujian di Aula FMIPA UHO (09.30 - 12.00)." },
      { title: "Pelaksanaan Lomba", dateLabel: "16 Oktober 2026", description: "Ujian tulis offline di Gedung B Lt. 3 FMIPA UHO pukul 10.00 - 12.00." },
      { title: "Pengumuman Pemenang", dateLabel: "16 Oktober 2026", description: "Pengumuman hasil juara pukul 19.30 WITA via WhatsApp Group resmi." },
      { title: "Penyerahan Penghargaan", dateLabel: "17 Oktober 2026", description: "Penyerahan piala dan uang pembinaan di Aula FMIPA UHO." }
    ],
    fees: [
      { label: "Biaya Registrasi", period: "13 Juli – 09 Oktober 2026", price: "Rp 60.000 / orang" }
    ],
    contactPersons: [
      { name: "Sasa (SD CP)", phone: "0838-1854-6626", waUrl: "https://wa.me/6283818546626" },
      { name: "Aina (SMP CP)", phone: "0858-4814-7073", waUrl: "https://wa.me/6285848147073" },
      { name: "Ilmi (SMA CP)", phone: "0813-2559-1564", waUrl: "https://wa.me/6281325591564" }
    ],
    downloads: [
      { title: "Guidebook Regional GAMES 2026", meta: "PDF · Panduan Lengkap Olimpiade", url: "https://drive.google.com/drive/folders/1m79FvIwAUj5De740G9i0EMVVk2Iz7Cnc" }
    ],
    faq: [],
    generalContacts: GENERAL_CONTACTS,
  },

  "lomba-cepat-tepat-matematika": {
    slug: "lomba-cepat-tepat-matematika",
    code: "LCTM",
    fullName: "Lomba Cepat Tepat Matematika",
    category: "Regional",
    participantLevels: ["SMP", "SMA"],
    participationMode: "team",
    memberLimits: { min: 3, max: 3, notes: "Maksimal mengirimkan 2 tim per sekolah. Hanya tersedia kuota 24 tim." },
    shortDescription: "Kompetisi matematika beregu tingkat regional se-Sulawesi Tenggara yang menguji kecepatan, ketepatan, dan kerja sama tim.",
    description: "LCTM GAMES 2026 menguji refleks, ketepatan berhitung, dan dinamika kerja sama tim. Siswa SMP dan SMA sederajat bertanding dalam format cepat tepat grup, semifinal, dan final rebutan untuk memperebutkan gelar juara terbaik regional.",
    requirements: [
      "Satu tim terdiri atas 3 orang siswa peserta yang didaftarkan.",
      "Tiap sekolah tingkat SMP atau SMA sederajat dapat mengirimkan maksimal 2 tim per jenjang.",
      "Peserta aktif SMP (kelas 7-9) atau SMA (kelas 10-12) dibuktikan dengan scan kartu identitas pelajar.",
      "Tidak ada perubahan peserta dadakan (perubahan paling lambat 9 Oktober 2026).",
      "Pendaftaran ditutup jika kuota 24 slot tim telah terpenuhi.",
      "Peserta wajib menggunakan seragam sekolah saat lomba berlangsung.",
      "Sekolah telah menyelesaikan biaya administrasi pendaftaran."
    ],
    requiredUploads: [
      "Scan Kartu Pelajar aktif dari masing-masing 3 anggota tim",
      "Bukti Pembayaran Pendaftaran",
      "Formulir Pendaftaran terisi lengkap"
    ],
    materials: [
      "Materi meliputi konsep aljabar, bilangan bulat/pecahan, geometri, statistika, peluang, trigonometri, limit, turunan, dan integral sesuai tingkat jenjang SMP dan SMA."
    ],
    syllabus: [
      {
        title: "SILABUS LCTM SMP",
        items: [
          "Bilangan bulat dan pecahan",
          "Himpunan",
          "Operasi bentuk aljabar",
          "Persamaan dan pertidaksamaan linear satu variabel",
          "Perbandingan",
          "Aritmetika sosial",
          "Garis dan sudut",
          "Bangun datar",
          "Penyajian data",
          "Fungsi dan relasi",
          "Persamaan garis lurus",
          "Sistem Persamaan linear dua variabel",
          "Koordinat kartesius",
          "Persamaan kuadrat",
          "Bangun ruang",
          "Kesebangunan dan kekongruenan",
          "Statistika dan peluang",
          "Barisan dan deret"
        ]
      },
      {
        title: "SILABUS LCTM SMA",
        items: [
          "Eksponen, akar dan logaritma",
          "Persamaan dan pertidaksamaan nilai mutlak",
          "Sistem persamaan dan pertidaksamaan linier dua variabel, dan sistem persamaan linier tiga variabel",
          "Matriks",
          "Relasi dan fungsi",
          "Barisan dan deret",
          "Persamaan dan fungsi kuadrat",
          "Geometri",
          "Trigonometri",
          "Limit",
          "Turunan",
          "Integral",
          "Statistika",
          "Peluang",
          "Fungsi komposisi dan invers fungsi",
          "Program linear",
          "Transformasi geometri",
          "Persamaan lingkaran",
          "Suku banyak",
          "Vektor"
        ]
      }
    ],
    stages: [
      { title: "Pendaftaran", description: "Pengisian berkas pendaftaran online atau offline (13 Juli - 09 Oktober 2026)." },
      { title: "Technical Meeting", description: "Penjelasan sistem bel dan lempar soal di Aula FMIPA UHO (10 Oktober 2026)." },
      { title: "Pencabutan Lot", description: "Pencabutan lot tanding tim di Aula FMIPA UHO pada 12 Oktober 2026 (13.00 - 14.00)." },
      { title: "Pelaksanaan Tanding", description: "Babak penyisihan grup hingga final secara offline di Aula & R. Senat FMIPA UHO (13 - 15 Oktober 2026)." }
    ],
    mechanisms: [
      {
        title: "Tahapan Pertandingan",
        items: [
          "Babak Penyisihan: Terdiri dari penyisihan grup (Grup A sampai H) untuk menyaring semifinalis.",
          "Babak Semifinal: Sesi adu cepat yang mempertemukan pemenang grup.",
          "Babak Final: Final menggunakan sistem cepat tepat rebutan di panggung utama."
        ]
      },
      {
        title: "Sistem Poin",
        items: [
          "Soal Rebutan: Jawaban benar mendapat poin (+100), jawaban salah mengurangi poin (-50).",
          "Keputusan dewan juri dan pembaca soal bersifat mutlak."
        ]
      }
    ],
    timelines: [
      { title: "Pendaftaran", dateLabel: "13 Juli – 09 Oktober 2026", description: "Registrasi tim (terbatas 24 slot)." },
      { title: "Technical Meeting", dateLabel: "10 Oktober 2026", description: "Penjelasan sistem tanding di Aula FMIPA UHO (09.30 - 12.00)." },
      { title: "Pencabutan Lot", dateLabel: "12 Oktober 2026", description: "Penetapan bagan pertandingan pukul 13.00 - 14.00 di Aula FMIPA UHO." },
      { title: "Pelaksanaan Lomba", dateLabel: "13 – 15 Oktober 2026", description: "Penyisihan grup, semifinal, dan final LCTM secara offline di Aula & R. Senat FMIPA UHO." },
      { title: "Penutupan & Awarding", dateLabel: "17 Oktober 2026", description: "Penyerahan hadiah di Aula FMIPA UHO." }
    ],
    fees: [
      { label: "Biaya Registrasi", period: "13 Juli – 09 Oktober 2026", price: "Rp 230.000 / tim" }
    ],
    contactPersons: [
      { name: "Rini (SMP LCTM CP)", phone: "0823-9364-7144", waUrl: "https://wa.me/6282393647144" },
      { name: "Elis (SMA LCTM CP)", phone: "0881-0111-8461-2", waUrl: "https://wa.me/62881011184612" }
    ],
    downloads: [
      { title: "Guidebook Regional GAMES 2026", meta: "PDF · Panduan Lengkap LCTM", url: "https://drive.google.com/drive/folders/1m79FvIwAUj5De740G9i0EMVVk2Iz7Cnc" }
    ],
    faq: [],
    generalContacts: GENERAL_CONTACTS,
  },
};

// Alias for backwards compatibility or short codes
COMPETITION_DETAILS["lctm"] = COMPETITION_DETAILS["lomba-cepat-tepat-matematika"];
COMPETITION_DETAILS["lkti-nasional"] = COMPETITION_DETAILS["lomba-karya-tulis-ilmiah-nasional"];
