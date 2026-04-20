import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { NeuralBackground } from "@/components/neural-background";
import { ScrollColorProvider } from "@/components/scroll-color-provider";
import { getLegalPageBySlug, getProjectBySlug } from "@/lib/sanity/content";

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Legal",
      description: "Legal information for this project.",
    };
  }

  return {
    title: `${project.name} Legal`,
    description: `Legal terms and policy information for ${project.name}.`,
  };
}

export default async function ProjectLegalPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectSpecificLegal = await getLegalPageBySlug(`${slug}-legal`);
  const fallbackLegal = await getLegalPageBySlug("terms-of-service");
  const legal = projectSpecificLegal || fallbackLegal;

  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Link href={`/projects/${slug}`} className="text-sm text-[hsl(15,80%,55%)] hover:underline">
            ← Back to project details
          </Link>
          <h1 className="text-3xl font-bold mt-6 mb-2" style={{ color: "var(--scroll-fg)" }}>
            {project.name} Legal
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--scroll-muted-fg)" }}>
            {legal?.title || "Legal Information"}
          </p>
          <div
            className="rounded-lg border p-6 text-sm leading-relaxed"
            style={{ backgroundColor: "var(--scroll-card-bg)", borderColor: "var(--scroll-border)", color: "var(--scroll-muted-fg)" }}
          >
            {legal?.body?.length ? (
              <div className="space-y-4">
                <PortableText value={legal.body} />
              </div>
            ) : (
              <p>Legal content for this project will be published soon.</p>
            )}
          </div>
        </div>
      </main>
    </ScrollColorProvider>
  );
}
