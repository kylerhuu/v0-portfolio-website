import { LegalNavLink } from "@/components/legal-nav-link";
import { getSiteSettings } from "@/lib/sanity/content";

const DEFAULT_PRIVACY = { label: "Privacy Policy", path: "/privacy-policy" };
const DEFAULT_TERMS = { label: "Terms of Service", path: "/terms-of-service" };

function trimOr(value: string | undefined, fallback: string): string {
  const t = typeof value === "string" ? value.trim() : "";
  return t.length > 0 ? t : fallback;
}

export async function SiteFooter() {
  const settings = await getSiteSettings();

  const privacyLabel = trimOr(settings?.privacyPolicyLinkLabel, DEFAULT_PRIVACY.label);
  const privacyPath = trimOr(settings?.privacyPolicyLinkPath, DEFAULT_PRIVACY.path);
  const termsLabel = trimOr(settings?.termsOfServiceLinkLabel, DEFAULT_TERMS.label);
  const termsPath = trimOr(settings?.termsOfServiceLinkPath, DEFAULT_TERMS.path);

  return (
    <footer
      className="relative z-10 mt-auto border-t py-8"
      style={{ borderColor: "var(--scroll-border)", backgroundColor: "rgba(15,12,14,0.5)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-6 text-center">
        <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          <LegalNavLink href={privacyPath} label={privacyLabel} />
          <LegalNavLink href={termsPath} label={termsLabel} />
        </nav>
      </div>
    </footer>
  );
}
