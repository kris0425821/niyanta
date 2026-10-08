"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RoleShell from "@/components/RoleShell";
import StatCard from "@/components/StatCard";
import E10Decision from "@/components/E10Decision";
import { directions, escalations } from "@/lib/data";

function KartikContent() {
  const searchParams = useSearchParams();

  const section = searchParams.get("section") || "overview";

  return (
    <RoleShell
      name="Kartik"
      role="Managing Director · V5"
    >
      {/* =====================================================
          OVERVIEW
      ===================================================== */}
      {section === "overview" && (
        <>
          <div>
            <p className="text-sm font-medium text-blue-600">
              V5 · Direction
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Good morning, Kartik
            </h1>

            <p className="mt-2 text-slate-500">
              Decisions only you can take, their business impact,
              and directions currently requiring judgement.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <StatCard
              title="FY26 EBITDA"
              value="₹13.4 Cr"
              subtitle="Current baseline"
            />

            <StatCard
              title="FY28 Target"
              value="₹24 Cr"
              subtitle="Same tonnage"
            />

            <StatCard
              title="EBITDA Gap"
              value="₹10.6 Cr"
              subtitle="To target"
              warning
            />

            <StatCard
              title="Revenue"
              value="₹318 Cr"
              subtitle="FY26"
            />
          </div>

          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Decisions needing V5 judgement
              </h2>

              <p className="text-sm text-slate-500">
                Exceptions where your authority changes the outcome.
              </p>
            </div>

            <E10Decision />
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">
                Current directions
              </h2>

              <div className="mt-4 space-y-3">
                {Array.isArray(directions) &&
                  directions.map((direction: any, index: number) => (
                    <div
                      key={index}
                      className="rounded-lg bg-slate-50 p-4"
                    >
                      <p className="font-semibold text-slate-800">
                        {direction.id ?? `Direction ${index + 1}`}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {direction.direction ??
                          direction.description ??
                          "Direction under review"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">
                Escalations reaching V5
              </h2>

              <div className="mt-4 space-y-3">
                {Array.isArray(escalations) &&
                  escalations
                    .slice(0, 4)
                    .map((item: any, index: number) => (
                      <div
                        key={index}
                        className="rounded-lg border border-slate-100 p-4"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {item.id ?? `Escalation ${index + 1}`}
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {item.what_happened ??
                            item.summary ??
                            "Escalation requiring review"}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* =====================================================
          DECISIONS
      ===================================================== */}
      {section === "decisions" && (
        <>
          <div>
            <p className="text-sm font-medium text-blue-600">
              V5 · Decisions
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Decisions
            </h1>

            <p className="mt-2 text-slate-500">
              Decisions requiring V5 judgement and the evidence
              behind them.
            </p>
          </div>

          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                E10 · Karnavati
              </h2>

              <p className="text-sm text-slate-500">
                18-tonne commodity yarn offer for October.
              </p>
            </div>

            <E10Decision />
          </section>

          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              Decision principle
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              V5 decisions should consider the commercial,
              operational and strategic consequences before a
              final direction is recorded. The decision is judged
              on the direction taken, not on the individual who
              raised the issue.
            </p>
          </section>
        </>
      )}

      {/* =====================================================
          DIRECTIONS
      ===================================================== */}
      {section === "directions" && (
        <>
          <div>
            <p className="text-sm font-medium text-blue-600">
              V5 · Direction
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Current Directions
            </h1>

            <p className="mt-2 text-slate-500">
              Company-level directions currently shaping the
              organisation.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StatCard
              title="FY26 EBITDA"
              value="₹13.4 Cr"
              subtitle="Baseline"
            />

            <StatCard
              title="FY28 EBITDA"
              value="₹24 Cr"
              subtitle="Direction"
            />

            <StatCard
              title="EBITDA Gap"
              value="₹10.6 Cr"
              subtitle="Remaining gap"
              warning
            />
          </div>

          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              Active directions
            </h2>

            <div className="mt-5 space-y-4">
              {Array.isArray(directions) &&
                directions.map((direction: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                          {direction.id ??
                            `Direction ${index + 1}`}
                        </p>

                        <p className="mt-2 font-semibold text-slate-900">
                          {direction.direction ??
                            direction.description ??
                            "Direction under review"}
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </>
      )}

      {/* =====================================================
          ESCALATIONS
      ===================================================== */}
      {section === "escalations" && (
        <>
          <div>
            <p className="text-sm font-medium text-blue-600">
              V5 · Escalations
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Escalations
            </h1>

            <p className="mt-2 text-slate-500">
              Issues routed to V5 where a company-level decision
              or direction may be required.
            </p>
          </div>

          <section className="mt-8">
            <div className="space-y-4">
              {Array.isArray(escalations) &&
                escalations.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                          {item.id ??
                            `Escalation ${index + 1}`}
                        </p>

                        <p className="mt-2 font-semibold text-slate-900">
                          {item.what_happened ??
                            item.summary ??
                            "Escalation requiring review"}
                        </p>
                      </div>

                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        REVIEW
                      </span>
                    </div>

                    {item.raised_by && (
                      <p className="mt-4 text-sm text-slate-500">
                        Raised by:{" "}
                        <span className="font-medium text-slate-700">
                          {item.raised_by}
                        </span>
                      </p>
                    )}

                    {item.ask && (
                      <div className="mt-4 rounded-lg bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Decision required
                        </p>

                        <p className="mt-2 text-sm text-slate-700">
                          {item.ask}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        </>
      )}
    </RoleShell>
  );
}

export default function KartikPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50" />
      }
    >
      <KartikContent />
    </Suspense>
  );
}