"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SiteSettingsData } from "@/lib/sanity";

interface SiteShellProps {
  children: React.ReactNode;
  siteSettings: SiteSettingsData | null;
}

export default function SiteShell({ children, siteSettings }: SiteShellProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar data={siteSettings} />
      {children}
      <Footer data={siteSettings} />
    </>
  );
}
