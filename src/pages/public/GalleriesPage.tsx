import {
  Camera,
  Image as ImageIcon,
  Images,
} from "lucide-react";
import { GalleryGrid } from "../../components/public/GalleryGrid";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getGalleries } from "../../services/galleries";
import { useAsyncData } from "../../utils/useAsyncData";

export function GalleriesPage() {
  const galleries = useAsyncData(getGalleries, []);
  const total = galleries.data?.length ?? 0;

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="container-hero relative pt-28 pb-3 md:pt-32 md:pb-8">
        <div className="inner-page-hero relative overflow-hidden rounded-[2rem] border border-white/90 px-6 py-8 shadow-[0_24px_60px_rgba(6,68,82,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] md:grid md:min-h-[360px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:rounded-[2.35rem] md:px-12 md:py-12 lg:px-14">
          {/* Ornamen dokumentasi */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute right-0 top-0 hidden h-full w-[46%] items-center justify-center md:flex">
              <div className="relative aspect-square w-[300px] lg:w-[340px]">
                <div className="absolute inset-8 rounded-full bg-[#004551]/38 shadow-[inset_0_0_72px_rgba(194,225,223,0.55),0_0_54px_rgba(194,225,223,0.3)] backdrop-blur-xl" />
                <div className="absolute inset-8 rounded-full border border-[#c2e1df]/55" />
                <div className="absolute inset-14 rounded-full border border-dashed border-[#c2e1df]/50" />

                {/* Bingkai foto bertumpuk */}
                <div className="absolute left-3 top-12 w-28 -rotate-12 rounded-xl border border-white/80 bg-white/75 p-1.5 pb-5 shadow-[0_12px_28px_rgba(6,66,82,0.25)] lg:w-32">
                  <div className="grid aspect-square place-items-center rounded-lg bg-gradient-to-br from-[#c2e1df] to-[#064252]/50 text-white">
                    <ImageIcon size={26} strokeWidth={2} />
                  </div>
                </div>
                <div className="absolute right-3 top-16 w-28 rotate-12 rounded-xl border border-white/80 bg-white/75 p-1.5 pb-5 shadow-[0_12px_28px_rgba(6,66,82,0.25)] lg:w-32">
                  <div className="grid aspect-square place-items-center rounded-lg bg-gradient-to-br from-[#faadb6] to-[#7E032F]/70 text-white">
                    <Images size={26} strokeWidth={2} />
                  </div>
                </div>

                {/* Kamera di tengah */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#faadb6] opacity-40 blur-2xl" />
                    <div className="relative grid size-24 place-items-center rounded-full border border-white/70 bg-gradient-to-br from-[#7E032F] to-[#9f0a3a] text-white shadow-[0_18px_36px_rgba(126,3,47,0.35)] lg:size-28">
                      <Camera size={40} strokeWidth={2} />
                    </div>
                  </div>
                </div>

                <div className="glass-chip absolute -right-4 top-6 rounded-xl px-3 py-1.5 font-mono text-[10px] font-black text-[#004551]">
                  GAMES 2026
                </div>
                <div className="glass-chip absolute -left-4 bottom-14 rounded-xl px-3 py-1.5 font-mono text-[10px] font-black text-[#7E032F]">
                  {total} Foto
                </div>
              </div>
            </div>
          </div>

          {/* Konten */}
          <div className="relative z-10 max-w-[16.8rem] md:max-w-lg">
            <h1 className="games-display mt-5 text-[2.18rem] font-black leading-[0.96] tracking-[-0.055em] text-[#064452] min-[390px]:text-[2.42rem] md:text-[4.25rem] lg:text-[4.8rem]">
              Galeri
              <br />
              <span className="text-[#7E032F]">Games</span>
            </h1>

            <p className="mt-5 max-w-[15rem] text-[0.84rem] font-semibold leading-6 text-[#064452]/78 min-[390px]:max-w-[16.5rem] min-[390px]:text-[0.9rem] md:max-w-md md:text-base md:leading-7">
              Kumpulan momen dan dokumentasi kegiatan Gebyar Matematika Sains,
              dari kompetisi hingga seminar nasional.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Daftar Foto ===== */}
      <section className="container-hero relative pt-6 pb-14 lg:pb-20">
        <div className="pointer-events-none absolute -right-20 top-0 size-[360px] rounded-full bg-[#faadb6]/10 blur-[100px] -z-10" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-[400px] rounded-full bg-[#c2e1df]/14 blur-[120px] -z-10" />

        <div className="mb-7 flex items-end gap-4 md:mb-9">
          <div className="h-9 w-1.5 shrink-0 rounded-full bg-[#faadb6] shadow-[0_0_18px_rgba(250,173,182,0.55)] md:h-10" />
          <div>
            <p className="mb-1 hidden text-[10px] font-black uppercase tracking-[0.24em] text-[#7E032F] md:block">
              Dokumentasi kegiatan
            </p>
            <h2 className="games-display text-[1.85rem] font-black leading-tight tracking-[-0.04em] text-[#064252] min-[390px]:text-[2.05rem] md:text-4xl">
              Semua Foto
            </h2>
          </div>
        </div>

        {galleries.loading ? <LoadingState /> : null}
        {galleries.error ? <ErrorState message={galleries.error} /> : null}
        {!galleries.loading && !galleries.error && total === 0 ? (
          <EmptyState description="Galeri belum tersedia." />
        ) : null}

        {galleries.data && total > 0 ? (
          <GalleryGrid items={galleries.data} />
        ) : null}
      </section>
    </>
  );
}
