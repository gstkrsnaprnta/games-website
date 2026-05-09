import type { FAQ } from "../../types/models";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={item.id} className="rounded-lg border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer font-bold text-slate-950">{item.question}</summary>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
