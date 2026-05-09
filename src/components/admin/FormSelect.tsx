import type { SelectHTMLAttributes } from "react";

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: { label: string; value: string }[] };

export function FormSelect({ label, options, ...props }: FormSelectProps) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-800">
      {label}
      <select {...props} className="rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-cyan-600">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
