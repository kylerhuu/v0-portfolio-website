import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Company", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "Used for /experiences/[slug]. Generate from company when you want a public detail page.",
      type: "slug",
      options: { source: "company", maxLength: 96 },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Optional mark for lists and the experience detail header.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "duration", title: "Duration", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4 }),
    defineField({
      name: "detailOverview",
      title: "Detail overview",
      description: "Optional longer narrative for the experience detail page. Falls back to Summary if empty.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "scopeAndContext",
      title: "Scope & context",
      description: "What environment, team scope, and constraints framed this role.",
      type: "text",
      rows: 5,
    }),
    defineField({ name: "responsibilities", title: "Responsibilities", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "keyInitiatives",
      title: "Key initiatives",
      description: "Major initiatives, workstreams, or programs you drove.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "outcomes", title: "Outcomes", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "crossFunctionalCollaboration",
      title: "Cross-functional collaboration",
      description: "How you partnered across teams (product, design, research, ops, etc.).",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "professionalGrowth",
      title: "Professional growth",
      description: "Skills, leadership, and career growth gained from this role.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "tools", title: "Tools", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "skills", title: "Skills", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [
        defineField({
          name: "imageAsset",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        }),
      ],
    }),
    defineField({ name: "linkedProjectSlugs", title: "Linked Project Slugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "orderRank", title: "Order Rank", type: "number", initialValue: 100 }),
  ],
  orderings: [
    {
      title: "Order Rank",
      name: "orderRankAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "company",
      subtitle: "title",
      logo: "logo",
      thumb: "media.0",
    },
    prepare({ title, subtitle, logo, thumb }) {
      return { title, subtitle, media: logo ?? thumb };
    },
  },
});
