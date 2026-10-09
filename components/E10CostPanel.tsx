import { directions } from "@/lib/data";
import {
  E10,
  belowPeerPct,
  estContributionLakh,
  l12Days,
  perRupeeExposureLakh,
} from "@/lib/e10Cost";

export default function E10CostPanel() {
  const d01: any = (directions as any[]).find((d) => d.id === "D-01");

  const bhandari = d01?.responses?.find((r: any) =>
    String(r.by).includes("Bhandari")
  );

  const declinedKarnavati =
    Array.isArray(bhandari?.accounts) &&
    bhandari.accounts.includes("Karnavati Fabric Agency");

  const pctVs380 = belowPeerPct(E10.peerPriceEscalation);
  const pctVs362 = belowPeerPct(E10.peerPriceOrderNote);

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        What each choice costs, and who carries it
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* ACCEPT */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-900">Accept as filler</p>
            <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700">
              Carried by: Company
            </span>
          </div>

          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Gain (estimate): </span>
              about ₹{estContributionLakh.toFixed(1)} lakh contribution
              (₹{E10.contributionPerKg}/kg × {E10.kg / 1000} t). Finance&apos;s
              figure; no product-level cost sits behind it.
            </li>
            <li>
              <span className="font-semibold">Price: </span>₹{E10.offerPrice}
              /kg, which is ₹{E10.karnavatiFy26Avg - E10.offerPrice} below what
              Karnavati paid on average in FY26 (₹{E10.karnavatiFy26Avg}).
            </li>
            <li>
              <span className="font-semibold">Precedent: </span>
              the other traders bought{" "}
              {Math.round(E10.otherTradersFy26Kg / 1000).toLocaleString("en-IN")}{" "}
              t in FY26. Every ₹1/kg they win off the back of this is about ₹
              {perRupeeExposureLakh.toFixed(0)} lakh a year, against a one-time
              gain of about ₹{estContributionLakh.toFixed(0)} lakh.
            </li>
          </ul>
        </div>

        {/* REFUSE */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-900">
              Refuse, keep L12 open
            </p>
            <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700">
              Carried by: Plant
            </span>
          </div>

          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Idle capacity: </span>
              about {E10.kg / 1000} t, roughly {l12Days.toFixed(0)} days of L12
              (rated {E10.l12RatedKgPerDay.toLocaleString("en-IN")} kg/day), if
              nothing else comes.
            </li>
            <li>
              <span className="font-semibold">L12 today: </span>
              {E10.l12IdleKg30d.toLocaleString("en-IN")} kg idle for lack of
              orders in the last 30 days, {E10.l12BookedDaysAhead} days booked
              ahead.
            </li>
            <li>
              <span className="font-semibold">Forgone (estimate): </span>
              the same ≈₹{estContributionLakh.toFixed(1)} lakh, on the same
              Finance estimate.
            </li>
          </ul>
        </div>
      </div>

      {/* DIRECTION CHECK */}
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-slate-800">
        <p className="font-semibold">
          Your direction D-01: stop taking commodity orders priced more than{" "}
          {E10.d01ThresholdPct}% below peers
        </p>

        <p className="mt-2">
          This offer is <span className="font-semibold">{pctVs362.toFixed(1)}%</span>{" "}
          below peers if peers pay ₹{E10.peerPriceOrderNote} (inside the rule),
          or <span className="font-semibold">{pctVs380.toFixed(1)}%</span> below
          if they pay ₹{E10.peerPriceEscalation} (outside it). The answer
          depends on which peer price is right.
        </p>

        {declinedKarnavati && (
          <p className="mt-2">
            Bhandari already responded to D-01 on {bhandari.on}:{" "}
            <span className="font-semibold">{bhandari.response}</span>, and
            named Karnavati. Accepting this order is the case he declined.
          </p>
        )}
      </div>

      {/* DATA CAVEAT */}
      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-500">
        <p className="font-semibold text-slate-600">What the data does not agree on</p>
        <p className="mt-1">
          The escalation says peers pay about ₹{E10.peerPriceEscalation}; the
          order record (SO 4405100) says about ₹{E10.peerPriceOrderNote}. Both
          contribution figures are Finance estimates, not costed, so treat them
          as directional. D-01 itself was set with low confidence and has too
          little evidence to judge yet.
        </p>
      </div>
    </div>
  );
}
