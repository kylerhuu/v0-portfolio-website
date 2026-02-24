"use client"

import { useState } from "react"
import Image from "next/image"
import { GALLERIES, type GalleryPhoto } from "@/components/gallery-data"

export default function GallerySection() {
  const gallery = GALLERIES.find(g => g.id === "scioly")!
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(gallery.photos[0])

  return (
    <section id="gallery" className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col gap-8">
      {/* Section Header */}
      <h2 className="text-2xl font-bold text-center">{gallery.title}</h2>

      {/* Main gallery container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT — thumbnails */}
        <div className="md:w-1/4 flex flex-col gap-2 overflow-y-auto max-h-[600px]">
          {gallery.photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhoto(photo)}
              className={`relative w-full h-24 rounded-md overflow-hidden focus:outline-none border-2 transition ${
                selectedPhoto === photo ? "border-blue-500" : "border-transparent"
              }`}
            >
              <Image src={photo.src} alt={photo.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-xs font-medium text-center px-2">
                  {photo.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT — main image + short description */}
        <div className="md:w-3/4 flex flex-col">
          <div className="relative w-full h-[80%] rounded-md overflow-hidden">
            <Image
              src={selectedPhoto!.src}
              alt={selectedPhoto!.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-2 text-center md:text-left">
            <p className="text-sm text-muted-foreground">{selectedPhoto!.description}</p>
          </div>
        </div>
      </div>

      {/* Overall blurb */}
      <p className="text-sm text-center text-muted-foreground">{gallery.overview}</p>
    </section>
  )
}