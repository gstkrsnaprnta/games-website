import type { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function FormInput({ label, ...props }: FormInputProps) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-800">
      {label}
      <input {...props} className="rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-cyan-600" />
    </label>
  );
}
