"use client";

import { useState } from "react";

// Demo only: puts E10 back to the start. Sits at the very bottom of the page.
export default function ResetDemoButton() {
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState("");

  async function reset() {
    if (
      !window.confirm(
        "Reset E10 to the start? This clears the decision and both views."
      )
    ) {
      return;
    }

    setResetting(true);
    setError("");

    try {
      const response = await fetch("/api/e10/reset", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Reset failed.");
      }

      // Reload so every part of the page starts clean.
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed.");
      setResetting(false);
    }
  }

  return (
    <div className="mt-16 border-t border-slate-200 pt-6 text-center">
      <button
        onClick={reset}
        disabled={resetting}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-50"
      >
        {resetting ? "Resetting..." : "Reset demo (start E10 again)"}
      </button>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
