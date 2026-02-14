"use client";

const GALLERY_ITEMS = [
  { src: "/images/gallery-1.jpg", alt: "Lab experiment setup", span: "row-span-2" },
  { src: "/images/gallery-2.jpg", alt: "Conference presentation", span: "" },
  { src: "/images/gallery-3.jpg", alt: "Team collaboration session", span: "" },
  { src: "/images/gallery-4.jpg", alt: "Data visualization output", span: "row-span-2" },
  { src: "/images/gallery-5.jpg", alt: "Whiteboard architecture diagram", span: "" },
  { src: "/images/gallery-6.jpg", alt: "Hackathon project demo", span: "" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
          Gallery
        </h2>
        <p className="text-2xl md:text-3xl font-medium text-foreground mb-12 text-pretty">
          Moments from the journey.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.src}
              className={`group relative overflow-hidden rounded-lg ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-foreground font-medium">
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
