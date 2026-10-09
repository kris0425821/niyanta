type Props = {
  decision: string | null;
  reason: string;
  decidedBy?: string | null;
  decidedAt?: string | null;
};

function fmt(date?: string | null) {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
}

// What goes back to Aditya (V3, sits with Kamath, does not log in to Niyanta).
export default function AdityaReturn({
  decision,
  reason,
  decidedBy,
  decidedAt,
}: Props) {
  const accepted = decision === "ACCEPT";

  return (
    <div className="mt-5 rounded-lg border border-indigo-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Back to Aditya · V3 Program Manager
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Aditya raised E10 and does not log in to Niyanta, so this is what
            is sent to him.
          </p>
        </div>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
          E10 CLOSED
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-700">
        <p>
          <span className="font-semibold">You raised: </span>
          Karnavati offers 18 t of commodity at ₹352/kg to fill L12 in October.
        </p>

        <p>
          <span className="font-semibold">Decision: </span>
          {decision} by {decidedBy ?? "Kartik"}
          {fmt(decidedAt) ? `, ${fmt(decidedAt)}` : ""}.
        </p>

        <p>
          <span className="font-semibold">Why: </span>
          {reason}
        </p>

        <p>
          <span className="font-semibold">What changes for you: </span>
          {accepted
            ? "SO 4405100 moves from offered to confirmed on L12. It has no promised or predicted date yet, so it needs one in your delivery model."
            : "SO 4405100 stays unconfirmed and L12 stays open. Nothing to schedule; re-raise if L12 is still idle later in October."}
        </p>

        <p className="text-slate-500">
          The decision and reason are logged against D-01 for its review on 4
          Nov 2026.
        </p>
      </div>
    </div>
  );
}
