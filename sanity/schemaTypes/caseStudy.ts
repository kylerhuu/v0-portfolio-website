import { defineField, defineType } from "sanity";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedProject",
      title: "Related Project",
      type: "reference",
      to: [{ type: "project" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "heroSummary", title: "Hero Summary", type: "text", rows: 4 }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "timeline", title: "Timeline", type: "string" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "problem", title: "Problem", type: "text", rows: 5 }),
    defineField({ name: "buildJourney", title: "Build Journey", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "architecture", title: "Architecture", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "results", title: "Results", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "lessons", title: "Lessons", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "futureWork", title: "Future Work", type: "text", rows: 4 }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineField({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
