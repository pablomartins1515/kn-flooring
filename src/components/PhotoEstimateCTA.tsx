import { Link } from "@tanstack/react-router";
import { Phone, MessageSquare, Camera } from "lucide-react";
import { PHONE_HREF, SMS_HREF } from "@/lib/contact";

export default function PhotoEstimateCTA() {
  return (
    <section className="bg-warm-bg border-y border-foreground/[0.05]">
      <div className="px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="container-wide max-w-2xl mx-auto text-center">
          <div className="relative mx-auto mb-6 md:mb-8 flex h-20 w-20 md:h-[5.5rem] md:w-[5.5rem] items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-background shadow-[0_4px_24px_-8px_rgba(122,92,69,0.25)] ring-1 ring-walnut/15" />
            <Camera size={22} strokeWidth={1.5} className="relative text-walnut md:hidden" />
            <Camera size={24} strokeWidth={1.5} className="relative text-walnut hidden md:block" />
          </div>
          <h2 className="text-[1.85rem] font-bold md:text-[2.5rem] leading-[1.05]">
            Want a Faster Estimate?
          </h2>
          <p className="mx-auto mt-5 md:mt-6 max-w-md text-[0.92rem] md:text-[0.9rem] leading-[1.7] md:leading-[1.85] text-muted-foreground/75">
            Text us your project photos and basic details. We'll respond with a clear estimate — usually within a few hours.
          </p>
          <div className="mt-9 md:mt-12 flex flex-col items-stretch sm:items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
            <a
              href={SMS_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-walnut px-9 py-[1.05rem] sm:py-[1.1rem] text-[0.82rem] sm:text-[0.78rem] font-semibold tracking-[0.04em] text-walnut-foreground shadow-lg shadow-walnut/20 ring-1 ring-walnut/10 transition-all hover:brightness-110 hover:-translate-y-0.5"
            >
              <MessageSquare size={15} strokeWidth={2} />
              Text Us Your Photos
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground/15 bg-background px-7 py-[1.05rem] sm:py-[1.1rem] text-[0.82rem] sm:text-[0.78rem] font-medium text-foreground/75 transition-colors hover:border-walnut/40 hover:text-walnut"
            >
              <Phone size={15} strokeWidth={2} />
              Call Now
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground/15 bg-background px-7 py-[1.05rem] sm:py-[1.1rem] text-[0.82rem] sm:text-[0.78rem] font-medium text-foreground/75 transition-colors hover:border-walnut/40 hover:text-walnut"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
