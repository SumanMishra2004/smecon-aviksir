import { Mail } from "lucide-react";
import { PartnersData, PartnerItem, urlFor } from "@/lib/sanity";

const DEFAULT_PARTNERS = [
  {
    groupLabel: "Academic Partners",
    partners: [
      { name: "IKC Trust Research Foundation", description: "Co-organizing institution" },
      { name: "Sovarani Memorial College", description: "Host institution, West Bengal" },
    ],
  },
  {
    groupLabel: "Publication Partners",
    partners: [
      { name: "Scopus-Indexed Publisher", description: "Peer-reviewed book chapters" },
    ],
  },
];

export default function HomePartners({ data }: { data?: PartnersData | null }) {
  const groups = data?.partnerGroups ?? DEFAULT_PARTNERS;

  return (
    <section id="contact" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[var(--color-outline)] mb-2">
            Collaboration
          </p>
          <h2 className="font-serif text-[2.5rem] font-normal text-[var(--color-on-surface)]">
            {data?.heading ?? "Organized With Academic Collaboration"}
          </h2>
          <p className="text-sm text-[var(--color-on-surface-variant)] mt-3 max-w-md mx-auto">
            {data?.subheading ??
              "Partnering with leading academic institutions and publishers"}
          </p>
        </div>

        {/* Partner groups */}
        {groups.map((group) => (
          <div key={group.groupLabel}>
            <p className="text-xs uppercase tracking-widest text-[var(--color-outline)] mt-10 mb-4">
              {group.groupLabel}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(group.partners ?? []).map((partner: PartnerItem) => {
                const logoUrl = partner.logo ? urlFor(partner.logo) : null;
                const initials = partner.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase();
                return (
                  <div
                    key={partner.name}
                    className="bg-[var(--color-surface-container)] rounded-xl p-4 border border-[var(--color-outline-variant)]"
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt={partner.name} className="h-10 object-contain" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-[var(--color-surface-high)] flex items-center justify-center text-xs font-bold text-[#914630]">
                        {initials}
                      </div>
                    )}
                    <p className="text-sm font-semibold text-[var(--color-on-surface)] mt-3">
                      {partner.name}
                    </p>
                    {partner.description && (
                      <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
                        {partner.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA block */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">
            Interested in partnering with SMECON?
          </p>
          <a
            href="mailto:ikctrustofficial@gmail.com"
            className="inline-flex items-center gap-2 bg-[#914630] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#7a3927] transition-colors"
          >
            <Mail size={16} />
            ikctrustofficial@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
