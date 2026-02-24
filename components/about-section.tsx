"use client";

import { FlaskConical, Rocket, Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const HIGHLIGHTS = [
  {
    icon: FlaskConical,
    title: "Quantitative Research",
    description:
      "Background in quantitative biology with hands-on experience modeling complex systems, working with data, and translating research questions into code.",
  },
  {
    icon: Rocket,
    title: "Startup Experience",
    description:
      "Experience working in startup and early-stage environments where goals are unclear, speed matters, and ownership is expected from day one.",
  },
  {
    icon: Layers,
    title: "Systemic Thinking",
    description:
      "I think in systems — how components interact, where bottlenecks form, and how small design choices scale over time in both software and science.",
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
            Hi, I'm Kyler. I build systems at the intersection of biology, AI, product management, 
            and software engineering. My work focuses on creating tools that are robust,
            scalable, and genuinely useful. Currently focused on developing a highly technical
            background while learning real-world applications in business, growth, and tech.
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
