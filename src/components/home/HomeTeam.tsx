"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Users } from "lucide-react";
import { CommitteeData, CommitteeMember, urlFor } from "@/lib/sanity";

// ── fallback data ─────────────────────────────────────────────────────────────

const DEFAULT_PATRONS = [
  "Dr. Sumanta Chattopadhyay",
  "Dr. Malay Saha",
  "Ms. Purabi Mandal Ghosh",
];

const DEFAULT_CONVENERS = ["Dr. Sourajit Maity", "Ms. Priti Kamal"];

const DEFAULT_MEMBERS: CommitteeMember[] = [
  { name: "Apurba Nandi", domain: "Technical", role: "Technical Lead" },
  { name: "Sangita Dutta", domain: "Technical", role: "Technical Team" },
  { name: "Arijeet Ghosh", domain: "Publication", role: "Publication Team" },
  { name: "Sneha", domain: "Publicity", role: "Publicity Team" },
  { name: "Aparna", domain: "Publicity", role: "Publicity Team" },
  { name: "Priti Kamal", domain: "Registration", role: "Registration Lead" },
];

// ── helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const clean = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, "").trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const DOMAIN_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  patron:       { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
  convener:     { bg: "#dcfce7", text: "#166534", border: "#86efac" },
  technical:    { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  publication:  { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
  publicity:    { bg: "#fce7f3", text: "#9d174d", border: "#f9a8d4" },
  registration: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
  webmaster:    { bg: "#e0e7ff", text: "#3730a3", border: "#a5b4fc" },
};

function domainStyle(domain?: string) {
  const key = (domain ?? "").toLowerCase();
  return (
    DOMAIN_STYLES[key] ?? { bg: "var(--color-surface-high)", text: "var(--color-on-surface-variant)", border: "var(--color-outline-variant)" }
  );
}

// ── sub-components ────────────────────────────────────────────────────────────

function AvatarCircle({
  name,
  photoUrl,
  size = "lg",
  gradient = "from-[#914630] to-[#b05e46]",
}: {
  name: string;
  photoUrl?: string | null;
  size?: "sm" | "md" | "lg";
  gradient?: string;
}) {
  const dim = size === "lg" ? 80 : size === "md" ? 64 : 48;
  const textSize = size === "lg" ? "text-xl" : size === "md" ? "text-base" : "text-sm";

  return (
    <div
      className={`rounded-full overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}
      style={{ width: dim, height: dim }}
    >
      {photoUrl ? (
        <Image src={photoUrl} alt={name} width={dim} height={dim} className="w-full h-full object-cover" unoptimized />
      ) : (
        <span className={`font-bold text-white ${textSize}`}>{getInitials(name)}</span>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-8 rounded-full" style={{ background: "var(--color-outline-variant)" }} />
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
        {children}
      </span>
      <span className="flex-1 h-px rounded-full" style={{ background: "var(--color-outline-variant)" }} />
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

interface HomeTeamProps {
  data?: CommitteeData | null;
}

export default function HomeTeam({ data }: HomeTeamProps) {
  if (data?.isVisible === false) return null;

  const heading = data?.heading ?? "Organizing Committee";

  const patrons: string[] =
    data?.patrons && data.patrons.length > 0 ? data.patrons : DEFAULT_PATRONS;

  const conveners: string[] =
    data?.conveners && data.conveners.length > 0 ? data.conveners : DEFAULT_CONVENERS;

  const members: CommitteeMember[] =
    data?.members && data.members.length > 0 ? data.members : DEFAULT_MEMBERS;

  // Group members by domain for the grid
  const domains = Array.from(new Set(members.map((m) => m.domain ?? "General")));

  return (
    <section
      id="committee"
      className="py-20 lg:py-28"
      style={{ background: "var(--color-surface-low)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} style={{ color: "var(--color-outline)" }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
              Meet the Team
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl font-normal leading-tight"
            style={{ color: "var(--color-on-surface)" }}
          >
            {heading}
          </h2>
          <p className="mt-3 text-sm max-w-xl" style={{ color: "var(--color-on-surface-variant)" }}>
            Dedicated academics and professionals driving the leadership, technical excellence, and organisation of SMECON 2026.
          </p>
        </motion.div>

        {/* ── Patrons row ── */}
        {patrons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <SectionLabel>Patrons</SectionLabel>
            <div className="flex flex-wrap gap-4">
              {patrons.map((name, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-outline-variant)",
                    boxShadow: "0 2px 8px -2px rgba(64,56,50,0.07)",
                  }}
                >
                  <AvatarCircle name={name} gradient="from-[#b8860b] to-[#d4a017]" size="sm" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>{name}</p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded mt-0.5 inline-block"
                      style={{ ...domainStyle("patron") }}
                    >
                      Patron
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Conveners row ── */}
        {conveners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-14"
          >
            <SectionLabel>Conveners</SectionLabel>
            <div className="flex flex-wrap gap-4">
              {conveners.map((name, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-outline-variant)",
                    boxShadow: "0 2px 8px -2px rgba(64,56,50,0.07)",
                  }}
                >
                  <AvatarCircle name={name} gradient="from-[#914630] to-[#b05e46]" size="sm" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>{name}</p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded mt-0.5 inline-block"
                      style={{ ...domainStyle("convener") }}
                    >
                      Convener
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Committee members grid ── */}
        {members.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SectionLabel>Committee Members</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {members.map((member, i) => {
                const photoUrl = member.image ? urlFor(member.image) : null;
                const ds = domainStyle(member.domain);

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 12px 32px -4px rgba(145,70,48,0.14)",
                    }}
                    className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-outline-variant)",
                      boxShadow: "0 2px 8px -2px rgba(64,56,50,0.06)",
                    }}
                  >
                    {/* Avatar */}
                    <AvatarCircle name={member.name} photoUrl={photoUrl} size="lg" />

                    {/* Name */}
                    <p
                      className="mt-4 text-sm font-semibold leading-snug"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      {member.name}
                    </p>

                    {/* Domain badge */}
                    {member.domain && (
                      <span
                        className="mt-2 text-xs font-semibold px-2.5 py-0.5 rounded"
                        style={{ background: ds.bg, color: ds.text, border: `1px solid ${ds.border}` }}
                      >
                        {member.domain}
                      </span>
                    )}

                    {/* Role / affiliation */}
                    {(member.role || member.affiliation) && (
                      <p
                        className="mt-1.5 text-xs leading-snug"
                        style={{ color: "var(--color-outline)" }}
                      >
                        {member.role ?? member.affiliation}
                      </p>
                    )}

                    {/* LinkedIn */}
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium transition-colors hover:underline underline-offset-4"
                        style={{ color: "var(--color-primary-warm)" }}
                      >
                        <ExternalLink size={12} />
                        LinkedIn
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
