"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Experience {
  title: string;
  summary: string;
  role: string;
  tags: string[];
  problem: string;
  roleDetail: string;
  techStack: string[];
  architecture: string;
  impact: string;
  keyLessons: string;
  futureImprovements: string;
  media?: string[];
  preview?: string;
}

const Experiences: Experience[] = [
  {
    title: "OutTheGC",
    summary: "OutTheGC is a link-based group trip planning platform designed to simplify coordinating trips by collecting availability, preferences, and ideas in one shared interface. Built as an iteration from SyncPrep, it focuses on reducing friction and enabling fast, intuitive group decision-making without requiring accounts or onboarding.",
    role: "Full-Stack Developer",
    tags: ["Next.js", "Full-Stack", "Product Design", "Collaboration", "System Design", "UX Optimization"],
    problem: 
      "Group trip planning is typically fragmented across group chats, spreadsheets, and multiple apps, making it difficult to align on dates, budgets, and preferences. While building SyncPrep, I realized that over-engineered scheduling systems create unnecessary friction for users who primarily need a fast and simple way to coordinate with others.",
    roleDetail: 
      "I designed and built the full-stack web application, including the link-based event system, availability aggregation logic, and collaborative planning interface. I developed the frontend experience and structured backend logic for handling trip creation, participant inputs, and shared state across users.",
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "TailwindCSS", "Cursor.ai"],
    architecture:
      "The application uses a Next.js frontend to allow users to instantly create a trip and generate a unique shareable link. Each trip acts as an event-based data container where participants submit availability, budget, destinations, and preferences. The system aggregates responses and visualizes group overlap to highlight optimal travel windows, while also organizing inputs into a shared planning interface.",
    impact:
      "OutTheGC reduces coordination friction by replacing scattered group chat decision-making with a centralized, data-driven planning workflow. Compared to SyncPrep, the product improves usability by eliminating unnecessary steps and prioritizing speed, simplicity, and real-world user behavior.",
    keyLessons:
      "Through building SyncPrep, I identified the risks of over-engineering and learned to prioritize user flow simplicity over technical complexity. OutTheGC reflects a shift toward faster, more intuitive product design, emphasizing minimal friction, clear interactions, and scalable collaboration patterns.",
    futureImprovements:
      "Future versions could include persistent data storage, edit permissions for participants, real-time updates, integrated itinerary planning tools, and enhanced visualization of group availability and trade-offs when not all users can align perfectly.",
    media: [
      "/demos/OutTheGC_demo.mov",
      "/demos/OTGC1.png",
      "/demos/OutTheGC_hero.png",
      "/demos/OTGC2.png"
    ],
    preview: "/demos/OutTheGC-logo.png",
  },
  {
    title: "SyncPrep",
    summary: "SyncPrep is an AI-powered meeting scheduling and preparation tool designed to simplify coordinating meetings across time zones while helping users prepare more effectively. It identifies optimal meeting times based on availability and generates preparation insights by analyzing a user’s resume alongside a job description or meeting context.",
    role: "Full-Stack Developer",
    tags: ["AI", "Next.js", "Scheduling", "Productivity Tools", "OpenAI", "Google Calendar Integration"],
    problem:
      "Students and early-career applicants often struggle to schedule meetings across different time zones while also preparing for interviews or professional conversations. Existing scheduling tools only solve the time coordination problem, while AI tools help with preparation but are disconnected from the scheduling workflow. This forces users to switch between multiple platforms, creating unnecessary friction during already stressful situations like interviews or networking meetings.",
    roleDetail: 
      "I designed and built the full-stack web application, including the scheduling logic, AI-powered preparation features, and Google Calendar event generation. I developed both the frontend interface and backend API routes, implemented time zone overlap calculations, and engineered prompts for AI-based resume and job description analysis.",
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "OpenAI API", "Google Calendar API", "TailwindCSS", "Cursor.ai"],
    architecture:
      "The application uses a Next.js frontend to handle user inputs such as time zones, availability windows, resumes, and job descriptions. Backend API routes process scheduling logic by calculating overlapping availability across time zones and ranking the best meeting times. The system then generates Google Calendar event links for easy scheduling. AI processing analyzes the resume and job description to generate preparation insights, including skill matches and suggested preparation topics.",
    impact:
      "SyncPrep combines two common tasks, scheduling and meeting preparation, into a single workflow. This reduces the time and friction involved in coordinating meetings and preparing for them, helping users move from scheduling to preparation more quickly and efficiently.",
    keyLessons:
      "Building SyncPrep strengthened my experience working with external APIs, particularly integrating OpenAI for AI-driven insights and Google Calendar for scheduling workflows. I also learned the importance of designing clear user flows and structuring backend API routes to handle asynchronous processing and external data sources.",
    futureImprovements:
      "Future versions could automatically sync with a user’s calendar to detect availability without manual input, add recruiter-oriented meeting briefs, integrate LinkedIn profile parsing, and expand AI-generated preparation suggestions to include structured interview question practice and meeting summaries.",
    media: [
      "/demos/platform-overview.png",
      "/demos/app-snapshot.png"
    ],
    preview: "/demos/platform-overview.png",
  },
  {
    title: "ThinkNeuro Research Internship",
    summary: "Led neuroscience research on non-invasive neurostimulation techniques used in neurorehabilitation, with a focus on how transcranial direct current stimulation (tDCS) and transcranial magnetic stimulation (TMS) influence neuroplasticity and motor recovery after neurological injury. The project combined mechanistic neuroscience analysis with a bibliometric study of the research landscape and was presented at the program’s final research symposium.",
    role: "Research Associate",
    tags: ["Research", "Data Analysis", "Python", "Neuroscience", "Scientific Computation"],
    problem:
      "Stroke and focal brain injuries frequently cause long-term motor deficits due to damage to the motor cortex or descending motor pathways. Recovery depends on neuroplasticity, but natural plasticity after injury is often slow and incomplete. Non-invasive neurostimulation techniques such as tDCS and TMS aim to enhance the brain’s ability to reorganize neural circuits, improving the effectiveness of rehabilitation therapy.",
    roleDetail:
      "I led research examining both the physiological mechanisms and the research landscape surrounding neurostimulation technologies. My work involved analyzing how stimulation techniques influence neural activity at cellular, molecular, and network levels, as well as performing a bibliometric analysis of the most influential research papers in the field. The project culminated in a formal presentation at the program’s final symposium.",
    techStack: ["Python", "Numpy & Pandas","R (Biblioshiny)", "Excel", "Google Sheets"],
    architecture:
      "The research was structured around two complementary components. First, a mechanistic analysis examined how non-invasive neurostimulation techniques influence neuroplasticity at multiple biological levels. This included investigating how anodal and cathodal tDCS alter neuronal membrane potentials, modulate ion channel activity, influence NMDA receptor signaling, and activate intracellular pathways such as CaMKII and CREB that regulate plasticity-related gene expression. The analysis also considered emerging roles of glial cells in neurostimulation effects. Second, a bibliometric analysis was conducted to understand the broader research landscape of neurostimulation in neurorehabilitation. Using the Web of Science database, approximately one hundred highly cited papers were curated and analyzed for authorship patterns, institutional affiliations, stimulation protocols, and reported clinical outcomes. The dataset was processed using spreadsheet tools and RStudio Biblioshiny to identify patterns in research influence, geographic distribution, and methodological trends within the field.",
    impact:
      "This research highlighted both the scientific promise and current limitations of non-invasive neurostimulation in neurorehabilitation. Across the literature, tDCS and TMS consistently improved cortical excitability, functional connectivity, and motor outcomes when combined with rehabilitation training. However, the bibliometric analysis revealed that the field is highly concentrated among a small group of institutions and researchers, and that many studies suffer from small sample sizes and inconsistent stimulation protocols. These findings emphasize the need for greater standardization and broader participation in research to improve reproducibility and accelerate the translation of neurostimulation technologies into reliable clinical treatments for patients recovering from neurological injury.",
    keyLessons:
      "This experience strengthened my ability to connect computational tools with scientific research. I gained experience analyzing complex neuroscience literature, structuring research questions, and presenting technical findings to an academic audience. The project also deepened my understanding of how neuroplasticity can be influenced by external stimulation technologies.",
    futureImprovements:
      "Future work in this field will likely focus on personalized neuromodulation strategies, particularly using high-definition tDCS (HD-tDCS) for more targeted stimulation. Standardizing stimulation protocols and conducting larger clinical trials will also be critical for translating these techniques into consistent clinical practice.",
    media: [
      "/demos/thinkneuro-research-poster.jpg",
      "/demos/1-neurotechnology.mp4",
      "/demos/neurotech-abstract.png"
    ],
    preview: "/demos/thinkneuro-research-poster.jpg",
  },
  {
    title: "NightBite",
    summary: "Late-night food truck preorder app for college students",
    role: "Founder & Developer",
    tags: ["Mobile App", "Product", "Startup", "Full-Stack"],
    problem:
      "College students struggle to find reliable late-night food options, and food trucks lack an easy way to handle preorders and recurring customers.",
    roleDetail:
      "Designed the product concept, core user flows, and MVP feature set. Planned authentication, vendor subscriptions, and order flow while iterating on UX and backend structure.",
    techStack: ["React Native", "TypeScript", "Firebase", "Stripe"],
    architecture:
      "Client-side mobile app with Firebase authentication and database. Stripe subscription model for vendors, designed for future scalability.",
    impact:
      "Built a functional MVP and validated demand for a vendor subscription model. Learned how to balance user experience with technical constraints.",
    keyLessons:
      "Product decisions matter as much as code. Small UX issues can completely break adoption if not addressed early.",
    futureImprovements:
      "Improve login reliability, optimize ordering speed, and expand vendor tools for analytics and menu management.",
    media: ["/demos/nightbite-icon.png"],
    preview: "/demos/nightbite-icon.png",
  },
  {
    title: "Vie.game Growth Strategy",
    summary: "Marketing and outreach systems for an AI game design startup",
    role: "Growth Intern",
    tags: ["Marketing", "Strategy", "Startup"],
    problem:
      "The startup needed clearer positioning, stronger outreach, and consistent growth channels to reach creators and developers.",
    roleDetail:
      "Worked on growth strategy, outreach messaging, and market research. Helped refine branding, analyze engagement data, and support launch efforts.",
    techStack: ["Notion", "Google Sheets", "Analytic Tools", "Social Media"],
    architecture:
      "Lightweight growth stack focused on experimentation, fast iteration, and feedback loops rather than heavy tooling.",
    impact:
      "Scaled product from 0 users and contributed to improved outreach clarity and engagement. Gained firsthand exposure to early-stage startup operations.",
    keyLessons:
      "Growth is about testing fast and learning faster. Clear messaging beats complex strategy.",
    futureImprovements:
      "Automate outreach tracking and build more structured experiments around user acquisition channels.",
    media: [
      "/demos/vie-logo.jpg",
      "/demos/vie-chicken-demo.mp4"
    ],
    preview: "/demos/vie-logo.jpg",
  },
];

function ExperienceCard({
  experience,
  onClick,
  index,
  isVisible,
}: {
  experience: Experience;
  onClick: () => void;
  index: number;
  isVisible: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-6 rounded-lg border transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
        backgroundColor: "var(--scroll-card-bg)",
        borderColor: "var(--scroll-border)",
      }}
    >
      {experience.preview && (
        <div
          className="mb-3 w-full rounded-lg overflow-hidden relative"
          style={{ paddingTop: "56.25%" }}
        >
          {experience.preview.endsWith(".png") || experience.preview.endsWith(".jpg") ? (
            <Image
              src={experience.preview}
              alt={`${experience.title}-preview`}
              fill
              sizes="(min-width: 768px) 32rem, 100vw"
              className="absolute top-0 left-0 object-cover"
            />
          ) : (
            <video
              src={experience.preview}
              muted
              playsInline
              loop
              preload="metadata"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--scroll-fg)" }}>
        {experience.title}
      </h3>
      <p className="text-sm mb-2 leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
        {experience.summary}
      </p>
      <p className="text-xs font-medium mb-4 text-[hsl(15,80%,55%)]">{experience.role}</p>
      <div className="flex flex-wrap gap-2">
        {experience.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs"
            style={{
              backgroundColor: "var(--scroll-card-bg)",
              color: "var(--scroll-muted-fg)",
              border: "1px solid var(--scroll-border)",
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </button>
  );
}

export function ExperiencesSection() {
  const [selected, setSelected] = useState<Experience | null>(null);
  const [previewMedia, setPreviewMedia] = useState<string | null>(null);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.05);

  return (
    <section id="experiences" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div
          ref={headingRef}
          className={`transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
            Experiences
          </h2>
          <p className="text-2xl md:text-3xl font-medium mb-12 text-pretty" style={{ color: "var(--scroll-fg)" }}>
            Selected work across AI, infrastructure, and biotech.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Experiences.map((experience, i) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              onClick={() => setSelected(experience)}
              index={i}
              isVisible={cardsVisible}
            />
          ))}
        </div>
      </div>

      {/* Main Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selected?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{selected?.summary}</DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="flex flex-col gap-6 mt-2">
              {[
                { title: "Problem", key: "problem" },
                { title: "My Role", key: "roleDetail" },
                { title: "Tech Stack", key: "techStack" },
                { title: "Architecture", key: "architecture" },
                { title: "Impact", key: "impact" },
                { title: "Key Lessons", key: "keyLessons" },
                { title: "Future Improvements", key: "futureImprovements" },
              ].map((section) => {
                const value = selected[section.key as keyof Experience];
                if (!value) return null;
                return (
                  <div key={section.key}>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                      {section.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {Array.isArray(value) ? (value as string[]).join(", ") : value}
                    </p>
                  </div>
                );
              })}

              {selected.media && selected.media.length > 0 && (
                <div className="flex overflow-x-auto gap-4 mt-4 pb-2">
                  {selected.media.map((file, i) => {
                    const commonClasses = "flex-0 rounded-lg border border-border cursor-pointer";
                    if (file.endsWith(".png") || file.endsWith(".jpg")) {
                      return (
                        <img
                          loading="lazy"
                          decoding="async"
                          key={i}
                          src={file}
                          alt={`${selected.title}-media-${i}`}
                          className={`${commonClasses} w-64 h-36 object-contain`}
                          onClick={() => setPreviewMedia(file)}
                        />
                      );
                    } else if (file.endsWith(".mp4")) {
                      return (
                        <video
                          key={i}
                          src={file}
                          controls
                          preload="metadata"
                          className={`${commonClasses} w-64 h-36 object-cover`}
                          onClick={() => setPreviewMedia(file)}
                        />
                      );
                    } else if (file.endsWith(".pdf")) {
                      return (
                        <iframe
                          key={i}
                          src={file}
                          title={`${selected.title}-document-${i}`}
                          loading="lazy"
                          className={`${commonClasses} w-64 h-80`}
                          onClick={() => setPreviewMedia(file)}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Media Preview */}
      <Dialog open={!!previewMedia} onOpenChange={() => setPreviewMedia(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto bg-card border-border">
          {previewMedia &&
            (previewMedia.endsWith(".png") || previewMedia.endsWith(".jpg") ? (
              <img src={previewMedia} alt="preview" className="w-full h-auto rounded-lg" />
            ) : previewMedia.endsWith(".mp4") ? (
              <video
                src={previewMedia}
                controls
                preload="metadata"
                className="w-full h-auto rounded-lg"
              />
            ) : previewMedia.endsWith(".pdf") ? (
              <iframe
                src={previewMedia}
                title="media-preview-pdf"
                loading="lazy"
                className="w-full h-[80vh] rounded-lg"
              />
            ) : null)}
        </DialogContent>
      </Dialog>
    </section>
  );
}
