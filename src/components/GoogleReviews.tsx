import { Star, ShieldCheck, Award } from "lucide-react";
import {
  GOOGLE_REVIEW_URL,
  GOOGLE_PROFILE_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  NJ_HIC_LICENSE,
} from "@/lib/contact";

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={0} fill="currentColor" className="text-walnut" />
      ))}
    </div>
  );
}

const testimonials = [
  { quote: "Kalixto retiled our entire master bathroom and the grout lines are razor-straight. Cleanest install we've ever seen.", name: "Michael R.", city: "Hoboken, NJ" },
  { quote: "Showed up every day on time, kept the house spotless, and finished exactly when he said he would. Highly recommend.", name: "Sarah K.", city: "Edison, NJ" },
  { quote: "The herringbone shower floor is a work of art. Every cut is perfect — you can tell he genuinely cares about the work.", name: "David L.", city: "Long Branch, NJ" },
];

export default function GoogleReviews() {
  return (
    <section className="relative bg-cream border-t border-foreground/[0.06]">
      <div className="px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="container-wide max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5 md:mb-6">
              <div className="h-px w-10 bg-walnut/50" />
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-walnut">
                Verified Trust
              </p>
              <div className="h-px w-10 bg-walnut/50" />
            </div>
            <h2 className="text-[2rem] font-bold md:text-[3rem] leading-[1.05] md:leading-[1.02] text-foreground">
              Verified Google Reviews
            </h2>
            <p className="mx-auto mt-5 md:mt-6 max-w-xl text-[0.95rem] md:text-[1rem] leading-[1.7] md:leading-[1.75] text-muted-foreground">
              See real customer feedback from KN Flooring customers on our Google profile.
            </p>
          </div>

          {/* Inline testimonials */}
          <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10 md:mb-14">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-background border border-foreground/[0.07] p-6 md:p-7 flex flex-col shadow-[0_1px_3px_rgba(60,45,30,0.04),0_12px_28px_-16px_rgba(60,45,30,0.12)]">
                <Stars size={14} />
                <blockquote className="mt-4 text-[0.92rem] leading-[1.7] text-foreground/85 flex-1">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-foreground/[0.06]">
                  <p className="text-[0.85rem] font-semibold text-foreground">{t.name}</p>
                  <p className="mt-0.5 text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">{t.city}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Trust grid */}
          <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Rating */}
            <div className="rounded-2xl bg-background border border-foreground/[0.07] p-6 md:p-7 flex flex-col items-center text-center shadow-[0_1px_3px_rgba(60,45,30,0.04),0_12px_28px_-16px_rgba(60,45,30,0.12)]">
              <Stars size={16} />
              <p className="mt-4 text-[2rem] font-bold tracking-tight text-foreground leading-none">
                {GOOGLE_RATING.toFixed(1)}
              </p>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Google Rating
              </p>
            </div>

            {/* Reviews */}
            <div className="rounded-2xl bg-background border border-foreground/[0.07] p-6 md:p-7 flex flex-col items-center text-center shadow-[0_1px_3px_rgba(60,45,30,0.04),0_12px_28px_-16px_rgba(60,45,30,0.12)]">
              <div className="h-[22px] flex items-center">
                <span className="text-walnut text-[0.7rem] font-bold uppercase tracking-[0.18em]">
                  Google
                </span>
              </div>
              <p className="mt-4 text-[2rem] font-bold tracking-tight text-foreground leading-none">
                {GOOGLE_REVIEW_COUNT}+
              </p>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Google Reviews
              </p>
            </div>

            {/* Licensed */}
            <div className="rounded-2xl bg-background border border-foreground/[0.07] p-6 md:p-7 flex flex-col items-center text-center shadow-[0_1px_3px_rgba(60,45,30,0.04),0_12px_28px_-16px_rgba(60,45,30,0.12)]">
              <ShieldCheck size={22} className="text-walnut" strokeWidth={1.75} />
              <p className="mt-4 text-[0.95rem] font-bold tracking-tight text-foreground leading-snug">
                Licensed, Insured<br />& Bonded
              </p>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                New Jersey
              </p>
            </div>

            {/* License # */}
            <div className="rounded-2xl bg-background border border-foreground/[0.07] p-6 md:p-7 flex flex-col items-center text-center shadow-[0_1px_3px_rgba(60,45,30,0.04),0_12px_28px_-16px_rgba(60,45,30,0.12)]">
              <Award size={22} className="text-walnut" strokeWidth={1.75} />
              <p className="mt-4 text-[0.95rem] font-bold tracking-tight text-foreground leading-snug">
                NJ HIC License
              </p>
              <p className="mt-2 text-[0.78rem] font-mono font-semibold tracking-[0.04em] text-walnut">
                #{NJ_HIC_LICENSE}
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-12 md:mt-14 flex flex-col items-stretch sm:items-center justify-center gap-3 sm:flex-row">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-walnut px-9 py-[1.05rem] sm:py-[1.1rem] text-[0.82rem] sm:text-[0.78rem] font-semibold tracking-[0.04em] text-walnut-foreground shadow-lg shadow-walnut/20 ring-1 ring-walnut/10 transition-all hover:brightness-110 hover:-translate-y-0.5"
            >
              Read Our Google Reviews
            </a>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground/15 bg-background px-7 py-[1.05rem] sm:py-[1.1rem] text-[0.82rem] sm:text-[0.78rem] font-medium text-foreground/75 transition-colors hover:border-walnut/40 hover:text-walnut"
            >
              Leave a Review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
