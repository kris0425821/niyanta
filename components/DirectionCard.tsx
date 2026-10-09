import { ReactNode } from "react";

const BADGE: Record<string, string> = {
  low: "bg-red-100 text-red-700",
  directional: "bg-amber-100 text-amber-800",
  strong: "bg-emerald-100 text-emerald-700",
};

const RECON: Record<string, string> = {
  insufficient: "Insufficient evidence so far",
  validated: "Validated",
  contradicted: "Contradicted",
};

function fmt(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

export default function DirectionCard({
  direction,
  children,
}: {
  direction: any;
  children?: ReactNode;
}) {
  const confidence = String(direction.confidence_when_set ?? "").toLowerCase();

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {direction.id} · set by {direction.set_by} on {fmt(direction.set_on)}
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            {direction.direction}
          </p>

          <p className="mt-1 text-sm text-slate-500">{direction.rationale}</p>
        </div>

        <div className="shrink-0 text-right">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              BADGE[confidence] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            Set with {confidence || "unknown"} confidence
          </span>

          <p className="mt-2 text-xs text-slate-500">
            Review by <span className="font-semibold">{fmt(direction.review_by)}</span>
          </p>
        </div>
      </div>

      {Array.isArray(direction.responses) && direction.responses.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase text-slate-500">
            How the V4s responded
          </p>

          <div className="mt-2 space-y-2">
            {direction.responses.map((r: any, i: number) => (
              <div key={i} className="rounded-lg bg-white p-3 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">{r.by}</span> · {fmt(r.on)} ·{" "}
                  <span className="font-semibold">{r.response}</span>
                </p>

                {Array.isArray(r.accounts) && (
                  <p className="mt-1 text-slate-500">
                    Accounts: {r.accounts.join(", ")}
                  </p>
                )}

                {(r.reason || r.note) && (
                  <p className="mt-1 text-slate-500">{r.reason ?? r.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 rounded-lg bg-white p-3 text-sm text-slate-700">
        <p className="text-xs font-semibold uppercase text-slate-500">
          Evidence so far
        </p>
        <p className="mt-1">{direction.evidence_so_far}</p>
        <p className="mt-2 text-xs text-slate-500">
          Reconciliation:{" "}
          {RECON[String(direction.reconciliation_so_far)] ??
            direction.reconciliation_so_far}
          {" · "}
          {direction.status}
        </p>
      </div>

      {children}
    </div>
  );
}
