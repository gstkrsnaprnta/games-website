export function ErrorState({ message = "Data belum bisa dimuat." }: { message?: string }) {
  return <div className="rounded-3xl border border-[#770525]/20 bg-[#faadb6]/25 p-6 text-sm font-semibold text-[#770525]">{message}</div>;
}
