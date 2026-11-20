import Link from "next/link";
import { GalleryData, urlFor } from "@/lib/sanity";

const DEFAULT_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    caption: "International Keynote Sessions",
  },
  {
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800",
    caption: "Interactive Seminars",
  },
  {
    url: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800",
    caption: "Research Exchange",
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800",
    caption: "Academic Collaboration",
  },
  {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
    caption: "Engineering Brainstorming",
  },
  {
    url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800",
    caption: "Panel Discussions",
  },
];

export default function HomeGallery({ data }: { data?: GalleryData | null }) {
  if (data?.isVisible === false) {
    return (
      <section id="gallery" className="bg-[var(--color-surface-container)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[var(--color-on-surface-variant)]">
          Gallery coming soon.
        </div>
      </section>
    );
  }

  const imagesList = (data?.imagesList ?? []).length > 0
    ? data!.imagesList!.slice(0, 6).map((item, i) => ({
        url: (item.image ? urlFor(item.image) : null) ?? item.url ?? DEFAULT_IMAGES[i % 6].url,
        caption: item.caption ?? DEFAULT_IMAGES[i % 6].caption,
      }))
    : DEFAULT_IMAGES;

  return (
    <section id="gallery" className="bg-[var(--color-surface-container)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-outline)] mb-2">
              Moments at SMECon
            </p>
            <h2 className="font-serif text-[2.5rem] font-normal text-[var(--color-on-surface)]">
              {data?.heading ?? "Conference Highlights"}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm text-[#914630] font-medium hover:underline"
          >
            View Full Gallery →
          </Link>
        </div>

        {/* Masonry grid */}
        <div
          style={{ columnCount: 2, columnGap: "1rem" }}
          className="md:[column-count:3]"
        >
          {imagesList.slice(0, 6).map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 rounded-xl overflow-hidden relative group"
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white text-xs font-medium p-3">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
