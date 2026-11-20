"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { GalleryData, urlFor } from "@/lib/sanity";

const DEFAULT_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    caption: "International Keynote Sessions",
  },
  {
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800",
    caption: "Interactive Seminars",
  },
  {
    url: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800",
    caption: "Research Exchange",
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800",
    caption: "Academic Collaboration",
  },
  {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
    caption: "Engineering Brainstorming",
  },
  {
    url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800",
    caption: "Panel Discussions",
  },
  {
    url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=800",
    caption: "Scholarly Networking",
  },
  {
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800",
    caption: "Award Ceremony",
  },
];

interface HomeGalleryProps {
  data?: GalleryData | null;
}

export default function HomeGallery({ data }: HomeGalleryProps) {
  if (data?.isVisible === false) return null;

  const images =
    data?.imagesList && data.imagesList.length > 0
      ? data.imagesList.slice(0, 8).map((item, i) => ({
          url:
            (item.image ? urlFor(item.image) : null) ??
            item.url ??
            DEFAULT_IMAGES[i % DEFAULT_IMAGES.length].url,
          caption: item.caption || DEFAULT_IMAGES[i % DEFAULT_IMAGES.length].caption,
        }))
      : DEFAULT_IMAGES.slice(0, 8);

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28"
      style={{ background: "var(--color-surface-container)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Images size={14} className="text-[var(--color-outline)]" />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-outline)" }}
              >
                Moments at SMECon
              </span>
            </div>
            <h2
              className="font-[family-name:var(--font-serif)] text-4xl font-normal leading-tight"
              style={{ color: "var(--color-on-surface)" }}
            >
              {data?.heading ?? "Conference Highlights"}
            </h2>
            {data?.subheading && (
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {data.subheading}
              </p>
            )}
          </div>
          <Link
            href="/gallery"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline underline-offset-4"
            style={{ color: "var(--color-primary-warm)" }}
          >
            View Full Gallery
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Pinterest masonry — CSS columns, images at natural height */}
        <div
          style={{
            columnCount: 2,
            columnGap: "0.75rem",
          }}
          className="sm:[column-count:3] lg:[column-count:4]"
        >
          {images.map((item, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid mb-3 rounded-lg overflow-hidden relative group cursor-pointer"
              style={{
                boxShadow: "0 2px 8px -1px rgba(64,56,50,0.08)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image at natural aspect ratio — no fixed height */}
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-auto block"
                loading="lazy"
              />

              {/* Caption fade-in overlay on hover */}
              {item.caption && (
                <div
                  className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(33,26,21,0.75) 0%, rgba(33,26,21,0.1) 50%, transparent 100%)",
                  }}
                >
                  <p className="text-white text-xs font-medium px-3 py-2.5 leading-snug">
                    {item.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: "var(--color-primary-warm)",
              color: "var(--color-on-primary-warm)",
            }}
          >
            <Images size={16} />
            Browse All Photos
          </Link>
        </div>
      </div>
    </section>
  );
}
