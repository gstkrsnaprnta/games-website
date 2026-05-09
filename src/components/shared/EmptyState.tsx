export function EmptyState({ title = "Belum ada data", description }: { title?: string; description?: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#004551]/20 bg-white/70 p-6">
      <h3 className="text-sm font-bold text-[#004551]">{title}</h3>
      {description ? <p className="mt-1 text-sm leading-6 text-[#004551]/70">{description}</p> : null}
    </div>
  );
}
