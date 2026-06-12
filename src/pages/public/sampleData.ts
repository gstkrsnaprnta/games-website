import type { Announcement, Competition, FAQ, Timeline } from "../../types/models";

export const sampleCompetitions: Competition[] = [
  {
    id: "lct",
    event_id: "games-2026",
    name: "Lomba Cepat Tepat Matematika",
    slug: "lct-matematika",
    code: "LCT",
    short_description: "Kompetisi cepat dan tepat menyelesaikan soal matematika secara tim.",
    description: "LCT Matematika menguji kemampuan kognitif, pemecahan masalah, kerja sama, dan kecepatan berpikir.",
    participant_levels: ["SD", "SMP", "SMA"],
    competition_type: "team",
    min_members: 2,
    max_members: 3,
    registration_fee: 0,
    registration_status: "open",
    registration_open_at: null,
    registration_close_at: null,
    guidebook_url: null,
    poster_url: null,
    contact_person: null,
    is_active: true,
  },
  {
    id: "olim",
    event_id: "games-2026",
    name: "Olimpiade Matematika",
    slug: "olimpiade-matematika",
    code: "OLIM",
    short_description: "Kompetisi pemecahan soal matematika menantang untuk siswa.",
    description: "Olimpiade Matematika menguji kemampuan problem solving dan penalaran matematis peserta.",
    participant_levels: ["SD", "SMP", "SMA"],
    competition_type: "individual",
    min_members: 1,
    max_members: 1,
    registration_fee: 0,
    registration_status: "open",
    registration_open_at: null,
    registration_close_at: null,
    guidebook_url: null,
    poster_url: null,
    contact_person: null,
    is_active: true,
  },
  {
    id: "ranking-1",
    event_id: "games-2026",
    name: "Ranking 1",
    slug: "ranking-1",
    code: "R1",
    short_description: "Adu ketepatan menjawab pertanyaan hingga tersisa satu pemenang.",
    description: "Ranking 1 ditujukan untuk siswa SD/sederajat dengan format eliminasi bertahap.",
    participant_levels: ["SD"],
    competition_type: "individual",
    min_members: 1,
    max_members: 1,
    registration_fee: 0,
    registration_status: "open",
    registration_open_at: null,
    registration_close_at: null,
    guidebook_url: null,
    poster_url: null,
    contact_person: null,
    is_active: true,
  },
];

export const sampleTimelines: Timeline[] = [
  { id: "1", title: "Pembukaan pendaftaran", description: "Pendaftaran peserta GAMES dibuka.", start_date: "2026-06-01", end_date: null, sort_order: 1, competition_id: null, is_active: true  },
  { id: "2", title: "Penutupan pendaftaran", description: "Batas akhir pengisian formulir dan pembayaran.", start_date: "2026-07-15", end_date: null, sort_order: 2, competition_id: null, is_active: true  },
  { id: "3", title: "Pelaksanaan lomba", description: "Pelaksanaan cabang lomba sesuai jadwal panitia.", start_date: "2026-08-03", end_date: "2026-08-10", sort_order: 3, competition_id: null, is_active: true  },
];

export const sampleFaqs: FAQ[] = [
  { id: "1", question: "Apakah pendaftaran dilakukan online?", answer: "Ya, peserta mengisi formulir pendaftaran melalui website GAMES.", sort_order: 1 },
  { id: "2", question: "Bagaimana cara cek status?", answer: "Gunakan nomor registrasi serta email atau WhatsApp pada halaman cek status.", sort_order: 2 },
];

export const sampleAnnouncements: Announcement[] = [
  { id: "1", title: "Pendaftaran GAMES 2026 segera dibuka", slug: "pendaftaran-games-2026", category: "general", content: "Pantau website resmi GAMES untuk informasi pembukaan pendaftaran, guidebook, dan kontak panitia.", attachment_url: null, published_at: "2026-05-09" },
];
