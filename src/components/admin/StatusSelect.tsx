import { FormSelect } from "./FormSelect";

export function StatusSelect(props: { label: string; value?: string; onChange?: React.ChangeEventHandler<HTMLSelectElement> }) {
  return (
    <FormSelect
      {...props}
      options={[
        { label: "Menunggu", value: "pending" },
        { label: "Terverifikasi", value: "verified" },
        { label: "Ditolak", value: "rejected" },
        { label: "Perlu Revisi", value: "revision_required" },
      ]}
    />
  );
}
