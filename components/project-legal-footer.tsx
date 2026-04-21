import type { CmsLegalPage, CmsSiteSettings } from "@/lib/sanity/types";
import { LegalNavLink } from "@/components/legal-nav-link";

const DEFAULT_PRIVACY = { label: "Privacy Policy", path: "/privacy-policy" };
const DEFAULT_TERMS = { label: "Terms of Service", path: "/terms-of-service" };

function trimOr(value: string | undefined, fallback: string): string {
  const t = typeof value === "string" ? value.trim() : "";
  return t.length > 0 ? t : fallback;
}

type ProjectLegalFooterProps = {
  projectSlug: string;
  projectName: string;
  productLegalFooterHeading?: string | null;
  /** When false, hide portfolio-level Privacy / Terms links (product-only footer). Default true. */
  showWebsiteLegalLinks: boolean;
  legalPages: Pick<CmsLegalPage, "title" | "projectLegalPath">[];
  siteSettings: CmsSiteSettings | null;
};

export function ProjectLegalFooter({
  projectSlug,
  projectName,
  productLegalFooterHeading,
  showWebsiteLegalLinks,
  legalPages,
  siteSettings,
}: ProjectLegalFooterProps) {
  const heading =
    productLegalFooterHeading?.trim() || `${projectName} · Product legal`;

  const privacyLabel = trimOr(siteSettings?.privacyPolicyLinkLabel, DEFAULT_PRIVACY.label);
  const privacyPath = trimOr(siteSettings?.privacyPolicyLinkPath, DEFAULT_PRIVACY.path);
  const termsLabel = trimOr(siteSettings?.termsOfServiceLinkLabel, DEFAULT_TERMS.label);
  const termsPath = trimOr(siteSettings?.termsOfServiceLinkPath, DEFAULT_TERMS.path);

  const hasProductLinks = legalPages.length > 0;

  return (
    <footer
      className="relative z-10 mt-auto border-t py-8"
      style={{ borderColor: "var(--scroll-border)", backgroundColor: "rgba(15,12,14,0.5)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: "var(--scroll-muted-fg)" }}>
          {heading}
        </p>

        {hasProductLinks ? (
          <nav
            aria-label={`${projectName} legal documents`}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs"
            style={{ color: "var(--scroll-fg)" }}
          >
            {legalPages.map((page) => {
              const path = page.projectLegalPath?.trim();
              if (!path) return null;
              return (
                <LegalNavLink
                  key={`${page.title}-${path}`}
                  href={`/projects/${projectSlug}/legal/${path}`}
                  label={page.title}
                />
              );
            })}
            <LegalNavLink
              href={`/projects/${projectSlug}/legal`}
              label="Legal index"
              className="opacity-80"
            />
          </nav>
        ) : !showWebsiteLegalLinks ? (
          <p className="max-w-md text-[11px]" style={{ color: "var(--scroll-muted-fg)" }}>
            No product legal pages are linked yet for this project in the CMS.
          </p>
        ) : null}

        {showWebsiteLegalLinks ? (
          <div
            className="flex flex-col items-center gap-2 border-t pt-4 text-[11px]"
            style={{ borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
          >
            <span className="uppercase tracking-wider opacity-90">This website</span>
            <nav aria-label="Website legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              <LegalNavLink href={privacyPath} label={privacyLabel} />
              <LegalNavLink href={termsPath} label={termsLabel} />
            </nav>
          </div>
        ) : null}
      </div>
    </footer>
  );
}
