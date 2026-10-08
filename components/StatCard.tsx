type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  warning?: boolean;
};

export default function StatCard({
  title,
  value,
  subtitle,
  warning = false,
}: StatCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        warning
          ? "border-amber-300 bg-amber-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}