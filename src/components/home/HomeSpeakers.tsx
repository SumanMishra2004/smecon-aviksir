import { Award } from "lucide-react";
import { SpeakersData, SpeakerItem, urlFor } from "@/lib/sanity";

const PLACEHOLDER_SPEAKERS: SpeakerItem[] = [
  { name: "Speaker A", role: "Keynote Speaker", affiliation: "International University", initials: "SA" },
  { name: "Speaker B", role: "Invited Speaker", affiliation: "Research Institute", initials: "SB" },
  { name: "Speaker C", role: "Plenary Speaker", affiliation: "Technology College", initials: "SC" },
  { name: "Speaker D", role: "Keynote Speaker", affiliation: "National Lab", initials: "SD" },
  { name: "Speaker E", role: "Invited Speaker", affiliation: "Engineering School", initials: "SE" },
  { name: "Speaker F", role: "Panel Speaker", affiliation: "Science Academy", initials: "SF" },
];

export default function HomeSpeakers({ data }: { data?: SpeakersData | null }) {
  const speakers = data?.speakersList?.length ? data.speakersList.slice(0, 6) : PLACEHOLDER_SPEAKERS;

  return (
    <section id="speakers" className="bg-[var(--color-surface-low)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-2">
          <p className="text-xs uppercase tracking-widest text-[var(--color-outline)] mb-2">
            Plenary Faculty
          </p>
          <h2 className="font-serif text-[2.5rem] font-normal text-[var(--color-on-surface)]">
            Distinguished Speakers
          </h2>
          <p className="text-sm text-[var(--color-on-surface-variant)] mt-3">
            Leading academics and researchers from institutions worldwide
          </p>
        </div>

        {/* Speaker grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {speakers.map((speaker, i) => {
            const photoUrl = speaker.photo ? urlFor(speaker.photo) : null;
            const initials =
              speaker.initials ?? speaker.name.slice(0, 2).toUpperCase();
            const affiliationWord = speaker.affiliation?.split(" ")[0] ?? "";

            return (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-[var(--color-outline-variant)] shadow-[0_4px_16px_-2px_rgba(64,56,50,0.05)]"
              >
                {/* Photo block */}
                <div className="relative aspect-square">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-surface-high)] to-[var(--color-surface-variant)] text-[#914630] text-3xl font-serif font-semibold">
                      {initials}
                    </div>
                  )}
                  {affiliationWord && (
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-semibold text-[#211a15] px-2 py-0.5 rounded">
                      {affiliationWord}
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="font-serif text-base font-semibold text-[var(--color-on-surface)]">
                    {speaker.name}
                  </p>
                  <p className="text-sm text-[#914630] font-medium">{speaker.role}</p>
                  <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                    {speaker.affiliation}
                  </p>
                  <div className="mt-3 pt-3 border-t border-[var(--color-outline-variant)] flex items-center gap-1.5 text-xs text-[var(--color-outline)]">
                    <Award size={14} />
                    {speaker.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
