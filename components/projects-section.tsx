"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getMediaUrl, isDisplayableImageUrl } from "@/lib/sanity/media";
import type { CmsProject } from "@/lib/sanity/types";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const GAP_PX = 40;

function projectLogoUrl(project: CmsProject): string | null {
  return getMediaUrl(project.logo) ?? getMediaUrl(project.media?.[0]);
}

function projectSummary(project: CmsProject): string {
  return project.oneLiner?.trim() || "";
}

export function ProjectsSection({ projects }: { projects: CmsProject[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(400);
  const reduceMotion = useReducedMotion();
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: regionRef, isVisible: regionVisible } = useScrollReveal(0.06);

  const count = projects.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count <= 1) return;
      setActiveIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const measure = () => {
      setViewportWidth(vp.clientWidth);
      const slideEl = vp.querySelector("[data-project-slide]") as HTMLElement | null;
      if (slideEl) setSlideWidth(slideEl.getBoundingClientRect().width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [count]);

  const stride = slideWidth + GAP_PX;
  const translateX =
    count > 0 && viewportWidth > 0 ? viewportWidth / 2 - slideWidth / 2 - activeIndex * stride : 0;

  const trackTransition = reduceMotion
    ? { duration: 0.22, ease: "easeOut" as const }
    : { type: "spring" as const, stiffness: 280, damping: 36, mass: 0.78 };

  return (
    <section id="projects" className="relative z-10 overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`max-w-2xl transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">Projects</h2>
          <p className="text-2xl md:text-3xl font-medium text-pretty" style={{ color: "var(--scroll-fg)" }}>
            Selected builds—centered, cinematic, and written up as full case studies.
          </p>
        </div>
      </div>

      <div
        ref={regionRef}
        className={cn(
          "relative mt-16 outline-none transition-all duration-700 ease-out md:mt-20",
          regionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Project showcase"
        aria-live="polite"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          }
        }}
      >
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-[42%] z-20 hidden -translate-y-1/2 rounded-full p-2.5 shadow-lg backdrop-blur-md transition hover:opacity-90 md:left-6 md:flex md:items-center md:justify-center"
              style={{
                color: "var(--scroll-fg)",
                backgroundColor: "color-mix(in srgb, var(--scroll-card-bg) 82%, transparent)",
                border: "1px solid color-mix(in srgb, var(--scroll-border) 70%, transparent)",
              }}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-[42%] z-20 hidden -translate-y-1/2 rounded-full p-2.5 shadow-lg backdrop-blur-md transition hover:opacity-90 md:right-6 md:flex md:items-center md:justify-center"
              style={{
                color: "var(--scroll-fg)",
                backgroundColor: "color-mix(in srgb, var(--scroll-card-bg) 82%, transparent)",
                border: "1px solid color-mix(in srgb, var(--scroll-border) 70%, transparent)",
              }}
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <div
          ref={viewportRef}
          className="relative overflow-visible px-4 pb-2 md:px-10"
          style={{ perspective: "1400px" }}
        >
          <motion.div
            className="flex items-stretch"
            style={{ gap: GAP_PX, willChange: "transform" }}
            animate={{ x: translateX }}
            transition={trackTransition}
          >
            {projects.map((project, i) => {
              const logoSrc = projectLogoUrl(project);
              const summary = projectSummary(project);
              const lateral = Math.abs(i - activeIndex);
              const rawOffset = i - activeIndex;
              const isActive = i === activeIndex;

              const scale = isActive ? 1 : lateral === 1 ? 0.9 : Math.max(0.78, 1 - lateral * 0.07);
              const opacity = isActive ? 1 : lateral === 1 ? 0.5 : Math.max(0.15, 1 - lateral * 0.28);
              const rotateY = Math.max(-4, Math.min(4, -rawOffset * 2.2));
              const zIndex = 30 - lateral;

              const slideSpring = reduceMotion
                ? { duration: 0.2, ease: "easeOut" as const }
                : { type: "spring" as const, stiffness: 320, damping: 38 };

              return (
                <motion.article
                  key={project.slug}
                  data-project-slide
                  className="relative w-[min(88vw,420px)] shrink-0 cursor-default select-none"
                  style={{ transformStyle: "preserve-3d", zIndex }}
                  animate={{
                    scale,
                    opacity,
                    rotateY: reduceMotion ? 0 : rotateY,
                  }}
                  transition={slideSpring}
                >
                  <div
                    className="flex min-h-[320px] flex-col justify-between rounded-2xl px-7 py-8 md:min-h-[360px] md:px-9 md:py-10"
                    style={{
                      background:
                        "linear-gradient(155deg, color-mix(in srgb, var(--scroll-card-bg) 92%, transparent), color-mix(in srgb, var(--scroll-card-bg) 55%, transparent))",
                      boxShadow: isActive
                        ? "0 24px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)"
                        : "0 12px 40px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div>
                      <div className="flex items-start gap-5">
                        <div
                          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                          }}
                        >
                          {logoSrc && isDisplayableImageUrl(logoSrc) ? (
                            <Image
                              src={logoSrc}
                              alt={project.logo?.alt || `${project.name} logo`}
                              fill
                              sizes="64px"
                              className="object-contain p-2"
                              draggable={false}
                            />
                          ) : (
                            <div
                              className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-wide"
                              style={{ color: "var(--scroll-muted-fg)" }}
                            >
                              {project.name.slice(0, 2)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <h3
                            className="text-xl font-semibold tracking-tight md:text-2xl"
                            style={{ color: "var(--scroll-fg)" }}
                          >
                            {project.name}
                          </h3>
                        </div>
                      </div>
                      {summary ? (
                        <p
                          className="mt-6 text-sm leading-relaxed text-pretty md:text-[15px]"
                          style={{ color: "var(--scroll-muted-fg)" }}
                        >
                          {summary}
                        </p>
                      ) : (
                        <p className="mt-6 text-sm italic" style={{ color: "var(--scroll-muted-fg)" }}>
                          Add a one-line descriptor in Sanity.
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition hover:brightness-110"
                        style={{
                          background: "linear-gradient(120deg, hsl(15,80%,52%), hsl(15,70%,42%))",
                          color: "#0c0c0e",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read more
                      </Link>
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium underline-offset-4 hover:underline"
                          style={{ color: "var(--scroll-muted-fg)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {count > 1 ? (
          <div className="mt-10 flex justify-center gap-2 px-6">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === activeIndex ? "w-9 bg-[hsl(15,80%,52%)]" : "w-1.5 bg-white/20 hover:bg-white/35",
                )}
                aria-label={`Show project: ${p.name}`}
                aria-pressed={i === activeIndex}
              />
            ))}
          </div>
        ) : null}

        {/* Mobile controls */}
        {count > 1 ? (
          <div className="mt-6 flex justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              className="rounded-full border px-4 py-2 text-sm font-medium"
              style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-fg)" }}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="rounded-full border px-4 py-2 text-sm font-medium"
              style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-fg)" }}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
