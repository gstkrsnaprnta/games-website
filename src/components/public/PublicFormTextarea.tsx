import type { TextareaHTMLAttributes } from "react";

type PublicFormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string };

export function PublicFormTextarea({ label, ...props }: PublicFormTextareaProps) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#004551]">
      {label}
      <textarea {...props} className="games-input min-h-28" />
    </label>
  );
}
