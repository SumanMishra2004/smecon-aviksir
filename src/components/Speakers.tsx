"use client";

import { motion } from "framer-motion";
import { SpeakersData, SpeakerItem, urlFor } from "@/lib/sanity";
import Image from "next/image";

const DEFAULT_SPEAKERS: SpeakerItem[] = [
  {
    name: "Prof. Bimal Krishna Banik, Ph.D.",
    role: "Professor & Senior Researcher",
    affiliation: "College of Sciences and Human Studies, Prince Mohammad Bin Fahd University, Saudi Arabia",
    initials: "BKB",
  },
  {
    name: "Prof. Sourangshu Mukhopadhyay",
    role: "Vice-Chancellor",
    affiliation: "Mahatma Gandhi University, WB, India",
    initials: "SM",
  },
  {
    name: "Prof. Rajiv Ganguly",
    role: "Professor & Dean",
    affiliation: "University of Engineering & Management, Newtown, Kolkata, India",
    initials: "RG",
  },
];

interface SpeakersProps {
  data?: SpeakersData | null;
}

export default function Speakers({ data }: SpeakersProps) {
  const heading = data?.heading || "Keynote Speakers";
  const speakersList = data?.speakersList && data.speakersList.length > 0 ? data.speakersList : DEFAULT_SPEAKERS;

  return (
    <section id="speakers" className="py-20 sm:py-28 bg-bg-light">
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
        </motion.div>

        {/* Speaker cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {speakersList.map((speaker, i) => {
            const photoUrl = urlFor(speaker.photo);
            const initials = speaker.initials || speaker.name.split(" ").map(n => n[0]).join("").slice(0, 3).toUpperCase();

            return (
              <motion.div
                key={speaker.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 60px rgba(14,42,71,0.12), 0 0 30px rgba(232,163,61,0.08)",
                }}
                className="group flex flex-col items-center text-center p-8 sm:p-10 rounded-2xl bg-white border border-navy/8 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Photo or Initials */}
                <div className="relative mb-5">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-gold/10 transition-shadow duration-500"
                  >
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={speaker.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl font-bold text-white/80">
                        {initials}
                      </span>
                    )}
                  </div>
                  {/* Decorative ring */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-gold/0 group-hover:border-gold/30 scale-110 transition-all duration-500 pointer-events-none"
                  />
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-navy mb-1">
                  {speaker.name}
                </h3>

                {/* Role */}
                <p className="text-sm font-semibold text-gold mb-2">{speaker.role}</p>

                {/* Affiliation */}
                <p className="text-xs sm:text-sm text-navy/50 leading-relaxed">
                  {speaker.affiliation}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
