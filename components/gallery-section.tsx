"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const GALLERY_ITEMS = [
  {
    title: "Science Olympiad",
    cover: "/gallery/scioly/trophiesme.jpg",
    description: "The bread",
    subgallery: [
      {
        src: "/gallery/scioly/20240129_154657.jpg",
        alt: "First Medal",
        description: "Aggies 2024 Disease Detectives 2nd place!! First medal of Scioly career.",
      },
      {
        src: "/gallery/scioly/20240203_173059.jpg",
        alt: "BARSO statue",
        description: "ft. goat prez and disease partner",
      },
      {
        src: "/gallery/scioly/20240203_193510.jpg",
        alt: "BARSO medal",
        description: "Chemistry medal!!!",
      },
      {
        src: "/gallery/scioly/20250125_194141.jpg",
        alt: "2nd place Team Trophy",
        description: "BARSO - overall 2nd team placement, low team average proved that consistency > staggering success",
      },
      {
        src: "/gallery/scioly/ANH_8038.JPG",
        alt: "Award Ceremony",
        description: "there was a lot of people...",
      },
      {
        src: "/gallery/scioly/IMG_0809.jpg",
        alt: "CSUEB team photo -> 2nd year in scioly",
        description: "what a large family am i right?",
      },
      {
        src: "/gallery/scioly/DSCN0208.JPG",
        alt: "Senior picnic",
        description: "last team event :( sending off the oldies",
      },
      {
        src: "/gallery/scioly/IMG_0817.jpg",
        alt: "Team Photo",
        description: "im on the left side 2nd row, i was so happy!",
      },
      {
        src: "/gallery/scioly/IMG_1883.jpg",
        alt: "Senior ball team photo",
        description: "weird seeing a bunch of nerds dress formal",
      },
      {
        src: "/gallery/scioly/Sciolympics_516_group_photo.png",
        alt: "Drone Photo",
        description: "made it just in time for this photo!",
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