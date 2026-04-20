import { NeuralBackground } from "@/components/neural-background";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperiencesSection } from "@/components/experiences-section";
import { ProjectsSection } from "@/components/projects-section";
import GallerySection from "@/components/gallery-section";
import { ResumeSection } from "@/components/resume-section";
import { ContactSection } from "@/components/contact-section";
import { ScrollColorProvider } from "@/components/scroll-color-provider";
import { getExperiences, getProjects, getSiteSettings } from "@/lib/sanity/content";

export default async function Home() {
  const [experiences, projects, siteSettings] = await Promise.all([
    getExperiences(),
    getProjects(),
    getSiteSettings(),
  ]);
  const featuredSlugs = siteSettings?.featuredProjectSlugs?.filter(Boolean) ?? [];
  const featuredSet = new Set(featuredSlugs);
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const remainingProjects = projects.filter((project) => !featuredSet.has(project.slug));
  const orderedProjects = featuredProjects.length > 0 ? [...featuredProjects, ...remainingProjects] : projects;

  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar siteTitle={siteSettings?.siteTitle} />
      <main>
        <HeroSection
          headline={siteSettings?.heroHeadline}
          highlight={siteSettings?.heroHighlight}
          subhead={siteSettings?.heroSubhead}
        />
        <AboutSection aboutBlurb={siteSettings?.aboutBlurb} />
        <ProjectsSection projects={orderedProjects} featuredSlugs={featuredSlugs} />
        <ExperiencesSection experiences={experiences} />
        <GallerySection />
        <ResumeSection resumeUrl={siteSettings?.resumeUrl} />
        <ContactSection
          headline={siteSettings?.contactHeadline}
          footerText={siteSettings?.footerText}
          contactEmail={siteSettings?.contactEmail}
          socialLinks={siteSettings?.socialLinks}
        />
      </main>
    </ScrollColorProvider>
  );
}
