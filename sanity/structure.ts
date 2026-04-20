import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("siteSettings").title("Site Settings"),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("caseStudy").title("Case Studies"),
      S.documentTypeListItem("experience").title("Experiences"),
      S.documentTypeListItem("gallery").title("Portfolio Galleries"),
      S.divider(),
      S.documentTypeListItem("legalPage").title("Legal Pages"),
    ]);
