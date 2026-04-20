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
    defineField({
      name: "projectLegalPath",
      title: "Project legal path",
      description:
        "URL segment used for project legal routes: /projects/[slug]/legal/[projectLegalPath] (e.g. terms-of-service, privacy, cookies).",
      type: "string",
      validation: (rule) =>
        rule.custom((rawValue, context) => {
          const value = typeof rawValue === "string" ? rawValue.trim() : "";
          const hasProject = Boolean(
            (context.document as { relatedProject?: { _ref?: string } } | undefined)?.relatedProject?._ref,
          );
          if (!hasProject && !value) return true;
          if (!value) return "Project-linked legal pages require a project legal path.";
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
            return "Use lowercase kebab-case, e.g. terms-of-service or privacy-policy.";
          }
          return true;
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
