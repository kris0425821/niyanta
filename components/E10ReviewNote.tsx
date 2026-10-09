"use client";

import { useEffect, useState } from "react";

// Shows, inside D-01, where the E10 decision will sit at review time.
export default function E10ReviewNote() {
  const [e10, setE10] = useState<any>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch("/api/e10/decision", { cache: "no-store" });
        const data = await res.json();
        if (alive && res.ok) setE10(data);
      } catch {
        /* keep the note quiet if it cannot load */
      }
    }

    load();
    const timer = setInterval(load, 3000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  const decided = e10?.status === "DECIDED";

  return (
    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-slate-800">
      <p className="text-xs font-semibold uppercase text-blue-700">
        E10 · Karnavati 18 t at ₹352 — for the 4 Nov review
      </p>

      {decided ? (
        <p className="mt-1">
          Kartik decided <span className="font-semibold">{e10.decision}</span>.
          Reason on record: {e10.reason}. This is the first live order the
          direction has been tested against, so it goes into the review as
          evidence (one order; not enough to validate or contradict D-01 on
          its own).
        </p>
      ) : (
        <p className="mt-1">
          Open. Once Kartik decides, the outcome and his reason are logged
          here as evidence for the review.
        </p>
      )}
    </div>
  );
}
