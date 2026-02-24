"use client"

import { useState } from "react"
import Image from "next/image"
import { GALLERIES, type GalleryPhoto } from "@/components/gallery-data"

export default function PortfolioGallery() {
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

  // Get the active gallery if one is selected
  const activeGallery = activeGalleryId
    ? GALLERIES.find(g => g.id === activeGalleryId) ?? null
    : null

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col gap-12">
      {/* Step 1 — Gallery overview grid */}
      {!activeGallery && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERIES.map(gallery => (
            <button
              key={gallery.id}
              onClick={() => {
                setActiveGalleryId(gallery.id)
                setSelectedPhoto(null) // reset photo
              }}
              className="relative h-40 rounded-md overflow-hidden border-2 border-transparent hover:border-blue-500 transition focus:outline-none"
            >
              {/* Use first photo as thumbnail */}
              <Image
                src={gallery.photos[0].src}
                alt={gallery.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white font-semibold text-lg text-center px-2">
                  {gallery.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 2 — Expanded gallery */}
      {activeGallery && (
        <div className="flex flex-col gap-8">
          {/* Back button */}
          <button
            onClick={() => setActiveGalleryId(null)}
            className="text-blue-500 underline text-sm"
          >
            ← Back to galleries
          </button>

          {/* Gallery title */}
          <h2 className="text-2xl font-bold text-center">{activeGallery.title}</h2>

          {/* Main gallery content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* LEFT — thumbnails */}
            <div className="md:w-1/4 flex flex-col gap-2 overflow-y-auto max-h-[600px]">
              {activeGallery.photos.map((photo, index) => (
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
                  src={(selectedPhoto ?? activeGallery.photos[0]).src}
                  alt={(selectedPhoto ?? activeGallery.photos[0]).title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-2 text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  {(selectedPhoto ?? activeGallery.photos[0]).description}
                </p>
              </div>
            </div>
          </div>

          {/* Overall gallery blurb */}
          <p className="text-sm text-center text-muted-foreground">{activeGallery.overview}</p>
        </div>
      )}
    </section>
  )
}