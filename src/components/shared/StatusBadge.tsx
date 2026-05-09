import clsx from "clsx";
import { getStatusLabel, statusClasses } from "../../utils/status";

type StatusBadgeProps = {
  status: keyof typeof statusClasses;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={clsx("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1", statusClasses[status])}>
      {getStatusLabel(status)}
    </span>
  );
}
