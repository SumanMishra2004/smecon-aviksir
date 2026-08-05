"use client";

import { motion } from "framer-motion";

export default function Venue() {
  return (
    <section id="venue" className="py-20 sm:py-28 bg-white overflow-hidden">
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
            Venue
          </h2>
          <p className="mt-5 text-navy/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The offline sessions of SMECON will be held at  <span className="font-extrabold">  Sovarani Memorial College,
            Howrah, West Bengal, India. </span>Online participants may join via the hybrid platform.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl overflow-hidden shadow-lg border border-navy/8"
        >
          {/* Info bar */}
          <div className="bg-navy px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
            {/* Location */}
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-gold shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gold/70 mb-0.5">
                  Offline Venue
                </p>
                <p className="text-white font-semibold text-sm sm:text-base leading-snug">
                  Sovarani Memorial College (SMC)
                </p>
                <p className="text-white/55 text-xs sm:text-sm">
                  Howrah, West Bengal, India
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-white/10" />

            {/* Mode */}
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-gold shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gold/70 mb-0.5">
                  Conference Mode
                </p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  Hybrid (Offline + Online)
                </p>
                <p className="text-white/55 text-xs sm:text-sm">
                  19–20 September 2026
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-white/10" />

            {/* Enquiry */}
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-gold shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gold/70 mb-0.5">
                  Enquiries
                </p>
                <a
                  href="mailto:ikctrustofficial@gmail.com"
                  className="text-white font-semibold text-sm sm:text-base hover:text-gold transition-colors"
                >
                  ikctrustofficial@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Google Map iframe */}
          <div className="w-full h-72 sm:h-96 bg-navy/5">
            {/* Replace the src below with your actual Google Maps embed URL */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5!2d88.3105!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzIxLjQiTiA4OMKwMTgnMzcuOCJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sovarani Memorial College Location"
            />
          </div>

          {/* Bottom note */}
          <div className="bg-bg-light px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-navy/50 leading-relaxed">
              <span className="font-semibold text-navy/70">Note:</span> Online participants will receive the virtual meeting link after successful registration.
            </p>
            <a
              href="https://maps.google.com/?q=Sovarani+Memorial+College+Howrah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:text-teal-light transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
