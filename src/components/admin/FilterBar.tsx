import type { ReactNode } from "react";

export function FilterBar({ children }: { children?: ReactNode }) {
  return <div className="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-white p-3">{children}</div>;
}
