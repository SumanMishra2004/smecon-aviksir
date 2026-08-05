"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PartnersData, PartnerItem, urlFor } from "@/lib/sanity";

// ─── Fallback data (shown when Sanity returns nothing) ────────────────────────
const DEFAULT_GROUPS = [
  {
    groupLabel: "Organising Institutions",
    partners: [
      { name: "IKC Trust", description: "Integrated Knowledge & Care Trust" },
      { name: "Sovarani Memorial College", description: "Dept. of Chemistry, Howrah, WB" },
    ],
  },
  {
    groupLabel: "In Collaboration With",
    partners: [
      { name: "IQAC – SMC", description: "Internal Quality Assurance Cell, Sovarani Memorial College" },
    ],
  },
];

// ─── Single logo/name card ─────────────────────────────────────────────────────
function PartnerCard({ partner, index }: { partner: PartnerItem; index: number }) {
  const logoUrl = urlFor(partner.logo);
  const initials = partner.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(14,42,71,0.10), 0 0 0 2px rgba(232,163,61,0.25)" }}
      className="group flex flex-col items-center text-center gap-3 p-6 sm:p-8 rounded-2xl bg-white border border-navy/8 shadow-sm hover:shadow-lg transition-all duration-400 cursor-pointer"
    >
      {/* Logo or initials */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-bg-light border border-navy/8 flex items-center justify-center shadow-sm group-hover:shadow-gold/10 transition-shadow duration-400">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={partner.name}
            width={80}
            height={80}
            className="w-full h-full object-contain p-1"
            unoptimized
          />
        ) : (
          <span className="text-xl font-extrabold text-navy/30">{initials}</span>
        )}
      </div>

      {/* Name */}
      <p className="text-sm sm:text-base font-bold text-navy leading-snug">{partner.name}</p>

      {/* Description */}
      {partner.description && (
        <p className="text-xs text-navy/45 leading-relaxed">{partner.description}</p>
      )}
    </motion.div>
  );

  return partner.website ? (
    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="block">
      {card}
    </a>
  ) : (
    card
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
interface PartnersProps {
  data?: PartnersData | null;
}

export default function Partners({ data }: PartnersProps) {
  const heading = data?.heading || "Partners & Sponsors";
  const subheading =
    data?.subheading ||
    "We are grateful to our partners and sponsors for their invaluable support of SMECON 2026.";

  const groups =
    data?.partnerGroups && data.partnerGroups.length > 0
      ? data.partnerGroups
      : DEFAULT_GROUPS;

  return (
    <section id="partners" className="py-20 sm:py-28 bg-bg-light overflow-hidden">
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
          <p className="mt-5 text-navy/55 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        {/* Groups */}
        <div className="space-y-14">
          {groups.map((group, gi) => (
            <div key={group.groupLabel + gi}>
              {/* Group label */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="inline-block h-0.5 w-8 bg-gold rounded-full" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-navy/50">
                  {group.groupLabel}
                </h3>
                <span className="flex-1 h-px bg-navy/8" />
              </motion.div>

              {/* Partner cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {(group.partners ?? []).map((partner, pi) => (
                  <PartnerCard key={partner.name + pi} partner={partner} index={pi} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Become a sponsor CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-navy/50 mb-4">
            Interested in partnering with SMECON 2026?
          </p>
          <a
            href="mailto:ikctrustofficial@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold text-gold text-sm font-semibold hover:bg-gold hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get in touch
          </a>
        </motion.div>

      </div>
    </section>
  );
}
