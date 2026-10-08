"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import RoleShell from "@/components/RoleShell";
import StatCard from "@/components/StatCard";
import DecisionCard from "@/components/DecisionCard";

function PranavContent() {
  const searchParams = useSearchParams();

  const section = searchParams.get("section") || "overview";

  return (
    <RoleShell
      name="Pranav"
      role="Executive Director · V5"
    >
      {/* =====================================================
          OVERVIEW
      ===================================================== */}
      {section === "overview" && (
        <>
          <div>
            <p className="text-sm font-medium text-blue-600">
              V5 · Plant Readiness & Specialty
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Good morning, Pranav
            </h1>

            <p className="mt-2 text-slate-500">
              Specialty growth, plant readiness and whether
              strategic directions are actually moving.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StatCard
              title="Plant capacity"
              value="9,200 t/year"
              subtitle="83% utilised"
            />

            <StatCard
              title="Specialty volume"
              value="7%"
              subtitle="Of total volume"
            />

            <StatCard
              title="Specialty contribution"
              value="40%"
              subtitle="Contribution rate"
            />
          </div>

          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Specialty growth
            </h2>

            <DecisionCard
              title="D-02 · Two specification-driven accounts"
              description="The direction is to pursue two specification-driven curtain/upholstery accounts before Q4. Bhandari has named Silvara Home and Hearthline Living. Silvara has received a quote; Hearthline is waiting on a trial decision."
              status="In progress"
              confidence="DIRECTIONAL"
              action="Check plant readiness and progress"
            />
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              What matters this morning
            </h2>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="rounded-lg bg-slate-50 p-4">
                Specialty wins need corresponding plant readiness.
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                Directions should be reviewed based on evidence,
                not activity alone.
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                Capacity decisions should connect back to EBITDA
                impact.
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
              Specialty Decisions
            </h1>

            <p className="mt-2 text-slate-500">
              Decisions around specialty growth, plant readiness
              and whether strategic directions are progressing.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StatCard
              title="Specialty volume"
              value="7%"
              subtitle="Of total volume"
            />

            <StatCard
              title="Contribution"
              value="40%"
              subtitle="Specialty contribution rate"
            />

            <StatCard
              title="Plant capacity"
              value="9,200 t/year"
              subtitle="83% utilised"
            />
          </div>

          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Decision needing V5 judgement
              </h2>

              <p className="text-sm text-slate-500">
                The key question is whether specialty growth is
                sufficiently supported by plant readiness.
              </p>
            </div>

            <DecisionCard
              title="D-02 · Two specification-driven accounts"
              description="Silvara Home has received a quote. Hearthline Living is waiting on a trial decision. The direction needs evidence that the plant can support the resulting specialty requirements."
              status="In progress"
              confidence="DIRECTIONAL"
              action="Review plant readiness and account progress"
            />
          </section>

          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              Decision principle
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Specialty growth should not be judged only by the
              number of prospects or quotes. The direction needs
              corresponding evidence from trials, specifications
              and plant readiness.
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
              Specialty Directions
            </h1>

            <p className="mt-2 text-slate-500">
              Strategic directions connected to specialty growth
              and plant capability.
            </p>
          </div>

          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  D-02
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Two specification-driven accounts
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                  Pursue two specification-driven curtain/upholstery
                  accounts before Q4: Silvara Home and Hearthline
                  Living.
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                ACTIVE
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Silvara Home
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  Quote received
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Commercial progress exists, but plant readiness
                  still matters.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Hearthline Living
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  Trial decision pending
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Further evidence is required before the account
                  progresses.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            <StatCard
              title="Specialty volume"
              value="7%"
              subtitle="Current share"
            />

            <StatCard
              title="Contribution rate"
              value="40%"
              subtitle="Specialty"
            />

            <StatCard
              title="Plant utilisation"
              value="83%"
              subtitle="Current load"
            />
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
              Specialty Escalations
            </h1>

            <p className="mt-2 text-slate-500">
              Issues where specialty growth or plant readiness
              requires higher-level judgement.
            </p>
          </div>

          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                  D-02
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Specialty readiness for two accounts
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Silvara Home has received a quote while
                  Hearthline Living is waiting on a trial decision.
                  The remaining question is whether plant
                  readiness can support the direction.
                </p>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                REVIEW
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Specialty volume
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  7%
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Contribution
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  40%
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Plant utilisation
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  83%
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                What needs attention
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                Confirm whether the plant can support the
                specification-driven requirements before treating
                account activity as evidence of specialty growth.
              </p>
            </div>
          </section>
        </>
      )}
    </RoleShell>
  );
}

export default function PranavPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50" />
      }
    >
      <PranavContent />
    </Suspense>
  );
}