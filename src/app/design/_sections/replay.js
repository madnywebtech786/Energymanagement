"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

// Dev-only: remounts its children so an entrance animation plays again.
export function Replay({ children }) {
  const [run, setRun] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={() => setRun((count) => count + 1)}
        className="absolute right-4 top-3 flex min-h-8 items-center gap-2 rounded-sm px-2 text-label uppercase text-accent transition-colors hover:text-foreground"
      >
        <RotateCcw aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
        Replay
      </button>
      <div key={run}>{children}</div>
    </>
  );
}
