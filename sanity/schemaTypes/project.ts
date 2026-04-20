import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "logo",
      title: "Card logo",
      description: "Square mark on the homepage card (e.g. product icon). Falls back to first gallery image if empty.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "oneLiner", title: "One Liner", type: "text", rows: 3 }),
    defineField({ name: "problem", title: "Problem", type: "text", rows: 5 }),
    defineField({ name: "solution", title: "Solution", type: "text", rows: 5 }),
    defineField({ name: "myRole", title: "My Role", type: "text", rows: 4 }),
    defineField({ name: "stack", title: "Stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "architecture", title: "Architecture", type: "text", rows: 4 }),
    defineField({ name: "impact", title: "Impact", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "lessons", title: "Lessons", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "futureWork", title: "Future Work", type: "text", rows: 4 }),
    defineField({
      name: "demo",
      title: "Demo Video",
      description: "Upload a video file for the project demo.",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({ name: "videoPoster", title: "Video Poster URL", type: "url" }),
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [
        defineField({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        }),
      ],
    }),
    defineField({ name: "hasCaseStudy", title: "Has Case Study", type: "boolean", initialValue: false }),
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
      title: "name",
      subtitle: "slug.current",
      logo: "logo",
      thumb: "media.0",
    },
    prepare({ title, subtitle, logo, thumb }) {
      return { title, subtitle, media: logo ?? thumb };
    },
  },
});
