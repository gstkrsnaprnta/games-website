import type { TextareaHTMLAttributes } from "react";

type PublicFormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function PublicFormTextarea({
  label,
  className,
  ...props
}: PublicFormTextareaProps) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#004551]">
      {label}
      <textarea
        {...props}
        className={`games-input min-h-28 ${className ?? ""}`}
      />
    </label>
  );
}
