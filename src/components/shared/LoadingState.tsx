export function LoadingState({ label = "Memuat data..." }: { label?: string }) {
  return (
    <div className="games-card flex items-center gap-3 rounded-[1.25rem] p-5">
      <div className="games-spinner" />
      <p className="text-sm font-semibold text-[#004551]">{label}</p>
    </div>
  );
}
