import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Company", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "duration", title: "Duration", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4 }),
    defineField({ name: "responsibilities", title: "Responsibilities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "outcomes", title: "Outcomes", type: "array", of: [{ type: "string" }] }),
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
    },
  },
});
