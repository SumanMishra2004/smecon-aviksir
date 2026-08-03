import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tracks from "@/components/Tracks";
import Fees from "@/components/Fees";
import Speakers from "@/components/Speakers";
import Committee from "@/components/Committee";
import ImportantDates from "@/components/ImportantDates";
import Gallery from "@/components/Gallery";
import CallForPapers from "@/components/CallForPapers";
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
  getAvailableYears,
} from "@/lib/sanity";

export const revalidate = 60; // Revalidate content every 60 seconds

type Props = {
  params: Promise<{ year: string }>;
};

export default async function YearPage({ params }: Props) {
  const { year } = await params;
  const availableYears = await getAvailableYears();

  // If only 1 year exists in Sanity (e.g. 2026), redirect to clean root '/' URL
  if (availableYears.length <= 1) {
    redirect("/");
  }

  const siteSettings = await getSiteSettings();
  const defaultYear = siteSettings?.currentYear || siteSettings?.brandYear || "2026";

  // If someone manually types an invalid year in the URL that does not exist in Sanity
  if (!availableYears.includes(year) && year !== defaultYear) {
    redirect("/");
  }

  const [
    heroData,
    tracksData,
    feesData,
    speakersData,
    committeeData,
    importantDatesData,
    galleryData,
    callForPapersData,
  ] = await Promise.all([
    getHeroData(year),
    getTracksData(year),
    getFeesData(year),
    getSpeakersData(year),
    getCommitteeData(year),
    getImportantDatesData(year),
    getGalleryData(year),
    getCallForPapersData(year),
  ]);

  return (
    <>
      <Navbar data={siteSettings} activeYear={year} availableYears={availableYears} />
      <main>
        <Hero data={heroData} />
        <Tracks data={tracksData} />
        <Fees data={feesData} />
        <Speakers data={speakersData} />
        {committeeData?.isVisible !== false && <Committee data={committeeData} />}
        <ImportantDates data={importantDatesData} />
        <Gallery data={galleryData} />
        <CallForPapers data={callForPapersData} />
      </main>
      <Footer data={siteSettings} />
    </>
  );
}
