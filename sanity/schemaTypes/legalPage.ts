import { defineField, defineType } from "sanity";

export const legalPageType = defineType({
  name: "legalPage",
  title: "Legal Page",
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
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedProject",
      title: "Related Project",
      description:
        "Link this legal page to a specific project. Leave empty only for global pages like privacy-policy or terms-of-service.",
      type: "reference",
      to: [{ type: "project" }],
      validation: (rule) =>
        rule.custom((value, context) => {
          const slug = (context.document as { slug?: { current?: string } } | undefined)?.slug?.current;
          const isGlobalPage = slug === "privacy-policy" || slug === "terms-of-service";
          if (isGlobalPage || value) return true;
          return "Select a related project for project-level legal pages.";
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
