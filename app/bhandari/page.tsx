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

function BhandariContent() {
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
            item.role === "Bhandari"
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
            role: "Bhandari",
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
      (item) => item.role === "Bhandari"
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        name="Mr. Bhandari"
        role="Commercial GM · V4 / H1"
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
                  V4 · H1 Orders
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  Good morning, Bhandari
                </h1>

                <p className="mt-3 text-lg text-slate-500">
                  Commercial pursuits, pricing and the impact
                  of management directions on customer
                  relationships.
                </p>
              </div>

              {/* Stats */}

              <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Active customers
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    47
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    From 55 account records
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Large-account concentration
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    58%
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Revenue from five accounts
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="text-sm text-slate-500">
                    Sample response
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    ~10 days
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Current plant response time
                  </p>
                </div>
              </div>

              {/* E10 */}

              <section>
                <h2 className="mb-5 text-2xl font-bold text-slate-900">
                  E10 · Commercial response
                </h2>

                {decision?.status === "PENDING" && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-7">
                    <p className="text-slate-500">
                      E10 is waiting for Kartik to request
                      your commercial view.
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
                          Karnavati, one of the five largest
                          accounts, is offering to take 18 tonnes
                          at ₹352/kg to fill idle L12 capacity in
                          October. Peers are paying around ₹380/kg.
                        </p>
                      </div>

                      {/* Commercial facts */}

                      <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3">

                        <div className="rounded-xl bg-slate-50 p-5">
                          <p className="text-sm text-slate-500">
                            Offered price
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            ₹352/kg
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-5">
                          <p className="text-sm text-slate-500">
                            Peer price
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            ~₹380/kg
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-5">
                          <p className="text-sm text-slate-500">
                            Account importance
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            Top 5
                          </p>
                        </div>
                      </div>

                      {/* Assessment */}

                      <div>
                        <p className="mb-3 text-sm font-semibold text-slate-700">
                          Your commercial view
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
                              The commercial case is acceptable
                              despite the lower price.
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
                              The lower price or account
                              precedent needs caution.
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
                          placeholder="Explain the commercial reasoning behind your view..."
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
                          : "Send commercial view to Kartik"}
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
                        Your commercial view has been sent to Kartik.
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
                        Kartik will combine your commercial view
                        with the plant view before making the final
                        decision.
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
                          YOUR COMMERCIAL VIEW
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
                  V4 · H1 Orders
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Commercial Decisions
                </h1>

                <p className="mt-2 text-slate-500">
                  Functional decisions requiring commercial judgement
                  before execution.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Active customers
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    47
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    From 55 account records
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">
                    Top-account concentration
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    58%
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Revenue from five accounts
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="text-sm text-slate-500">
                    E10 price gap
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    ₹28/kg
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Below peer price
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
                      Karnavati · 18-tonne offer
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                      The commercial question is whether accepting
                      ₹352/kg for 18 tonnes creates an acceptable
                      account precedent while filling idle L12
                      capacity.
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    COMMERCIAL JUDGEMENT
                  </span>

                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Offer
                    </p>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      ₹352/kg
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Peer price
                    </p>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      ~₹380/kg
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Account
                    </p>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      Top 5
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
                  V4 · H1 Orders
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Directions Received
                </h1>

                <p className="mt-2 text-slate-500">
                  Management directions that need commercial
                  interpretation and follow-through.
                </p>
              </div>

              <section className="rounded-2xl border border-slate-200 bg-white p-7">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      COMMERCIAL DIRECTION
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      Protect specialty growth while managing
                      account concentration
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                      Commercial execution needs to balance the
                      company direction toward higher-value
                      specialty business with the concentration
                      risk created by a small number of large
                      accounts.
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    RECEIVED
                  </span>

                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Active customers
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      47
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Top 5 revenue share
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      58%
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Specialty contribution
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      40%
                    </p>
                  </div>

                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Commercial interpretation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Account decisions should consider both immediate
                    contribution and the precedent they create for
                    future pricing conversations.
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
                  V4 · H1 Orders
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Commercial Escalations
                </h1>

                <p className="mt-2 text-slate-500">
                  Commercial issues that need higher-level judgement
                  or cross-functional input.
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
                        Karnavati · ₹352/kg offer
                      </h2>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                        A major account is offering to take 18 tonnes
                        below the observed peer price. The issue
                        requires balancing immediate capacity use
                        against pricing precedent.
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      ROUTED TO V5
                    </span>

                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <div className="rounded-xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">
                        Offer
                      </p>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        ₹352/kg
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">
                        Peer price
                      </p>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        ~₹380/kg
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

                  </div>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-7">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Escalation principle
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Escalate when the commercial consequence crosses
                    functional boundaries or requires a V5 direction.
                    The escalation should carry evidence and the
                    specific judgement required.
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

export default function BhandariPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50" />
      }
    >
      <BhandariContent />
    </Suspense>
  );
}