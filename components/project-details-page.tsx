"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { NeuralBackground } from "@/components/neural-background";
import { ScrollColorProvider } from "@/components/scroll-color-provider";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getMediaUrl, isDisplayableImageUrl } from "@/lib/sanity/media";
import type { CmsCaseStudy, CmsProject } from "@/lib/sanity/types";

type ProjectDetailsPageProps = {
  project: CmsProject;
  caseStudy?: CmsCaseStudy | null;
  siteTitle?: string;
};

function projectLogoUrl(project: CmsProject): string | null {
  return getMediaUrl(project.logo) ?? getMediaUrl(project.media?.[0]);
}

export function ProjectDetailsPage({ project, caseStudy, siteTitle }: ProjectDetailsPageProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.08);
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.04);
  const mediaItems = caseStudy?.gallery?.length ? caseStudy.gallery : project.media;
  const lessons =
    caseStudy?.lessons && caseStudy.lessons.length > 0 ? caseStudy.lessons : project.lessons || [];
  const logoSrc = projectLogoUrl(project);

  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar siteTitle={siteTitle} />
      <main className="relative z-10 min-h-screen px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div
            ref={heroRef}
            className={`transition-all duration-700 ease-out ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link href="/#projects" className="text-[hsl(15,80%,55%)] hover:underline">
                ← Back to projects
              </Link>
              <span className="hidden sm:inline" style={{ color: "var(--scroll-muted-fg)" }}>
                ·
              </span>
              <Link
                href={`/projects/${project.slug}/legal`}
                className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-fg)" }}
              >
                Legal
              </Link>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                  style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-fg)" }}
                >
                  Visit site
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                  style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
                >
                  Watch demo
                </a>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
              <div
                className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-2xl border sm:mx-0 sm:h-28 sm:w-28"
                style={{ borderColor: "var(--scroll-border)", backgroundColor: "var(--scroll-card-bg)" }}
              >
                {logoSrc && isDisplayableImageUrl(logoSrc) ? (
                  <Image
                    src={logoSrc}
                    alt={project.logo?.alt || `${project.name} logo`}
                    fill
                    sizes="112px"
                    className="object-contain p-2"
                    priority
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-lg font-bold uppercase tracking-wide"
                    style={{ color: "var(--scroll-muted-fg)" }}
                  >
                    {project.name.slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <h1 className="text-3xl md:text-5xl font-bold mb-3" style={{ color: "var(--scroll-fg)" }}>
                  {caseStudy?.title ?? project.name}
                </h1>
                <p className="text-lg leading-relaxed text-pretty" style={{ color: "var(--scroll-muted-fg)" }}>
                  {caseStudy?.heroSummary || project.oneLiner}
                </p>
                {caseStudy ? (
                  <>
                    <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                      {(caseStudy.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-3 py-1 text-xs"
                          style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {(caseStudy.role || caseStudy.timeline) && (
                      <p className="mt-3 text-sm" style={{ color: "var(--scroll-muted-fg)" }}>
                        {[caseStudy.role, caseStudy.timeline].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div
            ref={bodyRef}
            className={`mt-14 space-y-10 transition-all duration-700 ease-out ${
              bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {!caseStudy ? (
              <>
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">
                    Problem
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                    {project.problem}
                  </p>
                </section>
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">
                    Solution
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                    {project.solution}
                  </p>
                </section>
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">
                    My role
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                    {project.myRole}
                  </p>
                </section>
                <section
                  className="rounded-lg border p-6"
                  style={{ backgroundColor: "var(--scroll-card-bg)", borderColor: "var(--scroll-border)" }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                    Link a Case Study document to this project in Sanity to unlock build journey, architecture, results, and
                    gallery sections here.
                  </p>
                </section>
              </>
            ) : (
              <>
                {(caseStudy.buildJourney || []).length > 0 ? (
                  <section>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">
                      Build journey
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                      {(caseStudy.buildJourney ?? []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {(caseStudy.architecture || []).length > 0 ? (
                  <section>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">
                      Architecture / technical design
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                      {(caseStudy.architecture ?? []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {(caseStudy.results || []).length > 0 ? (
                  <section>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">
                      Results / impact
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                      {(caseStudy.results ?? []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </>
            )}

            {mediaItems && mediaItems.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mediaItems.map((mediaItem, index) => {
                    const src = getMediaUrl(mediaItem);
                    if (!src) return null;
                    return (
                      <div
                        key={src}
                        className="relative h-56 rounded-lg border overflow-hidden"
                        style={{ borderColor: "var(--scroll-border)", backgroundColor: "var(--scroll-card-bg)" }}
                      >
                        <Image
                          src={src}
                          alt={mediaItem.alt || `${project.name} media ${index + 1}`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {lessons.length > 0 ? (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Lessons</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                  {lessons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(caseStudy?.futureWork || project.futureWork) && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Future work</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                  {caseStudy?.futureWork || project.futureWork}
                </p>
              </section>
            )}
          </div>
        </div>
      </main>
    </ScrollColorProvider>
  );
}
