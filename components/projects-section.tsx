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

const GAP_PX = 48;

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
    ? { duration: 0.24, ease: "easeOut" as const }
    : { type: "spring" as const, stiffness: 250, damping: 34, mass: 0.82 };

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
        <div className="pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2">
          <motion.div
            className="mx-auto h-[320px] w-[min(88vw,840px)] rounded-full blur-3xl md:h-[420px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, hsl(15,80%,52%) 26%, transparent) 0%, transparent 72%)",
            }}
            animate={{
              opacity: reduceMotion ? 0.3 : [0.26, 0.34, 0.26],
              scale: reduceMotion ? 1 : [0.98, 1.03, 0.98],
            }}
            transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-[46%] z-20 hidden -translate-y-1/2 rounded-full p-2.5 shadow-lg backdrop-blur-md transition hover:opacity-90 md:left-6 md:flex md:items-center md:justify-center"
              style={{
                color: "var(--scroll-fg)",
                backgroundColor: "color-mix(in srgb, var(--scroll-card-bg) 66%, transparent)",
                border: "1px solid color-mix(in srgb, var(--scroll-border) 55%, transparent)",
              }}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-[46%] z-20 hidden -translate-y-1/2 rounded-full p-2.5 shadow-lg backdrop-blur-md transition hover:opacity-90 md:right-6 md:flex md:items-center md:justify-center"
              style={{
                color: "var(--scroll-fg)",
                backgroundColor: "color-mix(in srgb, var(--scroll-card-bg) 66%, transparent)",
                border: "1px solid color-mix(in srgb, var(--scroll-border) 55%, transparent)",
              }}
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <div ref={viewportRef} className="relative overflow-visible px-4 pb-2 md:px-10" style={{ perspective: "1400px" }}>
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

              const scale = isActive ? 1.02 : lateral === 1 ? 0.84 : Math.max(0.68, 1 - lateral * 0.1);
              const opacity = isActive ? 1 : lateral === 1 ? 0.34 : Math.max(0.08, 1 - lateral * 0.34);
              const rotateY = Math.max(-11, Math.min(11, -rawOffset * 5.5));
              const x = reduceMotion ? 0 : rawOffset * 14;
              const y = isActive ? 0 : lateral === 1 ? 18 : 26;
              const blur = isActive ? "blur(0px)" : lateral === 1 ? "blur(1.2px)" : "blur(2px)";
              const zIndex = 30 - lateral;

              const slideSpring = reduceMotion
                ? { duration: 0.2, ease: "easeOut" as const }
                : { type: "spring" as const, stiffness: 295, damping: 36, mass: 0.84 };

              return (
                <motion.article
                  key={project.slug}
                  data-project-slide
                  className="relative w-[min(90vw,560px)] shrink-0 select-none"
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
                    className={cn(
                      "flex min-h-[360px] flex-col justify-between rounded-[28px] px-7 py-8 md:min-h-[420px] md:px-10 md:py-10",
                      isActive ? "cursor-default" : "cursor-pointer",
                    )}
                    style={{
                      background:
                        "linear-gradient(152deg, color-mix(in srgb, var(--scroll-card-bg) 78%, transparent), color-mix(in srgb, var(--scroll-card-bg) 42%, transparent))",
                      border: "1px solid color-mix(in srgb, var(--scroll-border) 34%, transparent)",
                      backdropFilter: "blur(10px)",
                      boxShadow: isActive
                        ? "0 34px 90px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.14)"
                        : "0 12px 36px rgba(0,0,0,0.18)",
                    }}
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-[auto,1fr] sm:gap-7">
                      <div
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24"
                        style={{
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02))",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                        }}
                      >
                        {logoSrc && isDisplayableImageUrl(logoSrc) ? (
                          <Image
                            src={logoSrc}
                            alt={project.logo?.alt || `${project.name} logo`}
                            fill
                            sizes="96px"
                            className="object-contain p-2.5"
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

                      <div className="min-w-0">
                        <p
                          className="text-[10px] uppercase tracking-[0.24em] md:text-xs"
                          style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 75%, transparent)" }}
                        >
                          Featured project
                        </p>
                        <h3
                          className="mt-2 text-[1.9rem] font-semibold leading-[1.05] tracking-tight md:text-[2.45rem]"
                          style={{ color: "var(--scroll-fg)" }}
                        >
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-8 max-w-[52ch]">
                      {summary ? (
                        <p
                          className="text-sm leading-relaxed text-pretty md:text-base"
                          style={{ color: "color-mix(in srgb, var(--scroll-muted-fg) 88%, transparent)" }}
                        >
                          {summary}
                        </p>
                      ) : (
                        <p className="text-sm italic" style={{ color: "var(--scroll-muted-fg)" }}>
                          Add a one-line descriptor in Sanity.
                        </p>
                      )}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
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
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {count > 1 ? (
          <div className="mt-12 px-6">
            <div className="mx-auto flex w-full max-w-md items-center justify-between">
              <span className="text-xs tabular-nums" style={{ color: "var(--scroll-muted-fg)" }}>
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div
                className="relative mx-4 h-1 flex-1 overflow-hidden rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--scroll-border) 34%, transparent)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${100 / count}%`,
                    background: "linear-gradient(90deg, hsl(15,80%,55%), hsl(15,70%,42%))",
                  }}
                  animate={{ x: `${activeIndex * 100}%` }}
                  transition={trackTransition}
                />
              </div>
              <span className="text-xs tabular-nums" style={{ color: "var(--scroll-muted-fg)" }}>
                {String(count).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeIndex ? "w-12 bg-[hsl(15,80%,55%)]" : "w-2.5 bg-white/20 hover:bg-white/35",
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
