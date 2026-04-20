import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { NeuralBackground } from "@/components/neural-background";
import { ScrollColorProvider } from "@/components/scroll-color-provider";
import { getLegalPagesByProjectSlug, getProjectBySlug, getSiteSettings } from "@/lib/sanity/content";

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

  const legalPages = await getLegalPagesByProjectSlug(slug);
  const pagesWithPath = legalPages.filter((page) => page.projectLegalPath?.trim());
  const siteSettings = await getSiteSettings();

  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar siteTitle={siteSettings?.siteTitle} />
      <main className="relative z-10 min-h-screen px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Link href={`/projects/${slug}`} className="text-sm text-[hsl(15,80%,55%)] hover:underline">
            ← Back to project details
          </Link>
          <h1 className="mt-6 mb-2 text-3xl font-bold" style={{ color: "var(--scroll-fg)" }}>
            {project.name} Legal
          </h1>
          <p className="mb-6 text-sm" style={{ color: "var(--scroll-muted-fg)" }}>
            Choose a legal document for this project.
          </p>

          {pagesWithPath.length > 0 ? (
            <div className="grid gap-3">
              {pagesWithPath.map((page) => (
                <Link
                  key={page.slug}
                  href={`/projects/${slug}/legal/${page.projectLegalPath}`}
                  className="rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-accent"
                  style={{
                    borderColor: "var(--scroll-border)",
                    color: "var(--scroll-fg)",
                    backgroundColor: "var(--scroll-card-bg)",
                  }}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="rounded-lg border p-6 text-sm leading-relaxed"
              style={{
                backgroundColor: "var(--scroll-card-bg)",
                borderColor: "var(--scroll-border)",
                color: "var(--scroll-muted-fg)",
              }}
            >
              <p>
                No project-specific legal pages found yet. In Sanity, create legal pages linked to this project and set
                <span className="mx-1 font-medium">&quot;Project legal path&quot;</span>
                to values like <code>terms-of-service</code>, <code>privacy</code>, or <code>cookies</code>.
              </p>
            </div>
          )}
        </div>
      </main>
    </ScrollColorProvider>
  );
}
