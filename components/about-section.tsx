"use client";

import { FlaskConical, Rocket, Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const HIGHLIGHTS = [
  {
    icon: FlaskConical,
    title: "Research & Labs",
    description:
      "Deep experience in computational biology, data pipelines, and research-grade analysis tools.",
  },
  {
    icon: Rocket,
    title: "Startup Experience",
    description:
      "Shipped products from zero to one in fast-paced environments. Comfortable with ambiguity and iteration.",
  },
  {
    icon: Layers,
    title: "Systems Thinking",
    description:
      "Obsessed with architecture, scalability, and building reliable infrastructure that compounds over time.",
  },
];

export function AboutSection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.1);

  return (
    <section id="about" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div
          ref={headingRef}
          className={`transition-all duration-700 ease-out ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
            About
          </h2>
          <p
            className="text-2xl md:text-3xl font-medium leading-relaxed text-pretty max-w-2xl"
            style={{ color: "var(--scroll-fg)" }}
          >
            I build systems at the intersection of biology, AI, and software
            engineering. My work focuses on creating tools that are robust,
            scalable, and genuinely useful.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.title}
              className={`group p-6 rounded-lg hover:border-[hsl(15,80%,55%)]/30 hover:shadow-[0_4px_24px_rgba(215,120,60,0.08)] transition-all duration-500 ease-out ${
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: cardsVisible ? `${i * 120}ms` : "0ms",
                backgroundColor: "var(--scroll-card-bg)",
                border: "1px solid var(--scroll-border)",
              }}
            >
              <item.icon className="h-6 w-6 text-[hsl(15,80%,55%)] mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--scroll-fg)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--scroll-muted-fg)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
