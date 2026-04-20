import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { NeuralBackground } from "@/components/neural-background";
import { ScrollColorProvider } from "@/components/scroll-color-provider";
import { getLegalPageByProjectSlugAndPath, getProjectBySlug } from "@/lib/sanity/content";

type Params = {
  slug: string;
  legalPath: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, legalPath } = await params;
  const [project, legal] = await Promise.all([
    getProjectBySlug(slug),
    getLegalPageByProjectSlugAndPath(slug, legalPath),
  ]);

  if (!project || !legal) {
    return {
      title: "Project Legal",
      description: "Legal information for this project.",
    };
  }

  return {
    title: `${project.name} · ${legal.title}`,
    description: `${legal.title} for ${project.name}.`,
  };
}

export default async function ProjectLegalSubpage({ params }: { params: Promise<Params> }) {
  const { slug, legalPath } = await params;
  const [project, legal] = await Promise.all([
    getProjectBySlug(slug),
    getLegalPageByProjectSlugAndPath(slug, legalPath),
  ]);

  if (!project || !legal) {
    notFound();
  }

  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Link href={`/projects/${slug}/legal`} className="text-sm text-[hsl(15,80%,55%)] hover:underline">
            ← Back to legal index
          </Link>
          <h1 className="mt-6 mb-2 text-3xl font-bold" style={{ color: "var(--scroll-fg)" }}>
            {legal.title}
          </h1>
          <p className="mb-6 text-sm" style={{ color: "var(--scroll-muted-fg)" }}>
            {project.name}
          </p>
          <div
            className="rounded-lg border p-6 text-sm leading-relaxed"
            style={{
              backgroundColor: "var(--scroll-card-bg)",
              borderColor: "var(--scroll-border)",
              color: "var(--scroll-muted-fg)",
            }}
          >
            {legal.body?.length ? (
              <div className="space-y-4">
                <PortableText value={legal.body} />
              </div>
            ) : (
              <p>Legal content for this section is not published yet.</p>
            )}
          </div>
        </div>
      </main>
    </ScrollColorProvider>
  );
}
