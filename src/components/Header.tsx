import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageSquare } from "lucide-react";
import knLogo from "@/assets/kn-logo.png";
import { PHONE_HREF, PHONE_DISPLAY, SMS_HREF } from "@/lib/contact";
import TrackedLink from "@/components/TrackedLink";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/areas", label: "Areas We Serve" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) return null;

  return (
    // Removed backdrop-blur-xl — heavy on mobile GPUs and 95% bg already reads as elevated.
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border/60">
      <div className="container-wide flex items-center justify-between px-4 py-2 md:px-8 md:py-1">
        <Link to="/" className="flex items-center shrink-0 md:-my-2">
          <img src={knLogo} alt="KN Flooring" className="h-20 md:h-44 w-auto" width={220} height={176} fetchPriority="high" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[0.9rem] font-medium tracking-wide transition-colors hover:text-walnut ${
                location.pathname === l.to ? "text-walnut" : "text-foreground/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <TrackedLink
            event="call_click"
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-border/60 px-4 py-2.5 text-[0.82rem] font-semibold text-foreground tracking-wide transition-colors hover:border-walnut/40 hover:text-walnut"
          >
            <Phone size={14} strokeWidth={2.2} />
            {PHONE_DISPLAY}
          </TrackedLink>
          <TrackedLink
            event="text_click"
            href={SMS_HREF}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-walnut px-5 py-2.5 text-[0.82rem] font-semibold text-walnut-foreground shadow-sm transition-all hover:shadow-md hover:brightness-110"
          >
            <MessageSquare size={14} strokeWidth={2.2} />
            Text Photos
          </TrackedLink>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 lg:hidden p-3 -mr-2 min-h-11 min-w-11 items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border/60 bg-background px-6 pb-8 pt-4 lg:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-3.5 text-[1.05rem] font-medium border-b border-border/30 last:border-0 ${
                location.pathname === l.to ? "text-walnut" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center rounded-lg bg-walnut py-4 text-sm font-semibold text-walnut-foreground shadow-sm"
          >
            Get Free Estimate
          </Link>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <TrackedLink
              event="call_click"
              href={PHONE_HREF}
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border/60 py-3.5 text-sm font-semibold text-foreground"
            >
              <Phone size={15} strokeWidth={2.2} />
              Call Now
            </TrackedLink>
            <TrackedLink
              event="text_click"
              href={SMS_HREF}
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border/60 py-3.5 text-sm font-semibold text-foreground"
            >
              <MessageSquare size={15} strokeWidth={2.2} />
              Text Us
            </TrackedLink>
          </div>
        </nav>
      )}
    </header>
  );
}
