import type { SelectHTMLAttributes } from "react";

type PublicFormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { label: string; value: string }[];
};

export function PublicFormSelect({ label, options, ...props }: PublicFormSelectProps) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#004551]">
      {label}
      <select {...props} className="games-input">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
