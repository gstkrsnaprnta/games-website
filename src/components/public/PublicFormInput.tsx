import type { InputHTMLAttributes } from "react";

type PublicFormInputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function PublicFormInput({ label, ...props }: PublicFormInputProps) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#004551]">
      {label}
      <input {...props} className="games-input" />
    </label>
  );
}
