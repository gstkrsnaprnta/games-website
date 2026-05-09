import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";

export function AdminPageState({
  loading,
  error,
  isEmpty,
  emptyDescription,
}: {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyDescription: string;
}) {
  return (
    <div className="mt-6 grid gap-3">
      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} /> : null}
      {!loading && !error && isEmpty ? <EmptyState description={emptyDescription} /> : null}
    </div>
  );
}

export function BooleanBadge({ value }: { value: boolean }) {
  return (
    <span className={value ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"}>
      {value ? "Aktif" : "Nonaktif"}
    </span>
  );
}

export function TableCellMuted({ children }: { children: React.ReactNode }) {
  return <span className="text-slate-500">{children || "-"}</span>;
}
