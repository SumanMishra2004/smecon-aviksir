"use client";

import { motion } from "framer-motion";
import { MapPin, Video, Mail, ExternalLink } from "lucide-react";

export default function HomeVenue() {
  return (
    <section
      id="venue"
      className="py-20 lg:py-28"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} style={{ color: "var(--color-outline)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-outline)" }}
            >
              Location
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl font-normal leading-tight"
            style={{ color: "var(--color-on-surface)" }}
          >
            Conference Venue
          </h2>
          <p
            className="mt-3 text-sm max-w-xl"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Offline sessions will be held at Sovarani Memorial College, Howrah.
            Online participants may join through the hybrid platform.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid var(--color-outline-variant)",
            boxShadow: "0 4px 24px -4px rgba(64,56,50,0.08)",
          }}
        >
          {/* Info bar */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-outline-variant)]"
            style={{
              background: "var(--color-surface-container)",
              borderBottom: "1px solid var(--color-outline-variant)",
            }}
          >
            {/* Venue */}
            <div className="flex items-start gap-3 px-6 py-5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "var(--color-surface-high)" }}
              >
                <MapPin size={17} style={{ color: "var(--color-primary-warm)" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-outline)" }}
                >
                  Offline Venue
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  Sovarani Memorial College
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Howrah, West Bengal, India
                </p>
              </div>
            </div>

            {/* Mode */}
            <div className="flex items-start gap-3 px-6 py-5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "var(--color-surface-high)" }}
              >
                <Video size={17} style={{ color: "var(--color-primary-warm)" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-outline)" }}
                >
                  Conference Mode
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  Hybrid · In-Person &amp; Online
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  19&ndash;20 September 2026
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-3 px-6 py-5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "var(--color-surface-high)" }}
              >
                <Mail size={17} style={{ color: "var(--color-primary-warm)" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-outline)" }}
                >
                  Enquiries
                </p>
                <a
                  href="mailto:ikctrustofficial@gmail.com"
                  className="text-sm font-semibold transition-colors hover:underline underline-offset-4"
                  style={{ color: "var(--color-primary-warm)" }}
                >
                  ikctrustofficial@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="w-full h-72 sm:h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69450.39437544129!2d88.08286280357282!3d22.653786618437454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f87ebfb6cf63bf%3A0x63185c9e3175a4a6!2sSovarani%20Memorial%20College!5e0!3m2!1sen!2sin!4v1785924609678!5m2!1sen!2sin"
              style={{ border: 0 }}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Sovarani Memorial College, Howrah"
            />
          </div>

          {/* Footer note */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4"
            style={{
              background: "var(--color-surface-low)",
              borderTop: "1px solid var(--color-outline-variant)",
            }}
          >
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <span
                className="font-semibold"
                style={{ color: "var(--color-on-surface)" }}
              >
                Note:
              </span>{" "}
              Online participants will receive the virtual meeting link after successful registration.
            </p>
            <a
              href="https://maps.google.com/?q=Sovarani+Memorial+College+Howrah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold shrink-0 transition-colors hover:underline underline-offset-4"
              style={{ color: "var(--color-primary-warm)" }}
            >
              <ExternalLink size={13} />
              Open in Google Maps
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
