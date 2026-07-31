"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteSettingsData, urlFor } from "@/lib/sanity";

interface FooterProps {
  data?: SiteSettingsData | null;
}

export default function Footer({ data }: FooterProps) {
  const brandName = data?.brandName || "SMECON";
  const brandYear = data?.brandYear || "2026";
  const organizerText = data?.organizerFooterText || "Jointly organized by Dept. of Chemistry, Sovarani Memorial College (SMC) Howrah, India & IKC Trust, in collaboration with IQAC, Sovarani Memorial College Howrah, WB, India";
  const copyrightText = data?.copyrightText || "© 2026 SMECON — IKC Trust & Sovarani Memorial College Howrah";

  const ikcLogoSrc = data?.ikcLogo ? urlFor(data.ikcLogo) || "/ikc.png" : "/ikc.png";
  const smcLogoSrc = data?.smcLogo ? urlFor(data.smcLogo) || "/smclogo.png" : "/smclogo.png";
  const smeconLogoSrc = data?.smeconLogo ? urlFor(data.smeconLogo) || "/smeconlogo.png" : "/smeconlogo.png";

  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-6"
        >
          {/* Logo placeholders */}
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border border-white/15 flex items-center justify-center overflow-hidden">
              <Image src={ikcLogoSrc} alt="IKC Logo" width={50} height={50} unoptimized={typeof ikcLogoSrc === 'string' && ikcLogoSrc.startsWith('http')} />
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border border-white/15 flex items-center justify-center overflow-hidden">
              <Image src={smcLogoSrc} alt="SMC Logo" width={50} height={50} unoptimized={typeof smcLogoSrc === 'string' && smcLogoSrc.startsWith('http')} />
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border border-white/15 flex items-center justify-center overflow-hidden">
              <Image src={smeconLogoSrc} alt="SMECON Logo" width={150} height={150} unoptimized={typeof smeconLogoSrc === 'string' && smeconLogoSrc.startsWith('http')} />
            </div>
          </div>

          {/* Brand */}
          <div>
            <p className="text-lg sm:text-xl font-bold text-white tracking-wider uppercase">
              {brandName} <span className="text-gold">{brandYear}</span>
            </p>
            <p className="mt-2 text-xs sm:text-sm text-white/40 max-w-xl leading-relaxed">
              {organizerText}
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-white/15" />

          {/* Copyright */}
          <p className="text-xs text-white/30">
            {copyrightText}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
