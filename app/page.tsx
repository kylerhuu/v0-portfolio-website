import { NeuralBackground } from "@/components/neural-background";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperiencesSection } from "@/components/experiences-section";
import  GallerySection from "@/components/gallery-section";
import { ResumeSection } from "@/components/resume-section";
import { ContactSection } from "@/components/contact-section";
import { ScrollColorProvider } from "@/components/scroll-color-provider";

export default function Home() {
  return (
    <ScrollColorProvider>
      <NeuralBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperiencesSection />
        <GallerySection />
        <ResumeSection />
        <ContactSection />
      </main>
    </ScrollColorProvider>
  );
}
