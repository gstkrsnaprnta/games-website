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

  "lkti-nasional": {
    slug: "lkti-nasional",
    code: "LKTI",
    fullName: "Lomba Karya Tulis Ilmiah Nasional",
    category: "Nasional",
    participantLevels: ["Mahasiswa"],
    participationMode: "team",
    memberLimits: { min: 1, max: 3, notes: "Setiap tim harus berasal dari universitas/instansi yang sama." },
    sloganTheme: "Advancing Sustainable Development through Mathematical Thinking and Innovation",
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
      "Peserta merupakan siswa/i aktif jenjang SMA/Sederajat di Indonesia.",
      "Pendaftaran bersifat perorangan (individu) ataupun kelompok/tim maksimal 2 orang.",
      "Anggota tim harus berasal dari sekolah/instansi yang sama.",
      "Tiap sekolah hanya diperbolehkan mendaftarkan maksimal dua tim/karya.",
      "Peserta tidak boleh tergabung dalam dua tim yang berbeda.",
      "Peserta hanya diperbolehkan mengirimkan satu karya tulis.",
      "Naskah esai harus asli (orisinal), belum pernah dipublikasikan, dan tidak sedang diikutkan lomba lain.",
      "Sekolah telah menyelesaikan biaya administrasi pendaftaran."
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
      { name: "Syalza (Esai CP)", phone: "0878-8506-2787", waUrl: "https://wa.me/6287885062787" }
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
      "Tiap sekolah tingkat SD, SMP, atau SMA sederajat dapat mengirimkan paling banyak 7 siswa.",
      "Peserta aktif SD (kelas 4, 5, 6), SMP (kelas 7, 8, 9), atau SMA (kelas 10, 11, 12).",
      "Perubahan nama peserta hanya diperbolehkan hingga tanggal 9 Oktober 2026.",
      "Peserta wajib menggunakan seragam sekolah selama perlombaan berlangsung.",
      "Sekolah telah menyelesaikan biaya administrasi pendaftaran."
    ],
    requiredUploads: [
      "Scan Kartu Pelajar yang masih aktif/berlaku",
      "Bukti Pembayaran Pendaftaran",
      "Formulir Pendaftaran terisi lengkap"
    ],
    materials: [
      "SD: Bilangan bulat/rasional/prima, KPK/FPB, Pola bilangan, Aritmatika linear, Geometri datar/ruang, Statistika dasar (rata-rata, diagram), Kombinatorik counting.",
      "SMP: Operasi bilangan & sifat pangkat, Aljabar (himpunan, relasi/fungsi, deret, SPLDV), Geometri (dalil phytagoras, transformasi, bangun ruang), Statistika & Peluang.",
      "SMA: Aljabar (sistem bilangan real, ketaksamaan, barisan/deret), Geometri (dalil ceva, stewart, ptolemy, menelaus, trigonometri), Kombinatorika, Teori Bilangan (algoritma euclid, bilangan prima)."
    ],
    stages: [
      { title: "Pendaftaran Peserta", description: "Pengisian berkas pendaftaran online atau offline (13 Juli - 09 Oktober 2026)." },
      { title: "Technical Meeting", description: "Penjelasan tata cara ujian tertulis di Aula FMIPA UHO pada 10 Oktober 2026." },
      { title: "Pelaksanaan Ujian", description: "Pengerjaan soal ujian secara offline di Gedung B Lt. 3 FMIPA UHO pada 16 Oktober 2026." },
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
      { name: "Sasa (SD)", phone: "0838-1854-6626", waUrl: "https://wa.me/6283818546626" },
      { name: "Aina (SMP)", phone: "0858-4814-7073", waUrl: "https://wa.me/6285848147073" },
      { name: "Ilmi (SMA)", phone: "0813-2559-1564", waUrl: "https://wa.me/6281325591564" }
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
      "Peserta aktif SMP (kelas 7-9) atau SMA (kelas 10-12).",
      "Perubahan nama anggota maksimal 9 Oktober 2026.",
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
      "SMP: Bilangan bulat/pecahan, himpunan, aljabar, perbandingan, aritmetika sosial, garis & sudut, geometri, relasi/fungsi, SPLDV, koordinat kartesius, peluang.",
      "SMA: Eksponen, logaritma, nilai mutlak, SPLDV/SPLTV, matriks, relasi/fungsi, deret, kuadrat, geometri, trigonometri, limit, turunan, integral, statistika, peluang, vektor."
    ],
    stages: [
      { title: "Pendaftaran", description: "Pengisian berkas pendaftaran online atau offline (13 Juli - 09 Oktober 2026)." },
      { title: "Technical Meeting", description: "Penjelasan sistem bel dan lempar soal di Aula FMIPA UHO (10 Oktober 2026)." },
      { title: "Pencabutan Lot", description: "Pencabutan lot tanding tim di Aula FMIPA UHO pada 12 Oktober 2026 (13.00 - 14.00)." },
      { title: "Pelaksanaan Tanding", description: "Babak penyisihan grup hingga final di Aula & R. Senat FMIPA UHO (13 - 15 Oktober 2026)." }
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
      { name: "Rini (SMP)", phone: "0823-9364-7144", waUrl: "https://wa.me/6282393647144" },
      { name: "Elis (SMA)", phone: "0881-0111-8461-2", waUrl: "https://wa.me/62881011184612" }
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
