import { Mail, Linkedin, Phone } from "lucide-react";

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
  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
          Contact
        </h2>
        <p className="text-2xl md:text-3xl font-medium text-foreground mb-12 text-pretty">
          {"Let's build something together."}
        </p>

        <div className="flex flex-col items-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <link.icon className="h-5 w-5 text-[hsl(15,80%,55%)] group-hover:text-[hsl(30,85%,55%)] transition-colors" />
              <span className="text-base">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {"Built with intention. \u00A9 2026"}
          </p>
        </div>
      </div>
    </section>
  );
}
