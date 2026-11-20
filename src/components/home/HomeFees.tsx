import { FeesData, FeeItem } from "@/lib/sanity";

const DEFAULT_FEES: FeeItem[] = [
  { amount: "₹500", label: "UG/PG Students", icon: "🎓" },
  { amount: "₹1000", label: "Research Scholars", icon: "🔬" },
  { amount: "₹1500", label: "Academicians", icon: "📚" },
  { amount: "$30", label: "International", icon: "🌍" },
  { amount: "Free", label: "Attendee Only", icon: "👥" },
];

export default function HomeFees({ data }: { data?: FeesData | null }) {
  const fees = data?.feesList ?? DEFAULT_FEES;

  return (
    <section id="fees" className="bg-[var(--color-surface-low)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[var(--color-outline)] mb-2">
            Registration
          </p>
          <h2 className="font-serif text-[2.5rem] font-normal text-[var(--color-on-surface)]">
            {data?.heading ?? "Conference Registration Fees"}
          </h2>
          <p className="text-sm text-[var(--color-on-surface-variant)] mt-3 max-w-md mx-auto">
            {data?.subheading ?? "All presenting authors receive a Scopus-indexed publication"}
          </p>
        </div>

        {/* Fee cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {fees.map((fee, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center border border-[var(--color-outline-variant)] shadow-[0_4px_16px_-2px_rgba(64,56,50,0.05)]"
            >
              <div className="text-3xl mb-3">{fee.icon}</div>
              <p className="font-serif text-[2rem] font-normal text-[#914630]">{fee.amount}</p>
              <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">{fee.label}</p>
              {i < 3 && (
                <p className="text-xs text-[var(--color-outline)] mt-2">Includes publication</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
