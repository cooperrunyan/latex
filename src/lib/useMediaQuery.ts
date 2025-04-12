"use client";

import { useState, useEffect, useMemo } from "react";

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function useWindowSizeMediaQuery(
  query: string,
  defaultValue = false,
): boolean {
  const query2 = useMemo(
    () => query.replaceAll(/\d+/g, (num) => `${Number(num) / 16}rem`),
    [query],
  );

  return useMediaQuery(query2, defaultValue);
}
