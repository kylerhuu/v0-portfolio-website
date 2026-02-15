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

interface Project {
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
}

const PROJECTS: Project[] = [
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
      "Improved team coordination and contributed to smoother project execution, Placed Top3 out of 100+ groups within the same cohort, brought unique and in-depth findings that addressed gaps within neurorehabilitation research.",
    keyLessons:
      "Practiced real-world applications of R programming in a research-heavy team-coordinated effort, Clear communication is just as important as technical skill in research environments.",
    futureImprovements:
      "Standardize research workflows and documentation to reduce onboarding friction for new team members.",
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
  },
  {
    title: "CellMap",
    summary: "Spatial transcriptomics analysis platform",
    role: "Sole Developer",
    tags: ["AI", "Biotech", "Full-Stack"],
    problem:
      "No accessible tool existed for interactive spatial transcriptomics data exploration at single-cell resolution.",
    roleDetail:
      "Built end-to-end from data ingestion to interactive visualization. Designed the WebGL rendering pipeline for million-cell datasets.",
    techStack: ["Next.js", "Python", "WebGL", "PostgreSQL", "Vercel"],
    architecture:
      "Server-side data processing in Python with pre-computed tile pyramids. WebGL frontend for GPU-accelerated rendering of spatial cell data.",
    impact:
      "Used in a published Nature Methods paper. Open-sourced with 500+ GitHub stars and active community contributions.",
    keyLessons:
      "WebGL is essential for rendering millions of data points interactively. Pre-computing spatial indices makes a huge difference in UX.",
    futureImprovements:
      "Add 3D tissue visualization. Integrate with cloud-based analysis pipelines for on-the-fly computation.",
  },
  {
    title: "AgentForge",
    summary: "Framework for composable AI agent workflows",
    role: "Creator & Maintainer",
    tags: ["AI", "SDK", "Open Source"],
    problem:
      "Building multi-step AI agent workflows required too much boilerplate and lacked composability.",
    roleDetail:
      "Designed the core API, plugin system, and documentation. Built the execution runtime with retry logic and observability hooks.",
    techStack: ["TypeScript", "LangChain", "Redis", "Node.js", "Vercel AI SDK"],
    architecture:
      "DAG-based workflow engine with plugin middleware. Redis for state persistence and distributed locks. Streaming support via the Vercel AI SDK.",
    impact:
      "1,200+ npm weekly downloads. Featured in AI engineering newsletters and adopted by 3 startups.",
    keyLessons:
      "Developer experience is the most important feature of an SDK. Good defaults and escape hatches matter more than feature count.",
    futureImprovements:
      "Add visual workflow builder UI. Support for long-running agents with checkpoint-based resumption.",
  },
  {
    title: "LabOS",
    summary: "Operating system for wet-lab experiment tracking",
    role: "Co-founder & Tech Lead",
    tags: ["Full-Stack", "Biotech", "SaaS"],
    problem:
      "Wet labs relied on paper notebooks and spreadsheets, leading to data loss and irreproducible experiments.",
    roleDetail:
      "Built MVP from scratch, led beta testing with 3 labs. Designed the data model, auth system, and real-time collaboration features.",
    techStack: ["React", "Supabase", "Tailwind", "Stripe", "Vercel"],
    architecture:
      "Supabase backend with Row Level Security for multi-tenant isolation. Real-time subscriptions for live collaboration. Stripe integration for usage-based billing.",
    impact:
      "Onboarded 5 labs during beta. Secured $50K in pre-seed funding. 95% user retention during pilot.",
    keyLessons:
      "Scientists need tools that feel familiar (spreadsheet-like) but work better under the hood. User research before building saved months.",
    futureImprovements:
      "Add AI-powered protocol suggestions. Build integrations with common lab instruments for automated data capture.",
  },
];

function ProjectCard({
  project,
  onClick,
  index,
  isVisible,
}: {
  project: Project;
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
      <div className="flex items-start justify-between mb-1">
        <h3
          className="text-lg font-semibold group-hover:text-[hsl(15,80%,55%)] transition-colors duration-300"
          style={{ color: "var(--scroll-fg)" }}
        >
          {project.title}
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
        {project.summary}
      </p>
      <p className="text-xs text-[hsl(15,80%,55%)]/80 font-medium mb-4">
        {project.role}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
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

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.05);

  return (
    <section id="projects" className="relative z-10 px-6 py-24 md:py-32">
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
            Projects
          </h2>
          <p
            className="text-2xl md:text-3xl font-medium mb-12 text-pretty"
            style={{ color: "var(--scroll-fg)" }}
          >
            Selected work across AI, infrastructure, and biotech.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => setSelected(project)}
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

              {/* Demo video placeholder */}
              <div className="rounded-lg bg-secondary border border-border flex items-center justify-center h-48">
                <p className="text-sm text-muted-foreground">
                  Demo video coming soon
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
