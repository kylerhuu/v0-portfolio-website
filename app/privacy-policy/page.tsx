import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { NeuralBackground } from "@/components/neural-background";
import { ScrollColorProvider } from "@/components/scroll-color-provider";
import { getLegalPageBySlug } from "@/lib/sanity/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for this website and related product experiences.",
};

export default async function PrivacyPolicyPage() {
  const page = await getLegalPageBySlug("privacy-policy");

  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm text-[hsl(15,80%,55%)] hover:underline">
            ← Back to home
          </Link>
          <h1 className="text-3xl font-bold mt-6 mb-6" style={{ color: "var(--scroll-fg)" }}>
            {page?.title || "Privacy Policy"}
          </h1>
          <div
            className="rounded-lg border p-6 text-sm leading-relaxed"
            style={{ backgroundColor: "var(--scroll-card-bg)", borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
          >
            {page?.body?.length ? (
              <div className="space-y-4">
                <PortableText value={page.body} />
              </div>
            ) : (
              <p>Privacy policy content will be published soon.</p>
            )}
          </div>
        </div>
      </main>
    </ScrollColorProvider>
  );
}
