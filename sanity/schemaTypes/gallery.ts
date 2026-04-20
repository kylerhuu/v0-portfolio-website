import { defineField, defineType } from "sanity";

export const galleryType = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        defineField({
          name: "galleryPhoto",
          title: "Gallery Photo",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "number",
      initialValue: 100,
    }),
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
      title: "title",
      subtitle: "slug.current",
      media: "photos.0.image",
    },
  },
});
