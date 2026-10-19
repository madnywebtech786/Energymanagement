"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;
const subscribe = (callback) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

// Tracks the user's reduced-motion preference live, including mid-session
// changes. Server snapshot is `false`; the first client render reconciles
// silently because this value only ever gates optional motion, never layout.
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
