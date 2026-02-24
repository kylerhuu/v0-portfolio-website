"use client"

import { useState } from "react"
import Image from "next/image"
import { GALLERIES, type GalleryPhoto } from "@/components/gallery-data"

export default function PortfolioGallery() {
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

  const activeGallery = activeGalleryId
    ? GALLERIES.find(g => g.id === activeGalleryId) ?? null
    : null

  return (
    <section id="gallery" className="w-full max-w-6xl mx-auto px-4 py-16 flex flex-col gap-12">
      {/* Gallery Header */}
      {!activeGallery && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">My Portfolio Galleries</h2>
          <p className="text-gray-500 mt-2">Click a gallery to explore the photos and experiences</p>
        </div>
      )}

      {/* Step 1 — Gallery Overview Grid */}
      {!activeGallery && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERIES.map((gallery) => (
            <button
              key={gallery.id}
              onClick={() => {
                setActiveGalleryId(gallery.id)
                setSelectedPhoto(null)
              }}
              className="relative h-48 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 focus:outline-none shadow-md transition-transform transform hover:scale-105"
            >
              {gallery.photos[0] && (
                <Image
                  src={gallery.photos[0].src}
                  alt={gallery.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white text-lg font-semibold text-center px-2">
                  {gallery.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 2 — Expanded Gallery */}
      {activeGallery && (
        <div className="flex flex-col gap-8">
          {/* Back Button */}
          <button
            onClick={() => setActiveGalleryId(null)}
            className="text-blue-500 underline text-sm self-start"
          >
            ← Back to galleries
          </button>

          {/* Gallery Title */}
          <h2 className="text-3xl font-bold text-center">{activeGallery.title}</h2>

          {/* Main Gallery Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left — Thumbnails */}
            {activeGallery.photos.length > 0 && (
              <div className="md:w-1/4 flex flex-col gap-2 overflow-y-auto max-h-[700px]">
                {activeGallery.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`relative w-full h-24 rounded-md overflow-hidden focus:outline-none border-2 transition ${
                      selectedPhoto === photo ? "border-blue-500" : "border-transparent"
                    } hover:scale-105 transform`}
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
            )}

            {/* Right — Main Image + Caption */}
            {activeGallery.photos.length > 0 && (
              <div className="md:w-3/4 flex flex-col">
                <div className="relative w-full h-[95%] rounded-md overflow-hidden">
                  <Image
                    src={(selectedPhoto ?? activeGallery.photos[0]).src}
                    alt={(selectedPhoto ?? activeGallery.photos[0]).title}
                    fill
                    className="object-cover"
                  />
                  {/* Caption */}
                  {(selectedPhoto ?? activeGallery.photos[0]).description && (
                    <div className="absolute bottom-0 w-full bg-black/60 text-white text-sm p-3">
                      {(selectedPhoto ?? activeGallery.photos[0]).description}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Overall Gallery Blurb */}
          {activeGallery.overview && (
            <p className="text-sm text-center text-white bg-black/50 p-3 rounded-md shadow-md">
              {activeGallery.overview}
            </p>
          )}
        </div>
      )}
    </section>
  )
}