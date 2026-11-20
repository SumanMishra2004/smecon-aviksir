"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Images } from "lucide-react";
import { GalleryData, urlFor } from "@/lib/sanity";

const DEFAULT_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
    caption: "International Presentation & Keynote Sessions",
  },
  {
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200",
    caption: "Interactive Seminars & Panel Discussions",
  },
  {
    url: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    caption: "Computational Intelligence Research Exchange",
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200",
    caption: "Academic Collaboration & Networking",
  },
  {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    caption: "Smart Manufacturing & Engineering",
  },
  {
    url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200",
    caption: "Panel Discussions",
  },
  {
    url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1200",
    caption: "Scholarly Networking",
  },
  {
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200",
    caption: "Award Ceremony",
  },
  {
    url: "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?q=80&w=1200",
    caption: "Research Poster Exhibition",
  },
  {
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200",
    caption: "Student Interaction Session",
  },
];

interface GalleryPageProps {
  data: GalleryData | null;
}

export default function GalleryPage({ data }: GalleryPageProps) {
  const heading = data?.heading ?? "Conference Gallery";
  const subheading =
    data?.subheading ?? "Glimpses of academic exchanges and past highlights";

  const images =
    data?.imagesList && data.imagesList.length > 0
      ? data.imagesList.map((item, i) => ({
          url:
            (item.image ? urlFor(item.image) : null) ??
            item.url ??
            DEFAULT_IMAGES[i % DEFAULT_IMAGES.length].url,
          caption: item.caption || "",
        }))
      : DEFAULT_IMAGES;

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Page hero header */}
      <div
        className="border-b"
        style={{
          background: "var(--color-surface-low)",
          borderColor: "var(--color-outline-variant)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors hover:underline underline-offset-4"
            style={{ color: "var(--color-outline)" }}
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <Images size={14} style={{ color: "var(--color-outline)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-outline)" }}
            >
              Moments at SMECon
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-normal leading-tight"
            style={{ color: "var(--color-on-surface)" }}
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-base max-w-xl"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {subheading}
          </motion.p>

          {/* Image count badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{
              background: "var(--color-surface-high)",
              color: "var(--color-on-surface-variant)",
              border: "1px solid var(--color-outline-variant)",
            }}
          >
            <Images size={13} />
            {images.length} {images.length === 1 ? "photo" : "photos"}
          </motion.div>
        </div>
      </div>

      {/* Gallery body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Empty / hidden state */}
        {data?.isVisible === false ? (
          <div className="text-center py-24">
            <Images
              size={48}
              className="mx-auto mb-4"
              style={{ color: "var(--color-outline-variant)" }}
            />
            <p
              className="text-lg font-medium"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Gallery coming soon — check back after the conference.
            </p>
          </div>
        ) : (
          /*
           * Pinterest-style masonry using CSS columns.
           * Each image renders at its own natural height — no fixed rows, no cropping.
           * Columns: 1 (mobile) → 2 (sm) → 3 (md) → 4 (lg)
           */
          <div
            style={{ columnGap: "0.75rem" }}
            className="[column-count:1] sm:[column-count:2] md:[column-count:3] lg:[column-count:4]"
          >
            {images.map((item, i) => (
              <motion.div
                key={i}
                className="break-inside-avoid mb-3 rounded-lg overflow-hidden relative group"
                style={{
                  boxShadow: "0 2px 10px -2px rgba(64,56,50,0.1)",
                  border: "1px solid var(--color-outline-variant)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                whileHover={{ scale: 1.015 }}
              >
                {/* Natural aspect ratio — width 100%, height auto */}
                <img
                  src={item.url}
                  alt={item.caption || `Gallery image ${i + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />

                {/* Caption: shown below image when present */}
                {item.caption && (
                  <div
                    className="px-3 py-2.5"
                    style={{
                      background: "var(--color-surface-low)",
                      borderTop: "1px solid var(--color-outline-variant)",
                    }}
                  >
                    <p
                      className="text-xs leading-snug"
                      style={{ color: "var(--color-on-surface-variant)" }}
                    >
                      {item.caption}
                    </p>
                  </div>
                )}

                {/* Hover overlay — subtle warm tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(145,70,48,0.15) 0%, transparent 60%)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
