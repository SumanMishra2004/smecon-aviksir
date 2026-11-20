import React from "react";
import { Cpu, FlaskConical, HeartPulse, Sun, Brain, Leaf } from "lucide-react";
import { TracksData, TrackItem } from "@/lib/sanity";

const TRACK_META: Record<string, { icon: React.ReactNode; desc: string }> = {
  "01": { icon: <Cpu size={20} />, desc: "Smart systems, IoT, and industrial automation" },
  "02": { icon: <Sun size={20} />, desc: "Renewable energy and sustainable technologies" },
  "03": { icon: <Brain size={20} />, desc: "AI, machine learning and data science" },
  "04": { icon: <HeartPulse size={20} />, desc: "Medical devices and healthcare engineering" },
  "05": { icon: <FlaskConical size={20} />, desc: "Advanced materials and nanotechnology" },
  "06": { icon: <Leaf size={20} />, desc: "Environmental protection and green chemistry" },
};

const DEFAULT_TRACKS: TrackItem[] = [
  { trackId: "01", title: "Smart Manufacturing & IoT", color: "teal" },
  { trackId: "02", title: "Sustainable Energy Systems", color: "gold" },
  { trackId: "03", title: "Computational Intelligence & ML", color: "teal" },
  { trackId: "04", title: "Biomedical Engineering", color: "purple" },
  { trackId: "05", title: "Materials Science", color: "gold" },
  { trackId: "06", title: "Environmental Science", color: "teal" },
];

export default function HomeTracks({ data }: { data?: TracksData | null }) {
  const tracks = data?.tracksList ?? DEFAULT_TRACKS;

  return (
    <section id="tracks" className="bg-[var(--color-surface-container)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-outline)] mb-2">
              Disciplines of Inquiry
            </p>
            <h2 className="font-serif text-[2.5rem] font-normal text-[var(--color-on-surface)]">
              Explore the Research Tracks
            </h2>
          </div>
          <div className="text-sm text-[var(--color-on-surface-variant)] max-w-xs text-right self-end">
            {data?.subheading ?? "Six interdisciplinary tracks publishing Scopus-indexed book chapters."}
          </div>
        </div>

        {/* Track grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            const meta = TRACK_META[track.trackId] ?? TRACK_META["01"];
            return (
              <div
                key={track.trackId}
                className="bg-white rounded-2xl p-6 border border-[var(--color-outline-variant)] shadow-[0_4px_16px_-2px_rgba(64,56,50,0.05)] hover:-translate-y-0.5 transition-transform"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#914630]">
                    TRACK {track.trackId.padStart(2, "0")}
                  </span>
                  <span className="text-[#914630]">{meta.icon}</span>
                </div>
                <h3 className="font-serif text-[1.375rem] font-semibold text-[var(--color-on-surface)] mb-2">
                  {track.title}
                </h3>
                <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">{meta.desc}</p>
                <a href="#contact" className="text-sm text-[#914630] font-medium hover:underline">
                  Track Scope &amp; Details →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
