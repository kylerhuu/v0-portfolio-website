import { createClient } from "next-sanity";

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-20";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
/** API CDN in prod is fine with ISR; in dev, read the API directly so edits show up quickly. */
export const useCdn =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";

export const hasSanityEnv =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET);

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
  stega: {
    enabled: false,
  },
});
