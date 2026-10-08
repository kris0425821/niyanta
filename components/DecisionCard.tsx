type DecisionCardProps = {
  title: string;
  description: string;
  status?: string;
  confidence?: string;
  action?: string;
};

export default function DecisionCard({
  title,
  description,
  status,
  confidence,
  action,
}: DecisionCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Decision
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            {title}
          </h3>
        </div>

        {status && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            {status}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {confidence && (
          <span className="rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-700">
            Confidence: {confidence}
          </span>
        )}

        {action && (
          <span className="rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
            {action}
          </span>
        )}
      </div>
    </div>
  );
}