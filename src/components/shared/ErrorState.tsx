import { AlertCircle } from "lucide-react";

export function ErrorState({ message = "Data belum bisa dimuat." }: { message?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.25rem] border border-[#770525]/15 bg-[#faadb6]/20 p-5 backdrop-blur-sm">
      <AlertCircle size={20} className="shrink-0 text-[#770525]" />
      <p className="text-sm font-semibold text-[#770525]">{message}</p>
    </div>
  );
}
