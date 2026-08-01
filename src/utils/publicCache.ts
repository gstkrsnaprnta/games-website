// FILE: src/utils/publicCache.ts
//
// Modul cache ringan untuk data publik (baca saja) dari Supabase.
// Tujuan: menekan Cached Egress agar kuota 5GB/bulan Supabase cukup
// untuk puluhan ribu pengunjung.
//
// ATURAN KERAS:
// - Hanya dipakai untuk fungsi READ data publik (competitions, faqs, dll).
// - TIDAK BOLEH dipakai di registrations.ts, adminRegistrations.ts,
//   RegisterPage.tsx, atau CheckStatusPage.tsx.
// - Jika fetcher error, cache TIDAK disimpan — error langsung ke UI.

type CacheEntry<T> = {
  data: T;
  expiresAt: number; // Unix timestamp ms
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = new Map<string, CacheEntry<any>>();

const DEFAULT_TTL_MS = 3 * 60 * 1000; // 3 menit

/**
 * Ambil data dari cache jika masih valid, atau jalankan fetcher jika
 * sudah kadaluarsa / belum pernah di-fetch.
 *
 * @param key   - Kunci cache unik (harus menyertakan parameter dinamis,
 *                misal "competition_lkti" bukan "competition").
 * @param ttlMs - Durasi cache dalam milidetik (default 3 menit).
 * @param fetcher - Fungsi async yang memanggil Supabase dan mengembalikan
 *                  { data, error }.
 */
export async function fetchWithCache<T>(
  key: string,
  ttlMs: number = DEFAULT_TTL_MS,
  fetcher: () => Promise<{ data: T; error: { message: string } | null }>,
): Promise<{ data: T; error: { message: string } | null }> {
  const now = Date.now();
  const cached = store.get(key) as CacheEntry<T> | undefined;

  // Cache hit: data masih valid
  if (cached && now < cached.expiresAt) {
    return { data: cached.data, error: null };
  }

  // Cache miss / expired: jalankan fetcher
  const result = await fetcher();

  // Hanya simpan ke cache jika TIDAK ada error
  if (!result.error) {
    store.set(key, { data: result.data, expiresAt: now + ttlMs });
  }

  return result;
}

/**
 * Hapus seluruh cache publik sekaligus.
 * Dipanggil di halaman Admin setelah berhasil simpan / hapus data,
 * agar pengunjung langsung mendapatkan data terbaru dari Supabase.
 */
export function clearPublicCache(): void {
  store.clear();
}
