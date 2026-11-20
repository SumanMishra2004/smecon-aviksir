import {
  getSiteSettings,
  getHeroData,
  getTracksData,
  getSpeakersData,
  getCommitteeData,
  getImportantDatesData,
  getGalleryData,
  getCallForPapersData,
  getPartnersData,
  getFeesData,
} from "@/lib/sanity";
import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeTracks from "@/components/home/HomeTracks";
import HomeSpeakers from "@/components/home/HomeSpeakers";
import HomeSchedule from "@/components/home/HomeSchedule";
import HomeFees from "@/components/home/HomeFees";
import HomeGallery from "@/components/home/HomeGallery";
import HomeTeam from "@/components/home/HomeTeam";
import HomePartners from "@/components/home/HomePartners";
import HomeVenue from "@/components/home/HomeVenue";

export const revalidate = 60;

export default async function Home() {
  const [
    siteSettings,
    heroData,
    tracksData,
    speakersData,
    committeeData,
    datesData,
    galleryData,
    cfpData,
    partnersData,
    feesData,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroData("2026"),
    getTracksData("2026"),
    getSpeakersData("2026"),
    getCommitteeData("2026"),
    getImportantDatesData("2026"),
    getGalleryData("2026"),
    getCallForPapersData("2026"),
    getPartnersData("2026"),
    getFeesData("2026"),
  ]);

  return (
    <main>
      <HomeHero data={heroData} cfpData={cfpData} />
      <HomeAbout committeeData={committeeData} />
      <HomeTracks data={tracksData} />
      <HomeSpeakers data={speakersData} />
      <HomeSchedule data={datesData} />
      <HomeFees data={feesData} />
      <HomeGallery data={galleryData} />
      <HomeTeam data={committeeData} />
      <HomePartners data={partnersData} />
      <HomeVenue />
    </main>
  );
}
