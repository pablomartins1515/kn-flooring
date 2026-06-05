import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageSquare, MapPin, Star, ShieldCheck } from "lucide-react";
import heroBathroom from "@/assets/hero-bathroom.webp";
import tileInstallImg from "@/assets/mainfloor-project-7.webp";
import bathroomTileImg from "@/assets/wildwood-bathroom-2.webp";
import showerTileImg from "@/assets/herringbone-shower-5.webp";
import backsplashImg from "@/assets/annandale-backsplash-6.webp";
import hardwoodImg from "@/assets/eduardo-hardwood-1.webp";
import vinylImg from "@/assets/vinyl-project-1.webp";
import baseboardImg from "@/assets/wildwood-bathroom-8.webp";
import showerTile from "@/assets/shower-tile.webp";
import HowItWorks from "@/components/HowItWorks";
import PhotoEstimateCTA from "@/components/PhotoEstimateCTA";
import GoogleReviews from "@/components/GoogleReviews";
import { PHONE_HREF, PHONE_DISPLAY, SMS_HREF, GOOGLE_RATING, NJ_HIC_LICENSE } from "@/lib/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KN Flooring — Owner-Operated Tile & Flooring Installation in NJ" },
      { name: "description", content: "Owner-operated tile and flooring installation in New Jersey. Bathrooms, showers, kitchens, backsplashes, main floors, vinyl, hardwood, baseboards. Licensed, Insured & Bonded. NJ HIC #13VH14115900." },
      { property: "og:title", content: "KN Flooring — Owner-Operated Tile & Flooring NJ" },
      { property: "og:description", content: "Clean, detailed tile and flooring installation across NJ. Licensed, Insured & Bonded. Free estimates." },
    ],
    links: [
      // Preload the LCP hero image so it starts downloading immediately
      { rel: "preload", as: "image", href: heroBathroom, fetchpriority: "high" },
    ],
  }),
  component: HomePage,
});

const services = [
  { title: "Bathroom Tile Installation", desc: "Floors, walls, tub surrounds, and precision finishes for full bathroom remodels.", img: bathroomTileImg, slug: "bathroom" },
  { title: "Shower Walls & Shower Floors", desc: "Custom shower tile with proper slope, waterproofing, niches, and clean detail.", img: showerTileImg, slug: "shower" },
  { title: "Kitchen Backsplash", desc: "Precise cuts, alignment, and a clean finished look in any pattern.", img: backsplashImg, slug: "backsplash" },
  { title: "Main Floor Tile Installation", desc: "Large-format porcelain and ceramic for open living areas and entryways.", img: tileInstallImg, slug: "main-floor" },
  { title: "Vinyl / LVP Flooring", desc: "Durable, modern wood-look flooring for residential spaces.", img: vinylImg, slug: "vinyl" },
  { title: "Hardwood Flooring", desc: "Clean installation and refinishing with seamless transitions.", img: hardwoodImg, slug: "hardwood" },
  { title: "Baseboard Installation", desc: "Clean lines and finished trim to complete every flooring project.", img: baseboardImg, slug: "baseboard" },
];


const whyItems = [
  { title: "Every tile set with precision", desc: "Spacers, leveling clips, and laser guides — not eyeballed. Every joint perfect." },
  { title: "Your home stays clean", desc: "We protect floors, cover furniture, and sweep before we leave. Every day." },
  { title: "Text Kalixto directly", desc: "No call center. No middleman. Text me your question and I answer it." },
  { title: "Price I quote is price you pay", desc: "No surprises at the end. Scope changes get discussed first, always." },
];

const featuredProjects = [
  { img: heroBathroom, tag: "Bathroom", caption: "Custom bathroom with herringbone floor and subway shower walls", location: "Long Branch, NJ" },
  { img: showerTile, tag: "Shower", caption: "Large format wall tile with mosaic floor detail", location: "Jersey City, NJ" },
  { img: backsplashImg, tag: "Backsplash", caption: "Marble-look tile with precise cuts and clean grout lines", location: "Hoboken, NJ" },
  { img: tileInstallImg, tag: "Main Floor", caption: "Large format porcelain in an open-plan living space", location: "Edison, NJ" },
  { img: hardwoodImg, tag: "Hardwood", caption: "Oak hardwood with warm natural finish", location: "Princeton, NJ" },
  { img: vinylImg, tag: "Vinyl / LVP", caption: "Wood-look LVP flooring in modern living room", location: "Red Bank, NJ" },
];

function SectionLabel({ children, center }: { children: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${center ? "justify-center" : ""}`}>
      <div className="h-px w-10 bg-walnut/40" />
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-walnut/70">{children}</p>
      {center && <div className="h-px w-10 bg-walnut/40" />}
    </div>
  );
}

function HomePage() {
  return (
    <div className="pb-20 lg:pb-0">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBathroom}
            alt="Professional bathroom tile installation"
            className="h-full w-full object-cover scale-[1.02]"
            width={1600}
            height={900}
            // LCP image — load eagerly with high priority, decode async
            fetchPriority="high"
            decoding="async"
          />
          {/* Single combined overlay — cheaper than 3 stacked gradients */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0A0907 0%, rgba(10,9,7,0.88) 25%, rgba(10,9,7,0.55) 55%, rgba(10,9,7,0.25) 80%, rgba(10,9,7,0.15) 100%)",
            }}
          />
        </div>
        <div className="relative w-full px-5 pb-16 pt-28 md:px-10 md:pb-32 md:pt-40 lg:px-16 lg:pb-40">
          <div className="container-wide">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-6 md:mb-8">
                <MapPin size={11} strokeWidth={2} className="text-walnut" />
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-walnut">
                  Owner-Operated · New Jersey
                </p>
              </div>
              <h1 className="text-[2.1rem] font-bold text-white md:text-[3.4rem] lg:text-[4rem] leading-[1.05] md:leading-[1.02] tracking-[-0.015em] [text-shadow:_0_2px_30px_rgba(0,0,0,0.3)]">
                Tile &amp; Flooring Done Right —{" "}
                <span className="text-white/70 italic font-normal">Every Cut, Every Joint.</span>
              </h1>

              {/* Google reviews — directly under headline, above CTAs */}
              <a
                href="https://g.page/r/CYd7GZSNW49tEAI"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 md:mt-6 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
              >
                <Star size={16} strokeWidth={0} fill="#FBBC05" className="text-[#FBBC05] drop-shadow-[0_1px_2px_rgba(251,188,5,0.4)]" />
                <span className="text-[0.8rem] font-semibold text-foreground">
                  {GOOGLE_RATING.toFixed(1)} ★ — Verified Google Reviews
                </span>
              </a>


              <p className="mt-5 md:mt-7 text-[0.95rem] md:text-[0.95rem] leading-[1.7] md:leading-[1.8] text-white/80 md:text-white/75 max-w-[34rem] font-light">
                Text us photos of your space and get a real price back — same day. No salespeople. No hidden fees. Just Kalixto doing the work.
              </p>

              {/* Trust badges row */}
              <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-walnut/40 bg-walnut/[0.14] px-3.5 py-2 text-[0.72rem] md:text-[0.74rem] font-semibold tracking-[0.01em] text-white backdrop-blur-md">
                  <ShieldCheck size={13} strokeWidth={2.25} className="text-walnut" />
                  Licensed, Insured &amp; Bonded
                </span>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2 text-[0.72rem] md:text-[0.74rem] font-semibold tracking-[0.01em] text-white/90 backdrop-blur-md">
                  NJ HIC #{NJ_HIC_LICENSE}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2 text-[0.72rem] md:text-[0.74rem] font-semibold tracking-[0.01em] text-white/90 backdrop-blur-md">
                  Free Estimates
                </span>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2 text-[0.72rem] md:text-[0.74rem] font-semibold tracking-[0.01em] text-white/90 backdrop-blur-md">
                  Owner-Operated
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-7 md:mt-9 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                <a
                  href={SMS_HREF}
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-md bg-walnut px-7 sm:px-8 py-[1.05rem] sm:py-[1.1rem] text-[0.82rem] sm:text-[0.78rem] font-semibold tracking-[0.04em] text-walnut-foreground shadow-xl shadow-walnut/25 ring-1 ring-walnut/10 transition-all hover:brightness-110 hover:shadow-walnut/40 hover:-translate-y-0.5"
                >
                  <MessageSquare size={14} strokeWidth={2.25} />
                  Text Photos for a Fast Estimate
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-white/20 bg-white/[0.08] px-7 py-[1.05rem] sm:py-[1.1rem] text-[0.82rem] sm:text-[0.78rem] font-medium text-white/90 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.12] hover:text-white"
                >
                  <Phone size={14} strokeWidth={2} />
                  Call KN Flooring
                </a>
              </div>

              {/* Urgency line */}
              <p className="mt-4 text-[0.78rem] leading-relaxed text-white/65 max-w-[34rem]">
                ⚡ Booking into June — 2 project slots remaining.
              </p>

              {/* Phone in plain text */}
              <p className="mt-2 text-[0.82rem] leading-relaxed text-white/80 max-w-[34rem]">
                Or call directly:{" "}
                <a href={PHONE_HREF} className="font-semibold text-white hover:text-walnut transition-colors underline-offset-4 hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="border-b border-foreground/[0.06] bg-cream">
        <div className="container-wide flex flex-wrap justify-center md:divide-x md:divide-foreground/[0.06]">
          {["Licensed, Insured & Bonded", `NJ HIC #${NJ_HIC_LICENSE}`, "Owner-Operated", "Free Estimates", "Serving NJ"].map((label) => (
            <div key={label} className="px-4 py-3 md:px-10 md:py-6">
              <span className="text-[0.6rem] md:text-[0.58rem] font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase text-foreground/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32 bg-background">
        <div className="container-wide">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10 md:mb-16 lg:mb-20">
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="text-[1.85rem] font-bold md:text-[2.5rem] leading-[1.05]">
                Our Services
              </h2>
              <p className="mt-4 md:mt-5 text-[0.9rem] md:text-[0.85rem] text-muted-foreground/65 leading-relaxed max-w-sm">
                High-quality tile and flooring for residential projects across New Jersey.
              </p>
            </div>
            <Link to="/services" className="text-[0.78rem] font-semibold text-walnut hover:text-walnut/70 transition-colors tracking-[0.05em]">
              View All →
            </Link>
          </div>

          {/* 2 feature cards */}
          <div className="grid gap-3 md:grid-cols-2 mb-3">
            {services.slice(0, 2).map((s) => (
              <Link key={s.title} to="/services" hash={s.slug} className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" loading="lazy" decoding="async" width={800} height={450} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
                  <h3 className="text-[1.05rem] md:text-[1.1rem] font-bold text-white tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 md:mt-2 text-[0.78rem] text-white/70 md:text-white/65 leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* 5 cards — remaining services including Baseboard */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {services.slice(2).map((s) => (
              <Link key={s.title} to="/services" hash={s.slug} className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-[5/4] sm:aspect-[3/4] overflow-hidden">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" loading="lazy" decoding="async" width={400} height={533} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-7">
                  <h3 className="text-[0.9rem] md:text-[0.84rem] font-bold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-[0.74rem] md:text-[0.7rem] text-white/65 md:text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose KN Flooring ── */}
      <section className="bg-warm-bg border-y border-foreground/[0.05]">
        <div className="container-wide grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img src={showerTile} alt="Precision tile work" className="h-full w-full object-cover" loading="lazy" decoding="async" width={960} height={720} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-warm-bg/30 lg:to-warm-bg/0" />
          </div>
          <div className="flex items-center px-5 py-16 md:px-16 md:py-28 lg:px-24 lg:py-36">
            <div className="max-w-md">
              <SectionLabel>Why KN Flooring</SectionLabel>
              <h2 className="text-[1.85rem] font-bold md:text-[2.25rem] leading-[1.05]">
                Quality You Can
                <br />
                <span className="text-foreground/55 italic font-normal">See &amp; Feel</span>
              </h2>
              <p className="mt-5 md:mt-7 text-[0.92rem] md:text-[0.88rem] leading-[1.75] md:leading-[1.85] text-muted-foreground/75">
                Quality workmanship, clean finishes, and reliable service — trusted by homeowners across New Jersey.
              </p>
              <p className="mt-4 text-[0.9rem] md:text-[0.88rem] font-semibold italic text-foreground/85 leading-relaxed">
                Hi, I'm Kalixto — I show up to every job myself.
              </p>
              <div className="mt-10 md:mt-14 grid grid-cols-2 gap-x-5 gap-y-8 md:gap-x-10 md:gap-y-12">
                {whyItems.map((w) => (
                  <div key={w.title}>
                    <div className="h-px w-10 md:w-12 bg-walnut/50 mb-4 md:mb-5" />
                    <h3 className="text-[0.86rem] md:text-[0.88rem] font-bold tracking-tight text-foreground/90 leading-tight">{w.title}</h3>
                    <p className="mt-2 md:mt-2.5 text-[0.76rem] md:text-[0.78rem] text-muted-foreground/70 md:text-muted-foreground/65 leading-[1.7] md:leading-[1.8]">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32 bg-background">
        <div className="container-wide">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10 md:mb-16 lg:mb-20">
            <div>
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="text-[1.85rem] font-bold md:text-[2.5rem] leading-[1.05]">
                Featured Projects
              </h2>
              <p className="mt-4 md:mt-5 text-[0.9rem] md:text-[0.85rem] text-muted-foreground/65 max-w-sm leading-relaxed">
                Real work, real finishes — across New Jersey.
              </p>
            </div>
            <Link to="/projects" className="text-[0.78rem] font-semibold text-walnut hover:text-walnut/70 transition-colors tracking-[0.05em]">
              View All →
            </Link>
          </div>

          <div className="grid gap-x-6 gap-y-10 md:gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <Link
                key={p.caption}
                to="/projects"
                className={`group ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
              >
                <div
                  className={`overflow-hidden rounded-xl shadow-sm group-hover:shadow-2xl transition-shadow duration-300 ${
                    i === 0 ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={p.img}
                    alt={p.caption}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                  />
                </div>
                <div className="mt-4 md:mt-7">
                  <div className="flex items-center gap-3">
                    <span className="text-[0.62rem] md:text-[0.6rem] font-bold uppercase tracking-[0.2em] md:tracking-[0.22em] text-walnut">{p.tag}</span>
                    <span className="h-px w-6 bg-walnut/30" />
                    <span className="text-[0.64rem] md:text-[0.62rem] tracking-[0.08em] uppercase text-muted-foreground/60">{p.location}</span>
                  </div>
                  <p className={`mt-2.5 md:mt-3.5 text-muted-foreground/80 md:text-muted-foreground/75 leading-[1.65] md:leading-[1.7] ${i === 0 ? "text-[0.92rem] md:text-[0.95rem] font-light" : "text-[0.86rem] md:text-[0.82rem]"}`}>
                    {p.caption}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Reviews ── */}
      <GoogleReviews />

      <HowItWorks />

      {/* ── For Contractors, Remodelers & Property Managers ── */}
      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32 bg-background border-t border-foreground/[0.06]">
        <div className="container-wide max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel center>Trade Partners</SectionLabel>
            <h2 className="text-[1.85rem] font-bold md:text-[2.5rem] leading-[1.05] tracking-[-0.02em]">
              For Contractors, Remodelers &amp; Property Managers
            </h2>
            <p className="mt-5 md:mt-6 text-[0.95rem] md:text-base leading-[1.8] text-muted-foreground">
              KN Flooring works with homeowners, general contractors, remodelers, designers, and property managers across New Jersey.
            </p>
            <p className="mt-4 text-[0.95rem] md:text-base leading-[1.8] text-muted-foreground">
              We can help with bathroom tile, shower tile, kitchen backsplash, main floor tile, vinyl/LVP, hardwood, floor prep, self-leveling, baseboards, and punch list tile work.
            </p>
            <p className="mt-7 text-[1.02rem] md:text-[1.05rem] font-semibold text-foreground/90">
              Need a reliable tile and flooring installer for your next project?
            </p>
            <div className="mt-5 flex justify-center">
              <a
                href={SMS_HREF}
                className="inline-flex items-center gap-2 rounded-md bg-walnut px-7 py-[1.05rem] text-[0.82rem] font-semibold text-walnut-foreground shadow-xl shadow-walnut/25 transition-all hover:brightness-110 hover:-translate-y-0.5"
              >
                <MessageSquare size={14} strokeWidth={2.25} />
                Text KN Flooring
              </a>
            </div>
          </div>
        </div>
      </section>

      <PhotoEstimateCTA />
    </div>
  );
}
