import type { ReactNode } from "react";

export function DataTable({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">{children}</div>;
}
