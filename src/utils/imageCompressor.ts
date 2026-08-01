// FILE: src/utils/imageCompressor.ts
//
// Utilitas kompresi gambar otomatis untuk logo Sponsor & Media Partner.
// Mengubah gambar besar (PNG/JPG 1-2 MB) menjadi WebP kecil (~20-40 KB)
// dengan resolusi maksimal 400x400 px sebelum di-upload ke Supabase Storage.

/**
 * Mengompres file gambar logo di browser (Client-Side).
 * Jika file berformat SVG atau ukurannya sudah < 30 KB, file asli dikembalikan tanpa kompresi.
 *
 * @param file - File gambar asli dari input form
 * @param maxDim - Dimensi maksimal (lebar/tinggi dalam px), default 400px
 * @param quality - Kualitas kompresi WebP (0.1 - 1.0), default 0.82
 */
export async function compressLogoImage(
  file: File,
  maxDim = 400,
  quality = 0.82,
): Promise<{ file: File; ext: string }> {
  // 1. Jika SVG atau ukuran sudah < 30 KB, langsung kembalikan file asli
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  if (ext === "svg" || file.size <= 30 * 1024) {
    return { file, ext };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Hitung dimensi berskala (aspect ratio tetap)
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          // Draw ke HTML5 Canvas
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve({ file, ext });
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Export ke format image/webp
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve({ file, ext });
                return;
              }
              const compressedFile = new File([blob], `logo_${Date.now()}.webp`, {
                type: "image/webp",
              });
              resolve({ file: compressedFile, ext: "webp" });
            },
            "image/webp",
            quality,
          );
        } catch {
          // Fallback aman jika canvas error
          resolve({ file, ext });
        }
      };

      img.onerror = () => resolve({ file, ext });
      img.src = e.target?.result as string;
    };

    reader.onerror = () => resolve({ file, ext });
    reader.readAsDataURL(file);
  });
}
