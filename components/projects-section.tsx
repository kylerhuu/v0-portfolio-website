"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getMediaUrl } from "@/lib/sanity/media";
import type { CmsProject } from "@/lib/sanity/types";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function isImageFile(file: string) {
  return file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".webp");
}

function projectLogoUrl(project: CmsProject): string | null {
  return getMediaUrl(project.logo) ?? getMediaUrl(project.media?.[0]);
}

function projectSummary(project: CmsProject): string {
  return project.oneLiner?.trim() || "";
}

function truncate(text: string | undefined, max: number): string {
  const t = text?.trim();
  if (!t) return "";
  if (t.length <= max) return t;
  return `${t.slice(0, max).trimEnd()}…`;
}

function ProjectCard({ project, index, isVisible }: { project: CmsProject; index: number; isVisible: boolean }) {
  const logoSrc = projectLogoUrl(project);
  const summary = projectSummary(project);
  const slug = project.slug;

  return (
    <article
      id={`project-${slug}`}
      className={`group w-full text-left p-6 rounded-lg border transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
        backgroundColor: "var(--scroll-card-bg)",
        borderColor: "var(--scroll-border)",
      }}
    >
      <div className="flex gap-4">
        <div
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border"
          style={{ borderColor: "var(--scroll-border)", backgroundColor: "var(--scroll-card-bg)" }}
        >
          {logoSrc && isImageFile(logoSrc) ? (
            <Image
              src={logoSrc}
              alt={project.logo?.alt || `${project.name} logo`}
              fill
              sizes="64px"
              className="object-contain p-1.5"
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
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-tight" style={{ color: "var(--scroll-fg)" }}>
            {project.name}
          </h3>
          {summary ? (
            <p className="mt-1 text-sm leading-relaxed text-pretty" style={{ color: "var(--scroll-muted-fg)" }}>
              {summary}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-1.5">Problem</h4>
          <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
            {truncate(project.problem, 260) || "—"}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-1.5">Solution</h4>
          <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
            {truncate(project.solution, 260) || "—"}
          </p>
        </div>
      </div>

      {(project.stack || []).length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.stack || []).slice(0, 6).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs"
              style={{
                backgroundColor: "var(--scroll-card-bg)",
                color: "var(--scroll-muted-fg)",
                border: "1px solid var(--scroll-border)",
              }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/projects/${slug}`}
          className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-fg)" }}
        >
          Read case study
        </Link>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
          >
            Watch demo
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectsSection({ projects }: { projects: CmsProject[] }) {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.05);

  return (
    <section id="projects" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div
          ref={headingRef}
          className={`transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">Projects</h2>
          <p className="text-2xl md:text-3xl font-medium mb-12 text-pretty" style={{ color: "var(--scroll-fg)" }}>
            Snapshot of the problem, the approach, and where to read the full case study.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} isVisible={cardsVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
