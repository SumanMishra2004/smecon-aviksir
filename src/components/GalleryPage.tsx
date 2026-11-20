"use client";

import { motion } from "framer-motion";
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
    caption: "Academic Collaboration & Networking Opportunities",
  },
  {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    caption: "Smart Manufacturing & Engineering Brainstorming",
  },
];

interface GalleryPageProps {
  data: GalleryData | null;
}

export default function GalleryPage({ data }: GalleryPageProps) {
  const heading = data?.heading || "Conference Gallery";
  const subheading =
    data?.subheading || "Glimpses of academic exchanges and past highlights";

  const imagesList =
    data?.imagesList && data.imagesList.length > 0
      ? data.imagesList.map((item, i) => ({
          url:
            urlFor(item.image) ||
            item.url ||
            DEFAULT_IMAGES[i % DEFAULT_IMAGES.length].url,
          caption: item.caption || "",
        }))
      : DEFAULT_IMAGES;

  return (
    <section className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wider text-navy">
            {heading}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-navy/60 font-medium">
            {subheading}
          </p>
        </motion.div>

        {/* Empty state */}
        {data?.isVisible === false ? (
          <p className="text-center text-navy/50 text-lg py-16">
            Gallery coming soon — check back later.
          </p>
        ) : (
          /* Masonry grid using CSS columns */
          <div
            className="[column-count:1] sm:[column-count:2] md:[column-count:3] lg:[column-count:4]"
            style={{ columnGap: "1rem" }}
          >
            {imagesList.map((item, i) => (
              <motion.div
                key={i}
                className="break-inside-avoid mb-4 rounded-xl shadow-md overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={item.url}
                  alt={item.caption || `Gallery image ${i + 1}`}
                  className="w-full h-auto block"
                />
                {item.caption && (
                  <p className="text-sm text-navy/70 px-3 py-2">{item.caption}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
