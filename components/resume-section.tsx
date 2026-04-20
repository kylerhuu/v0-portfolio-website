"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type ResumeSectionProps = {
  resumeUrl?: string;
};

function canEmbedResume(url: string): boolean {
  if (!url) return false;
  const lowered = url.toLowerCase();
  return lowered.endsWith(".pdf") || lowered.includes(".pdf?");
}

export function ResumeSection({ resumeUrl }: ResumeSectionProps) {
  const { ref, isVisible } = useScrollReveal();
  const resolvedResumeUrl = (resumeUrl || "").trim() || "/Kyler Hu Resume copy.pdf";
  const showEmbed = canEmbedResume(resolvedResumeUrl);

  return (
    <section id="resume" className="relative z-10 px-6 py-24 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
          Resume
        </h2>
        <p
          className="text-2xl md:text-3xl font-medium mb-12 text-pretty"
          style={{ color: "var(--scroll-fg)" }}
        >
          Experience at a glance.
        </p>

        {/* PDF Viewer placeholder */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: "var(--scroll-card-bg)",
            border: "1px solid var(--scroll-border)",
          }}
        >
          <div
            className="flex items-center justify-between p-4"
            style={{ borderBottom: "1px solid var(--scroll-border)" }}
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[hsl(15,80%,55%)]" />
              <span
                className="text-sm font-medium"
                style={{ color: "var(--scroll-fg)" }}
              >
                Resume.pdf
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full transition-all duration-300 hover:opacity-90"
                style={{
                  borderColor: "hsl(15,80%,55%)",
                  backgroundColor: "transparent",
                  color: "hsl(15,80%,55%)",
                }}
                asChild
              >
                <a
                  href={resolvedResumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText className="h-4 w-4" />
                  Open in New Tab
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full transition-all duration-300 hover:opacity-90"
                style={{
                  borderColor: "var(--scroll-border)",
                  backgroundColor: "var(--scroll-card-bg)",
                  color: "var(--scroll-fg)",
                }}
                asChild
              >
                <a href={resolvedResumeUrl} download>
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {showEmbed ? (
              <iframe
                src={`${resolvedResumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title="Resume PDF"
                loading="lazy"
                className="w-full h-[720px] rounded-2xl"
                style={{
                  border: "1px solid var(--scroll-border)",
                  backgroundColor: "white",
                }}
              />
            ) : (
              <p className="text-sm" style={{ color: "var(--scroll-muted-fg)" }}>
                Resume preview is available for PDF links. Use &quot;Open in New Tab&quot; for this file.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
