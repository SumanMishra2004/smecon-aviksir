import { Metadata } from "next";
import { getGalleryData } from "@/lib/sanity";
import GalleryPage from "@/components/GalleryPage";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGalleryData("2026");
  return {
    title: "Gallery | SPECON",
    description:
      data?.subheading ||
      "Glimpses of academic exchanges and past highlights",
  };
}

export default async function Page() {
  const data = await getGalleryData("2026");
  return <GalleryPage data={data} />;
}
