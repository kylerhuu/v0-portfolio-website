"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Experience {
  title: string;
  summary: string;
  role: string;
  tags: string[];
  problem: string;
  roleDetail: string;
  techStack: string[];
  architecture: string;
  impact: string;
  keyLessons: string;
  futureImprovements: string;
  media?: string[];
  preview?: string;
}

const Experiences: Experience[] = [
  {
    title: "ThinkNeuro Research Internship",
    summary: "Research-focused programming and team leadership experience",
    role: "Associate Researcher",
    tags: ["Research", "Leadership", "Programming"],
    problem:
      "Existing neural research on TMS and tDCS was overly generalized and redacted other contributing factors to neural disabilities. Additionally within the internship, research terms lacked uniformity, structure, and technical support.",
    roleDetail:
      "Led a meta-analysis of current research surrounding our research question, supported programming applications, collaborated with interns, and cultivated innovation within our group to bring unique perspective on prior research.",
    techStack: ["Python", "R", "Excel", "Google Sheets"],
    architecture:
      "Research workflows emphasizing clarity, reproducibility, and collaboration rather than production-scale systems.",
    impact:
      "Improved team coordination and contributed to smoother experience execution, Placed Top3 out of 100+ groups within the same cohort, brought unique and in-depth findings that addressed gaps within neurorehabilitation research.",
    keyLessons:
      "Practiced real-world applications of R programming in a research-heavy team-coordinated effort, Clear communication is just as important as technical skill in research environments.",
    futureImprovements:
      "Standardize research workflows and documentation to reduce onboarding friction for new team members.",
    media: [
      "/demos/thinkneuro-research-poster.png",
      "/demos/1-neurotechnology.mp4",
      "/demos/neurotech-abstract.png"
    ],
    preview: "/demos/thinkneuro-research-poster.png",
  },
  {
    title: "NightBite",
    summary: "Late-night food truck preorder app for college students",
    role: "Founder & Developer",
    tags: ["Mobile App", "Product", "Startup", "Full-Stack"],
    problem:
      "College students struggle to find reliable late-night food options, and food trucks lack an easy way to handle preorders and recurring customers.",
    roleDetail:
      "Designed the product concept, core user flows, and MVP feature set. Planned authentication, vendor subscriptions, and order flow while iterating on UX and backend structure.",
    techStack: ["React Native", "TypeScript", "Firebase", "Stripe"],
    architecture:
      "Client-side mobile app with Firebase authentication and database. Stripe subscription model for vendors, designed for future scalability.",
    impact:
      "Built a functional MVP and validated demand for a vendor subscription model. Learned how to balance user experience with technical constraints.",
    keyLessons:
      "Product decisions matter as much as code. Small UX issues can completely break adoption if not addressed early.",
    futureImprovements:
      "Improve login reliability, optimize ordering speed, and expand vendor tools for analytics and menu management.",
    media: ["/demos/nightbite-icon.png"],
    preview: "/demos/nightbite-icon.png",
  },
  {
    title: "Vie.game Growth Strategy",
    summary: "Marketing and outreach systems for an AI game design startup",
    role: "Growth Intern",
    tags: ["Marketing", "Strategy", "Startup"],
    problem:
      "The startup needed clearer positioning, stronger outreach, and consistent growth channels to reach creators and developers.",
    roleDetail:
      "Worked on growth strategy, outreach messaging, and market research. Helped refine branding, analyze engagement data, and support launch efforts.",
    techStack: ["Notion", "Google Sheets", "Analytic Tools", "Social Media"],
    architecture:
      "Lightweight growth stack focused on experimentation, fast iteration, and feedback loops rather than heavy tooling.",
    impact:
      "Scaled product from 0 users and contributed to improved outreach clarity and engagement. Gained firsthand exposure to early-stage startup operations.",
    keyLessons:
      "Growth is about testing fast and learning faster. Clear messaging beats complex strategy.",
    futureImprovements:
      "Automate outreach tracking and build more structured experiments around user acquisition channels.",
    media: ["/demos/vie-logo.png"],
    preview:"/demos/vie-logo.png",
  },
];

function ExperienceCard({
  experience,
  onClick,
  index,
  isVisible,
}: {
  experience: Experience;
  onClick: () => void;
  index: number;
  isVisible: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-6 rounded-lg hover:border-[hsl(15,80%,55%)]/40 hover:shadow-[0_8px_32px_rgba(215,120,60,0.1)] transition-all duration-500 ease-out hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
        backgroundColor: "var(--scroll-card-bg)",
        border: "1px solid var(--scroll-border)",
      }}
    >
      {/* preview */}
      {experience.preview && (
        <div className="mb-3 h-32 w-full overflow-hidden rounded-lg border border-border">
          {experience.preview.endsWith(".png") ||
          experience.preview.endsWith(".jpg") ? (
            <img
              src={experience.preview}
              alt={`${experience.title}-preview`}
              className="w-full h-full object-cover"
            />
          ) : experience.preview.endsWith(".mp4") ? (
            <video
              src={experience.preview}
              muted
              autoPlay
              loop
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      )}
      <div className="flex items-start justify-between mb-1">
        <h3
          className="text-lg font-semibold group-hover:text-[hsl(15,80%,55%)] transition-colors duration-300"
          style={{ color: "var(--scroll-fg)" }}
        >
          {experience.title}
        </h3>
        <ExternalLink
          className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "var(--scroll-muted-fg)" }}
        />
      </div>
      <p
        className="text-sm mb-2 leading-relaxed"
        style={{ color: "var(--scroll-muted-fg)" }}
      >
        {experience.summary}
      </p>
      <p className="text-xs text-[hsl(15,80%,55%)]/80 font-medium mb-4">
        {experience.role}
      </p>
      <div className="flex flex-wrap gap-2">
        {experience.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs"
            style={{
              backgroundColor: "var(--scroll-card-bg)",
              color: "var(--scroll-muted-fg)",
              border: "1px solid var(--scroll-border)",
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </button>
  );
}

export function ExperiencesSection() {
  const [selected, setSelected] = useState<Experience | null>(null);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.05);

  return (
    <section id="experiences" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div
          ref={headingRef}
          className={`transition-all duration-700 ease-out ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
            Experiences
          </h2>
          <p
            className="text-2xl md:text-3xl font-medium mb-12 text-pretty"
            style={{ color: "var(--scroll-fg)" }}
          >
            Selected work across AI, infrastructure, and biotech.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Experiences.map((experience, i) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              onClick={() => setSelected(experience)}
              index={i}
              isVisible={cardsVisible}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {selected?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selected?.summary}
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="flex flex-col gap-6 mt-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Problem
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.problem}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  My Role
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.roleDetail}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs text-foreground border-border"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Architecture
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.architecture}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Impact
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.impact}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Key Lessons
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.keyLessons}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Future Improvements
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.futureImprovements}
                </p>
              </div>

              {/* media gallery */}
              {selected.media && selected.media.length > 0 && (
                <div className="flex flex-col gap-4 mt-4">
                  {selected.media.map((file, i) => {
                    if (file.endsWith(".png") || file.endsWith(".jpg")) {
                      return (
                        <img
                          key={i}
                          src={file}
                          alt={`${selected.title}-media-${i}`}
                          className="w-full rounded-lg border border-border"
                        />
                      );
                    } else if (file.endsWith(".mp4")) {
                      return (
                        <video
                          key={i}
                          src={file}
                          controls
                          className="w-full rounded-lg border border-border"
                        />
                      );
                    } else if (file.endsWith(".pdf")) {
                      return (
                        <iframe
                          key={i}
                          src={file}
                          className="w-full h-96 rounded-lg border border-border"
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
