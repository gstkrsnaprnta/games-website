import type { FAQ } from "../../types/models";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details key={item.id} className="group rounded-[1.4rem] border border-[#004551]/10 bg-white/75 p-5 shadow-sm open:bg-[#c2e1df]/35">
          <summary className="cursor-pointer list-none font-black text-[#004551]">{item.question}</summary>
          <p className="mt-3 text-sm leading-7 text-[#004551]/70">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
