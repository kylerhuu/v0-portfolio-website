"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CmsExperience } from "@/lib/sanity/types";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function experienceHref(exp: CmsExperience): string | null {
  const s = exp.slug?.trim();
  if (s) return `/experiences/${s}`;
  return null;
}

export function ExperiencesSection({ experiences }: { experiences: CmsExperience[] }) {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex > experiences.length - 1) setActiveIndex(0);
  }, [activeIndex, experiences.length]);

  const activeExperience = experiences[activeIndex] ?? null;

  const grouped = useMemo(() => {
    const parseYear = (duration?: string): string => {
      if (!duration) return "Other";
      const match = duration.match(/(19|20)\d{2}/);
      return match?.[0] ?? "Other";
    };

    const map = new Map<string, Array<{ exp: CmsExperience; idx: number }>>();
    experiences.forEach((exp, idx) => {
      const year = parseYear(exp.duration);
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push({ exp, idx });
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => {
        if (a === "Other") return 1;
        if (b === "Other") return -1;
        return Number(b) - Number(a);
      })
      .map(([year, items]) => ({ year, items }));
  }, [experiences]);

  return (
    <section id="experiences" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div
          ref={headingRef}
          className={`max-w-3xl transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)]">Experiences</h2>
          <p className="mb-4 text-2xl font-medium text-pretty md:text-3xl" style={{ color: "var(--scroll-fg)" }}>
            Career timeline with layered depth and measurable outcomes.
          </p>
          <p className="max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
            Select any role to inspect context, execution, and impact.
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,340px),minmax(0,1fr)] md:gap-16">
          <aside className="relative">
            <div
              className="pointer-events-none absolute bottom-1 left-2 top-2 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in srgb, var(--scroll-border) 30%, transparent), color-mix(in srgb, var(--scroll-border) 55%, transparent), color-mix(in srgb, var(--scroll-border) 30%, transparent))",
              }}
            />
            <div
              className="rounded-2xl px-3 py-3"
              style={{
                background:
                  "linear-gradient(145deg, color-mix(in srgb, var(--scroll-card-bg) 48%, transparent), color-mix(in srgb, var(--scroll-card-bg) 20%, transparent))",
              }}
            >
              <p
                className="mb-5 pl-4 text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 86%, transparent)" }}
              >
                Choose a role to inspect
              </p>
            <div className="space-y-9">
              {grouped.map((group) => (
                <div key={group.year}>
                  <p
                    className="mb-4 pl-7 text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 78%, transparent)" }}
                  >
                    {group.year}
                  </p>
                  <div className="space-y-2.5">
                    {group.items.map(({ exp, idx }) => {
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={exp.id}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className="group relative w-full cursor-pointer rounded-xl px-3 py-3 pl-8 pr-3 text-left transition-all duration-200"
                          style={{
                            backgroundColor: isActive
                              ? "color-mix(in srgb, hsl(15,80%,55%) 14%, transparent)"
                              : "transparent",
                            boxShadow: isActive
                              ? "inset 0 1px 0 rgba(255,255,255,0.14)"
                              : "none",
                          }}
                        >
                          <span
                            className="pointer-events-none absolute bottom-2 left-1 top-2 w-[2px] rounded-full transition-opacity duration-200"
                            style={{
                              backgroundColor: "hsl(15,80%,55%)",
                              opacity: isActive ? 1 : 0,
                            }}
                          />
                          <motion.span
                            className="pointer-events-none absolute left-[5px] top-1/2 block h-2.5 w-2.5 -translate-y-1/2 rounded-full"
                            animate={{
                              scale: isActive ? 1.28 : 0.8,
                              opacity: isActive ? 1 : 0.45,
                              backgroundColor: isActive ? "hsl(15,80%,55%)" : "rgba(255,255,255,0.45)",
                              boxShadow: isActive
                                ? "0 0 0 7px color-mix(in srgb, hsl(15,80%,55%) 22%, transparent)"
                                : "none",
                            }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                          />
                          <motion.p
                            className="text-base font-medium tracking-tight md:text-[1.05rem]"
                            style={{ color: "var(--scroll-fg)" }}
                            animate={{ opacity: isActive ? 1 : 0.56 }}
                          >
                            {exp.company}
                          </motion.p>
                          <motion.p
                            className="mt-0.5 text-sm"
                            style={{ color: "var(--scroll-muted-fg)" }}
                            animate={{ opacity: isActive ? 0.95 : 0.58 }}
                          >
                            {exp.title}
                          </motion.p>
                          <span
                            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            style={{
                              background:
                                "linear-gradient(120deg, color-mix(in srgb, hsl(15,80%,55%) 10%, transparent), transparent)",
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </aside>

          <div className="relative min-h-[340px]">
            <AnimatePresence mode="wait">
              {activeExperience ? (
                <motion.article
                  key={activeExperience.id}
                  initial={{ opacity: 0, x: 22, filter: "blur(2px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -18, filter: "blur(2px)" }}
                  transition={{ duration: 0.26, ease: "easeOut" }}
                  className="max-w-3xl rounded-2xl px-5 py-5 md:px-7 md:py-7"
                  style={{
                    background:
                      "linear-gradient(145deg, color-mix(in srgb, var(--scroll-card-bg) 52%, transparent), color-mix(in srgb, var(--scroll-card-bg) 20%, transparent))",
                    border: "1px solid color-mix(in srgb, var(--scroll-border) 24%, transparent)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 84%, transparent)" }}>
                    Selected experience
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl" style={{ color: "var(--scroll-fg)" }}>
                    {activeExperience.company}
                  </h3>
                  <p className="mt-2 text-base md:text-lg" style={{ color: "color-mix(in srgb, var(--scroll-fg) 76%, transparent)" }}>
                    {activeExperience.title}
                  </p>
                  <p
                    className="mt-3 text-xs uppercase tracking-[0.15em] md:text-[11px]"
                    style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 92%, transparent)" }}
                  >
                    {activeExperience.duration}
                    {activeExperience.location ? ` · ${activeExperience.location}` : ""}
                  </p>

                  <p className="mt-7 text-base leading-relaxed text-pretty md:text-lg" style={{ color: "color-mix(in srgb, var(--scroll-fg) 72%, transparent)" }}>
                    {activeExperience.summary}
                  </p>

                  <div className="mt-8 grid gap-7 md:grid-cols-2">
                    {(activeExperience.responsibilities || []).length > 0 ? (
                      <div>
                        <p className="mb-2 text-[11px] uppercase tracking-[0.16em]" style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 82%, transparent)" }}>
                          Responsibilities
                        </p>
                        <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--scroll-fg) 68%, transparent)" }}>
                          {(activeExperience.responsibilities || []).slice(0, 4).map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,55%)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {(activeExperience.outcomes || []).length > 0 ? (
                      <div>
                        <p className="mb-2 text-[11px] uppercase tracking-[0.16em]" style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 82%, transparent)" }}>
                          Impact
                        </p>
                        <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--scroll-fg) 68%, transparent)" }}>
                          {(activeExperience.outcomes || []).slice(0, 4).map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,48%)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  {experienceHref(activeExperience) ? (
                    <div className="mt-9 flex flex-wrap items-center gap-3.5">
                      <Link
                        href={experienceHref(activeExperience)!}
                        className="group/cta inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                        style={{
                          background: "linear-gradient(120deg, hsl(15,80%,55%), hsl(15,70%,44%))",
                          color: "#111214",
                          boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
                        }}
                      >
                        Read more
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                      </Link>
                      <span className="text-sm" style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 88%, transparent)" }}>
                        Full case study
                      </span>
                    </div>
                  ) : null}
                </motion.article>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
