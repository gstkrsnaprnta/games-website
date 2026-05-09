import type { TextareaHTMLAttributes } from "react";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string };

export function FormTextarea({ label, ...props }: FormTextareaProps) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-800">
      {label}
      <textarea {...props} className="min-h-28 rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-cyan-600" />
    </label>
  );
}
