import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of this website and linked project experiences.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-[hsl(15,80%,55%)] hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mt-6 mb-6" style={{ color: "var(--scroll-fg)" }}>
          Terms of Service
        </h1>
        <div
          className="rounded-lg border p-6 space-y-5 text-sm leading-relaxed"
          style={{ backgroundColor: "var(--scroll-card-bg)", borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
        >
          <p>Effective date: April 19, 2026</p>
          <p>
            By using this website, you agree to use it only for lawful purposes and in a way that does not interfere with normal
            site operation.
          </p>
          <p>
            All content, including text, visuals, and project materials, is provided for informational purposes and may be updated
            without notice.
          </p>
          <p>
            External links and project demos may be governed by separate terms. I am not responsible for third-party service
            availability or policies.
          </p>
          <p>
            These terms may be revised over time. Continued use of this website after updates indicates acceptance of the revised
            terms.
          </p>
        </div>
      </div>
    </main>
  );
}
