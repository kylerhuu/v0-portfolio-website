"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { NeuralBackground } from "@/components/neural-background";
import { ScrollColorProvider } from "@/components/scroll-color-provider";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getMediaUrl, isDisplayableImageUrl } from "@/lib/sanity/media";
import type { CmsExperience } from "@/lib/sanity/types";

type ExperienceDetailPageProps = {
  experience: CmsExperience;
};

function experienceLogoUrl(exp: CmsExperience): string | null {
  return getMediaUrl(exp.logo) ?? getMediaUrl(exp.media?.[0]);
}

export function ExperienceDetailPage({ experience }: ExperienceDetailPageProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.08);
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.04);
  const logoSrc = experienceLogoUrl(experience);
  const overview = (experience.detailOverview || experience.summary || "").trim();
  const scopeAndContext = (experience.scopeAndContext || "").trim();

  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div
            ref={heroRef}
            className={`transition-all duration-700 ease-out ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="/#experiences" className="text-sm text-[hsl(15,80%,55%)] hover:underline">
              ← Back to experiences
            </Link>

            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start">
              <div
                className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:mx-0 sm:h-24 sm:w-24"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                }}
              >
                {logoSrc && isDisplayableImageUrl(logoSrc) ? (
                  <Image
                    src={logoSrc}
                    alt={experience.logo?.alt || `${experience.company} logo`}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                    priority
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-sm font-semibold tracking-wide"
                    style={{ color: "var(--scroll-muted-fg)" }}
                  >
                    {experience.company.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(15,80%,55%)]">
                  {experience.company}
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl" style={{ color: "var(--scroll-fg)" }}>
                  {experience.title}
                </h1>
                <p className="mt-3 text-sm md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {experience.duration}
                  {experience.location ? ` · ${experience.location}` : ""}
                </p>
                {experience.hasCaseStudy && experience.caseStudySlug ? (
                  <p className="mt-6 text-sm" style={{ color: "var(--scroll-muted-fg)" }}>
                    Related build:{" "}
                    <Link
                      href={`/projects/${experience.caseStudySlug}`}
                      className="font-medium text-[hsl(15,80%,55%)] underline-offset-4 hover:underline"
                    >
                      View project case study
                    </Link>
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div
            ref={bodyRef}
            className={`mt-16 space-y-14 transition-all duration-700 ease-out ${
              bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {overview ? (
              <section>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">
                  Overview
                </h2>
                <p className="text-base leading-relaxed text-pretty md:text-lg" style={{ color: "var(--scroll-muted-fg)" }}>
                  {overview}
                </p>
              </section>
            ) : null}

            {scopeAndContext ? (
              <section>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">
                  Scope & context
                </h2>
                <p className="text-base leading-relaxed text-pretty md:text-lg" style={{ color: "var(--scroll-muted-fg)" }}>
                  {scopeAndContext}
                </p>
              </section>
            ) : null}

            {(experience.keyInitiatives || []).length > 0 ? (
              <section>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">
                  Key initiatives
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {experience.keyInitiatives!.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,55%)]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(experience.responsibilities || []).length > 0 ? (
              <section>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">
                  Responsibilities
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {experience.responsibilities!.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,55%)]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(experience.outcomes || []).length > 0 ? (
              <section>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">
                  Impact & results
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {experience.outcomes!.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,48%)]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(experience.crossFunctionalCollaboration || []).length > 0 ? (
              <section>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">
                  Cross-functional collaboration
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {experience.crossFunctionalCollaboration!.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,48%)]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(experience.professionalGrowth || []).length > 0 ? (
              <section>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">
                  Professional growth
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {experience.professionalGrowth!.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(15,80%,48%)]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">Tools</h2>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {(experience.tools || []).join(" · ") || "—"}
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">Skills</h2>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "var(--scroll-muted-fg)" }}>
                  {(experience.skills || []).join(" · ") || "—"}
                </p>
              </div>
            </section>

            {experience.media && experience.media.length > 0 ? (
              <section>
                <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(15,80%,55%)]">Media</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {experience.media.map((item, i) => {
                    const src = getMediaUrl(item);
                    if (!src || !isDisplayableImageUrl(src)) return null;
                    return (
                      <div
                        key={`${src}-${i}`}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl"
                        style={{
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                        }}
                      >
                        <Image
                          src={src}
                          alt={item.alt || `${experience.company} — ${i + 1}`}
                          fill
                          sizes="(min-width: 640px) 40vw, 90vw"
                          className="object-contain p-3"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </main>
    </ScrollColorProvider>
  );
}
