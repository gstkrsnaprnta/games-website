export function ErrorState({ message = "Data belum bisa dimuat." }: { message?: string }) {
  return <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">{message}</div>;
}
