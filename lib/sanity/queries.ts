import { groq } from "next-sanity";

export const experiencesQuery = groq`
  *[_type == "experience"] | order(orderRank asc, _createdAt desc) {
    "id": coalesce(_id, company),
    "slug": slug.current,
    company,
    logo {
      alt,
      asset->{
        url
      }
    },
    title,
    duration,
    location,
    summary,
    detailOverview,
    scopeAndContext,
    responsibilities,
    keyInitiatives,
    outcomes,
    crossFunctionalCollaboration,
    professionalGrowth,
    tools,
    skills,
    "media": media[]{
      alt,
      asset->{
        url
      }
    },
    "hasCaseStudy": defined(linkedProjectSlugs[0]),
    "caseStudySlug": linkedProjectSlugs[0]
  }
`;

export const experienceBySlugQuery = groq`
  *[_type == "experience" && slug.current == $slug][0] {
    "id": coalesce(_id, company),
    "slug": slug.current,
    company,
    logo {
      alt,
      asset->{
        url
      }
    },
    title,
    duration,
    location,
    summary,
    detailOverview,
    scopeAndContext,
    responsibilities,
    keyInitiatives,
    outcomes,
    crossFunctionalCollaboration,
    professionalGrowth,
    tools,
    skills,
    "media": media[]{
      alt,
      asset->{
        url
      }
    },
    "hasCaseStudy": defined(linkedProjectSlugs[0]),
    "caseStudySlug": linkedProjectSlugs[0]
  }
`;

/** Newest case study linked to this project (^ = parent project in list/detail projections). */
const LINKED_CASE_STUDY =
  "*[_type == \"caseStudy\" && relatedProject._ref == ^._id] | order(_updatedAt desc)[0]";

export const projectsQuery = groq`
  *[_type == "project"] | order(orderRank asc, _createdAt desc) {
    "slug": slug.current,
    name,
    logo {
      alt,
      asset->{
        url
      }
    },
    "oneLiner": coalesce(oneLiner, (${LINKED_CASE_STUDY}).heroSummary),
    problem,
    solution,
    myRole,
    "stack": select(
      count(stack) > 0 => stack,
      (${LINKED_CASE_STUDY}).tags
    ),
    architecture,
    impact,
    lessons,
    futureWork,
    liveUrl,
    "demo": select(
      defined(demo.asset->url) => demo.asset->url,
      demo
    ),
    videoPoster,
    hasCaseStudy,
    "media": select(
      count(media) > 0 => media[]{
        alt,
        asset->{
          url
        }
      },
      (${LINKED_CASE_STUDY}).gallery[]{
        alt,
        asset->{
          url
        }
      }
    )
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    logo {
      alt,
      asset->{
        url
      }
    },
    "oneLiner": coalesce(oneLiner, (${LINKED_CASE_STUDY}).heroSummary),
    problem,
    solution,
    myRole,
    "stack": select(
      count(stack) > 0 => stack,
      (${LINKED_CASE_STUDY}).tags
    ),
    architecture,
    impact,
    lessons,
    futureWork,
    liveUrl,
    "demo": select(
      defined(demo.asset->url) => demo.asset->url,
      demo
    ),
    videoPoster,
    hasCaseStudy,
    "media": select(
      count(media) > 0 => media[]{
        alt,
        asset->{
          url
        }
      },
      (${LINKED_CASE_STUDY}).gallery[]{
        alt,
        asset->{
          url
        }
      }
    )
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
    "gallery": gallery[]{
      alt,
      asset->{
        url
      }
    }
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
    "gallery": gallery[]{
      alt,
      asset->{
        url
      }
    }
  }
`;

export const legalPageBySlugQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    body
  }
`;

export const legalPageByProjectSlugQuery = groq`
  *[_type == "legalPage" && relatedProject->slug.current == $slug] | order(_updatedAt desc)[0]{
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
