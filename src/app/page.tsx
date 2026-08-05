import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tracks from "@/components/Tracks";
import Fees from "@/components/Fees";
import Speakers from "@/components/Speakers";
import Committee from "@/components/Committee";
import ImportantDates from "@/components/ImportantDates";
import Gallery from "@/components/Gallery";
import CallForPapers from "@/components/CallForPapers";
import Venue from "@/components/Venue";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

import {
  getSiteSettings,
  getHeroData,
  getTracksData,
  getFeesData,
  getSpeakersData,
  getCommitteeData,
  getImportantDatesData,
  getGalleryData,
  getCallForPapersData,
  getPartnersData,
  getAvailableYears,
} from "@/lib/sanity";

export const revalidate = 60; // Revalidate content every 60 seconds

export default async function Home() {
  const siteSettings = await getSiteSettings();
  const activeYear = siteSettings?.currentYear || siteSettings?.brandYear || "2026";

  const [
    heroData,
    tracksData,
    feesData,
    speakersData,
    committeeData,
    importantDatesData,
    galleryData,
    callForPapersData,
    partnersData,
    availableYears,
  ] = await Promise.all([
    getHeroData(activeYear),
    getTracksData(activeYear),
    getFeesData(activeYear),
    getSpeakersData(activeYear),
    getCommitteeData(activeYear),
    getImportantDatesData(activeYear),
    getGalleryData(activeYear),
    getCallForPapersData(activeYear),
    getPartnersData(activeYear),
    getAvailableYears(),
  ]);

  return (
    <>
      <Navbar data={siteSettings} activeYear={activeYear} availableYears={availableYears} />
      <main>
        <Hero data={heroData} />
        <Tracks data={tracksData} />
        <Fees data={feesData} />
        <Speakers data={speakersData} />
        {committeeData?.isVisible !== false && <Committee data={committeeData} />}
        <ImportantDates data={importantDatesData} />
        <Gallery data={galleryData} />
        <CallForPapers data={callForPapersData} />
        <Venue />
        <Partners data={partnersData} />
      </main>
      <Footer data={siteSettings} />
    </>
  );
}
