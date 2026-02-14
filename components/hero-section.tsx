import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-tight">
          Building Systems
          <br />
          <span className="bg-gradient-to-r from-[hsl(0,70%,50%)] via-[hsl(20,85%,50%)] to-[hsl(40,90%,55%)] bg-clip-text text-transparent">
            That Scale.
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed text-pretty">
          Quantitative Biology @ USC expanding into Computer Science. Focused on
          AI-driven products and high-leverage tools.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-[hsl(15,80%,55%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(15,80%,45%)] rounded-full px-8"
          >
            <a href="#projects">
              <ArrowDown className="h-4 w-4" />
              View Projects
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-border text-foreground hover:bg-secondary hover:text-foreground"
          >
            <a href="#contact">
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
