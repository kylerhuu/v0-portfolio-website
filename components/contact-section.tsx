"use client";

import { Mail, Linkedin, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const FALLBACK_LINKS = [
  {
    icon: Mail,
    label: "kylerhu1549@gmail.com",
    href: "mailto:kylerhu1549@gmail.com",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/kyler-hu",
    href: "https://www.linkedin.com/in/kyler-hu/",
  },
  {
    icon: Phone,
    label: "+1 (925) 931-2012",
    href: "tel:+19259312012",
  },
];

type ContactSectionProps = {
  headline?: string;
  footerText?: string;
  contactEmail?: string;
  socialLinks?: Array<{
    label?: string;
    url?: string;
  }>;
};

function iconForUrl(url: string) {
  const lowered = url.toLowerCase();
  if (lowered.startsWith("mailto:")) return Mail;
  if (lowered.startsWith("tel:")) return Phone;
  if (lowered.includes("linkedin.com")) return Linkedin;
  return Mail;
}

function normalizeContactLinks(
  contactEmail?: string,
  socialLinks?: Array<{ label?: string; url?: string }>,
) {
  const links: Array<{ icon: typeof Mail; label: string; href: string }> = [];
  const email = contactEmail?.trim();
  if (email) {
    links.push({ icon: Mail, label: email, href: `mailto:${email}` });
  }
  (socialLinks || []).forEach((item) => {
    const href = item.url?.trim();
    if (!href) return;
    const label = item.label?.trim() || href;
    links.push({ icon: iconForUrl(href), label, href });
  });
  return links;
}

export function ContactSection({ headline, footerText, contactEmail, socialLinks }: ContactSectionProps) {
  const { ref, isVisible } = useScrollReveal();
  const resolvedHeadline = headline?.trim() || "Let's build something together.";
  const resolvedFooter = footerText?.trim() || "Built with intention. \u00A9 2026";
  const links = normalizeContactLinks(contactEmail, socialLinks);
  const displayLinks = links.length > 0 ? links : FALLBACK_LINKS;

  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
          Contact
        </h2>
        <p
          className="text-2xl md:text-3xl font-medium mb-12 text-pretty"
          style={{ color: "var(--scroll-fg)" }}
        >
          {resolvedHeadline}
        </p>

        <div className="flex flex-col items-center gap-6">
          {displayLinks.map((link) => {
            const opensNewTab = /^https?:\/\//i.test(link.href);
            return (
            <a
              key={link.label}
              href={link.href}
              target={opensNewTab ? "_blank" : undefined}
              rel={opensNewTab ? "noopener noreferrer" : undefined}
              className="group relative flex items-center gap-3 transition-all duration-300 hover:opacity-100"
              style={{ color: "var(--scroll-muted-fg)" }}
            >
              <link.icon className="h-5 w-5 text-[hsl(15,80%,55%)] group-hover:text-[hsl(30,85%,55%)] group-hover:drop-shadow-[0_0_6px_rgba(215,120,60,0.5)] transition-all duration-300" />
              <span className="text-base relative">
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[hsl(15,80%,55%)] group-hover:w-full transition-all duration-400 ease-out" />
              </span>
            </a>
          )})}
        </div>

        <div
          className="mt-24 pt-8"
          style={{ borderTop: "1px solid var(--scroll-border)" }}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs" style={{ color: "var(--scroll-muted-fg)" }}>
              {resolvedFooter}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
