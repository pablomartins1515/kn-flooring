import { MessageSquare, ClipboardCheck, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Text Photos or Call",
    desc: "Send photos of your bathroom, shower, kitchen, floor, or backsplash. Include your town, approximate size, and material status.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Review Scope, Prep & Materials",
    desc: "We check what is needed: installation only, demo, waterproofing, self-leveling, floor prep, or finish work.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Get a Clear Estimate",
    desc: "You receive a clear scope, honest pricing, and a realistic timeline before work starts.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Clean Installation & Final Walkthrough",
    desc: "We protect the space, complete the installation, clean up, and review the finished work with you.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-warm-bg border-y border-foreground/[0.06]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-walnut/20 to-transparent" />

      <div className="px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="container-wide max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-20 lg:mb-24">
            <div className="flex items-center justify-center gap-3 mb-5 md:mb-6">
              <div className="h-px w-10 bg-walnut/50" />
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-walnut">
                Simple Process
              </p>
              <div className="h-px w-10 bg-walnut/50" />
            </div>
            <h2 className="text-[2rem] font-bold md:text-[3rem] leading-[1.05] md:leading-[1.02] text-foreground">
              How It Works
            </h2>
            <p className="mx-auto mt-5 md:mt-6 max-w-lg text-[0.92rem] md:text-[0.95rem] leading-[1.7] md:leading-[1.8] text-muted-foreground">
              Four simple steps from your first message to a finished project you'll love.
            </p>
          </div>

          <div className="grid gap-8 md:gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, idx) => (
              <div key={s.step} className="relative group">
                <div className="relative h-full rounded-2xl bg-background border border-foreground/[0.07] p-7 md:p-8 lg:p-8 shadow-[0_1px_3px_rgba(60,45,30,0.04),0_16px_40px_-20px_rgba(60,45,30,0.12)] transition-all duration-500 hover:border-walnut/25 hover:shadow-[0_4px_12px_rgba(60,45,30,0.06),0_24px_48px_-20px_rgba(60,45,30,0.18)] hover:-translate-y-1">
                  <div className="absolute -top-4 left-7 md:left-8 inline-flex items-center gap-1.5 rounded-full bg-walnut px-3.5 py-1.5 shadow-md shadow-walnut/25">
                    <span className="text-[0.58rem] font-bold uppercase tracking-[0.25em] text-walnut-foreground">
                      Step {s.step}
                    </span>
                  </div>

                  <div className="mt-5 md:mt-6 mb-5 md:mb-6">
                    <div className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cream to-warm-bg ring-1 ring-walnut/15 shadow-sm">
                      <s.icon size={22} strokeWidth={1.75} className="text-walnut md:hidden" />
                      <s.icon size={24} strokeWidth={1.75} className="text-walnut hidden md:block" />
                    </div>
                  </div>

                  <h3 className="text-[1.1rem] md:text-[1.15rem] font-bold tracking-tight text-foreground mb-2.5 leading-tight">
                    {s.title}
                  </h3>

                  <p className="text-[0.86rem] md:text-[0.88rem] leading-[1.7] md:leading-[1.75] text-muted-foreground/85">
                    {s.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 h-7 w-7 items-center justify-center rounded-full bg-warm-bg border border-walnut/20 shadow-sm">
                    <ArrowRight size={12} strokeWidth={2.25} className="text-walnut" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
