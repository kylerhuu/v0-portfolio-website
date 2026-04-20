"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getMediaUrl } from "@/lib/sanity/media";
import type { CmsExperience } from "@/lib/sanity/types";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function isImageFile(file: string) {
  return file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg");
}

function isVideoFile(file: string) {
  return file.endsWith(".mp4") || file.endsWith(".mov") || file.endsWith(".m4v");
}

function isDocumentFile(file: string) {
  return file.endsWith(".pdf");
}

function ExperienceCard({
  experience,
  onClick,
  index,
  isVisible,
}: {
  experience: CmsExperience;
  onClick: () => void;
  index: number;
  isVisible: boolean;
}) {
  const preview = getMediaUrl(experience.media?.[0]);

  return (
    <button
      type="button"
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
      {preview && isImageFile(preview) && (
        <div className="mb-3 w-full rounded-lg overflow-hidden relative" style={{ paddingTop: "56.25%" }}>
          <Image
            src={preview}
            alt={`${experience.company}-preview`}
            fill
            sizes="(min-width: 768px) 32rem, 100vw"
            className="absolute top-0 left-0 object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--scroll-fg)" }}>
        {experience.company}
      </h3>
      <p className="text-xs font-medium mb-1 text-[hsl(15,80%,55%)]">{experience.title}</p>
      <p className="text-xs mb-3" style={{ color: "var(--scroll-muted-fg)" }}>
        {experience.duration}
        {experience.location ? ` • ${experience.location}` : ""}
      </p>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--scroll-muted-fg)" }}>
        {experience.summary}
      </p>
      <div className="flex flex-wrap gap-2">
        {(experience.skills || []).map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="text-xs"
            style={{
              backgroundColor: "var(--scroll-card-bg)",
              color: "var(--scroll-muted-fg)",
              border: "1px solid var(--scroll-border)",
            }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </button>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ExperiencesSection({ experiences }: { experiences: CmsExperience[] }) {
  const [selected, setSelected] = useState<CmsExperience | null>(null);
  const [previewMedia, setPreviewMedia] = useState<string | null>(null);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.05);

  const resultItems =
    selected && (selected.outcomes || []).length > 1
      ? (selected.outcomes || []).slice(0, (selected.outcomes || []).length - 1)
      : selected?.outcomes ?? [];
  const learnedItem = selected?.outcomes?.[(selected.outcomes || []).length - 1];

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
            Roles where I drove execution, strategy, and outcomes.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((experience, i) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onClick={() => setSelected(experience)}
              index={i}
              isVisible={cardsVisible}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border text-foreground">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="text-xl font-bold">{selected?.company}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selected?.title} • {selected?.duration}
                </p>
              </div>
              {selected?.hasCaseStudy && selected.caseStudySlug && (
                <Link
                  href={`/projects/${selected.caseStudySlug}`}
                  className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  View Details
                </Link>
              )}
            </div>
            <DialogDescription className="text-muted-foreground">{selected?.summary}</DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="flex flex-col gap-6 mt-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Context
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.summary}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Responsibilities
                </h4>
                <BulletList items={selected.responsibilities || []} />
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Execution
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{(selected.tools || []).join(", ")}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Results
                </h4>
                <BulletList items={resultItems} />
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Key Skills
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{(selected.skills || []).join(", ")}</p>
              </div>

              {learnedItem && (
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                    What I Learned
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{learnedItem}</p>
                </div>
              )}

              {selected.media && selected.media.length > 0 && (
                <div className="flex overflow-x-auto gap-4 mt-4 pb-2">
                  {selected.media.map((mediaItem, i) => {
                    const file = getMediaUrl(mediaItem);
                    if (!file) return null;
                    const commonClasses = "flex-0 rounded-lg border border-border cursor-pointer";
                    if (isImageFile(file)) {
                      return (
                        <button
                          type="button"
                          key={file}
                          className={`${commonClasses} w-64 h-36 relative overflow-hidden`}
                          onClick={() => setPreviewMedia(file)}
                        >
                          <Image
                            src={file}
                            alt={`${selected.company}-media-${i}`}
                            fill
                            sizes="256px"
                            className="object-contain"
                          />
                        </button>
                      );
                    }
                    if (isDocumentFile(file)) {
                      return (
                        <iframe
                          key={file}
                          src={file}
                          title={`${selected.company}-document-${i}`}
                          loading="lazy"
                          className={`${commonClasses} w-64 h-80`}
                          onClick={() => setPreviewMedia(file)}
                        />
                      );
                    }
                    if (isVideoFile(file)) {
                      return (
                        <video
                          key={file}
                          src={file}
                          muted
                          playsInline
                          loop
                          preload="metadata"
                          className={`${commonClasses} w-64 h-36 object-cover`}
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

      <Dialog open={!!previewMedia} onOpenChange={() => setPreviewMedia(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto bg-card border-border">
          {previewMedia &&
            (isImageFile(previewMedia) ? (
              <Image
                src={previewMedia}
                alt="preview"
                width={1600}
                height={1000}
                className="w-full h-auto rounded-lg"
              />
            ) : isVideoFile(previewMedia) ? (
              <video
                key={previewMedia}
                src={previewMedia}
                controls
                autoPlay
                muted
                playsInline
                preload="auto"
                className="w-full h-auto rounded-lg"
              />
            ) : isDocumentFile(previewMedia) ? (
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
