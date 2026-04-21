export type SanityImageRef = {
  asset?: {
    _ref?: string;
    url?: string;
  };
  alt?: string;
};

export type CmsGalleryPhoto = {
  src: string;
  title: string;
  description: string;
};

export type CmsGallery = {
  id: string;
  title: string;
  overview: string;
  photos: CmsGalleryPhoto[];
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
  /** Optional override for the project route footer title */
  productLegalFooterHeading?: string;
  /** When false, hide portfolio Privacy/Terms in the project footer */
  showWebsiteLegalInProductFooter?: boolean;
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
  projectLegalPath?: string;
  body: Array<{
    _key?: string;
    _type?: string;
    children?: Array<{ _key?: string; text?: string }>;
  }>;
};

export type CmsSiteSettings = {
  siteTitle?: string;
  heroHeadline?: string;
  heroHighlight?: string;
  heroSubhead?: string;
  aboutBlurb?: string;
  resumeUrl?: string;
  contactHeadline?: string;
  footerText?: string;
  /** Site-wide footer (legal); defaults applied in UI if unset */
  privacyPolicyLinkLabel?: string;
  privacyPolicyLinkPath?: string;
  termsOfServiceLinkLabel?: string;
  termsOfServiceLinkPath?: string;
  socialLinks?: Array<{
    label?: string;
    url?: string;
  }>;
  contactEmail?: string;
  featuredProjectSlugs?: string[];
};
