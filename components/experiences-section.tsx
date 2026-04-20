"use client";

import Link from "next/link";
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
  const { ref: listRef, isVisible: listVisible } = useScrollReveal(0.06);

  return (
    <section id="experiences" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div
          ref={headingRef}
          className={`transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">Experiences</h2>
          <p className="text-2xl md:text-3xl font-medium mb-4 text-pretty" style={{ color: "var(--scroll-fg)" }}>
            Roles, scope, and outcomes—documented like a résumé, readable like a narrative.
          </p>
          <p className="text-sm md:text-base max-w-2xl leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
            Open any role for the full write-up. Product case studies stay on{" "}
            <a href="#projects" className="text-[hsl(15,80%,55%)] underline-offset-4 hover:underline">
              Projects
            </a>
            .
          </p>
        </div>

        <div ref={listRef} className="mt-14 space-y-0">
          {experiences.map((exp, index) => {
            const href = experienceHref(exp);
            const isLast = index === experiences.length - 1;
            const RowInner = (
              <>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <div className="min-w-0">
                    <p className="text-lg font-medium tracking-tight" style={{ color: "var(--scroll-fg)" }}>
                      {exp.company}
                    </p>
                    <p className="text-sm" style={{ color: "var(--scroll-muted-fg)" }}>
                      {exp.title}
                    </p>
                  </div>
                  <p
                    className="shrink-0 text-xs font-medium uppercase tracking-wider tabular-nums"
                    style={{ color: "var(--scroll-muted-fg)" }}
                  >
                    {exp.duration}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-pretty md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {exp.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {href ? (
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(15,80%,55%)]"
                      aria-hidden
                    >
                      Role detail
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: "var(--scroll-muted-fg)" }}>
                      Add a URL slug in Sanity to enable this page.
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <div
                key={exp.id}
                className={`transition-all duration-700 ease-out ${
                  listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: listVisible ? `${index * 70}ms` : "0ms" }}
              >
                {href ? (
                  <Link
                    href={href}
                    className="group block py-10 outline-none transition-colors md:py-12"
                    style={{
                      borderBottom: isLast ? undefined : "1px solid color-mix(in srgb, var(--scroll-border) 55%, transparent)",
                    }}
                  >
                    {RowInner}
                  </Link>
                ) : (
                  <div
                    className="block py-10 md:py-12"
                    style={{
                      borderBottom: isLast ? undefined : "1px solid color-mix(in srgb, var(--scroll-border) 55%, transparent)",
                    }}
                  >
                    {RowInner}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
