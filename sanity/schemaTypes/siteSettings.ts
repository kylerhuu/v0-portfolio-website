import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroHighlight", title: "Hero Highlight Text", type: "string" }),
    defineField({ name: "heroSubhead", title: "Hero Subhead", type: "text", rows: 3 }),
    defineField({ name: "aboutBlurb", title: "About Blurb", type: "text", rows: 4 }),
    defineField({
      name: "resumeFile",
      title: "Resume File",
      description: "Upload a resume document (PDF recommended).",
      type: "file",
      options: { accept: ".pdf,.doc,.docx" },
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL (optional fallback)",
      type: "url",
    }),
    defineField({ name: "contactHeadline", title: "Contact Headline", type: "string" }),
    defineField({ name: "footerText", title: "Footer Text", type: "string" }),
    defineField({
      name: "privacyPolicyLinkLabel",
      title: "Privacy policy — link label",
      description: "Shown in the site-wide footer on every page (required by many app-store / OAuth verifications).",
      type: "string",
      initialValue: "Privacy Policy",
    }),
    defineField({
      name: "privacyPolicyLinkPath",
      title: "Privacy policy — URL path",
      description: "Site-relative path to your privacy page, e.g. /privacy-policy. Use a full https URL only if hosted elsewhere.",
      type: "string",
      initialValue: "/privacy-policy",
    }),
    defineField({
      name: "termsOfServiceLinkLabel",
      title: "Terms of service — link label",
      type: "string",
      initialValue: "Terms of Service",
    }),
    defineField({
      name: "termsOfServiceLinkPath",
      title: "Terms of service — URL path",
      type: "string",
      initialValue: "/terms-of-service",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          title: "Social Link",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
    }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({
      name: "featuredProjectSlugs",
      title: "Featured Project Slugs",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
      subtitle: "contactEmail",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Site Settings",
        subtitle: subtitle || "Manage site-wide content",
      };
    },
  },
});
