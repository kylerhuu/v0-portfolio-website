import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { ProjectDetailsPage } from "@/components/project-details-page";

const CASE_STUDIES: Record<
  string,
  {
    role: string;
    timeline: string;
    tags: string[];
    buildJourney: string[];
    technicalDesign: string[];
    results: string[];
  }
> = {
  outthegc: {
    role: "Full-Stack Developer",
    timeline: "2025 - 2026",
    tags: ["Product", "AI", "Next.js", "Collaboration UX"],
    buildJourney: [
      "Started from SyncPrep learnings and removed onboarding-heavy steps that slowed first-time usage.",
      "Designed a link-first participation model so groups could contribute without account friction.",
      "Iterated prompt structure to summarize preferences into clear constraints and consensus signals.",
    ],
    technicalDesign: [
      "Trip entities are shared containers that hold participant responses and planning metadata.",
      "Availability and preference inputs are normalized before generating summary-ready context blocks.",
      "OpenAI summarization produces structured outputs focused on alignment windows and tradeoffs.",
    ],
    results: [
      "Improved decision speed by centralizing fragmented planning inputs into one workflow.",
      "Reduced coordination overhead by replacing ad hoc chat interpretation with structured summaries.",
      "Validated that lightweight collaboration patterns outperform over-engineered planning flows.",
    ],
  },
  syncprep: {
    role: "Full-Stack Developer",
    timeline: "2025",
    tags: ["Scheduling", "AI", "APIs", "Productivity"],
    buildJourney: [
      "Mapped user journey from meeting setup to preparation to reduce tool switching.",
      "Built overlap calculation logic to rank feasible windows across timezone constraints.",
      "Integrated prep intelligence directly after scheduling to maintain context continuity.",
    ],
    technicalDesign: [
      "Backend routes compute timezone overlap and produce ranked slot suggestions.",
      "Google Calendar integration converts selected slots into event-ready links.",
      "AI pipeline analyzes resume and context input to generate focused prep prompts.",
    ],
    results: [
      "Merged two workflows (scheduling + prep) into one cohesive user path.",
      "Decreased context switching between planning tools and preparation assistants.",
      "Created a reusable architecture for workflow-first AI productivity products.",
    ],
  },
  nightbite: {
    role: "Founder & Developer",
    timeline: "2025",
    tags: ["Mobile Product", "Startup", "Campus Commerce", "MVP"],
    buildJourney: [
      "Defined the core preorder flow around late-night student demand windows and food truck constraints.",
      "Prioritized fast ordering and repeat-customer behavior over feature-heavy account management.",
      "Shaped the first MVP scope around reliability, vendor onboarding readiness, and payment model viability.",
    ],
    technicalDesign: [
      "Mobile-first client built around simple ordering interactions and predictable checkout steps.",
      "Firebase planned for authentication and core data handling to accelerate iteration speed.",
      "Vendor monetization strategy integrated through subscription-oriented Stripe workflow design.",
    ],
    results: [
      "Shipped a functional MVP that validated strong demand for late-night preorder convenience.",
      "Confirmed subscription potential for vendor-side monetization in early discovery.",
      "Identified reliability and speed bottlenecks as highest-leverage next engineering priorities.",
    ],
  },
  "thinkneuro-research-poster": {
    role: "Project Manager / SWE Intern",
    timeline: "2025",
    tags: ["Research", "Data Analysis", "Neuroscience", "Scientific Communication"],
    buildJourney: [
      "Structured the project into mechanistic analysis and literature influence mapping to keep research output actionable.",
      "Synthesized findings across cellular, molecular, and network-level neuroplasticity evidence.",
      "Converted dense analysis into a concise poster format for symposium communication and stakeholder review.",
    ],
    technicalDesign: [
      "Used a two-track workflow: biological mechanism synthesis plus bibliometric trend analysis.",
      "Processed and organized source data using Python, spreadsheets, and Biblioshiny workflows.",
      "Standardized extraction criteria to compare outcomes, stimulation protocols, and publication influence.",
    ],
    results: [
      "Surfaced repeatable strengths of tDCS/TMS when paired with rehabilitation interventions.",
      "Identified reproducibility limitations from inconsistent protocols and narrow study populations.",
      "Delivered a clear research artifact that communicated both promise and constraints of the field.",
    ],
  },
};

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project case study could not be found.",
    };
  }

  return {
    title: `${project.name} Project Details`,
    description: project.oneLiner,
  };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const caseStudy = CASE_STUDIES[slug];

  return <ProjectDetailsPage project={project} caseStudy={caseStudy} />;
}
