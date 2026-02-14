"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div
        className={`relative z-10 max-w-3xl text-center transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight"
          style={{ color: "var(--scroll-fg)" }}
        >
          Building Systems
          <br />
          <span className="bg-gradient-to-r from-[hsl(0,70%,50%)] via-[hsl(20,85%,50%)] to-[hsl(40,90%,55%)] bg-clip-text text-transparent">
            That Scale.
          </span>
        </h1>
        <p
          className="mt-6 text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-pretty"
          style={{ color: "var(--scroll-muted-fg)" }}
        >
          Quantitative Biology @ USC expanding into Computer Science. Focused on
          AI-driven products and high-leverage tools.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-[hsl(15,80%,55%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(15,80%,45%)] hover:shadow-[0_0_20px_rgba(215,120,60,0.3)] rounded-full px-8 transition-all duration-300"
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
