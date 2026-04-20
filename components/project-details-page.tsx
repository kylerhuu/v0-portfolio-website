"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { NeuralBackground } from "@/components/neural-background";
import { ScrollColorProvider } from "@/components/scroll-color-provider";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type CaseStudy = {
  role: string;
  timeline: string;
  tags: string[];
  buildJourney: string[];
  technicalDesign: string[];
  results: string[];
};

type ProjectDetailsPageProps = {
  project: {
    slug: string;
    name: string;
    oneLiner: string;
    problem: string;
    lessons: string[];
    futureWork?: string;
    media?: string[];
  };
  caseStudy?: CaseStudy;
};

export function ProjectDetailsPage({ project, caseStudy }: ProjectDetailsPageProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.08);
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.04);

  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div
            ref={heroRef}
            className={`transition-all duration-700 ease-out ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="/" className="text-sm text-[hsl(15,80%,55%)] hover:underline">
              ← Back to home
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4" style={{ color: "var(--scroll-fg)" }}>
              {project.name}
            </h1>
            <p className="text-lg mb-6" style={{ color: "var(--scroll-muted-fg)" }}>
              {project.oneLiner}
            </p>

            {caseStudy && (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-xs"
                      style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm" style={{ color: "var(--scroll-muted-fg)" }}>
                  {caseStudy.role} • {caseStudy.timeline}
                </p>
              </>
            )}
          </div>

          <div
            ref={bodyRef}
            className={`mt-12 space-y-10 transition-all duration-700 ease-out ${
              bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {!caseStudy ? (
              <section
                className="rounded-lg border p-6"
                style={{ backgroundColor: "var(--scroll-card-bg)", borderColor: "var(--scroll-border)" }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">
                  Project Details
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                  A full project details page is coming soon. For now, the complete breakdown is available from the Projects modal on
                  the homepage.
                </p>
              </section>
            ) : (
              <>
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Problem</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                    {project.problem}
                  </p>
                </section>

                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Build Journey</h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                    {caseStudy.buildJourney.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">
                    Architecture / Technical Design
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                    {caseStudy.technicalDesign.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Results / Impact</h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                    {caseStudy.results.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {project.media && project.media.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.media.map((file) => (
                    <div
                      key={file}
                      className="relative h-56 rounded-lg border overflow-hidden"
                      style={{ borderColor: "var(--scroll-border)", backgroundColor: "var(--scroll-card-bg)" }}
                    >
                      <Image src={file} alt={`${project.name} media`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Lessons</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                {project.lessons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {project.futureWork && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-3">Future Work</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
                  {project.futureWork}
                </p>
              </section>
            )}
          </div>
        </div>
      </main>
    </ScrollColorProvider>
  );
}
