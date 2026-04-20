"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getMediaUrl, isDisplayableImageUrl } from "@/lib/sanity/media";
import type { CmsProject } from "@/lib/sanity/types";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const GAP_PX = 56;

/** Prefer richer project media for the hero visual, then fall back to logo. */
function projectVisualUrl(project: CmsProject): string | null {
  return getMediaUrl(project.media?.[0]) ?? getMediaUrl(project.logo);
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
    ? { duration: 0.24, ease: "easeOut" as const }
    : { type: "spring" as const, stiffness: 250, damping: 34, mass: 0.82 };

  return (
    <section id="projects" className="relative z-10 overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`max-w-3xl transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)]">Projects</h2>
          <p className="text-2xl font-medium text-pretty md:text-3xl" style={{ color: "var(--scroll-fg)" }}>
            Featured builds with depth, motion, and full case study breakdowns.
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
        <div className="pointer-events-none absolute inset-x-0 top-[47%] -translate-y-1/2">
          <motion.div
            className="mx-auto h-[320px] w-[min(88vw,980px)] rounded-full blur-3xl md:h-[460px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, hsl(15,80%,52%) 22%, transparent) 0%, transparent 74%)",
            }}
            animate={{
              opacity: reduceMotion ? 0.26 : [0.22, 0.3, 0.22],
              scale: reduceMotion ? 1 : [0.98, 1.02, 0.98],
            }}
            transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-[50%] z-20 hidden -translate-y-1/2 rounded-full p-2.5 shadow-lg backdrop-blur-md transition hover:opacity-90 md:left-[calc(50%-370px)] md:flex md:items-center md:justify-center"
              style={{
                color: "var(--scroll-fg)",
                backgroundColor: "color-mix(in srgb, var(--scroll-card-bg) 74%, transparent)",
                border: "1px solid color-mix(in srgb, var(--scroll-border) 55%, transparent)",
              }}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-[50%] z-20 hidden -translate-y-1/2 rounded-full p-2.5 shadow-lg backdrop-blur-md transition hover:opacity-90 md:right-[calc(50%-370px)] md:flex md:items-center md:justify-center"
              style={{
                color: "var(--scroll-fg)",
                backgroundColor: "color-mix(in srgb, var(--scroll-card-bg) 74%, transparent)",
                border: "1px solid color-mix(in srgb, var(--scroll-border) 55%, transparent)",
              }}
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <div
          ref={viewportRef}
          className="relative mx-auto max-w-[1220px] overflow-hidden px-4 pb-2 md:px-10"
          style={{ perspective: "1600px" }}
        >
          <motion.div
            className="flex items-stretch"
            style={{ gap: GAP_PX, willChange: "transform" }}
            animate={{ x: translateX }}
            transition={trackTransition}
          >
            {projects.map((project, i) => {
              const visualSrc = projectVisualUrl(project);
              const summary = projectSummary(project);
              const lateral = Math.abs(i - activeIndex);
              const rawOffset = i - activeIndex;
              const isActive = i === activeIndex;

              const scale = isActive ? 1 : lateral === 1 ? 0.72 : Math.max(0.52, 1 - lateral * 0.2);
              const opacity = isActive ? 1 : lateral === 1 ? 0.2 : Math.max(0.04, 1 - lateral * 0.48);
              const rotateY = Math.max(-14, Math.min(14, -rawOffset * 6.8));
              const x = reduceMotion ? 0 : rawOffset * 46;
              const y = isActive ? 0 : lateral === 1 ? 30 : 42;
              const blur = isActive ? "blur(0px)" : lateral === 1 ? "blur(3px)" : "blur(5px)";
              const zIndex = 30 - lateral;

              const slideSpring = reduceMotion
                ? { duration: 0.2, ease: "easeOut" as const }
                : { type: "spring" as const, stiffness: 295, damping: 36, mass: 0.84 };

              return (
                <motion.article
                  key={project.slug}
                  data-project-slide
                  className="relative w-[min(92vw,780px)] shrink-0 select-none"
                  style={{ transformStyle: "preserve-3d", zIndex }}
                  onClick={() => setActiveIndex(i)}
                  animate={{
                    scale,
                    opacity,
                    x,
                    y,
                    rotateY: reduceMotion ? 0 : rotateY,
                    filter: blur,
                  }}
                  transition={slideSpring}
                >
                  <div
                    className={cn("rounded-[28px] px-6 py-7 md:px-8 md:py-8", isActive ? "cursor-default" : "cursor-pointer")}
                    style={{
                      background:
                        "linear-gradient(152deg, color-mix(in srgb, var(--scroll-card-bg) 84%, transparent), color-mix(in srgb, var(--scroll-card-bg) 48%, transparent))",
                      border: "1px solid color-mix(in srgb, var(--scroll-border) 28%, transparent)",
                      backdropFilter: "blur(10px)",
                      boxShadow: isActive
                        ? "0 34px 92px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.14)"
                        : "0 8px 26px rgba(0,0,0,0.14)",
                    }}
                  >
                    <div className="grid min-h-[390px] grid-cols-1 gap-8 md:min-h-[430px] md:grid-cols-[40%,1fr] md:gap-9">
                      <div
                        className="relative overflow-hidden rounded-[22px]"
                        style={{
                          background:
                            "linear-gradient(145deg, color-mix(in srgb, var(--scroll-card-bg) 79%, transparent), rgba(255,255,255,0.04))",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -24px 40px rgba(0,0,0,0.14)",
                        }}
                      >
                        {/* Subtle texture and layered glow so the visual panel never feels empty. */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-[0.22]"
                          style={{
                            backgroundImage:
                              "radial-gradient(rgba(255,255,255,0.12) 0.6px, transparent 0.6px)",
                            backgroundSize: "8px 8px",
                            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
                          }}
                        />
                        <div
                          className="pointer-events-none absolute -inset-[26%]"
                          style={{
                            background:
                              "radial-gradient(circle, color-mix(in srgb, hsl(15,80%,55%) 30%, transparent) 0%, transparent 70%)",
                          }}
                        />
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                          style={{
                            background:
                              "linear-gradient(to top, color-mix(in srgb, var(--scroll-card-bg) 40%, transparent), transparent)",
                          }}
                        />
                        {visualSrc && isDisplayableImageUrl(visualSrc) ? (
                          <Image
                            src={visualSrc}
                            alt={project.logo?.alt || `${project.name} visual`}
                            fill
                            sizes="(min-width: 768px) 320px, 82vw"
                            className="object-contain p-5 md:p-7"
                            draggable={false}
                          />
                        ) : (
                          <div
                            className="flex h-full w-full items-center justify-center text-2xl font-semibold uppercase tracking-wide"
                            style={{ color: "var(--scroll-muted-fg)" }}
                          >
                            {project.name.slice(0, 2)}
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-col justify-between">
                        <div>
                          <p
                            className="text-[10px] uppercase tracking-[0.18em] md:text-xs"
                            style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 62%, transparent)" }}
                          >
                            Case study
                          </p>
                          <h3
                            className="mt-2 text-[2.1rem] font-semibold leading-[1.02] tracking-tight md:text-[3rem]"
                            style={{ color: "var(--scroll-fg)" }}
                          >
                            {project.name}
                          </h3>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {(project.stack || []).slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full px-3.5 py-1.5 text-[11px] tracking-wide"
                                style={{
                                  color: "color-mix(in srgb, var(--scroll-fg) 80%, transparent)",
                                  backgroundColor: "color-mix(in srgb, var(--scroll-card-bg) 78%, transparent)",
                                  border: "1px solid color-mix(in srgb, var(--scroll-border) 52%, transparent)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          {summary ? (
                            <p
                              className="max-w-[44ch] text-sm leading-relaxed text-pretty md:text-base"
                              style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 86%, transparent)" }}
                            >
                              {summary}
                            </p>
                          ) : (
                            <p className="text-sm italic" style={{ color: "var(--scroll-muted-fg)" }}>
                              Add a one-line descriptor in Sanity.
                            </p>
                          )}

                          <div className="mt-6 flex flex-wrap items-center gap-4">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group/cta inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                              style={{
                                background: "linear-gradient(120deg, hsl(15,80%,55%), hsl(15,70%,44%))",
                                color: "#111214",
                                boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              Read more
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
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
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {count > 1 ? (
          <div className="mt-10 px-6">
            <div
              className="mx-auto flex w-full max-w-lg items-center justify-between rounded-full px-4 py-3"
              style={{
                backgroundColor: "color-mix(in srgb, var(--scroll-card-bg) 58%, transparent)",
                border: "1px solid color-mix(in srgb, var(--scroll-border) 35%, transparent)",
              }}
            >
              <span className="text-xs tabular-nums" style={{ color: "var(--scroll-muted-fg)" }}>
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div
                className="relative mx-4 h-1.5 flex-1 overflow-hidden rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--scroll-border) 34%, transparent)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${100 / count}%`,
                    background: "linear-gradient(90deg, hsl(15,80%,55%), hsl(15,70%,42%))",
                    boxShadow: "0 0 12px color-mix(in srgb, hsl(15,80%,55%) 65%, transparent)",
                  }}
                  animate={{ x: `${activeIndex * 100}%` }}
                  transition={trackTransition}
                />
              </div>
              <span className="text-xs tabular-nums" style={{ color: "var(--scroll-muted-fg)" }}>
                {String(count).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-3 flex justify-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeIndex ? "w-10 bg-[hsl(15,80%,55%)]" : "w-2 bg-white/20 hover:bg-white/35",
                  )}
                  aria-label={`Show project: ${p.name}`}
                  aria-pressed={i === activeIndex}
                />
              ))}
            </div>
          </div>
        ) : null}

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
