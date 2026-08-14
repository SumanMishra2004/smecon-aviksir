"use client";

import { motion } from "framer-motion";
import { TracksData, TrackItem } from "@/lib/sanity";

const DEFAULT_TRACKS: TrackItem[] = [
  { trackId: "T1", title: "Intelligent Design & Next-Gen Manufacturing Systems", color: "teal" },
  { trackId: "T2", title: "Clean Energy Transition & Sustainability", color: "purple" },
  { trackId: "T3", title: "Emerging Trends in Mechanical & Materials Engineering & Nano Technology", color: "gold" },
  { trackId: "T4", title: "Solar & Thermal Systems for Sustainable Engineering", color: "teal" },
  { trackId: "T5", title: "AI, Machine Learning, LLM, Agentic AI & Resilient Engineering Applications", color: "purple" },
  { trackId: "T6", title: "Green Technologies & Energy Solutions", color: "gold" },
  { trackId: "T7", title: "Computational Methods in Materials & Manufacturing", color: "teal" },
  { trackId: "T8", title: "Computational Intelligence in Biomedical Engineering", color: "purple" },
];

const COLOR_MAP = {
  teal: {
    bg: "bg-teal",
    border: "border-teal/30",
    glow: "shadow-teal/20",
    text: "text-teal",
    badge: "bg-teal",
  },
  purple: {
    bg: "bg-purple",
    border: "border-purple/30",
    glow: "shadow-purple/20",
    text: "text-purple",
    badge: "bg-purple",
  },
  gold: {
    bg: "bg-gold",
    border: "border-gold/30",
    glow: "shadow-gold/20",
    text: "text-gold",
    badge: "bg-gold",
  },
} as const;

interface TracksProps {
  data?: TracksData | null;
}

export default function Tracks({ data }: TracksProps) {
  const heading = data?.heading || "Conference Tracks";
  const subheading = data?.subheading || "6 Scopus-indexed publication tracks";
  const bannerText = data?.bannerText || "📚 Accepted & registered papers will be published as Scopus-indexed Book Chapters following the standard peer-review and editorial processes of the respective publishers.";
  const tracksList = data?.tracksList && data.tracksList.length > 0 ? data.tracksList : DEFAULT_TRACKS;

  return (
    <section id="tracks" className="py-20 sm:py-28 bg-bg-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-navy">
            {heading}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy/60 font-medium">
            {subheading}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {tracksList.map((track, i) => {
            const colorKey = (track.color in COLOR_MAP) ? track.color : "teal";
            const c = COLOR_MAP[colorKey];
            return (
              <motion.div
                key={track.trackId || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(14,42,71,0.12)" }}
                className={`group relative flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-white border ${c.border}
                            shadow-sm hover:shadow-lg transition-all duration-300 cursor-default`}
              >
                {/* Numbered badge */}
                <div
                  className={`shrink-0 w-11 h-11 rounded-full ${c.badge} flex items-center justify-center
                              shadow-md ${c.glow} group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-white text-sm font-bold">{track.trackId}</span>
                </div>
                {/* Title */}
                <p className="text-sm sm:text-base font-semibold text-navy leading-snug pt-0.5">
                  {track.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 rounded-xl bg-linear-to-r from-orange to-orange-light p-5 sm:p-6 border border-orange/30"
        >
          <p className="text-sm sm:text-base text-navy font-semibold text-center leading-relaxed">
            {bannerText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
