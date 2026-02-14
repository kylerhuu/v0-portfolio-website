"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const GALLERY_ITEMS = [
  { src: "/images/gallery-1.jpg", alt: "Lab experiment setup", span: "row-span-2" },
  { src: "/images/gallery-2.jpg", alt: "Conference presentation", span: "" },
  { src: "/images/gallery-3.jpg", alt: "Team collaboration session", span: "" },
  { src: "/images/gallery-4.jpg", alt: "Data visualization output", span: "row-span-2" },
  { src: "/images/gallery-5.jpg", alt: "Whiteboard architecture diagram", span: "" },
  { src: "/images/gallery-6.jpg", alt: "Hackathon project demo", span: "" },
];

export function GallerySection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.05);

  return (
    <section id="gallery" className="relative z-10 px-6 py-24 md:py-32">
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
            Gallery
          </h2>
          <p
            className="text-2xl md:text-3xl font-medium mb-12 text-pretty"
            style={{ color: "var(--scroll-fg)" }}
          >
            Moments from the journey.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.src}
              className={`group relative overflow-hidden rounded-lg ${item.span} transition-all duration-700 ease-out ${
                gridVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: gridVisible ? `${i * 100}ms` : "0ms",
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[rgba(42,15,15,0.3)] group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[rgba(42,15,15,0.7)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-xs text-[rgba(245,241,235,0.95)] font-medium">
                  {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
