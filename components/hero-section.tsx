"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useScrollColor } from "@/components/scroll-color-provider";

export function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { isDark } = useScrollColor();

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <div
        className={`relative z-10 max-w-4xl text-center transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-[-0.02em] text-balance leading-[1.05]"
          style={{
            color: "var(--scroll-fg)",
            textShadow: isDark ? "0 2px 30px rgba(30, 8, 10, 0.5)" : "none",
          }}
        >
          Building Systems
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, hsl(0, 65%, 48%), hsl(18, 80%, 52%), hsl(35, 85%, 55%), hsl(42, 80%, 60%))",
            }}
          >
            That Scale.
          </span>
        </h1>
        <p
          className="mt-8 text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-pretty"
          style={{ color: "var(--scroll-muted-fg)" }}
        >
          Business Administration @ USC expanding into Computer Science. Focused on
          AI-driven products and scaling high-leverage tools.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-[hsl(15,80%,50%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(15,80%,42%)] hover:shadow-[0_0_28px_rgba(200,90,40,0.35)] rounded-full px-8 transition-all duration-300"
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
            className="rounded-full px-8 transition-all duration-300"
            style={{
              borderColor: "var(--scroll-border)",
              color: "var(--scroll-fg)",
            }}
          >
            <a href="#contact">
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </Button>
        </div>
      </div>

      {/* Glowing horizon line - cinematic, in the lower third */}
      <div
        className="absolute left-0 right-0 z-[1] pointer-events-none"
        style={{ bottom: "28%" }}
      >
        <div
          className="relative w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent 5%, rgba(200, 130, 60, 0.25) 30%, rgba(215, 150, 70, 0.4) 50%, rgba(200, 130, 60, 0.25) 70%, transparent 95%)",
          }}
        >
          {/* Glow bloom behind the line */}
          <div
            className="absolute inset-x-0 -top-4 h-8 animate-[horizon-pulse_4s_ease-in-out_infinite]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(210, 140, 60, 0.06) 30%, rgba(215, 150, 70, 0.12) 50%, rgba(210, 140, 60, 0.06) 70%, transparent 90%)",
              filter: "blur(8px)",
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center p-1"
          style={{ border: "2px solid var(--scroll-muted-fg)" }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: "var(--scroll-muted-fg)" }}
          />
        </div>
      </div>
    </section>
  );
}
