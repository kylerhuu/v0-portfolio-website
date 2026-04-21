import Link from "next/link";

type LegalNavLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function LegalNavLink({ href, label, className }: LegalNavLinkProps) {
  const combined = ["transition-colors hover:text-[hsl(15,80%,55%)] underline-offset-4 hover:underline", className]
    .filter(Boolean)
    .join(" ");
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} className={combined} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  const path = href.startsWith("/") ? href : `/${href}`;
  return <Link href={path} className={combined}>{label}</Link>;
}
