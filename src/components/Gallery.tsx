"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface GalleryProps {
  data?: GalleryData | null;
}

export default function Gallery({ data }: GalleryProps) {
  if (data?.isVisible === false) {
    return null;
  }

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const heading = data?.heading || "Conference Gallery";
  const subheading = data?.subheading || "Glimpses of academic exchanges and past highlights";

  const imagesList = data?.imagesList && data.imagesList.length > 0
    ? data.imagesList.map(item => ({
        url: urlFor(item.image) || item.url || DEFAULT_IMAGES[0].url,
        caption: item.caption || "",
      }))
    : DEFAULT_IMAGES;

  useEffect(() => {
    if (imagesList.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [index, imagesList.length]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentItem = imagesList[index % imagesList.length];

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-navy">
            {heading}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy/60 font-medium">
            {subheading}
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative w-full aspect-[16/9] max-h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-navy/5 border border-navy/10 group">
          {/* Slides */}
          <div className="relative w-full h-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentItem.url}
                  alt={currentItem.caption}
                  className="w-full h-full object-cover"
                />
                
                {/* Caption overlay */}
                {currentItem.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent p-6 sm:p-8 text-white pt-20">
                    <p className="text-sm sm:text-lg lg:text-xl font-bold tracking-wide text-white drop-shadow-md">
                      {currentItem.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy/60 hover:bg-navy/80 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm z-20 cursor-pointer shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy/60 hover:bg-navy/80 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm z-20 cursor-pointer shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {imagesList.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "bg-gold w-6" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
