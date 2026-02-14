"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
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

// Refined sunset → sunrise color stops with more granularity to avoid muddy mid-tones
const COLOR_STOPS: [number, number, number][] = [
  [30, 8, 10],      // #1e080a — near-black wine red
  [48, 14, 16],     // #300e10 — deep wine
  [68, 20, 20],     // #441414 — dark wine red
  [95, 32, 25],     // #5f2019 — deep burnt red
  [120, 50, 30],    // #78321e — rich sienna
  [148, 72, 38],    // #944826 — warm terracotta
  [175, 100, 50],   // #af6432 — burnished amber
  [195, 130, 68],   // #c38244 — golden amber
  [210, 158, 95],   // #d29e5f — warm gold
  [225, 190, 135],  // #e1be87 — soft gold
  [235, 215, 175],  // #ebd7af — warm cream
  [242, 232, 215],  // #f2e8d7 — light cream
  [245, 241, 235],  // #f5f1eb — soft ivory
];

// Ease-in-out cubic for cinematic feel
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpColor(
  stops: [number, number, number][],
  t: number
): [number, number, number] {
  const clampedT = Math.max(0, Math.min(1, t));
  const easedT = easeInOutCubic(clampedT);
  const segmentCount = stops.length - 1;
  const rawIndex = easedT * segmentCount;
  const index = Math.floor(rawIndex);
  const localT = rawIndex - index;

  if (index >= segmentCount) return stops[segmentCount];

  const a = stops[index];
  const b = stops[index + 1];

  // Smooth-step for even smoother local interpolation
  const smoothT = localT * localT * (3 - 2 * localT);

  return [
    Math.round(a[0] + (b[0] - a[0]) * smoothT),
    Math.round(a[1] + (b[1] - a[1]) * smoothT),
    Math.round(a[2] + (b[2] - a[2]) * smoothT),
  ];
}

function luminance(r: number, g: number, b: number): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// Smooth text color blending — gradual transition, NOT a snap
function getTextColors(lum: number) {
  // Light text: rgb(245,241,235), Dark text: rgb(35,15,10)
  // Blend zone: luminance 0.35 to 0.55 (gradual crossfade)
  const blendStart = 0.35;
  const blendEnd = 0.55;
  const t = Math.max(0, Math.min(1, (lum - blendStart) / (blendEnd - blendStart)));
  // Ease the blend
  const blend = t * t * (3 - 2 * t);

  const lr = 245, lg = 241, lb = 235; // light text
  const dr = 35, dg = 15, db = 10;    // dark text

  const fgR = Math.round(lr + (dr - lr) * blend);
  const fgG = Math.round(lg + (dg - lg) * blend);
  const fgB = Math.round(lb + (db - lb) * blend);

  const fgA = 0.92 + blend * 0.03; // slightly stronger on light bg

  const mutedA = 0.5 + blend * 0.1;
  const mR = Math.round(lr + (dr - lr) * blend);
  const mG = Math.round(lg + (dg - lg) * blend);
  const mB = Math.round(lb + (db - lb) * blend);

  const borderA = 0.06 + blend * 0.06;
  const cardA = 0.03 + blend * 0.02;

  return {
    foreground: `rgba(${fgR},${fgG},${fgB},${fgA.toFixed(2)})`,
    mutedForeground: `rgba(${mR},${mG},${mB},${mutedA.toFixed(2)})`,
    borderColor: `rgba(${fgR},${fgG},${fgB},${borderA.toFixed(2)})`,
    cardBg: `rgba(${fgR},${fgG},${fgB},${cardA.toFixed(2)})`,
  };
}

export function ScrollColorProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const rafRef = useRef<number>(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Smooth interpolation for scroll progress (lerp each frame)
  const tick = useCallback(() => {
    const current = currentProgressRef.current;
    const target = targetProgressRef.current;
    const next = current + (target - current) * 0.12; // smooth easing factor
    currentProgressRef.current = next;

    const [r, g, b] = lerpColor(COLOR_STOPS, next);
    const lum = luminance(r, g, b);

    setProgress(next);
    setIsDark(lum < 0.45);

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    targetProgressRef.current = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
  }, []);

  useEffect(() => {
    handleScroll();
    currentProgressRef.current = targetProgressRef.current;
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, tick]);

  const [r, g, b] = lerpColor(COLOR_STOPS, progress);
  const bgColor = `rgb(${r}, ${g}, ${b})`;
  const lum = luminance(r, g, b);
  const colors = getTextColors(lum);

  return (
    <ScrollColorContext.Provider value={{ progress, isDark }}>
      <div
        className="min-h-screen"
        style={
          {
            backgroundColor: bgColor,
            "--scroll-fg": colors.foreground,
            "--scroll-muted-fg": colors.mutedForeground,
            "--scroll-border": colors.borderColor,
            "--scroll-card-bg": colors.cardBg,
            "--scroll-bg-r": r,
            "--scroll-bg-g": g,
            "--scroll-bg-b": b,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ScrollColorContext.Provider>
  );
}
