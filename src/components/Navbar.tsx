"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Menu, X } from "lucide-react";
import { SiteSettingsData } from "@/lib/sanity";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Speakers", href: "#speakers" },
  { label: "Programme", href: "/schedule" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ data }: { data?: SiteSettingsData | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-[76px] bg-[#FBF7EF] border-b border-[#E6D9C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* LEFT: Logo + name */}
        <Link href="/" className="flex items-center">
          <span className="rounded bg-[#914630] text-white p-2 flex items-center justify-center">
            <Building2 size={22} />
          </span>
          <span className="font-serif font-semibold text-[#211a15] text-lg ml-2 tracking-tight">SMECON</span>
          <span className="font-serif italic text-[#914630] text-lg">&nbsp;2026</span>
          <span className="hidden lg:inline text-xs text-[#54433e] ml-3 pl-3 border-l border-[#E6D9C9]">
            Smart Manufacturing · Sustainable Energy · Computational Intelligence
          </span>
        </Link>

        {/* CENTER: Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-[#914630] border-b-2 border-[#914630] pb-0.5 text-sm font-medium"
                  : "text-[#54433e] hover:text-[#914630] transition-colors text-sm font-medium"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT: CTA + avatar + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden md:inline-flex bg-[#914630] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#7a3927] transition-colors"
          >
            Explore SMECon
          </a>
          <div className="hidden sm:flex h-9 w-9 rounded-full bg-[#914630] text-white items-center justify-center text-xs font-bold ml-2">
            SM
          </div>
          <button
            className="md:hidden p-2 text-[#54433e]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-x-0 top-[76px] bg-[#FBF7EF] border-b border-[#E6D9C9] z-40 px-4 pb-4 shadow-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={
                "block py-3 text-sm font-medium " +
                (pathname === link.href
                  ? "text-[#914630] border-b-2 border-[#914630]"
                  : "text-[#54433e] hover:text-[#914630] transition-colors")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
