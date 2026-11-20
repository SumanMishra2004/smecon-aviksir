import { History, GraduationCap, Scale, CircleCheck } from "lucide-react";
import { CommitteeData } from "@/lib/sanity";

export default function HomeAbout({ committeeData }: { committeeData?: CommitteeData | null }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[var(--color-outline-variant)] p-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <History size={16} className="text-[#914630]" />
              <span className="text-xs uppercase tracking-widest text-[var(--color-outline)]">
                Symposium Monograph
              </span>
            </div>

            <h2 className="font-serif text-[2.5rem] font-normal text-[var(--color-on-surface)]">
              Advancing Research Across Disciplines
            </h2>

            <p className="text-[var(--color-on-surface-variant)] leading-relaxed mt-4">
              SMECON is an international academic conference organized by the Department of Chemistry,
              Sovarani Memorial College, Howrah, West Bengal, in collaboration with IKC Trust Research
              Foundation. The symposium brings together researchers, academicians, and industry experts
              across six interdisciplinary tracks.
            </p>

            <p className="text-[var(--color-on-surface-variant)] leading-relaxed mt-4">
              All accepted papers are published as peer-reviewed book chapters in Scopus-indexed
              proceedings, ensuring maximum visibility and academic impact for contributors from across
              the globe.
            </p>

            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-[#914630]" />
                <span className="text-sm text-[var(--color-on-surface-variant)]">
                  Dept. of Chemistry, Sovarani Memorial College
                </span>
              </div>
              <a
                href="#tracks"
                className="bg-[var(--color-surface-container)] text-[#914630] text-sm font-medium px-4 py-2 rounded-lg border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-variant)] transition-colors"
              >
                Discover SMECon →
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 bg-[var(--color-surface-variant)] rounded-2xl p-6">
            <div className="rounded-xl bg-[var(--color-tertiary-container)] text-white p-3 inline-flex mb-4">
              <Scale size={24} />
            </div>

            <p className="text-xs uppercase tracking-widest text-[var(--color-outline)] mb-2">
              Institutional Compliance
            </p>

            <h3 className="font-serif text-[1.375rem] font-semibold text-[var(--color-on-surface)] mb-3">
              Academic Governance &amp; IQAC Oversight
            </h3>

            <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-4">
              All academic programmes are benchmarked against UGC and NAAC quality parameters under
              IQAC oversight, ensuring rigorous standards from submission to publication.
            </p>

            {[
              "UGC & NAAC Guidelines",
              "Anti-Plagiarism Screening",
              "COPE Publication Ethics",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-[var(--color-on-surface)] mb-2">
                <CircleCheck size={16} className="text-green-600 mt-0.5 shrink-0" />
                {item}
              </div>
            ))}

            <div className="mt-4 bg-white/60 rounded-xl p-4 border border-[var(--color-outline-variant)]">
              <p className="text-xs uppercase tracking-wider text-[var(--color-outline)] mb-1">
                Academic Partner
              </p>
              <p className="text-sm font-semibold text-[var(--color-on-surface)]">
                IKC Trust Research Foundation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
