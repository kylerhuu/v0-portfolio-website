"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const ratiosRef = useRef<Record<number, number>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!experiences.length) return;
    ratiosRef.current = {};

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const idx = Number(target.dataset.expIndex);
          if (!Number.isNaN(idx)) {
            ratiosRef.current[idx] = entry.isIntersecting ? entry.intersectionRatio : 0;
          }
        }

        let bestIdx = 0;
        let bestRatio = -1;
        for (let i = 0; i < experiences.length; i += 1) {
          const ratio = ratiosRef.current[i] ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = i;
          }
        }
        setActiveIndex(bestIdx);
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: "-34% 0px -34% 0px",
      },
    );

    for (let i = 0; i < experiences.length; i += 1) {
      const el = sectionRefs.current[i];
      if (el) {
        el.dataset.expIndex = String(i);
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [experiences.length]);

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
            Career chapters told as a vertical narrative.
          </p>
          <p className="max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
            Scroll through the timeline; each section sharpens into focus as it reaches center.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute bottom-8 left-3 top-4 hidden w-px md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--scroll-border) 55%, transparent) 10%, color-mix(in srgb, var(--scroll-border) 55%, transparent) 90%, transparent)",
            }}
          />

          {experiences.map((exp, index) => {
            const href = experienceHref(exp);
            const isActive = index === activeIndex;
            const responsibilities = (exp.responsibilities || []).slice(0, 2);
            const outcomes = (exp.outcomes || []).slice(0, 2);

            const block = (
              <motion.article
                className="relative min-h-[62vh] py-12 md:min-h-[72vh] md:py-16"
                initial={{ opacity: 0, y: 46 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.22, once: true }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.46,
                    scale: isActive ? 1 : 0.97,
                    y: isActive ? 0 : 14,
                    filter: isActive ? "blur(0px)" : "blur(0.8px)",
                  }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                  className="grid gap-10 md:grid-cols-[240px,minmax(0,1fr)] md:gap-16"
                >
                  <div className="relative md:pl-8">
                    <div
                      className="pointer-events-none absolute -left-[23px] top-2 hidden h-2.5 w-2.5 rounded-full md:block"
                      style={{
                        background: isActive
                          ? "hsl(15,80%,55%)"
                          : "color-mix(in srgb, var(--scroll-muted-fg) 50%, transparent)",
                        boxShadow: isActive ? "0 0 0 6px color-mix(in srgb, hsl(15,80%,55%) 14%, transparent)" : "none",
                      }}
                    />
                    <p className="text-2xl font-semibold tracking-tight md:text-[1.75rem]" style={{ color: "var(--scroll-fg)" }}>
                      {exp.company}
                    </p>
                    <p className="mt-2 text-sm md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                      {exp.title}
                    </p>
                    <p
                      className="mt-3 text-xs uppercase tracking-[0.16em] md:text-[11px]"
                      style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 78%, transparent)" }}
                    >
                      {exp.duration}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                  </div>

                  <div className="max-w-3xl">
                    <p className="text-base leading-relaxed text-pretty md:text-xl" style={{ color: "var(--scroll-muted-fg)" }}>
                      {exp.summary}
                    </p>

                    {(responsibilities.length > 0 || outcomes.length > 0) && (
                      <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
                        {responsibilities.length > 0 && (
                          <div>
                            <p
                              className="mb-2 text-[11px] uppercase tracking-[0.16em]"
                              style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 72%, transparent)" }}
                            >
                              Responsibilities
                            </p>
                            <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                              {responsibilities.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,55%)]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {outcomes.length > 0 && (
                          <div>
                            <p
                              className="mb-2 text-[11px] uppercase tracking-[0.16em]"
                              style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 72%, transparent)" }}
                            >
                              Impact
                            </p>
                            <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                              {outcomes.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,48%)]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {href ? (
                      <div className="mt-8">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(15,80%,55%)]">
                          Read full case study
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </motion.article>
            );

            return (
              <section
                key={exp.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="relative"
              >
                {href ? (
                  <Link href={href} className="block outline-none">
                    {block}
                  </Link>
                ) : (
                  block
                )}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
