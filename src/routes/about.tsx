import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, MessageSquare } from "lucide-react";
import heroBathroom from "@/assets/hero-bathroom.webp";
import showerTile from "@/assets/shower-tile.webp";
import kitchenBacksplash from "@/assets/kitchen-backsplash.webp";
import mainFloor from "@/assets/main-floor.webp";
import ownerPhoto from "@/assets/owner.png";
import CTASection from "@/components/CTASection";
import TrackedLink from "@/components/TrackedLink";
import { NJ_HIC_LICENSE, SMS_HREF } from "@/lib/contact";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — KN Flooring | Professional Tile Contractor NJ" },
      { name: "description", content: "KN Flooring provides professional tile and flooring installation across New Jersey with a focus on clean workmanship and reliable service." },
      { property: "og:title", content: "About KN Flooring" },
      { property: "og:description", content: "Quality tile and flooring installation with clean workmanship across New Jersey." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pb-16 lg:pb-0">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img src={mainFloor} alt="KN Flooring craftsmanship" className="h-full w-full object-cover opacity-15" width={1920} height={1080} />
        </div>
        <div className="relative px-6 pt-40 pb-20 md:px-10 md:pt-48 md:pb-24 lg:px-16">
          <div className="container-wide">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-walnut" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-walnut">Our Story</p>
              </div>
              <h1 className="text-4xl font-bold md:text-5xl lg:text-[3.25rem] tracking-[-0.03em]">About KN Flooring</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-36">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6 lg:sticky lg:top-32">
              <p className="text-lg leading-[1.85] text-foreground/70">
                KN Flooring is an owner-operated tile and flooring installation company serving New Jersey. We focus on clean workmanship, detailed finishes, clear communication, and reliable service for homeowners, contractors, and remodeling projects.
              </p>
              <p className="text-lg leading-[1.85] text-foreground/70">
                When you call or text, you speak directly with the person involved in the work. We care about layout, prep, cuts, edges, grout lines, transitions, and the final finish.
              </p>
              <p className="text-lg leading-[1.85] text-foreground/70">
                We specialize in bathroom tile, shower walls and floors, kitchen backsplashes, main floor tile, vinyl/LVP, hardwood, baseboards, floor prep, and self-leveling.
              </p>
              <div className="pt-3 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-walnut/30 bg-walnut/[0.08] px-4 py-2 text-[0.78rem] font-semibold text-foreground/85">
                  <ShieldCheck size={14} strokeWidth={2.25} className="text-walnut" />
                  Licensed, Insured &amp; Bonded
                </span>
                <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-4 py-2 text-[0.78rem] font-semibold text-foreground/75">
                  NJ HIC License #{NJ_HIC_LICENSE}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[heroBathroom, showerTile, kitchenBacksplash, mainFloor].map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"}`}>
                  <img src={img} alt={`KN Flooring detail ${i + 1}`} className="h-full w-full object-cover" loading="lazy" width={640} height={640} />
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mt-28 border-t border-border/40 pt-20">
            <div className="grid gap-0 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
              {[
                { label: "Clean Workmanship", desc: "Every project completed with attention to detail and a professional finish." },
                { label: "Reliable Service", desc: "Clear communication, honest timelines, and consistent results." },
                { label: "Quality Materials", desc: "Working with the best tile, hardwood, and vinyl for lasting installations." },
              ].map((v) => (
                <div key={v.label} className="py-8 sm:py-0 sm:px-10 first:pl-0 last:pr-0">
                  <h3 className="text-sm font-bold tracking-tight">{v.label}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.7]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet the Owner ── */}
      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32 bg-cream">
        <div className="container-wide">
          <div className="grid gap-10 md:gap-16 lg:grid-cols-[auto_1fr] lg:items-center max-w-5xl mx-auto">
            <div className="relative mx-auto lg:mx-0 h-44 w-44 md:h-56 md:w-56 overflow-hidden rounded-full border-2 border-border shadow-sm bg-background">
              <img src={ownerPhoto} alt="Kalixto - KN Flooring Owner" className="h-full w-full object-cover" loading="lazy" width={512} height={512} />
            </div>
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="h-px w-8 bg-walnut" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-walnut">Meet the Owner</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Hi, I'm Kalixto.
              </h2>
              <p className="mt-5 text-base md:text-lg leading-[1.85] text-foreground/70 max-w-xl mx-auto lg:mx-0">
                I've been installing tile and flooring across New Jersey for over{" "}
                <span className="font-semibold">12</span>{" "}
                years. Every project I take on gets my personal attention from start to finish — from layout and prep to the final grout line.
              </p>
              <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3">
                <TrackedLink
                  event="text_click"
                  href={SMS_HREF}
                  className="inline-flex items-center gap-2 rounded-md bg-walnut px-6 py-3.5 text-sm font-semibold text-walnut-foreground shadow-lg shadow-walnut/25 transition-all hover:brightness-110 hover:-translate-y-0.5"
                >
                  <MessageSquare size={15} strokeWidth={2.25} />
                  Text me directly
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── For Contractors & Remodelers ── */}
      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32 bg-background border-t border-border/40">
        <div className="container-wide max-w-5xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-walnut" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-walnut">Trade Partners</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                For Contractors &amp; Remodelers
              </h2>
              <p className="mt-5 text-base md:text-lg leading-[1.85] text-foreground/70">
                KN Flooring works with homeowners, general contractors, remodelers, designers, and property managers across New Jersey.
              </p>
            </div>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground/55 mb-5">
                We can help with:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  "Bathroom tile",
                  "Shower tile",
                  "Kitchen backsplash",
                  "Main floor tile",
                  "Vinyl / LVP",
                  "Hardwood",
                  "Floor prep",
                  "Punch list tile work",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.95rem] text-foreground/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-walnut shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <TrackedLink
                  event="text_click"
                  href={SMS_HREF}
                  className="inline-flex items-center gap-2 rounded-md bg-walnut px-6 py-3.5 text-sm font-semibold text-walnut-foreground shadow-lg shadow-walnut/25 transition-all hover:brightness-110 hover:-translate-y-0.5"
                >
                  <MessageSquare size={15} strokeWidth={2.25} />
                  Text for trade pricing
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
