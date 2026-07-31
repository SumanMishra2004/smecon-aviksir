"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SiteSettingsData, urlFor } from "@/lib/sanity";

const DEFAULT_NAV_LINKS = [
  { label: "Tracks", href: "#tracks" },
  { label: "Fees", href: "#fees" },
  { label: "Speakers", href: "#speakers" },
  { label: "Committee", href: "#committee" },
  { label: "Dates", href: "#dates" },
  { label: "Submit", href: "#submit" },
];

interface NavbarProps {
  data?: SiteSettingsData | null;
  activeYear?: string;
  availableYears?: string[];
}

export default function Navbar({ data, activeYear, availableYears }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = data?.navLinks && data.navLinks.length > 0 ? data.navLinks : DEFAULT_NAV_LINKS;
  const brandName = data?.brandName || "SMECON";
  const currentDisplayYear = activeYear || data?.brandYear || "2026";
  const yearsList = availableYears && availableYears.length > 0 ? availableYears : ["2026"];
  const hasMultipleYears = yearsList.length > 1;

  const ikcLogoSrc = data?.ikcLogo ? urlFor(data.ikcLogo) || "/ikc.png" : "/ikc.png";
  const smcLogoSrc = data?.smcLogo ? urlFor(data.smcLogo) || "/smclogo.png" : "/smclogo.png";
  const smeconLogoSrc = data?.smeconLogo ? urlFor(data.smeconLogo) || "/smeconlogo.png" : "/smeconlogo.png";

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    router.push(`/${selectedYear}`);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logos & Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-white p-1 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0">
            <Image src={ikcLogoSrc} alt="IKC" width={40} height={40} className="rounded-full" priority={true} unoptimized={typeof ikcLogoSrc === 'string' && ikcLogoSrc.startsWith('http')} />
          </div>
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0 ">
            <Image src={smcLogoSrc} alt="SMC" width={40} height={40} className="size-full" priority={true} unoptimized={typeof smcLogoSrc === 'string' && smcLogoSrc.startsWith('http')} />
          </div>
          <div className="bg-white flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0">
            <Image src={smeconLogoSrc} alt="SMECON" width={140} height={140} className="rounded-full size-full" priority={true} unoptimized={typeof smeconLogoSrc === 'string' && smeconLogoSrc.startsWith('http')} />
          </div>

          <div className="hidden sm:flex items-center gap-2 text-white font-bold text-lg tracking-wider uppercase ml-2">
            <a href="#hero" className="text-gold hover:opacity-90 transition-opacity">
              {brandName}
            </a>

            {hasMultipleYears ? (
              /* Edition Year Switcher Dropdown (Shown only when 2+ years exist) */
              <div className="relative inline-block ml-1">
                <select
                  value={currentDisplayYear}
                  onChange={handleYearChange}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-2.5 py-1 rounded-md border border-white/20 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold appearance-none pr-6 transition-colors"
                  aria-label="Select conference edition year"
                >
                  {yearsList.map((y) => (
                    <option key={y} value={y} className="bg-navy text-white">
                      {y}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-white/70">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : (
              /* Static side-by-side year text when only 1 year exists */
              <span className="text-white/80 text-sm font-medium">{currentDisplayYear}</span>
            )}
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-white/80 uppercase tracking-wide hover:text-gold transition-colors duration-300 rounded-md hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-white rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className="block h-0.5 w-6 bg-white rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-white rounded-full"
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-navy/95 backdrop-blur-md overflow-hidden border-t border-white/10"
          >
            {hasMultipleYears && (
              <div className="px-4 pt-3 pb-1 flex items-center justify-between border-b border-white/10 text-xs text-white/70">
                <span className="font-semibold uppercase tracking-wider">Select Edition:</span>
                <select
                  value={currentDisplayYear}
                  onChange={handleYearChange}
                  className="bg-white/10 text-white font-medium text-xs px-2 py-1 rounded border border-white/20"
                >
                  {yearsList.map((y) => (
                    <option key={y} value={y} className="bg-navy text-white">
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <ul className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-white/80 uppercase tracking-wide hover:text-gold hover:bg-white/5 rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
