"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommitteeData, CommitteeMember, urlFor } from "@/lib/sanity";
import Image from "next/image";

const DEFAULT_MEMBERS: CommitteeMember[] = [
  // Patrons
  { name: "Dr. Sumanta Chattopadhyay", domain: "Patron", role: "Patron", linkedinUrl: "https://linkedin.com" },
  { name: "Dr. Malay Saha", domain: "Patron", role: "Patron", linkedinUrl: "https://linkedin.com" },
  { name: "Ms. Purabi Mandal Ghosh", domain: "Patron", role: "Patron", linkedinUrl: "https://linkedin.com" },

  // Technical
  { name: "Apurba", domain: "Technical", role: "Technical Team", linkedinUrl: "https://linkedin.com" },
  { name: "Sangita", domain: "Technical", role: "Technical Team", linkedinUrl: "https://linkedin.com" },
  { name: "Gautam", domain: "Technical", role: "Technical Team", linkedinUrl: "https://linkedin.com" },

  // Publication
  { name: "Sourajit Sir", domain: "Publication", role: "Publication Team", linkedinUrl: "https://linkedin.com" },
  { name: "Arijeet Ghosh", domain: "Publication", role: "Publication Team", linkedinUrl: "https://linkedin.com" },

  // Publicity
  { name: "Sneha", domain: "Publicity", role: "Publicity Team", linkedinUrl: "https://linkedin.com" },
  { name: "Aparna", domain: "Publicity", role: "Publicity Team", linkedinUrl: "https://linkedin.com" },

  // Registration
  { name: "Priti", domain: "Registration", role: "Registration Lead", linkedinUrl: "https://linkedin.com" },

  // Webmaster
  { name: "Suman", domain: "Webmaster", role: "Webmaster Lead", linkedinUrl: "https://linkedin.com" },
];

function getInitials(name: string): string {
  const clean = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, "").trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getDomainBadgeStyle(domain?: string) {
  switch (domain?.toLowerCase()) {
    case "patron":
    case "patrons":
      return "bg-gold/15 text-gold-hover border-gold/30 font-bold";
    case "technical":
      return "bg-teal/15 text-teal border-teal/30 font-semibold";
    case "publication":
      return "bg-purple/15 text-purple border-purple/30 font-semibold";
    case "publicity":
      return "bg-orange/20 text-navy border-orange/40 font-semibold";
    case "registration":
      return "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold";
    case "webmaster":
      return "bg-indigo-100 text-indigo-800 border-indigo-300 font-semibold";
    default:
      return "bg-navy/5 text-navy/70 border-navy/15 font-medium";
  }
}

const LinkedInIcon = () => (
  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

interface CommitteeProps {
  data?: CommitteeData | null;
}

export default function Committee({ data }: CommitteeProps) {
  if (data?.isVisible === false) {
    return null;
  }

  const heading = data?.heading || "Organizing Committee";
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const allMembers = useMemo(() => {
    if (data?.members && data.members.length > 0) {
      return data.members;
    }
    return DEFAULT_MEMBERS;
  }, [data]);

  // Patrons and conveners from Sanity (simple string lists)
  const sanityPatrons: string[] = data?.patrons && data.patrons.length > 0 ? data.patrons : [];
  const sanityConveners: string[] = data?.conveners && data.conveners.length > 0 ? data.conveners : [];

  // Extract unique domains in priority order
  const availableDomains = useMemo(() => {
    const rawDomains = Array.from(new Set(allMembers.map((m) => m.domain || "General")));
    const priority = ["Patron", "Technical", "Publication", "Publicity", "Registration", "Webmaster"];
    const sorted = rawDomains.sort((a, b) => {
      const ia = priority.indexOf(a);
      const ib = priority.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b);
    });
    return ["All", ...sorted];
  }, [allMembers]);

  const filteredMembers = useMemo(() => {
    if (selectedDomain === "All") return allMembers;
    return allMembers.filter((m) => (m.domain || "General").toLowerCase() === selectedDomain.toLowerCase());
  }, [allMembers, selectedDomain]);

  return (
    <section id="committee" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Decorative subtle background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-navy">
            {heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-navy/60 max-w-2xl mx-auto">
            Meet our dedicated team members driving leadership, technical excellence, publicity, and organization across all domains.
          </p>
        </motion.div>

        {/* ── Patrons ── */}
        {sanityPatrons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-xs font-bold uppercase tracking-widest text-gold-hover px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                Patrons
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/50" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {sanityPatrons.map((name, i) => (
                <motion.div
                  key={name + i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gold/30 shadow-sm hover:shadow-md hover:border-gold/60 transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/40 flex items-center justify-center text-xs font-extrabold text-navy shrink-0">
                    {getInitials(name)}
                  </span>
                  <span className="text-sm font-semibold text-navy group-hover:text-navy-light transition-colors">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Conveners ── */}
        {sanityConveners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-teal/50" />
              <span className="text-xs font-bold uppercase tracking-widest text-teal px-3 py-1 rounded-full bg-teal/10 border border-teal/30">
                Conveners
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-teal/50" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {sanityConveners.map((name, i) => (
                <motion.div
                  key={name + i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-teal/30 shadow-sm hover:shadow-md hover:border-teal/60 transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-teal/30 to-teal/10 border border-teal/40 flex items-center justify-center text-xs font-extrabold text-navy shrink-0">
                    {getInitials(name)}
                  </span>
                  <span className="text-sm font-semibold text-navy group-hover:text-navy-light transition-colors">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Member Cards divider ── */}
        {allMembers.length > 0 && (sanityPatrons.length > 0 || sanityConveners.length > 0) && (
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="h-px flex-1 bg-navy/10" />
            <span className="text-xs font-bold uppercase tracking-widest text-navy/40 px-3">
              Committee Members
            </span>
            <div className="h-px flex-1 bg-navy/10" />
          </div>
        )}

        {/* Domain Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          {availableDomains.map((domain) => {
            const isActive = selectedDomain === domain;
            return (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 shadow-xs ${
                  isActive
                    ? "bg-navy text-white border-navy shadow-md shadow-navy/20 scale-105"
                    : "bg-bg-light text-navy/70 border-navy/15 hover:border-navy/40 hover:text-navy hover:bg-white"
                }`}
              >
                {domain}
              </button>
            );
          })}
        </motion.div>

        {/* Committee Member Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDomain}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredMembers.map((member, i) => {
              const photoUrl = urlFor(member.image);
              const initials = member.initials || getInitials(member.name);
              const hasLinkedin = Boolean(member.linkedinUrl && member.linkedinUrl !== "#");

              return (
                <motion.div
                  key={member.name + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 40px rgba(14,42,71,0.12), 0 0 20px rgba(232,163,61,0.1)",
                  }}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-navy/10 hover:border-gold/40 shadow-sm transition-all duration-300 relative overflow-hidden"
                >
                  {/* Top Gradient accent line on card */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-navy via-gold to-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Profile Photo / Avatar */}
                  <div className="relative mb-4 mt-2">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-navy via-navy-light to-teal flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wider">
                          {initials}
                        </span>
                      )}
                    </div>

                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-gold/0 group-hover:border-gold/50 scale-110 transition-all duration-300 pointer-events-none" />
                  </div>

                  {/* Member Name */}
                  <h3 className="text-base sm:text-lg font-bold text-navy mb-1 group-hover:text-navy-light transition-colors">
                    {member.name}
                  </h3>

                  {/* Domain Tag Badge */}
                  {member.domain && (
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full border mb-2 ${getDomainBadgeStyle(
                        member.domain
                      )}`}
                    >
                      {member.domain}
                    </span>
                  )}

                  {/* Role / Affiliation if provided */}
                  {(member.role || member.affiliation) && (
                    <p className="text-xs text-navy/60 mb-3 leading-snug">
                      {member.role || member.affiliation}
                    </p>
                  )}

                  {/* Spacer to align bottom links */}
                  <div className="mt-auto pt-2" />

                  {/* LinkedIn Profile Button / Link */}
                  {member.linkedinUrl ? (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-navy/80 bg-bg-light hover:bg-[#0A66C2] hover:text-white border border-navy/10 hover:border-transparent transition-all duration-300 group/link"
                      title={`View ${member.name}'s LinkedIn Profile`}
                    >
                      <LinkedInIcon />
                      <span>LinkedIn Profile</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy/30 bg-bg-light/50 rounded-lg">
                      <LinkedInIcon />
                      <span>LinkedIn</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

