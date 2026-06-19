// FILE: src/components/public/PublicFormFileInput.tsx
import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";

type PublicFormFileInputProps = {
  label: string;
  required?: boolean;
  accept?: string;
  maxSizeBytes?: number;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

export function PublicFormFileInput({
  label,
  required,
  accept = "image/*,application/pdf",
  maxSizeBytes = 1024 * 1024,
  file,
  onChange,
  error,
}: PublicFormFileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState("");

  function handleFileSelected(selected: File | null) {
    setLocalError("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    if (!selected) {
      onChange(null);
      return;
    }

    if (selected.size > maxSizeBytes) {
      setLocalError(
        `Ukuran file maksimal ${(maxSizeBytes / (1024 * 1024)).toFixed(0)} MB.`,
      );
      onChange(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const isImage = selected.type.startsWith("image/");
    const isPdf = selected.type === "application/pdf";
    if (!isImage && !isPdf) {
      setLocalError("Format file harus gambar (JPG/PNG/WEBP) atau PDF.");
      onChange(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    if (isImage) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
    onChange(selected);
  }

  function handleRemove() {
    handleFileSelected(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const displayError = error || localError;

  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#004551]">
      {label}

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="games-input flex items-center justify-center gap-2 border-dashed text-[#004551]/60 hover:text-[#004551]"
        >
          <Upload size={16} />
          Pilih file (maks. 1 MB)
        </button>
      ) : (
        <div className="games-input flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview bukti pembayaran"
                className="size-9 shrink-0 rounded-md object-cover"
              />
            ) : (
              <FileText size={18} className="shrink-0 text-[#7E032F]" />
            )}
            <span className="truncate text-sm font-medium text-[#004551]">
              {file.name}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 rounded-full p-1 text-[#7E032F] transition hover:bg-[#7E032F]/10"
            aria-label="Hapus file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        required={required && !file}
        className="hidden"
        onChange={(e) => handleFileSelected(e.target.files?.[0] ?? null)}
      />

      {displayError && (
        <span className="text-xs font-semibold text-[#7E032F]">
          {displayError}
        </span>
      )}
    </label>
  );
}
