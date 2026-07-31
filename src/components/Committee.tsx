"use client";

import { motion } from "framer-motion";
import { CommitteeData } from "@/lib/sanity";

const DEFAULT_COMMITTEE = {
  conveners: [
    "Dr. Moupiya Ghosh",
    "Dr. Samir Mandal",
    "Mr. Avik Kumar Das",
  ],
  patrons: [
    "Dr. Sumanta Chattopadhyay",
    "Dr. Malay Saha",
    "Ms. Purabi Mandal Ghosh",
  ],
};

interface CommitteeProps {
  data?: CommitteeData | null;
}

export default function Committee({ data }: CommitteeProps) {
  const heading = data?.heading || "Organizing Committee";
  const conveners = data?.conveners && data.conveners.length > 0 ? data.conveners : DEFAULT_COMMITTEE.conveners;
  const patrons = data?.patrons && data.patrons.length > 0 ? data.patrons : DEFAULT_COMMITTEE.patrons;

  return (
    <section id="committee" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-orange/90 to-orange-light/90 p-8 sm:p-10 lg:p-12 border border-orange/30 shadow-lg shadow-orange/10"
        >
          <h2 className="section-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-navy text-center mb-10">
            {heading}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {/* Conveners */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-navy/60 mb-4">
                Convener
              </h3>
              <ul className="space-y-3">
                {conveners.map((name, i) => (
                  <li key={name + i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-navy/70 shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-navy">{name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Patrons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-navy/60 mb-4">
                Patron
              </h3>
              <ul className="space-y-3">
                {patrons.map((name, i) => (
                  <li key={name + i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-navy/70 shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-navy">{name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
