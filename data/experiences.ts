export type Experience = {
  id: string;
  company: string;
  title: string;
  duration: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  outcomes: string[];
  tools: string[];
  skills: string[];
  media?: string[];
  hasCaseStudy?: boolean;
  caseStudySlug?: string;
};

export const EXPERIENCES: Experience[] = [
  {
    id: "vie-game-growth",
    company: "Vie.game",
    title: "Growth Intern",
    duration: "2025",
    summary:
      "Supported growth strategy and outreach systems for an early-stage AI game design startup by improving positioning, campaign clarity, and repeatable experimentation loops.",
    responsibilities: [
      "Researched audience segments and competitor positioning to sharpen messaging.",
      "Drafted and iterated outreach copy across social and direct channels.",
      "Tracked campaign performance and synthesized insights for weekly strategy decisions.",
      "Collaborated with founders on launch priorities and go-to-market experiments.",
    ],
    outcomes: [
      "Contributed to growth from zero initial users during early launch cycles.",
      "Improved outreach clarity and engagement quality through tighter message framing.",
      "Learned to prioritize fast testing and simple systems over heavy tooling.",
    ],
    tools: ["Notion", "Google Sheets", "Analytics Tools", "Social Media Platforms"],
    skills: [
      "Growth Strategy",
      "Messaging",
      "Market Research",
      "Experiment Design",
      "Startup Operations",
    ],
    media: ["/demos/vie-logo.jpg"],
  },
  {
    id: "thinkneuro-internship",
    company: "ThinkNeuro",
    title: "Project Manager / SWE Intern",
    duration: "2025",
    summary:
      "Led cross-functional research execution on non-invasive neurostimulation and built structured analysis workflows that connected scientific findings, literature trends, and stakeholder-ready outputs.",
    responsibilities: [
      "Scoped research objectives and coordinated timeline milestones for deliverables.",
      "Directed technical analysis of tDCS and TMS mechanisms tied to neuroplasticity.",
      "Built a bibliometric workflow to examine influential papers and methodology trends.",
      "Prepared and presented final findings at the internship research symposium.",
    ],
    outcomes: [
      "Produced a consolidated research narrative linking mechanisms, evidence quality, and clinical implications.",
      "Identified concentration risks in the research landscape and protocol inconsistency across studies.",
      "Learned how to translate dense technical work into clear, decision-ready communication.",
    ],
    tools: ["Python", "NumPy", "Pandas", "R (Biblioshiny)", "Excel", "Google Sheets"],
    skills: [
      "Research Leadership",
      "Scientific Analysis",
      "Data Synthesis",
      "Technical Communication",
      "Project Management",
    ],
    media: ["/demos/thinkneuro-research-poster.jpg", "/demos/neurotech-abstract.png"],
    hasCaseStudy: true,
    caseStudySlug: "thinkneuro-research-poster",
  },
];
