import { Link, useLocation } from "@tanstack/react-router";
import { ShieldCheck, Star } from "lucide-react";
import knLogo from "@/assets/kn-logo.png";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_PROFILE_URL, NJ_HIC_LICENSE } from "@/lib/contact";

const services = [
  { to: "/services" as const, label: "Tile Installation" },
  { to: "/services" as const, label: "Bathroom Tile" },
  { to: "/services" as const, label: "Shower Walls & Floors" },
  { to: "/services" as const, label: "Kitchen Backsplash" },
  { to: "/services" as const, label: "Hardwood Flooring" },
  { to: "/services" as const, label: "Vinyl / LVP" },
  { to: "/services" as const, label: "Baseboard Installation" },
];

const company = [
  { to: "/about" as const, label: "About" },
  { to: "/projects" as const, label: "Projects" },
  { to: "/areas" as const, label: "Areas We Serve" },
  { to: "/contact" as const, label: "Free Estimate" },
];

export default function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide px-5 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={knLogo} alt="KN Flooring" className="h-12 md:h-14 w-auto brightness-0 invert" loading="lazy" decoding="async" width={120} height={56} />
            <p className="mt-4 md:mt-5 text-sm leading-relaxed opacity-70 max-w-sm font-medium">
              Owner-Operated Tile &amp; Flooring Installation in New Jersey
            </p>

            {/* Trust badge */}
            <div className="mt-5 md:mt-6 inline-flex items-center gap-2.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/[0.06] px-4 py-2">
              <ShieldCheck size={14} strokeWidth={2.25} className="opacity-90" />
              <span className="text-[0.74rem] md:text-[0.72rem] font-semibold tracking-[0.02em] opacity-90">
                Licensed, Insured &amp; Bonded
              </span>
            </div>
            <p className="mt-2 text-[0.7rem] opacity-55 tracking-[0.02em]">NJ HIC License #{NJ_HIC_LICENSE}</p>


            {/* Google rating */}
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2.5 text-[0.74rem] md:text-[0.72rem] opacity-70 hover:opacity-100 transition-opacity"
            >
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} strokeWidth={0} fill="currentColor" className="text-walnut" />
                ))}
              </span>
              <span>
                <span className="font-semibold opacity-90">{GOOGLE_RATING}</span> · {GOOGLE_REVIEW_COUNT}+ Google reviews
              </span>
            </a>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] opacity-50">Services</h4>
            <ul className="mt-4 md:mt-5 space-y-2.5 md:space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link to={s.to} className="block py-1 text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] opacity-50">Company</h4>
            <ul className="mt-4 md:mt-5 space-y-2.5 md:space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link to={c.to} className="block py-1 text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] opacity-50">Contact</h4>
            <ul className="mt-4 md:mt-5 space-y-2.5 md:space-y-3 text-sm">
              <li>
                <a href="tel:+17325208743" className="block py-1 opacity-70 hover:opacity-100 transition-opacity font-medium">(732) 520-8743</a>
              </li>
              <li>
                <a href="mailto:kn.flooring@hotmail.com" className="block py-1 opacity-70 hover:opacity-100 transition-opacity break-all">kn.flooring@hotmail.com</a>
              </li>
              <li className="opacity-50 pt-1">Serving New Jersey</li>
              <li className="opacity-50 text-xs">Most requests answered within a few hours</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 border-t border-primary-foreground/10 pt-6 md:pt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between text-center sm:text-left">
          <p className="text-xs opacity-40">
            &copy; {new Date().getFullYear()} KN Flooring. All rights reserved.
          </p>
          <p className="text-xs opacity-40">
            Licensed, Insured &amp; Bonded · NJ HIC #{NJ_HIC_LICENSE}
          </p>
        </div>
      </div>
    </footer>
  );
}
