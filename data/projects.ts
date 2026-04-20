export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  problem: string;
  solution: string;
  myRole: string;
  stack: string[];
  architecture?: string;
  impact: string[];
  lessons: string[];
  futureWork?: string;
  media?: string[];
  demo?: string;
  videoPoster?: string;
  hasCaseStudy: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "outthegc",
    name: "OutTheGC",
    oneLiner:
      "Link-based group trip planner that uses AI summaries to speed up group decisions.",
    problem:
      "Group trip planning is fragmented across chats and docs, making it hard to align dates, budget, and destination preferences quickly.",
    solution:
      "Built a friction-light planning workflow where anyone can join through a share link, submit preferences, and receive AI-generated summaries of group consensus and constraints.",
    myRole:
      "Designed and built the full-stack product, including frontend UX, response aggregation logic, and AI summarization flow.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "OpenAI API",
      "Cursor",
    ],
    architecture:
      "Event-style trip containers collect participant submissions, aggregate availability and preference inputs, and generate structured summaries through OpenAI prompts.",
    impact: [
      "Replaced scattered planning conversations with one shared decision surface.",
      "Reduced coordination overhead by surfacing common themes and constraints quickly.",
      "Improved usability from prior iteration by prioritizing speed and minimal onboarding.",
    ],
    lessons: [
      "Simplicity in user flow often outperforms feature-heavy planning systems.",
      "AI works best when it clarifies decisions instead of adding interaction overhead.",
    ],
    futureWork:
      "Add persistent storage, collaborative permissions, deeper itinerary generation, and richer trade-off visualization when preferences conflict.",
    media: ["/demos/OTGC1.png", "/demos/OutTheGC_hero.png", "/demos/OTGC2.png"],
    demo: "/demos/OutTheGC_demo.mov",
    videoPoster: "/demos/OTGC1.png",
    hasCaseStudy: true,
  },
  {
    slug: "syncprep",
    name: "SyncPrep",
    oneLiner:
      "AI-assisted scheduling and meeting prep tool for cross-timezone coordination.",
    problem:
      "Users preparing for interviews and professional meetings must juggle separate tools for scheduling and prep, creating unnecessary friction.",
    solution:
      "Combined timezone overlap logic, calendar event generation, and AI-based resume/context analysis into one workflow that moves users from coordination to preparation faster.",
    myRole:
      "Built the full-stack app, including scheduling APIs, prompt design, frontend workflow, and Google Calendar integration.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "OpenAI API",
      "Google Calendar API",
      "TailwindCSS",
      "Cursor",
    ],
    architecture:
      "API routes calculate overlapping availability windows, rank viable slots, then generate calendar links while AI services produce prep insights from resume and meeting context.",
    impact: [
      "Merged scheduling and preparation into a single experience.",
      "Reduced context switching between productivity and AI tooling.",
      "Improved user readiness by surfacing targeted prep points immediately after scheduling.",
    ],
    lessons: [
      "External APIs require clear async boundaries and graceful failure handling.",
      "Strong workflow sequencing is as important as model quality in AI products.",
    ],
    futureWork:
      "Support automatic calendar sync, richer meeting briefs, and interactive prep practice loops.",
    media: ["/demos/platform-overview.png", "/demos/app-snapshot.png"],
    hasCaseStudy: true,
  },
  {
    slug: "nightbite",
    name: "NightBite",
    oneLiner:
      "Late-night food truck preorder MVP designed for college campus demand patterns.",
    problem:
      "Students struggle to find reliable late-night food options while vendors lack efficient preorder infrastructure.",
    solution:
      "Built a mobile-first preorder flow with vendor-oriented subscription monetization and scalable backend planning.",
    myRole:
      "Owned product concept, user flow design, MVP feature planning, and initial technical architecture.",
    stack: ["React Native", "TypeScript", "Firebase", "Stripe"],
    architecture:
      "Mobile client with Firebase auth/data and subscription-enabled vendor model through Stripe.",
    impact: [
      "Shipped a functional MVP and validated interest in preorder convenience.",
      "Established early signal for a recurring vendor subscription model.",
    ],
    lessons: [
      "Early UX friction can erase otherwise strong product demand.",
      "Product decisions and technical constraints must be balanced from day one.",
    ],
    futureWork:
      "Improve login reliability, accelerate order flow, and expand vendor analytics capabilities.",
    media: ["/demos/nightbite-icon.png"],
    hasCaseStudy: true,
  },
  {
    slug: "thinkneuro-research-poster",
    name: "ThinkNeuro Research Poster",
    oneLiner:
      "Research poster and analysis on neurostimulation in motor recovery and neuroplasticity.",
    problem:
      "Clinical neurostimulation research shows promise, but evidence quality and protocol consistency vary across studies.",
    solution:
      "Produced a mechanistic + bibliometric analysis and translated findings into a symposium-ready research poster.",
    myRole:
      "Led research synthesis, analysis workflow setup, and final communication artifacts.",
    stack: ["Python", "NumPy", "Pandas", "R (Biblioshiny)", "Excel"],
    architecture:
      "Two-track workflow: mechanistic literature synthesis plus bibliometric dataset analysis for influence and trend mapping.",
    impact: [
      "Highlighted clinical potential of tDCS/TMS with rehabilitation.",
      "Surfaced reproducibility limitations tied to sample size and protocol variance.",
    ],
    lessons: [
      "Research communication quality can determine whether technical insights get used.",
      "Structured analysis pipelines improve repeatability in literature-driven work.",
    ],
    media: ["/demos/thinkneuro-research-poster.jpg", "/demos/neurotech-abstract.png"],
    demo: "/demos/1-neurotechnology.mp4",
    videoPoster: "/demos/thinkneuro-research-poster.jpg",
    hasCaseStudy: true,
  },
];
