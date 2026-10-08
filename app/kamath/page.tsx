"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";

type Decision = {
  status: "PENDING" | "AWAITING_VIEWS" | "DECIDED";
  decision: string | null;
  reason: string;
  decidedBy: string | null;
  decidedAt: string | null;
};

type E10Response = {
  role: "Bhandari" | "Kamath";
  assessment: "SUPPORT" | "CONCERN" | null;
  reason: string;
  submittedAt: string | null;
};

function KamathContent() {
  const searchParams = useSearchParams();

  const section =
    searchParams.get("section") || "overview";

  const [decision, setDecision] =
    useState<Decision | null>(null);

  const [responses, setResponses] =
    useState<E10Response[]>([]);

  const [assessment, setAssessment] = useState<
    "SUPPORT" | "CONCERN" | null
  >(null);

  const [reason, setReason] = useState("");

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  async function loadE10() {
    try {
      const [decisionRes, responseRes] =
        await Promise.all([
          fetch("/api/e10/decision", {
            cache: "no-store",
          }),

          fetch("/api/e10/response", {
            cache: "no-store",
          }),
        ]);

      const decisionData =
        await decisionRes.json();

      const responseData =
        await responseRes.json();

      setDecision(decisionData);
      setResponses(responseData);

      const myResponse =
        responseData.find(
          (item: E10Response) =>
            item.role === "Kamath"
        );

      if (myResponse) {
        setAssessment(myResponse.assessment);
        setReason(myResponse.reason);
        setSaved(true);
      }
    } catch (error) {
      console.error(
        "Failed to load E10:",
        error
      );
    }
  }

  useEffect(() => {
    loadE10();
  }, []);

  async function submitResponse() {
    if (!assessment || !reason.trim()) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "/api/e10/response",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            role: "Kamath",
            assessment,
            reason: reason.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to save response"
        );
      }

      setSaved(true);

      await loadE10();
    } catch (error) {
      console.error(error);

      alert(
        "Could not save your response."
      );
    } finally {
      setSaving(false);
    }
  }

  const myResponse =
    responses.find(
      (item) => item.role === "Kamath"
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        name="Mr. Kamath"
        role="Plant Head · V4 / H3"
      />

      <main className="ml-72 min-h-screen px-10 py-10">
        <div className="max-w-7xl">

          {/* =====================================================
              OVERVIEW
          ===================================================== */}

          {section === "overview" && (
            <>
              <div className="mb-10">
                <p className="mb-2 text-sm font-medium text-blue-600">
                  V4 · H3 Capacity
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  Good morning, Kamath
                </h1>

                <p className="mt-3 text-lg text-slate-500">
                  Production capacity, sequencing and the
                  operational consequences of management
                  directions.
                </p>
              </div>

              {/* Stats */}

              <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Annual capacity
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    9,200 t
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    14 production lines
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Utilisation
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    83%
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Current plant load
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Specialty hold
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    L09 / L10
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Current direction
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="text-sm text-slate-500">
                    Specialty issue
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    3 orders
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Waiting on polymer campaign
                  </p>
                </div>

              </div>

              {/* E10 */}

              <section>
                <h2 className="mb-5 text-2xl font-bold text-slate-900">
                  E10 · Plant response
                </h2>

                {decision?.status === "PENDING" && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-7">
                    <p className="text-slate-500">
                      E10 is waiting for Kartik to request
                      your plant view.
                    </p>
                  </div>
                )}

                {decision?.status === "AWAITING_VIEWS" &&
                  !saved && (
                    <div className="rounded-2xl border border-blue-200 bg-white p-7 shadow-sm">

                      <div className="mb-6">

                        <div className="mb-3 flex items-center gap-3">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            VIEW REQUESTED
                          </span>

                          <span className="text-sm text-slate-500">
                            Kartik is waiting for your input
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">
                          Karnavati · 18 tonnes commodity yarn
                        </h3>

                        <p className="mt-3 max-w-3xl text-slate-600">
                          Karnavati is offering 18 tonnes at
                          ₹352/kg to fill idle L12 capacity in
                          October. The commercial case needs to
                          be considered against current plant
                          load and sequencing.
                        </p>

                      </div>

                      {/* Plant facts */}

                      <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3">

                        <div className="rounded-xl bg-slate-50 p-5">
                          <p className="text-sm text-slate-500">
                            Plant utilisation
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            83%
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-5">
                          <p className="text-sm text-slate-500">
                            Requested volume
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            18 tonnes
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-5">
                          <p className="text-sm text-slate-500">
                            Target line
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            L12
                          </p>
                        </div>

                      </div>

                      {/* Assessment */}

                      <div>
                        <p className="mb-3 text-sm font-semibold text-slate-700">
                          Your plant view
                        </p>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                          <button
                            onClick={() =>
                              setAssessment("SUPPORT")
                            }
                            className={`rounded-xl border p-5 text-left transition ${
                              assessment === "SUPPORT"
                                ? "border-green-500 bg-green-50"
                                : "border-slate-200 bg-white hover:border-green-300"
                            }`}
                          >
                            <p className="font-bold text-green-700">
                              Support
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                              The plant can accommodate the
                              direction without a material
                              operational concern.
                            </p>
                          </button>

                          <button
                            onClick={() =>
                              setAssessment("CONCERN")
                            }
                            className={`rounded-xl border p-5 text-left transition ${
                              assessment === "CONCERN"
                                ? "border-amber-500 bg-amber-50"
                                : "border-slate-200 bg-white hover:border-amber-300"
                            }`}
                          >
                            <p className="font-bold text-amber-700">
                              Concern
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                              Capacity, sequencing or opportunity
                              cost creates an operational concern.
                            </p>
                          </button>

                        </div>
                      </div>

                      {/* Reason */}

                      <div className="mt-6">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Reason
                        </label>

                        <textarea
                          value={reason}
                          onChange={(e) =>
                            setReason(e.target.value)
                          }
                          placeholder="Explain the plant or capacity reasoning behind your view..."
                          rows={4}
                          className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <button
                        onClick={submitResponse}
                        disabled={
                          saving ||
                          !assessment ||
                          !reason.trim()
                        }
                        className="mt-5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {saving
                          ? "Saving..."
                          : "Send plant view to Kartik"}
                      </button>

                    </div>
                  )}

                {decision?.status === "AWAITING_VIEWS" &&
                  saved && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-7">

                      <div className="mb-3 flex items-center gap-3">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          VIEW RECORDED
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">
                        Your plant view has been sent to Kartik.
                      </h3>

                      <p className="mt-3 text-slate-600">
                        You recorded a{" "}
                        <strong>
                          {myResponse?.assessment}
                        </strong>{" "}
                        position.
                      </p>

                      <div className="mt-4 rounded-xl bg-white p-5">
                        <p className="text-sm font-semibold text-slate-700">
                          Your reasoning
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {myResponse?.reason}
                        </p>
                      </div>

                      <p className="mt-5 text-sm text-slate-500">
                        Kartik will combine your plant view with
                        the commercial view before making the
                        final decision.
                      </p>

                    </div>
                  )}

                {decision?.status === "DECIDED" && (
                  <div className="space-y-5">

                    <div className="rounded-2xl border border-slate-200 bg-white p-7">

                      <div className="mb-4 flex items-center gap-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          FINAL DECISION
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900">
                        {decision.decision}
                      </h3>

                      <p className="mt-3 text-slate-600">
                        Decision by {decision.decidedBy}
                      </p>

                      <div className="mt-5 rounded-xl bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-slate-700">
                          Final reasoning
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {decision.reason}
                        </p>
                      </div>

                    </div>

                    {myResponse && (
                      <div className="rounded-2xl border border-slate-200 bg-white p-7">

                        <p className="text-sm font-semibold text-slate-500">
                          YOUR PLANT VIEW
                        </p>

                        <p className="mt-2 text-xl font-bold text-slate-900">
                          {myResponse.assessment}
                        </p>

                        <p className="mt-3 text-slate-600">
                          {myResponse.reason}
                        </p>

                      </div>
                    )}

                  </div>
                )}

              </section>
            </>
          )}

          {/* =====================================================
              DECISIONS
          ===================================================== */}

          {section === "decisions" && (
            <>
              <div className="mb-10">
                <p className="text-sm font-medium text-blue-600">
                  V4 · H3 Capacity
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Plant Decisions
                </h1>

                <p className="mt-2 text-slate-500">
                  Operational decisions around capacity,
                  sequencing and production trade-offs.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Annual capacity
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    9,200 t
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    14 production lines
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Utilisation
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    83%
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Current plant load
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Target line
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    L12
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    E10 capacity opportunity
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="text-sm text-slate-500">
                    Specialty hold
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    L09 / L10
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Current direction
                  </p>
                </div>

              </div>

              <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      E10
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      L12 capacity decision
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                      Karnavati is offering 18 tonnes at ₹352/kg
                      to fill idle L12 capacity in October. The
                      plant decision is whether the volume fits
                      current sequencing and whether accepting it
                      creates an operational opportunity cost.
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    PLANT JUDGEMENT
                  </span>

                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Utilisation
                    </p>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      83%
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Requested volume
                    </p>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      18 tonnes
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Line
                    </p>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      L12
                    </p>
                  </div>

                </div>

              </section>
            </>
          )}

          {/* =====================================================
              DIRECTIONS
          ===================================================== */}

          {section === "directions" && (
            <>
              <div className="mb-10">
                <p className="text-sm font-medium text-blue-600">
                  V4 · H3 Capacity
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Directions Received
                </h1>

                <p className="mt-2 text-slate-500">
                  Management directions that need operational
                  interpretation and plant follow-through.
                </p>
              </div>

              <section className="rounded-2xl border border-slate-200 bg-white p-7">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      PLANT DIRECTION
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      Protect specialty readiness while using
                      available capacity carefully
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                      Plant sequencing needs to support the
                      specialty direction while making disciplined
                      use of available capacity and avoiding
                      unnecessary disruption to higher-value work.
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    RECEIVED
                  </span>

                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Annual capacity
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      9,200 t
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Utilisation
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      83%
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Specialty hold
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      L09 / L10
                    </p>
                  </div>

                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Plant interpretation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Capacity decisions should account for current
                    utilisation, sequencing constraints and the
                    opportunity cost of displacing specialty work.
                  </p>

                </div>

              </section>
            </>
          )}

          {/* =====================================================
              ESCALATIONS
          ===================================================== */}

          {section === "escalations" && (
            <>
              <div className="mb-10">
                <p className="text-sm font-medium text-blue-600">
                  V4 · H3 Capacity
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Plant Escalations
                </h1>

                <p className="mt-2 text-slate-500">
                  Operational issues that require higher-level
                  judgement or cross-functional alignment.
                </p>
              </div>

              <section className="space-y-5">

                <div className="rounded-2xl border border-amber-200 bg-white p-7">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                        E10
                      </p>

                      <h2 className="mt-2 text-xl font-bold text-slate-900">
                        L12 capacity and sequencing
                      </h2>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                        Karnavati's 18-tonne offer could use idle
                        L12 capacity in October. The plant escalation
                        is whether the volume can be absorbed without
                        creating a material sequencing or opportunity
                        cost issue.
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      ROUTED TO V5
                    </span>

                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <div className="rounded-xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">
                        Utilisation
                      </p>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        83%
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">
                        Volume
                      </p>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        18 tonnes
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">
                        Line
                      </p>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        L12
                      </p>
                    </div>

                  </div>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-7">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Escalation principle
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Escalate when an operational trade-off crosses
                    functional boundaries or requires a V5 decision.
                    The escalation should make the capacity,
                    sequencing and opportunity-cost evidence clear.
                  </p>

                </div>

              </section>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default function KamathPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50" />
      }
    >
      <KamathContent />
    </Suspense>
  );
}