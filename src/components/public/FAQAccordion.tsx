import { ChevronDown } from "lucide-react";
import type { FAQ } from "../../types/models";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          key={item.id}
          className="group games-card rounded-[1.25rem] p-0 overflow-hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold text-[#004551] transition-colors hover:bg-[#c2e1df]/15 [&::-webkit-details-marker]:hidden list-none">
            <span>{item.question}</span>
            <ChevronDown
              size={18}
              className="shrink-0 text-[#004551]/40 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="border-t border-[#004551]/8 bg-[#c2e1df]/12 px-5 py-4">
            <p className="text-sm leading-7 text-[#004551]/70">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
