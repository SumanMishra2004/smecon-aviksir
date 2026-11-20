import Link from "next/link";
import { MapPin, Mail, ExternalLink } from "lucide-react";
import { SiteSettingsData } from "@/lib/sanity";

const TRACK_LIST = [
  "Smart Manufacturing & IoT",
  "Sustainable Energy Systems",
  "Computational Intelligence & ML",
  "Biomedical Engineering",
  "Materials Science",
  "Environmental Science",
];

const COMMITTEE_LIST = [
  "Dr. Sourajit Maity",
  "Ms. Priti Kamal",
];

export default function Footer({ data }: { data?: SiteSettingsData | null }) {
  return (
    <footer className="bg-[#211a15] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div>
            <div>
              <span className="font-serif text-2xl font-semibold">SMECON</span>
              <span className="font-serif italic text-[#914630] text-2xl"> 2026</span>
            </div>
            <p className="text-sm text-[#87736d] mt-2">
              Smart Manufacturing, Sustainable Energy &amp; Computational Intelligence
            </p>
            <div className="flex items-start gap-2 mt-4 text-sm text-[#87736d]">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>Sovarani Memorial College, Howrah, West Bengal</span>
            </div>
          </div>

          {/* Col 2: Tracks */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#87736d] mb-4">
              Streams of Tracks
            </h4>
            <ul>
              {TRACK_LIST.map((track) => (
                <li key={track} className="text-sm text-[#c9b9b4] mb-2">
                  {track}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Committee */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#87736d] mb-4">
              Committee
            </h4>
            <ul>
              {COMMITTEE_LIST.map((name) => (
                <li key={name} className="text-sm text-[#c9b9b4] mb-2">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Organizing Institutions */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#87736d] mb-4">
              Organizing Institutions
            </h4>
            <div className="rounded-lg bg-[#2a221d] p-3 mb-3 flex items-start gap-2">
              <ExternalLink size={14} className="text-[#87736d] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">Sovarani Memorial College</p>
                <p className="text-xs text-[#87736d] mt-0.5">Host Institution, Howrah</p>
              </div>
            </div>
            <div className="rounded-lg bg-[#2a221d] p-3 mb-3 flex items-start gap-2">
              <ExternalLink size={14} className="text-[#87736d] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">IKC Trust Research Foundation</p>
                <p className="text-xs text-[#87736d] mt-0.5">Academic Partner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2a221d] mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#87736d]">
          <span>{data?.copyrightText ?? "© 2026 SMECON. All rights reserved."}</span>
          <a
            href="mailto:ikctrustofficial@gmail.com"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail size={14} />
            ikctrustofficial@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
