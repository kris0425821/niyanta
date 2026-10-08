"use client";

import { useEffect, useState } from "react";

type Decision = "ACCEPT" | "DECLINE" | null;

type E10DecisionData = {
  status: string;
  decision: Decision;
  reason: string;
  decidedBy: string | null;
  decidedAt: string | null;
  viewsRequested: boolean;
};

type E10Response = {
  role: "Bhandari" | "Kamath";
  assessment: "SUPPORT" | "CONCERN";
  reason: string;
};

export default function E10Decision() {
  const [open, setOpen] = useState(false);

  const [decision, setDecision] =
    useState<Decision>(null);

  const [reason, setReason] = useState("");

  const [e10, setE10] =
    useState<E10DecisionData | null>(null);

  const [responses, setResponses] =
    useState<E10Response[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const decisionResponse = await fetch(
        "/api/e10/decision"
      );

      const decisionData =
        await decisionResponse.json();

      setE10(decisionData);

      if (decisionData.status === "DECIDED") {
        setDecision(decisionData.decision);
        setReason(decisionData.reason);
      }

      const response = await fetch(
        "/api/e10/response"
      );

      const responseData = await response.json();

      setResponses(responseData);
    } catch {
      setError("Unable to load E10.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function requestViews() {
    setRequesting(true);
    setError("");

    try {
      const response = await fetch(
        "/api/e10/decision",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "REQUEST_VIEWS",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to request views."
        );
      }

      setE10(data.decision);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to request views."
      );
    } finally {
      setRequesting(false);
    }
  }

  async function submitFinalDecision() {
    if (!decision || reason.trim().length < 5) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        "/api/e10/decision",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "FINAL_DECISION",
            decision,
            reason,
            decidedBy: "Kartik",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save decision."
        );
      }

      setE10(data.decision);
      setOpen(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save decision."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">
          Loading E10...
        </p>
      </div>
    );
  }

  if (!e10) {
    return null;
  }

  const bhandariView = responses.find(
    (item) => item.role === "Bhandari"
  );

  const kamathView = responses.find(
    (item) => item.role === "Kamath"
  );

  const bothViewsReceived =
    !!bhandariView && !!kamathView;

  // -----------------------------------------
  // FINAL DECISION ALREADY MADE
  // -----------------------------------------

  if (e10.status === "DECIDED") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Final decision recorded
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900">
              E10 · Karnavati 18-tonne offer
            </h3>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            {e10.decision}
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ViewCard
            title="Bhandari · Commercial GM"
            view={bhandariView}
          />

          <ViewCard
            title="Kamath · Plant Head"
            view={kamathView}
          />
        </div>

        <div className="mt-5 rounded-lg bg-white p-5">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Kartik's final reasoning
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            {e10.reason}
          </p>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Decided by {e10.decidedBy}
        </p>
      </div>
    );
  }

  // -----------------------------------------
  // VIEWS RECEIVED — KARTIK CAN DECIDE
  // -----------------------------------------

  if (
    e10.status === "AWAITING_VIEWS" &&
    bothViewsReceived
  ) {
    return (
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
        <div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            VIEWS RECEIVED
          </span>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            E10 · Karnavati 18-tonne offer
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Kartik can now review both functional views
            before making the final decision.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ViewCard
            title="Bhandari · Commercial GM"
            view={bhandariView}
          />

          <ViewCard
            title="Kamath · Plant Head"
            view={kamathView}
          />
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">
            Final V5 decision
          </p>

          <p className="mt-1 text-sm text-slate-500">
            You have received both perspectives. Now make
            the final business decision.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-4 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Make final decision
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {open && (
          <DecisionModal
            decision={decision}
            setDecision={setDecision}
            reason={reason}
            setReason={setReason}
            saving={saving}
            onClose={() => setOpen(false)}
            onSubmit={submitFinalDecision}
          />
        )}
      </div>
    );
  }

  // -----------------------------------------
  // WAITING FOR VIEWS
  // -----------------------------------------

  if (e10.status === "AWAITING_VIEWS") {
    return (
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          VIEWS REQUESTED
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          E10 · Karnavati 18-tonne offer
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Kartik has requested views from the Commercial
          and Plant functions.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PendingView
            title="Bhandari"
            role="Commercial GM · V4 / H1"
            completed={!!bhandariView}
          />

          <PendingView
            title="Kamath"
            role="Plant Head · V4 / H3"
            completed={!!kamathView}
          />
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
    );
  }

  // -----------------------------------------
  // INITIAL E10
  // -----------------------------------------

  return (
    <div className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
              NEEDS INPUT
            </span>

            <span className="text-xs text-slate-400">
              E10
            </span>
          </div>

          <h3 className="mt-3 text-xl font-bold text-slate-900">
            Karnavati · 18-tonne offer
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Raised by Aditya
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 px-4 py-3 text-right">
          <p className="text-xs text-slate-500">
            Confidence
          </p>

          <p className="mt-1 text-sm font-bold text-slate-700">
            DIRECTIONAL
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Quantity" value="18 tonnes" />

        <Fact label="Offered price" value="₹352/kg" />

        <Fact
          label="Comparable price"
          value="~₹380/kg"
        />

        <Fact label="Production line" value="L12" />
      </div>

      <div className="mt-6 rounded-lg border border-amber-100 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          Why this needs multiple views
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          L12 currently has idle capacity, but the offered
          price is below comparable customers. Kartik should
          understand both the commercial and plant
          consequences before making the final decision.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-xs font-bold uppercase text-emerald-700">
            Potential upside
          </p>

          <p className="mt-2 text-sm text-slate-700">
            Use idle L12 capacity and generate contribution.
          </p>
        </div>

        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <p className="text-xs font-bold uppercase text-red-700">
            Potential downside
          </p>

          <p className="mt-2 text-sm text-slate-700">
            Lower pricing may create commercial pressure.
          </p>
        </div>
      </div>

      <button
        onClick={requestViews}
        disabled={requesting}
        className="mt-6 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {requesting
          ? "Requesting views..."
          : "Get views from Commercial & Plant"}
      </button>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

function ViewCard({
  title,
  view,
}: {
  title: string;
  view?: E10Response;
}) {
  if (!view) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <p className="font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          No response yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Functional view
      </p>

      <h4 className="mt-1 font-bold text-slate-900">
        {title}
      </h4>

      <span
        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${
          view.assessment === "SUPPORT"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {view.assessment === "SUPPORT"
          ? "SUPPORT"
          : "CONCERN"}
      </span>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {view.reason}
      </p>
    </div>
  );
}

function PendingView({
  title,
  role,
  completed,
}: {
  title: string;
  role: string;
  completed: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-900">
            {title}
          </p>

          <p className="text-xs text-slate-500">
            {role}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            completed
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {completed ? "RECEIVED" : "WAITING"}
        </span>
      </div>
    </div>
  );
}

function DecisionModal({
  decision,
  setDecision,
  reason,
  setReason,
  saving,
  onClose,
  onSubmit,
}: {
  decision: Decision;
  setDecision: (value: Decision) => void;
  reason: string;
  setReason: (value: string) => void;
  saving: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-7 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Final V5 decision
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          E10 · Karnavati offer
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          You have reviewed the Commercial and Plant
          responses. Make the final decision.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <button
            onClick={() => setDecision("ACCEPT")}
            className={`rounded-xl border p-5 text-left ${
              decision === "ACCEPT"
                ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600"
                : "border-slate-200 hover:border-slate-400"
            }`}
          >
            <p className="font-bold text-slate-900">
              Accept
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Proceed with the E10 direction.
            </p>
          </button>

          <button
            onClick={() => setDecision("DECLINE")}
            className={`rounded-xl border p-5 text-left ${
              decision === "DECLINE"
                ? "border-red-600 bg-red-50 ring-2 ring-red-600"
                : "border-slate-200 hover:border-slate-400"
            }`}
          >
            <p className="font-bold text-slate-900">
              Decline
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Do not proceed with this direction.
            </p>
          </button>
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold text-slate-900">
            Final reasoning
          </label>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={5}
            placeholder="Explain your final decision after considering both views..."
            className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={
              saving ||
              !decision ||
              reason.trim().length < 5
            }
            className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving
              ? "Saving..."
              : "Record final decision"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Fact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}