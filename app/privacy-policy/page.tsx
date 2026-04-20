import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for this website and related product experiences.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-[hsl(15,80%,55%)] hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mt-6 mb-6" style={{ color: "var(--scroll-fg)" }}>
          Privacy Policy
        </h1>
        <div
          className="rounded-lg border p-6 space-y-5 text-sm leading-relaxed"
          style={{ backgroundColor: "var(--scroll-card-bg)", borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
        >
          <p>Effective date: April 19, 2026</p>
          <p>
            This website may collect basic usage data such as page visits, browser metadata, and referral information for analytics
            and performance monitoring.
          </p>
          <p>
            If you contact me directly, any information you provide (such as name, email, or message content) is used only to
            respond to your inquiry.
          </p>
          <p>
            I do not sell personal information. Third-party services used by projects linked from this site may have their own
            privacy practices.
          </p>
          <p>You can request data deletion or ask privacy-related questions through the contact methods listed on the homepage.</p>
        </div>
      </div>
    </main>
  );
}
