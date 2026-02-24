"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const GALLERY_ITEMS = [
  {
    title: "Science Olympiad",
    cover: "/images/science-olympiad-cover.jpg",
    description: "My journey with Science Olympiad competitions.",
    subgallery: [
      {
        src: "/images/scio-1.jpg",
        alt: "Team practicing",
        description: "Practicing circuits for the competition.",
      },
      {
        src: "/images/scio-2.jpg",
        alt: "Award ceremony",
        description: "Winning our first medal!",
      },
      {
        src: "/images/scio-3.jpg",
        alt: "Event setup",
        description: "Preparing materials for the next challenge.",
      },
    ],
    span: "row-span-2",
  },
  {
    title: "Hackathons",
    cover: "/images/hackathon-cover.jpg",
    description: "Memorable hackathons I participated in.",
    subgallery: [
      {
        src: "/images/hackathon-1.jpg",
        alt: "Team brainstorming",
        description: "Brainstorming ideas with my teammates.",
      },
      {
        src: "/images/hackathon-2.jpg",
        alt: "Demo day",
        description: "Presenting our project to judges.",
      },
    ],
    span: "",
  },
  // Add more main galleries here
];

export function GallerySection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.05);

  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0); // currently selected photo for description

  return (
    <section id="gallery" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
            Gallery
          </h2>
          <p className="text-2xl md:text-3xl font-medium mb-12 text-pretty" style={{ color: "var(--scroll-fg)" }}>
            Moments from the journey.
          </p>
        </div>

        {/* Main Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`relative overflow-hidden rounded-lg cursor-pointer ${item.span} transition-all duration-700 ease-out ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: gridVisible ? `${i * 100}ms` : "0ms" }}
              onClick={() => { setActiveGallery(i); setSelectedPhoto(0); }}
            >
              <img
                src={item.cover}
                alt={item.title}
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Split Subgallery Modal ---------- */}
      {activeGallery !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-auto"
          onClick={() => setActiveGallery(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-6xl flex flex-col md:flex-row relative p-6 gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-700 font-bold text-xl"
              onClick={() => setActiveGallery(null)}
            >
              ×
            </button>

            {/* Left: scrollable photo list */}
            <div className="flex-1 overflow-y-auto max-h-[80vh] grid grid-cols-2 md:grid-cols-1 gap-4">
              {GALLERY_ITEMS[activeGallery].subgallery.map((photo, idx) => (
                <div
                  key={photo.src}
                  className={`relative cursor-pointer overflow-hidden rounded-lg border-2 ${
                    idx === selectedPhoto ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedPhoto(idx)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-32 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm text-center">{photo.alt}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: description */}
            <div className="flex-1 overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-bold mb-4">
                {GALLERY_ITEMS[activeGallery].subgallery[selectedPhoto].alt}
              </h2>
              <p className="text-gray-700">
                {GALLERY_ITEMS[activeGallery].subgallery[selectedPhoto].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}