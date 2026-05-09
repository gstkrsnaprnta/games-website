export function LoadingState({ label = "Memuat data..." }: { label?: string }) {
  return <div className="rounded-3xl border border-[#004551]/10 bg-white/75 p-6 text-sm font-semibold text-[#004551] shadow-sm">{label}</div>;
}
