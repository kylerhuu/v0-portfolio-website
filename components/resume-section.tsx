import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export function ResumeSection() {
  return (
    <section id="resume" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
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
              className="rounded-full border-border text-foreground hover:bg-secondary hover:text-foreground"
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
