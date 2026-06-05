import { Link } from "@tanstack/react-router";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { PHONE_HREF, PHONE_DISPLAY, SMS_HREF } from "@/lib/contact";

export default function CTASection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5 md:mb-6">
            <div className="h-px w-10 bg-walnut/50" />
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-walnut">
              Start Your Project
            </p>
            <div className="h-px w-10 bg-walnut/50" />
          </div>
          <h2 className="text-[1.85rem] font-bold md:text-[2.5rem] leading-[1.05]">
            Ready to Transform Your Space?
          </h2>
          <p className="mx-auto mt-5 md:mt-6 max-w-md text-[0.92rem] md:text-[0.95rem] leading-[1.7] md:leading-[1.8] text-primary-foreground/70">
            Text us project photos or request a free estimate — we'll reply with a clear next step, usually within a few hours.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col items-stretch sm:items-center justify-center gap-3 sm:flex-row">
            <a
              href={SMS_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-walnut px-9 py-[1.05rem] text-[0.82rem] sm:text-[0.78rem] font-semibold tracking-[0.04em] text-walnut-foreground shadow-lg shadow-walnut/30 ring-1 ring-walnut/10 transition-all hover:brightness-110 hover:-translate-y-0.5"
            >
              <MessageSquare size={14} strokeWidth={2.25} />
              Text Photos for Fast Estimate
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/25 bg-primary-foreground/[0.06] px-7 py-[1.05rem] text-[0.82rem] sm:text-[0.78rem] font-medium text-primary-foreground/90 backdrop-blur-md transition-all hover:border-primary-foreground/40 hover:bg-primary-foreground/[0.1]"
            >
              <Phone size={14} strokeWidth={2} />
              {PHONE_DISPLAY}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/25 px-7 py-[1.05rem] text-[0.82rem] sm:text-[0.78rem] font-medium text-primary-foreground/85 transition-colors hover:border-primary-foreground/45 hover:text-primary-foreground"
            >
              Get Free Estimate
              <ArrowRight size={13} strokeWidth={2.5} className="opacity-70" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
