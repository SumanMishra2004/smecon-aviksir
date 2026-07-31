"use client";

import { motion } from "framer-motion";
import { CallForPapersData } from "@/lib/sanity";

interface CallForPapersProps {
  data?: CallForPapersData | null;
}

export default function CallForPapers({ data }: CallForPapersProps) {
  const heading = data?.heading || "Call for Papers is Open";
  const primaryLabel = data?.primaryButton?.label || "Submit Your Paper";
  const primaryUrl = data?.primaryButton?.url || "https://forms.gle/ZuWYQG2nDfaQ8GSQ7";

  const secondaryLabel = data?.secondaryButton?.label || "Paper Template";
  const secondaryUrl = data?.secondaryButton?.url || "https://docs.google.com/document/d/1dYM38sYudATuPjuO0IZmzGUEiHyG9xMg/edit";

  const enquiryEmail = data?.enquiryEmail || "ikctrustofficial@gmail.com";
  const subtext = data?.subtext || "Full paper template (use for abstract too) — Download here";
  const templateUrl = data?.templateUrl || "https://docs.google.com/document/d/1dYM38sYudATuPjuO0IZmzGUEiHyG9xMg/edit";

  return (
    <section id="submit" className="py-20 sm:py-28 bg-navy relative overflow-hidden">
      {/* Decorative bg pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-white mb-6">
            {heading}
          </h2>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10"
        >
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-navy font-bold text-sm sm:text-base uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg shadow-gold/30 hover:scale-105 transition-transform duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {primaryLabel}
          </a>

          <a
            href={secondaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {secondaryLabel}
          </a>
        </motion.div>

        {/* Enquiry */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm text-white/50">
            Enquiries:{" "}
            <a
              href={`mailto:${enquiryEmail}`}
              className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
            >
              {enquiryEmail}
            </a>
          </p>
          <p className="mt-2 text-xs text-white/30">
            {subtext} —{" "}
            <a
              href={templateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-light hover:underline"
            >
              Download here
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
