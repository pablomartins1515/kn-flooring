import { createFileRoute, Link } from "@tanstack/react-router";
import mainFloorHero from "@/assets/mainfloor-project-9.webp";
import tileInstallImg from "@/assets/mainfloor-project-7.webp";
import bathroomTileImg from "@/assets/wildwood-bathroom-2.webp";
import showerTileImg from "@/assets/herringbone-shower-5.webp";
import backsplashImg from "@/assets/annandale-backsplash-6.webp";
import mainFloorImg from "@/assets/mainfloor-project-6.webp";
import hardwoodImg from "@/assets/eduardo-hardwood-1.webp";
import vinylImg from "@/assets/vinyl-project-1.webp";
import baseboardImg from "@/assets/wildwood-bathroom-8.webp";
import CTASection from "@/components/CTASection";

const allServices = [
  { slug: "tile-installation", title: "Tile Installation", desc: "Professional tile installation for bathrooms, kitchens, entryways, laundry rooms, mudrooms, and main living areas. We handle all tile types with precision and care.", applications: "Bathrooms • Kitchens • Entryways • Mudrooms • Main Floors", img: tileInstallImg },
  { slug: "bathroom", title: "Bathroom Tile", desc: "Detailed bathroom tile work including floors, shower walls, shower floors, tub surrounds, and layout-focused finishes. Every detail is planned for a clean, lasting result.", applications: "Bathroom Floors • Shower Walls • Tub Surrounds", img: bathroomTileImg },
  { slug: "shower", title: "Shower Walls & Floors", desc: "Shower tile installation with attention to slope, cuts, drain detail, and final appearance. Designed for both function and visual impact.", applications: "Walk-in Showers • Custom Showers • Upgrades", img: showerTileImg },
  { slug: "backsplash", title: "Kitchen Backsplash", desc: "Backsplash installation with precise cuts, alignment, and a clean finished look. We work with subway tile, natural stone, porcelain, and more.", applications: "Countertop Backsplash • Range Hoods • Bar Areas", img: backsplashImg },
  { slug: "main-floor", title: "Main Floor Tile", desc: "Durable tile installation for high-traffic spaces with a professional finish. Large format, small format, and pattern layouts.", applications: "Living Rooms • Hallways • Dining • Open-Plan", img: mainFloorImg },
  { slug: "hardwood", title: "Hardwood Flooring", desc: "Hardwood flooring installed with clean transitions and a high-quality final look. Engineered and solid wood options available.", applications: "Bedrooms • Living Rooms • Hallways", img: hardwoodImg },
  { slug: "vinyl", title: "Vinyl / LVP", desc: "Modern, durable flooring solutions for residential spaces. Waterproof and scratch-resistant options for every room.", applications: "Kitchens • Bathrooms • Basements", img: vinylImg },
  { slug: "baseboard", title: "Baseboard Installation", desc: "Baseboard finishing to complete remodeling and flooring projects. Clean lines and professional fitting.", applications: "All Rooms • Remodels • New Installs", img: baseboardImg },
];


export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — KN Flooring | Tile & Flooring Installation NJ" },
      { name: "description", content: "Professional tile installation, bathroom tile, kitchen backsplash, shower tile, hardwood, vinyl, and baseboard installation in New Jersey." },
      { property: "og:title", content: "Our Services — KN Flooring" },
      { property: "og:description", content: "High-quality tile and flooring installation for residential projects across New Jersey." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": allServices.map((s) => ({
            "@type": "Service",
            name: s.title,
            description: s.desc,
            areaServed: { "@type": "State", name: "New Jersey" },
            provider: { "@type": "LocalBusiness", name: "KN Flooring", "@id": "https://premium-flooring-hub.lovable.app/#business" },
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});



function ServicesPage() {
  return (
    <div className="pb-16 lg:pb-0">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img src={mainFloorHero} alt="Flooring installation" className="h-full w-full object-cover opacity-15" width={1920} height={1080} />
        </div>
        <div className="relative px-6 pt-40 pb-20 md:px-10 md:pt-48 md:pb-24 lg:px-16">
          <div className="container-wide">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-walnut" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-walnut">What We Do</p>
              </div>
              <h1 className="text-4xl font-bold md:text-5xl lg:text-[3.25rem] tracking-[-0.03em]">Our Services</h1>
              <p className="mt-5 text-base text-primary-foreground/45 leading-relaxed max-w-md">
                High-quality tile and flooring installation for residential renovation projects across New Jersey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-36">
        <div className="container-wide space-y-0">
          {allServices.map((s, i) => (
            <div key={s.title} id={s.slug} className={`grid gap-0 lg:grid-cols-2 scroll-mt-24 ${i > 0 ? "border-t border-border/40" : ""}`}>
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover" loading="lazy" width={640} height={480} />
                </div>
              </div>
              <div className={`flex items-center px-0 py-12 lg:py-0 ${i % 2 === 1 ? "lg:order-1 lg:pr-20" : "lg:pl-20"}`}>
                <div>
                  <h2 className="text-2xl font-bold md:text-[1.75rem] tracking-[-0.02em]">{s.title}</h2>
                  <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">{s.desc}</p>
                  <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/30">
                    {s.applications}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-8 inline-flex rounded-lg bg-walnut px-7 py-3 text-sm font-semibold text-walnut-foreground transition-all hover:shadow-[0_8px_30px_-8px] hover:shadow-walnut/40"
                  >
                    Get Estimate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
