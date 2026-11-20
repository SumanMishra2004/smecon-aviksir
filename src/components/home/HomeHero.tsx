﻿﻿"use client";

import { motion } from "framer-motion";
import { CalendarDays, BookOpen, Layers, Wifi, BadgeCheck, FileDown } from "lucide-react";
import { HeroData, CallForPapersData, urlFor } from "@/lib/sanity";

interface HomeHeroProps {
  data?: HeroData | null;
  cfpData?: CallForPapersData | null;
}

export default function HomeHero({ data, cfpData }: HomeHeroProps) {
  const heroImage =
    data?.backgroundImages?.[0]
      ? urlFor(data.backgroundImages[0]) ?? "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
      : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800";

  // PDF buttons â€” only shown when Sanity radio = 'show' AND file is uploaded
  const showAbstract =
    cfpData?.abstractBookVisibility === "show" &&
    !!cfpData?.abstractBookFile?.asset?.url;

  const showFlyer =
    cfpData?.flyerVisibility === "show" &&
    !!cfpData?.flyerFile?.asset?.url;

  const abstractUrl = cfpData?.abstractBookFile?.asset?.url ?? "";
  const abstractLabel = cfpData?.abstractBookLabel ?? "Download Abstract Book";
  const flyerUrl = cfpData?.flyerFile?.asset?.url ?? "";
  const flyerLabel = cfpData?.flyerLabel ?? "Download Conference Flyer";

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.6 },
    }),
  };

  return (
    <section className="bg-[var(--color-surface)] pt-[76px] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* â”€â”€ LEFT column â”€â”€ */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* Pill badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)] text-xs font-medium px-4 py-2 rounded-full">
                <span className="animate-pulse text-[#914630]">â—</span>
                International Academic Conference · 2026
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-[family-name:var(--font-serif)] text-[3.5rem] leading-tight font-normal text-[var(--color-on-surface)]"
            >
              SMECON <em className="not-italic text-[#914630]">2026</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-[family-name:var(--font-serif)] text-[1.375rem] font-semibold text-[var(--color-on-surface)] leading-snug"
            >
              {data?.subtitle ??
                "Smart Manufacturing, Sustainable Energy & Computational Intelligence"}
            </motion.p>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-[var(--color-on-surface-variant)] leading-relaxed max-w-xl"
            >
              {data?.organizerText ??
                "A two-day international hybrid academic conference organized by the Department of Chemistry, Sovarani Memorial College, Howrah in collaboration with IKC Trust Research Foundation."}
            </motion.p>

            {/* Metadata bento strip */}
            <motion.div variants={fadeUp} custom={4} className="grid grid-cols-3 gap-3">
              {[
                { label: "Conference Date", value: "19\u201320 Sep 2026" },
                { label: "Symposium", value: "Hybrid Mode" },
                { label: "Tracks", value: "6 Scopus-Indexed" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[var(--color-surface-container)] rounded-xl p-3 border border-[var(--color-outline-variant)]"
                >
                  <p className="text-xs text-[var(--color-outline)] uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-on-surface)]">{item.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Affiliation note */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="flex items-start gap-3 bg-[var(--color-surface-container)] rounded-xl p-4 border border-[var(--color-outline-variant)]"
            >
              <BookOpen size={18} className="text-[#914630] mt-0.5 shrink-0" />
              <p className="text-sm text-[var(--color-on-surface-variant)]">
                Jointly organized by Dept. of Chemistry, Sovarani Memorial College &amp; IKC Trust
                Research Foundation. Book chapters published in Scopus-indexed proceedings.
              </p>
            </motion.div>

            {/* â”€â”€ CTA buttons â”€â”€ */}
            <motion.div variants={fadeUp} custom={6} className="flex flex-wrap gap-3">

              {/* Submit paper â€” always shown (links to form URL) */}
              <a
                href={cfpData?.primaryButton?.url ?? data?.primaryButton?.url ?? "#contact"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#914630] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#7a3927] transition-colors"
              >
                {cfpData?.primaryButton?.label ?? data?.primaryButton?.label ?? "Submit Your Paper"}
              </a>

              {/* Paper template â€” always shown (links to template URL) */}
              <a
                href={cfpData?.templateUrl ?? cfpData?.secondaryButton?.url ?? data?.secondaryButton?.url ?? "/schedule"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--color-surface-high)] text-[var(--color-on-surface)] px-6 py-3 rounded-lg text-sm font-semibold border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-variant)] transition-colors"
              >
                <CalendarDays size={16} />
                {cfpData?.secondaryButton?.label ?? data?.secondaryButton?.label ?? "Paper Template"}
              </a>

              {/* Abstract book PDF â€” only when Sanity radio = show AND file uploaded */}
              {showAbstract && (
                <a
                  href={abstractUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-[var(--color-surface-high)] text-[var(--color-on-surface)] px-6 py-3 rounded-lg text-sm font-semibold border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-variant)] transition-colors"
                >
                  <FileDown size={16} />
                  {abstractLabel}
                </a>
              )}

              {/* Conference flyer PDF â€” only when Sanity radio = show AND file uploaded */}
              {showFlyer && (
                <a
                  href={flyerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-[var(--color-surface-high)] text-[var(--color-on-surface)] px-6 py-3 rounded-lg text-sm font-semibold border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-variant)] transition-colors"
                >
                  <FileDown size={16} />
                  {flyerLabel}
                </a>
              )}

            </motion.div>
          </motion.div>

          {/* â”€â”€ RIGHT column â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-[var(--color-surface-container)] rounded-2xl overflow-hidden shadow-[0_4px_16px_-2px_rgba(64,56,50,0.08)]">
              {/* Image */}
              <div className="relative aspect-[4/3]">
                <img
                  src={heroImage}
                  alt="SMECON Conference"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <p className="text-xs font-semibold text-[#211a15]">Sovarani Memorial College</p>
                  <p className="text-xs text-[#54433e]">SMC · West Bengal</p>
                </div>
              </div>
              {/* Spec rows */}
              <div className="divide-y divide-[var(--color-outline-variant)]">
                {[
                  { icon: <Layers size={16} />, text: "Scopus-Indexed Book Chapters" },
                  { icon: <Wifi size={16} />, text: "Hybrid Delivery (In-Person & Online)" },
                  { icon: <BadgeCheck size={16} />, text: "Double-Blind Peer Review" },
                ].map((row) => (
                  <div
                    key={row.text}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-on-surface-variant)]"
                  >
                    <span className="text-[#914630]">{row.icon}</span>
                    {row.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
