"use client";

import { motion } from "framer-motion";
import { FeesData, FeeItem } from "@/lib/sanity";

const DEFAULT_FEES: FeeItem[] = [
  { amount: "₹8,000", label: "Students (UG/PG)", icon: "🎓" },
  { amount: "₹9,000", label: "Research Scholar", icon: "🔬" },
  { amount: "₹10,000", label: "Faculty / Academician / Invited Speaker", icon: "👨‍🏫" },
  { amount: "₹1,000", label: "Only Poster", icon: "📋" },
  { amount: "₹200", label: "Participation Only", icon: "🎫" },
];

interface FeesProps {
  data?: FeesData | null;
}

export default function Fees({ data }: FeesProps) {
  const heading = data?.heading || "Registration Fees";
  const subheading = data?.subheading || "(INR)";
  const feesList = data?.feesList && data.feesList.length > 0 ? data.feesList : DEFAULT_FEES;

  return (
    <section id="fees" className="py-20 sm:py-28 bg-white">
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
          <p className="mt-4 text-sm sm:text-base text-navy/50 font-medium uppercase tracking-wide">
            {subheading}
          </p>
        </motion.div>

        {/* Fee cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {feesList.map((fee, i) => (
            <motion.div
              key={fee.label + i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.175, 0.885, 0.32, 1.05] }}
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(14,42,71,0.12)" }}
              className="group relative flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-bg-light border border-navy/8 hover:border-gold/40 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <span className="text-3xl mb-3">{fee.icon || "🎓"}</span>

              {/* Amount */}
              <p className="text-2xl sm:text-3xl font-extrabold text-gold mb-2">
                {fee.amount}
              </p>

              {/* Label */}
              <p className="text-xs sm:text-sm font-semibold text-navy/70 uppercase tracking-wide leading-snug">
                {fee.label}
              </p>

              {/* Decorative top bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full bg-gold/0 group-hover:bg-gold transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
