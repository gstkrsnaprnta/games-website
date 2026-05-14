import { Inbox } from "lucide-react";

export function EmptyState({ title = "Belum ada data", description }: { title?: string; description?: string }) {
  return (
    <div className="games-card flex flex-col items-center rounded-[1.5rem] border-dashed p-8 text-center">
      <div className="grid size-12 place-items-center rounded-xl bg-[#c2e1df]/40 text-[#004551]/40">
        <Inbox size={24} />
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#004551]">{title}</h3>
      {description ? <p className="mt-1.5 max-w-sm text-sm leading-6 text-[#004551]/60">{description}</p> : null}
    </div>
  );
}
