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
        <p className="text-2xl md:text-3xl font-medium text-foreground mb-12 text-pretty">
          Experience at a glance.
        </p>

        {/* PDF Viewer placeholder */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[hsl(15,80%,55%)]" />
              <span className="text-sm font-medium text-foreground">
                Resume.pdf
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border text-foreground hover:bg-secondary hover:text-foreground hover:border-[hsl(15,80%,55%)]/40 hover:shadow-[0_0_15px_rgba(215,120,60,0.15)] transition-all duration-300"
              asChild
            >
              <a href="#" download>
                <Download className="h-4 w-4" />
                Download
              </a>
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center py-24 px-6">
            <FileText className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Upload your resume PDF to display it here. The embedded viewer
              will render inline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
