"use client"

import { useState } from "react"
import Image from "next/image"
import { GALLERIES, GalleryPhoto } from "./gallery-data"

export default function GallerySection() {
  // for now, just showing Science Olympiad
  const gallery = GALLERIES.find(g => g.id === "scioly")!
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

  return (
    <section className="w-full flex gap-6 h-[520px]">
      {/* LEFT — narrow photo panels */}
      <div className="w-1/2 flex gap-2 overflow-hidden">
        {gallery.photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setSelectedPhoto(photo)}
            className="relative flex-1 group focus:outline-none"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <span className="text-white text-xs font-medium text-center px-2">
                {photo.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* RIGHT — detail view */}
      <div className="w-1/2 flex flex-col">
        {selectedPhoto ? (
          <>
            {/* Selected image */}
            <div className="relative w-full h-1/2 rounded-md overflow-hidden">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title + description */}
            <div className="mt-4">
              <div className="text-sm font-semibold mb-1">
                {selectedPhoto.title}
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedPhoto.description}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Default overview */}
            <div className="text-lg font-semibold mb-2">
              {gallery.title}
            </div>
            <p className="text-sm text-muted-foreground">
              {gallery.overview}
            </p>
          </>
        )}
      </div>
    </section>
  )
}