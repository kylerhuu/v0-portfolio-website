import { groq } from "next-sanity";

export const experiencesQuery = groq`
  *[_type == "experience"] | order(orderRank asc, _createdAt desc) {
    "id": coalesce(_id, company),
    company,
    title,
    duration,
    location,
    summary,
    responsibilities,
    outcomes,
    tools,
    skills,
    media,
    "hasCaseStudy": defined(linkedProjectSlugs[0]),
    "caseStudySlug": linkedProjectSlugs[0]
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(orderRank asc, _createdAt desc) {
    "slug": slug.current,
    name,
    oneLiner,
    problem,
    solution,
    myRole,
    stack,
    architecture,
    impact,
    lessons,
    futureWork,
    demo,
    videoPoster,
    hasCaseStudy,
    media
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    oneLiner,
    problem,
    solution,
    myRole,
    stack,
    architecture,
    impact,
    lessons,
    futureWork,
    demo,
    videoPoster,
    hasCaseStudy,
    media
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    heroSummary,
    role,
    timeline,
    tags,
    problem,
    buildJourney,
    architecture,
    results,
    lessons,
    futureWork,
    gallery
  }
`;

export const caseStudyByProjectSlugQuery = groq`
  *[_type == "caseStudy" && relatedProject->slug.current == $slug][0] {
    title,
    "slug": slug.current,
    heroSummary,
    role,
    timeline,
    tags,
    problem,
    buildJourney,
    architecture,
    results,
    lessons,
    futureWork,
    gallery
  }
`;

export const legalPageBySlugQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    body
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    aboutBlurb,
    resumeUrl,
    socialLinks,
    contactEmail,
    featuredProjectSlugs
  }
`;
