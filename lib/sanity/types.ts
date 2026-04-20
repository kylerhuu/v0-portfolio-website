export type SanityImageRef = {
  asset?: {
    _ref?: string;
    url?: string;
  };
  alt?: string;
};

export type CmsExperience = {
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
  media?: SanityImageRef[];
  hasCaseStudy?: boolean;
  caseStudySlug?: string;
};

export type CmsProject = {
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
