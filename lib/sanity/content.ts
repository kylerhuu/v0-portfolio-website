import { EXPERIENCES } from "@/data/experiences";
import { PROJECTS } from "@/data/projects";
import { hasSanityEnv, sanityClient } from "@/lib/sanity/client";
import {
  caseStudyByProjectSlugQuery,
  caseStudyBySlugQuery,
  experienceBySlugQuery,
  experiencesQuery,
  legalPageByProjectSlugAndPathQuery,
  legalPageByProjectSlugQuery,
  legalPagesByProjectSlugQuery,
  legalPageBySlugQuery,
  projectBySlugQuery,
  projectsQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";
import type {
  CmsCaseStudy,
  CmsExperience,
  CmsLegalPage,
  CmsProject,
  CmsSiteSettings,
  SanityImageRef,
} from "@/lib/sanity/types";

function sanityRevalidateSeconds(): number {
  const raw = process.env.SANITY_FETCH_REVALIDATE_SECONDS;
  if (raw === undefined || raw === "") return 60;
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n) || n < 0) return 60;
  return n;
}

/** Next.js caches fetch by default; this revalidates Sanity-backed pages (0 = always refetch). */
const sanityFetchNext = {
  next: { revalidate: sanityRevalidateSeconds() },
} as const;

const FALLBACK_CASE_STUDIES: Record<string, CmsCaseStudy> = {
  outthegc: {
    title: "OutTheGC",
    slug: "outthegc",
    role: "Full-Stack Developer",
    timeline: "2025 - 2026",
    tags: ["Product", "AI", "Next.js", "Collaboration UX"],
    buildJourney: [
      "Started from SyncPrep learnings and removed onboarding-heavy steps that slowed first-time usage.",
      "Designed a link-first participation model so groups could contribute without account friction.",
      "Iterated prompt structure to summarize preferences into clear constraints and consensus signals.",
    ],
    architecture: [
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
    title: "SyncPrep",
    slug: "syncprep",
    role: "Full-Stack Developer",
    timeline: "2025",
    tags: ["Scheduling", "AI", "APIs", "Productivity"],
    buildJourney: [
      "Mapped user journey from meeting setup to preparation to reduce tool switching.",
      "Built overlap calculation logic to rank feasible windows across timezone constraints.",
      "Integrated prep intelligence directly after scheduling to maintain context continuity.",
    ],
    architecture: [
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
    title: "NightBite",
    slug: "nightbite",
    role: "Founder & Developer",
    timeline: "2025",
    tags: ["Mobile Product", "Startup", "Campus Commerce", "MVP"],
    buildJourney: [
      "Defined the core preorder flow around late-night student demand windows and food truck constraints.",
      "Prioritized fast ordering and repeat-customer behavior over feature-heavy account management.",
      "Shaped the first MVP scope around reliability, vendor onboarding readiness, and payment model viability.",
    ],
    architecture: [
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
    title: "ThinkNeuro Research Poster",
    slug: "thinkneuro-research-poster",
    role: "Project Manager / SWE Intern",
    timeline: "2025",
    tags: ["Research", "Data Analysis", "Neuroscience", "Scientific Communication"],
    buildJourney: [
      "Structured the project into mechanistic analysis and literature influence mapping to keep research output actionable.",
      "Synthesized findings across cellular, molecular, and network-level neuroplasticity evidence.",
      "Converted dense analysis into a concise poster format for symposium communication and stakeholder review.",
    ],
    architecture: [
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

const FALLBACK_LEGAL: Record<string, CmsLegalPage> = {
  "privacy-policy": {
    title: "Privacy Policy",
    slug: "privacy-policy",
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Effective date: April 19, 2026" }],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "This website may collect basic usage data such as page visits, browser metadata, and referral information for analytics and performance monitoring.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "If you contact me directly, any information you provide is used only to respond to your inquiry.",
          },
        ],
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    slug: "terms-of-service",
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Effective date: April 19, 2026" }],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "By using this website, you agree to use it lawfully and in a way that does not interfere with normal site operation.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "All content is provided for informational purposes and may be updated without notice.",
          },
        ],
      },
    ],
  },
};

function mapLocalMediaToSanity(media?: string[]): SanityImageRef[] | undefined {
  if (!media?.length) return undefined;
  return media.map((url) => ({ asset: { url } }));
}

function fallbackExperiences(): CmsExperience[] {
  return EXPERIENCES.map((item) => ({
    ...item,
    media: mapLocalMediaToSanity(item.media),
  }));
}

function fallbackProjects(): CmsProject[] {
  return PROJECTS.map((item) => ({
    ...item,
    media: mapLocalMediaToSanity(item.media),
  }));
}

export async function getExperienceBySlug(slug: string): Promise<CmsExperience | null> {
  const fallback =
    fallbackExperiences().find((item) => item.slug === slug || item.id === slug) ?? null;
  if (!hasSanityEnv) return fallback;
  try {
    const data = await sanityClient.fetch<CmsExperience | null>(
      experienceBySlugQuery,
      { slug },
      sanityFetchNext,
    );
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getExperiences(): Promise<CmsExperience[]> {
  if (!hasSanityEnv) return fallbackExperiences();
  try {
    const data = await sanityClient.fetch<CmsExperience[]>(experiencesQuery, {}, sanityFetchNext);
    if (!data?.length) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[sanity] No `experience` documents returned; showing repo fallback. Publish docs and confirm _type / dataset.",
        );
      }
      return fallbackExperiences();
    }
    return data;
  } catch {
    return fallbackExperiences();
  }
}

export async function getProjects(): Promise<CmsProject[]> {
  if (!hasSanityEnv) return fallbackProjects();
  try {
    const data = await sanityClient.fetch<CmsProject[]>(projectsQuery, {}, sanityFetchNext);
    if (!data?.length) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[sanity] No `project` documents returned; showing repo fallback. Publish docs and confirm _type / dataset.",
        );
      }
      return fallbackProjects();
    }
    return data;
  } catch {
    return fallbackProjects();
  }
}

export async function getProjectBySlug(slug: string): Promise<CmsProject | null> {
  const fallback = fallbackProjects().find((item) => item.slug === slug) || null;
  if (!hasSanityEnv) return fallback;
  try {
    const data = await sanityClient.fetch<CmsProject | null>(
      projectBySlugQuery,
      { slug },
      sanityFetchNext,
    );
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CmsCaseStudy | null> {
  const fallback = FALLBACK_CASE_STUDIES[slug] ?? null;
  if (!hasSanityEnv) return fallback;
  try {
    const data =
      (await sanityClient.fetch<CmsCaseStudy | null>(caseStudyBySlugQuery, { slug }, sanityFetchNext)) ||
      (await sanityClient.fetch<CmsCaseStudy | null>(
        caseStudyByProjectSlugQuery,
        { slug },
        sanityFetchNext,
      ));
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getLegalPageBySlug(slug: string): Promise<CmsLegalPage | null> {
  const fallback = FALLBACK_LEGAL[slug] ?? null;
  if (!hasSanityEnv) return fallback;
  try {
    const data = await sanityClient.fetch<CmsLegalPage | null>(
      legalPageBySlugQuery,
      { slug },
      sanityFetchNext,
    );
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getLegalPageByProjectSlug(projectSlug: string): Promise<CmsLegalPage | null> {
  if (!hasSanityEnv) return null;
  try {
    const data = await sanityClient.fetch<CmsLegalPage | null>(
      legalPageByProjectSlugQuery,
      { slug: projectSlug },
      sanityFetchNext,
    );
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getLegalPagesByProjectSlug(projectSlug: string): Promise<CmsLegalPage[]> {
  if (!hasSanityEnv) return [];
  try {
    const data = await sanityClient.fetch<CmsLegalPage[]>(legalPagesByProjectSlugQuery, { slug: projectSlug }, sanityFetchNext);
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getLegalPageByProjectSlugAndPath(
  projectSlug: string,
  path: string,
): Promise<CmsLegalPage | null> {
  if (!hasSanityEnv) return null;
  try {
    const data = await sanityClient.fetch<CmsLegalPage | null>(
      legalPageByProjectSlugAndPathQuery,
      { slug: projectSlug, path },
      sanityFetchNext,
    );
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  if (!hasSanityEnv) return null;
  try {
    return await sanityClient.fetch<CmsSiteSettings | null>(siteSettingsQuery, {}, sanityFetchNext);
  } catch {
    return null;
  }
}
