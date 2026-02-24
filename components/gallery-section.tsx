"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { GALLERIES, type GalleryPhoto } from "@/components/gallery-data"
import clsx from "clsx"

export default function PortfolioGallery() {
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)
  const [fadeIn, setFadeIn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const activeGallery = activeGalleryId
    ? GALLERIES.find((g) => g.id === activeGalleryId) ?? null
    : null

  // Fade-in when opening gallery
  useEffect(() => {
    if (activeGallery) {
      setFadeOut(false)
      setFadeIn(false)
      const timeout = setTimeout(() => setFadeIn(true), 50)
      return () => clearTimeout(timeout)
    }
  }, [activeGallery])

  // Switch gallery smoothly without X
  const switchGallery = (id: string) => {
    setFadeOut(true)
    setTimeout(() => {
      setActiveGalleryId(id)
      setSelectedPhoto(null)
      setFadeOut(false)
      setFadeIn(true)
    }, 200)
  }

  return (
    <section
      id="gallery"
      className="w-full max-w-6xl mx-auto px-4 py-16 flex flex-col gap-12 relative"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">My Portfolio Galleries</h2>
        <p className="text-white mt-2">
          Click a gallery to explore the photos and experiences
        </p>
      </div>

      {/* Gallery Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERIES.map((gallery) => (
          <button
            key={gallery.id}
            onClick={() => (activeGalleryId === gallery.id ? null : switchGallery(gallery.id))}
            className={clsx(
              "relative h-48 rounded-lg overflow-hidden border-2 border-transparent focus:outline-none shadow-md transition-transform transform hover:scale-105",
              activeGalleryId === gallery.id ? "border-blue-500" : "border-transparent"
            )}
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

      {/* Expanded Gallery Card */}
      {activeGallery && (
        <div
          className={clsx(
            "relative rounded-xl p-6 flex flex-col gap-6 transition-opacity duration-500 backdrop-blur-sm bg-black/50",
            fadeIn && !fadeOut ? "opacity-100" : "opacity-0"
          )}
        >
          {/* X Close button */}
          <button
            onClick={() => setActiveGalleryId(null)}
            className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
          >
            ×
          </button>

          {/* Gallery Title */}
          <h2 className="text-2xl font-bold text-white text-center">
            {activeGallery.title}
          </h2>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            {activeGallery.photos.length > 0 && (
              <div className="md:w-1/4 flex gap-2 overflow-x-auto overflow-y-hidden md:flex-col md:overflow-y-auto md:max-h-[700px]">
                {activeGallery.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPhoto(photo)}
                    className={clsx(
                      "relative w-40 h-24 md:w-full md:h-24 rounded-md overflow-hidden focus:outline-none border-2 transition transform hover:scale-105",
                      selectedPhoto === photo
                        ? "border-blue-400 shadow-lg"
                        : "border-transparent"
                    )}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center px-2">
                        {photo.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            {activeGallery.photos.length > 0 && (
              <div className="md:w-3/4 flex flex-col">
                <div className="relative w-full h-[70vh] md:h-[95%] rounded-md overflow-hidden bg-black/40">
                  {/* Image */}
                  <Image
                    src={(selectedPhoto ?? activeGallery.photos[0]).src}
                    alt={(selectedPhoto ?? activeGallery.photos[0]).title}
                    fill
                    className="object-contain"
                  />

                  {/* Soft edge fade */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.6)_100%)]" />
                  {/* Caption */}
                  {(selectedPhoto ?? activeGallery.photos[0]).description && (
                    <div className="absolute bottom-0 w-full bg-black/60 text-white text-sm p-3 rounded-b-md">
                      {(selectedPhoto ?? activeGallery.photos[0]).description}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Overall Blurb */}
          {activeGallery.overview && (
            <p className="text-sm text-center text-white bg-black/50 p-3 rounded-md shadow-md mt-4">
              {activeGallery.overview}
            </p>
          )}
        </div>
      )}
    </section>
  )
}