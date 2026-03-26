"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function ResumeSection() {
  const { ref, isVisible } = useScrollReveal();

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
            <Button
              variant="outline"
              size="sm"
              className="rounded-full transition-all duration-300"
              style={{
                borderColor: "var(--scroll-border)",
                color: "var(--scroll-fg)",
              }}
              asChild
            >
              <a href="/Kyler Hu Resume website copy.pdf" download>
                <Download className="h-4 w-4" />
                Download
              </a>
            </Button>
          </div>

          <div className="px-6 py-12 md:px-10 md:py-16">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                border: "1px solid var(--scroll-border)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              }}
            >
              <div className="max-w-2xl">
                <p
                  className="text-sm font-semibold uppercase tracking-[0.18em] mb-3 text-[hsl(15,80%,55%)]"
                >
                  Resume
                </p>
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-4"
                  style={{ color: "var(--scroll-fg)" }}
                >
                  Open the full PDF in a clean tab.
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: "var(--scroll-muted-fg)" }}
                >
                  I removed the embedded browser PDF viewer so the section stays
                  clean. You can open the resume directly or download a copy.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    className="rounded-full transition-all duration-300"
                    asChild
                  >
                    <a
                      href="/Kyler Hu Resume website copy.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText className="h-4 w-4" />
                      Open Resume
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full transition-all duration-300"
                    style={{
                      borderColor: "var(--scroll-border)",
                      color: "var(--scroll-fg)",
                    }}
                    asChild
                  >
                    <a href="/Kyler Hu Resume website copy.pdf" download>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <iframe
                src="/Kyler Hu Resume website copy.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                title="Resume PDF"
                loading="lazy"
                className="w-full h-[720px] rounded-2xl"
                style={{
                  border: "1px solid var(--scroll-border)",
                  backgroundColor: "white",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
