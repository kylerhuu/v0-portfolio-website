"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const GALLERY_ITEMS = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Lab experiment setup",
    title: "Lab Life",
    description:
      "This was during my first big lab project, where I learned how to design experiments and analyze results.",
    span: "row-span-2",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Conference presentation",
    title: "Presentation Day",
    description:
      "Presenting at a conference taught me how to communicate complex ideas to a wider audience.",
    span: "",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Team collaboration session",
    title: "Teamwork",
    description:
      "Collaborating with my peers helped me learn problem-solving and leadership skills.",
    span: "",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Data visualization output",
    title: "Visualizing Data",
    description:
      "I spent hours coding visualizations for our data analysis project, seeing patterns emerge was exciting.",
    span: "row-span-2",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Whiteboard architecture diagram",
    title: "Planning",
    description:
      "Sketching architectures on a whiteboard is where ideas turn into action plans.",
    span: "",
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Hackathon project demo",
    title: "Hackathon Fun",
    description:
      "Hackathons pushed me to think fast, work under pressure, and learn a ton in a short time.",
    span: "",
  },
];

export function GallerySection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.05);
  const [activeItem, setActiveItem] = useState<number | null>(null);

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
              className={`group relative overflow-hidden rounded-lg cursor-pointer ${item.span} transition-all duration-700 ease-out ${
                gridVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: gridVisible ? `${i * 100}ms` : "0ms",
              }}
              onClick={() => setActiveItem(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                title={item.title} // <-- Hover title
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

      {/* Modal */}
      {activeItem !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-700 font-bold text-xl"
              onClick={() => setActiveItem(null)}
            >
              ×
            </button>
            <img
              src={GALLERY_ITEMS[activeItem].src}
              alt={GALLERY_ITEMS[activeItem].alt}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              {GALLERY_ITEMS[activeItem].title}
            </h3>
            <p className="text-gray-700">
              {GALLERY_ITEMS[activeItem].description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}