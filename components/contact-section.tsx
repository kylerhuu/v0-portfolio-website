"use client";

import { Mail, Linkedin, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const LINKS = [
  {
    icon: Mail,
    label: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/yourname",
    href: "https://linkedin.com/in/yourname",
  },
  {
    icon: Phone,
    label: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
];

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
          Contact
        </h2>
        <p
          className="text-2xl md:text-3xl font-medium mb-12 text-pretty"
          style={{ color: "var(--scroll-fg)" }}
        >
          {"Let's build something together."}
        </p>

        <div className="flex flex-col items-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 transition-all duration-300 hover:opacity-100"
              style={{ color: "var(--scroll-muted-fg)" }}
            >
              <link.icon className="h-5 w-5 text-[hsl(15,80%,55%)] group-hover:text-[hsl(30,85%,55%)] group-hover:drop-shadow-[0_0_6px_rgba(215,120,60,0.5)] transition-all duration-300" />
              <span className="text-base relative">
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[hsl(15,80%,55%)] group-hover:w-full transition-all duration-400 ease-out" />
              </span>
            </a>
          ))}
        </div>

        <div
          className="mt-24 pt-8"
          style={{ borderTop: "1px solid var(--scroll-border)" }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--scroll-muted-fg)" }}
          >
            {"Built with intention. \u00A9 2026"}
          </p>
        </div>
      </div>
    </section>
  );
}
