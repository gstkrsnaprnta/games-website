export function EmptyState({ title = "Belum ada data", description }: { title?: string; description?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
