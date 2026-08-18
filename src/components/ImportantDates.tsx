"use client";

import { motion } from "framer-motion";
import { ImportantDatesData, DateItem } from "@/lib/sanity";

const DEFAULT_DATES: DateItem[] = [
  {
    label: "Paper Submission",
    date: "15 Aug 2026",
    iconKey: "paper",
  },
  {
    label: "Registration",
    date: "20 Aug 2026",
    iconKey: "edit",
  },
  {
    label: "Conference",
    date: "5th–6th Sept 2026",
    iconKey: "calendar",
  },
    {
    label: "Conference",
    date: "5th–6th Sept 2026",
    iconKey: "calendar",
  }
];

function RenderIcon({ iconKey }: { iconKey?: string }) {
  if (iconKey === "edit") {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    );
  }
  if (iconKey === "calendar") {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }
  // Default paper / document icon
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

interface ImportantDatesProps {
  data?: ImportantDatesData | null;
}

export default function ImportantDates({ data }: ImportantDatesProps) {
  const heading = data?.heading || "Important Dates";
  const datesList = data?.datesList && data.datesList.length > 0 ? data.datesList : DEFAULT_DATES;

  return (
    <section id="dates" className="py-20 sm:py-28 bg-bg-light overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-navy">
            {heading}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden sm:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30 origin-left"
          />

          {/* Mobile connecting line (vertical) */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="sm:hidden absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-gold/30 via-gold to-gold/30 origin-top"
          />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-6 relative">
            {datesList.map((item, i) => (
              <motion.div
                key={item.label + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                className="flex sm:flex-col items-start sm:items-center gap-5 sm:gap-0"
              >
                {/* Dot with glow */}
                <div className="relative z-10 shrink-0">
                  <div className="pulse-glow w-12 h-12 rounded-full bg-navy flex items-center justify-center border-4 border-bg-light">
                    <span className="text-gold"><RenderIcon iconKey={item.iconKey} /></span>
                  </div>
                </div>

                {/* Card */}
                <div className="sm:mt-6 bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-navy/8 sm:text-center w-full">
                  <p className="text-xs uppercase tracking-[0.15em] font-bold text-navy/40 mb-1">
                    {item.label}
                  </p>
                  <p className="text-lg sm:text-xl font-extrabold text-gold">
                    {item.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
