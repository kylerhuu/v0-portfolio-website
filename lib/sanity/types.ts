export type SanityImageRef = {
  asset?: {
    _ref?: string;
    url?: string;
  };
  alt?: string;
};

export type CmsExperience = {
  id: string;
  /** Public route segment; optional until CMS documents are migrated. */
  slug?: string;
  company: string;
  logo?: SanityImageRef;
  title: string;
  duration: string;
  location?: string;
  summary: string;
  /** Long-form intro on the experience detail page; falls back to summary. */
  detailOverview?: string;
  /** Role-specific context details for experience pages (not project-style case studies). */
  scopeAndContext?: string;
  responsibilities: string[];
  keyInitiatives?: string[];
  outcomes: string[];
  crossFunctionalCollaboration?: string[];
  professionalGrowth?: string[];
  tools: string[];
  skills: string[];
  media?: SanityImageRef[];
  hasCaseStudy?: boolean;
  caseStudySlug?: string;
};

export type CmsProject = {
  slug: string;
  name: string;
  logo?: SanityImageRef;
  oneLiner: string;
  problem: string;
  solution: string;
  myRole: string;
  stack: string[];
  architecture?: string;
  impact: string[];
  lessons: string[];
  futureWork?: string;
  liveUrl?: string;
  media?: SanityImageRef[];
  demo?: string;
  videoPoster?: string;
  hasCaseStudy: boolean;
};

export type CmsCaseStudy = {
  title: string;
  slug: string;
  heroSummary?: string;
  role?: string;
  timeline?: string;
  tags?: string[];
  problem?: string;
  buildJourney?: string[];
  architecture?: string[];
  results?: string[];
  lessons?: string[];
  futureWork?: string;
  gallery?: SanityImageRef[];
};

export type CmsLegalPage = {
  title: string;
  slug: string;
  body: Array<{
    _key?: string;
    _type?: string;
    children?: Array<{ _key?: string; text?: string }>;
  }>;
};
