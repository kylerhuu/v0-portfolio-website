import { FlaskConical, Rocket, Layers } from "lucide-react";

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
  return (
    <section id="about" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
          About
        </h2>
        <p className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed text-pretty max-w-2xl">
          I build systems at the intersection of biology, AI, and software
          engineering. My work focuses on creating tools that are robust,
          scalable, and genuinely useful.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="group p-6 rounded-lg bg-card border border-border hover:border-[hsl(15,80%,55%)]/30 transition-colors duration-300"
            >
              <item.icon className="h-6 w-6 text-[hsl(15,80%,55%)] mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
