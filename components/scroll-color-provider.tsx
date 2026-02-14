"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface ScrollColorContextValue {
  progress: number;
  isDark: boolean;
}

const ScrollColorContext = createContext<ScrollColorContextValue>({
  progress: 0,
  isDark: true,
});

export function useScrollColor() {
  return useContext(ScrollColorContext);
}

// Color stops: deep brown-red → warm amber → soft cream
// Each stop is [r, g, b]
const COLOR_STOPS: [number, number, number][] = [
  [42, 15, 15],    // #2a0f0f - deep dark red-brown
  [75, 30, 30],    // #4b1e1e
  [110, 44, 31],   // #6e2c1f
  [140, 70, 35],   // #8c4623 - warm mid brown
  [160, 100, 50],  // #a06432
  [190, 140, 80],  // #be8c50 - golden amber
  [210, 175, 120], // #d2af78
  [230, 210, 180], // #e6d2b4 - warm light
  [245, 241, 235], // #f5f1eb - soft ivory
];

function lerpColor(
  stops: [number, number, number][],
  t: number
): [number, number, number] {
  const clampedT = Math.max(0, Math.min(1, t));
  const segmentCount = stops.length - 1;
  const rawIndex = clampedT * segmentCount;
  const index = Math.floor(rawIndex);
  const localT = rawIndex - index;

  if (index >= segmentCount) return stops[segmentCount];

  const a = stops[index];
  const b = stops[index + 1];

  return [
    Math.round(a[0] + (b[0] - a[0]) * localT),
    Math.round(a[1] + (b[1] - a[1]) * localT),
    Math.round(a[2] + (b[2] - a[2]) * localT),
  ];
}

function luminance(r: number, g: number, b: number): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export function ScrollColorProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);

  const handleScroll = useCallback(() => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const p = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
    setProgress(p);

    const [r, g, b] = lerpColor(COLOR_STOPS, p);
    const lum = luminance(r, g, b);
    setIsDark(lum < 0.5);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const [r, g, b] = lerpColor(COLOR_STOPS, progress);
  const bgColor = `rgb(${r}, ${g}, ${b})`;

  // Compute text colors based on luminance
  const lum = luminance(r, g, b);
  const foreground = lum < 0.45 ? "rgba(245,241,235,0.95)" : "rgba(42,15,15,0.92)";
  const mutedForeground = lum < 0.45 ? "rgba(215,200,185,0.6)" : "rgba(80,50,30,0.55)";
  const borderColor = lum < 0.45 ? "rgba(255,255,255,0.08)" : "rgba(42,15,15,0.1)";
  const cardBg = lum < 0.45 ? "rgba(255,255,255,0.04)" : "rgba(42,15,15,0.04)";

  return (
    <ScrollColorContext.Provider value={{ progress, isDark }}>
      <div
        className="min-h-screen transition-colors duration-100"
        style={
          {
            backgroundColor: bgColor,
            "--scroll-fg": foreground,
            "--scroll-muted-fg": mutedForeground,
            "--scroll-border": borderColor,
            "--scroll-card-bg": cardBg,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ScrollColorContext.Provider>
  );
}
