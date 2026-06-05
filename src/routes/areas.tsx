import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ShieldCheck, MessageSquare } from "lucide-react";
import CTASection from "@/components/CTASection";
import { SMS_HREF, NJ_HIC_LICENSE } from "@/lib/contact";

export const Route = createFileRoute("/areas")({
  head: () => ({
    meta: [
      { title: "Areas We Serve — KN Flooring | Tile & Flooring Across New Jersey" },
      { name: "description", content: "KN Flooring serves Monmouth, Middlesex, Hudson, Ocean, Union, and Mercer counties — Jersey City, Hoboken, Long Branch, Edison, Toms River, Red Bank, and surrounding NJ towns." },
      { property: "og:title", content: "Areas We Serve — KN Flooring" },
      { property: "og:description", content: "Professional tile and flooring installation throughout New Jersey." },
    ],
  }),
  component: AreasPage,
});

const countyGroups = [
  {
    county: "Monmouth County",
    blurb: "Coastal homes, condos, and shore-area renovations.",
    cities: ["Long Branch", "Red Bank", "Middletown", "Freehold", "Ocean Township", "Asbury Park", "Neptune", "Eatontown"],
  },
  {
    county: "Hudson County",
    blurb: "Brownstones, high-rises, and city condos with tight schedules.",
    cities: ["Jersey City", "Hoboken", "Weehawken", "Union City", "Bayonne"],
  },
  {
    county: "Middlesex County",
    blurb: "Family homes and full-floor remodels across central NJ.",
    cities: ["Edison", "South Brunswick", "Woodbridge", "New Brunswick", "Perth Amboy"],
  },
  {
    county: "Ocean County",
    blurb: "Year-round homes and shore properties along the coast.",
    cities: ["Toms River", "Brick", "Lakewood", "Point Pleasant"],
  },
  {
    county: "Union County",
    blurb: "Bathroom, kitchen, and main-floor work for established neighborhoods.",
    cities: ["Elizabeth", "Union", "Linden", "Rahway", "Westfield", "Scotch Plains"],
  },
  {
    county: "Mercer County",
    blurb: "Tile and flooring work for homes throughout the Princeton-Trenton corridor.",
    cities: ["Princeton", "Hamilton", "Trenton", "Lawrence Township"],
  },
];

function AreasPage() {
  return (
    <div className="pb-16 lg:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="relative px-6 pt-40 pb-20 md:px-10 md:pt-48 md:pb-24 lg:px-16">
          <div className="container-wide">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-walnut" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-walnut">Service Areas</p>
              </div>
              <h1 className="text-4xl font-bold md:text-5xl lg:text-[3.25rem] tracking-[-0.03em]">Tile &amp; Flooring Across New Jersey</h1>
              <p className="mt-5 text-base text-primary-foreground/55 leading-relaxed max-w-xl">
                KN Flooring serves homeowners and renovation projects throughout New Jersey — grouped below by county.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-walnut/40 bg-walnut/[0.12] px-4 py-2 text-[0.75rem] font-semibold backdrop-blur-md">
                  <ShieldCheck size={14} strokeWidth={2.25} className="text-walnut" />
                  Licensed, Insured &amp; Bonded
                </span>
                <span className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/[0.06] px-4 py-2 text-[0.75rem] font-semibold opacity-90">
                  NJ HIC #{NJ_HIC_LICENSE}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counties */}
      <section className="px-6 py-20 md:px-10 md:py-32 lg:px-16 bg-background">
        <div className="container-wide">
          <div className="grid gap-6 md:gap-7 lg:grid-cols-2">
            {countyGroups.map((group) => (
              <article
                key={group.county}
                className="rounded-2xl border border-border/60 bg-card p-7 md:p-9 transition-all hover:border-walnut/30 hover:shadow-[0_10px_40px_-15px_rgba(122,92,69,0.25)]"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin size={15} strokeWidth={2} className="text-walnut" />
                  <h2 className="text-[1.15rem] md:text-[1.25rem] font-bold tracking-tight">{group.county}</h2>
                </div>
                <p className="mt-3 text-[0.88rem] text-muted-foreground/75 leading-relaxed">{group.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.cities.map((city) => (
                    <span
                      key={city}
                      className="rounded-full bg-warm-bg border border-walnut/15 px-3.5 py-1.5 text-[0.78rem] font-medium text-foreground/80"
                    >
                      {city}
                    </span>
                  ))}
                </div>
                <a
                  href={SMS_HREF}
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-walnut hover:text-walnut/70 transition-colors group"
                >
                  <MessageSquare size={13} strokeWidth={2.25} />
                  Serving {group.cities[0]} — text your project
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Don't see your town */}
      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16 bg-cream border-y border-foreground/[0.06]">
        <div className="container-wide">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold md:text-3xl tracking-[-0.02em]">
              Don't see your town?
            </h2>
            <p className="mx-auto mt-4 text-[0.95rem] text-muted-foreground leading-relaxed max-w-md">
              Text us your project photos — we serve most areas across New Jersey.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={SMS_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-walnut px-8 py-4 text-[0.82rem] font-semibold text-walnut-foreground transition-all hover:brightness-110 hover:-translate-y-0.5 shadow-lg shadow-walnut/20"
              >
                <MessageSquare size={14} strokeWidth={2.25} />
                Text Photos Now
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border border-foreground/15 bg-background px-8 py-4 text-[0.82rem] font-medium text-foreground/80 transition-colors hover:border-walnut/40 hover:text-walnut"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
