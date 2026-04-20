"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

interface ScrollColorContextValue {
  isDark: boolean;
}

const ScrollColorContext = createContext<ScrollColorContextValue>({
  isDark: true,
});

export function useScrollColor() {
  return useContext(ScrollColorContext);
}

export function ScrollColorProvider({ children }: { children: ReactNode }) {
  const contextValue = useMemo(() => ({ isDark: true }), []);

  return (
    <ScrollColorContext.Provider value={contextValue}>
      <div
        className="min-h-screen"
        style={
          {
            backgroundColor: "rgb(30, 8, 10)",
            "--scroll-fg": "rgba(245,241,235,0.95)",
            "--scroll-muted-fg": "rgba(228,214,198,0.74)",
            "--scroll-border": "rgba(245,241,235,0.13)",
            "--scroll-card-bg": "rgba(255,255,255,0.06)",
            "--scroll-bg-r": 30,
            "--scroll-bg-g": 8,
            "--scroll-bg-b": 10,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ScrollColorContext.Provider>
  );
}
