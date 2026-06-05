import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageSquare, Mail, MapPin, Clock, Camera, ShieldCheck, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { PHONE_HREF, PHONE_DISPLAY, SMS_HREF, EMAIL, NJ_HIC_LICENSE } from "@/lib/contact";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";
import TrackedLink from "@/components/TrackedLink";

const faqs = [
  { q: "Do you offer free estimates?", a: "Yes — every estimate is free, with no pressure and no hidden fees. Send us your project details and we'll get back to you with a clear next step." },
  { q: "Can I send project photos first?", a: "Absolutely. Photos of the space help us give you a faster, more accurate estimate before any in-person visit. You can text or email them anytime to (732) 520-8743." },
  { q: "What areas do you serve?", a: "We work with homeowners across New Jersey — including Jersey City, Hoboken, Newark, Toms River, and surrounding towns. If you're in NJ, we likely serve your area." },
  { q: "What types of projects do you quote?", a: "We quote bathroom tile, shower walls and floors, kitchen backsplashes, main-floor tile, hardwood, vinyl/LVP, baseboards, floor prep, self-leveling, and related finish work." },
  { q: "Are you licensed, insured, and bonded in New Jersey?", a: "Yes. KN Flooring is fully licensed, insured, and bonded in New Jersey — NJ HIC License #13VH14115900." },
  { q: "Do you handle waterproofing for showers?", a: "Yes. We install waterproof membranes for shower walls, floors, and niches before any tile work begins." },
  { q: "Do you do floor prep and self-leveling?", a: "Yes. We handle floor prep, patching, and self-leveling so the finished installation sits flat and lasts." },
  { q: "Do you work with general contractors and remodelers?", a: "Yes. We regularly partner with general contractors, remodelers, designers, and property managers on tile and flooring scopes." },
  { q: "Can I text photos before scheduling an estimate?", a: "Yes — text photos to (732) 520-8743. Most projects can be priced from clear photos and a few details." },
  { q: "Do you provide a clear scope before starting?", a: "Always. You receive a clear scope, honest pricing, and a realistic timeline before any work begins." },
  { q: "Do you clean up after installation?", a: "Yes. We protect the space during the job, clean up at the end of each day, and do a final walkthrough with you." },
  { q: "Do you install customer-supplied materials?", a: "Yes. You can supply your own tile, hardwood, or LVP — we'll review the materials and confirm everything needed before install." },
  { q: "How do I get a faster estimate?", a: "Send a few clear photos of the space along with rough measurements and your timeline. With photos, most projects can be priced without an in-person visit." },
  { q: "How long does installation usually take?", a: "Most bathroom and shower projects take 5–10 days. Backsplashes are usually 1–2 days. Larger floor projects vary — we'll give you a clear timeline with your estimate." },
];


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Free Estimate — KN Flooring | Tile & Flooring NJ" },
      { name: "description", content: "Send your project details and get a straightforward estimate for your tile or flooring job. Free estimates across New Jersey." },
      { property: "og:title", content: "Request a Free Estimate — KN Flooring" },
      { property: "og:description", content: "Tell us about your project and get a clear next step — fast, honest pricing for tile and flooring across NJ." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: ContactPage,
});

const serviceOptions = [
  "Tile Installation", "Bathroom Tile", "Shower Tile", "Kitchen Backsplash",
  "Main Floor Tile", "Hardwood Flooring", "Vinyl / LVP Flooring", "Baseboard Installation", "Other",
];

const inputClass = "w-full rounded-xl border border-border/60 bg-background px-4 md:px-5 py-3.5 md:py-4 text-base md:text-sm outline-none transition-all duration-200 focus:border-walnut focus:ring-2 focus:ring-walnut/15 placeholder:text-foreground/30";

const trustPoints = [
  "Licensed, Insured & Bonded",
  `NJ HIC #${NJ_HIC_LICENSE}`,
  "Owner-Operated",
  "Free, no-pressure estimates",
  "Reply within a few hours",
];


const sendChecklist = [
  "Type of project (bathroom, backsplash, floor, etc.)",
  "Approximate room size or square footage",
  "Photos of the current space",
  "Your timeline and any material preferences",
];

const leadSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(30),
  service_needed: z.string().trim().min(1, "Please choose a service").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional(),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    // Roll the extended fields into the message body so they're captured
    // without a schema migration.
    const extras: Array<[string, FormDataEntryValue | null]> = [
      ["Approx. square footage", fd.get("sqft")],
      ["Material already purchased?", fd.get("materials")],
      ["Area ready for installation?", fd.get("area_ready")],
      ["Scope needed", fd.get("scope")],
      ["Desired start date", fd.get("start_date")],
      ["Budget range", fd.get("budget")],
      ["Best way to contact", fd.get("contact_pref")],
    ];
    const extrasText = extras
      .filter(([, v]) => v && String(v).trim().length > 0)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const userMessage = (fd.get("message") as string | null)?.trim() || "";
    const combinedMessage = [userMessage, extrasText].filter(Boolean).join("\n\n— Project details —\n");

    const parsed = leadSchema.safeParse({
      full_name: fd.get("name"),
      phone: fd.get("phone"),
      service_needed: fd.get("service"),
      email: (fd.get("email") as string | null) || "",
      city: (fd.get("city") as string | null) || "",
      message: combinedMessage || undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setSubmitting(true);
    const { error: insertError } = await supabase.from("leads").insert({
      ...parsed.data,
      source_page: typeof window !== "undefined" ? window.location.pathname : null,
      is_estimate_request: true,
    });
    setSubmitting(false);
    if (insertError) {
      setError("Something went wrong. Please call or text us directly.");
      return;
    }
    void trackEvent("estimate_submit", { service: parsed.data.service_needed });
    setSubmitted(true);
  }

  return (
    <div className="pb-20 lg:pb-0">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-[0.6]" style={{ background: "radial-gradient(ellipse 60% 50% at 15% 0%, oklch(0.72 0.14 80 / 0.18), transparent 60%)" }} />
        <div className="relative px-5 pt-28 pb-16 md:px-10 md:pt-48 md:pb-28 lg:px-16">
          <div className="container-wide">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="h-px w-8 bg-walnut" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-walnut">Free Estimate</p>
              </div>
              <h1 className="text-[2.2rem] font-bold md:text-5xl lg:text-[3.5rem] tracking-[-0.02em] md:tracking-[-0.03em] leading-[1.05]">
                Tell us about your project<br />
                <span className="text-walnut">and get a clear next step.</span>
              </h1>
              <p className="mt-5 md:mt-7 text-[0.95rem] md:text-base lg:text-lg text-primary-foreground/65 md:text-primary-foreground/55 leading-relaxed max-w-xl font-light">
                Send your details and we'll get back to you with straightforward pricing for your tile or flooring job — no pressure, no hidden fees.
              </p>
              <ul className="mt-7 md:mt-9 grid grid-cols-1 sm:flex sm:flex-wrap gap-x-7 gap-y-2.5 md:gap-y-3">
                {trustPoints.map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-[0.88rem] md:text-sm text-primary-foreground/75 md:text-primary-foreground/70">
                    <Check size={16} className="text-walnut shrink-0" strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="px-5 py-14 md:px-10 md:py-28 lg:px-16 lg:py-32 bg-cream">
        <div className="container-wide">
          <div className="grid gap-8 lg:gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-2xl md:rounded-3xl bg-background p-6 md:p-12 shadow-[0_1px_3px_rgba(60,45,30,0.05),0_12px_32px_-12px_rgba(60,45,30,0.10)] border border-foreground/[0.06]">
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-walnut/15">
                      <Check size={28} className="text-walnut" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-[-0.02em]">✅ Got it!</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed max-w-md mx-auto">
                      We received your request and will get back to you within a few hours. For the fastest reply, text your project photos to{" "}
                      <a href={SMS_HREF} className="font-semibold text-walnut hover:underline">{PHONE_DISPLAY}</a>.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => { setSubmitted(false); setError(null); }}
                        className="inline-flex items-center justify-center rounded-xl border border-walnut/30 bg-walnut/[0.06] px-5 py-3 text-sm font-semibold text-walnut transition-colors hover:bg-walnut/[0.12]"
                      >
                        Submit another request
                      </button>
                      <Link to="/" className="text-sm font-semibold text-walnut hover:underline underline-offset-4">
                        Back to Home →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Text Photos Now — fastest path */}
                    <div className="mb-7 md:mb-8 rounded-2xl bg-primary text-primary-foreground p-6 md:p-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                      <div className="flex-1">
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-walnut">Fastest Estimate</p>
                        <p className="mt-1.5 text-[0.95rem] md:text-base font-semibold leading-snug">
                          For the fastest estimate, please send project photos by text.
                        </p>
                      </div>
                      <TrackedLink
                        event="text_click"
                        href={SMS_HREF}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-walnut px-6 py-3.5 text-[0.82rem] font-semibold text-walnut-foreground shadow-lg shadow-walnut/30 transition-all hover:brightness-110 shrink-0"
                      >
                        <Camera size={15} strokeWidth={2.25} />
                        Text Photos Now
                      </TrackedLink>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-[-0.02em]">Project details</h2>
                      <p className="mt-2 text-sm text-muted-foreground">The more you share, the faster we can get back to you.</p>
                    </div>
                    <div className="mb-7 md:mb-8 rounded-xl md:rounded-2xl border border-walnut/20 bg-walnut/[0.04] p-5 md:p-6">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-walnut">What to include</p>
                      <p className="mt-2 text-[0.9rem] md:text-sm text-foreground/75 leading-relaxed">A few quick details help us price your project accurately the first time:</p>
                      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        {sendChecklist.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-[0.88rem] md:text-sm text-foreground/85">
                            <Check size={15} className="text-walnut shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Full Name *</label>
                          <input id="name" name="name" type="text" required maxLength={100} className={inputClass} placeholder="Your name" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Phone Number *</label>
                          <input id="phone" name="phone" type="tel" required maxLength={30} className={inputClass} placeholder="(732) 520-8743" />
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="email" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Email (optional)</label>
                          <input id="email" name="email" type="email" maxLength={255} className={inputClass} placeholder="you@email.com" />
                        </div>
                        <div>
                          <label htmlFor="city" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">City / Town (optional)</label>
                          <input id="city" name="city" type="text" maxLength={100} className={inputClass} placeholder="Jersey City" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="service" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Service Needed *</label>
                        <select id="service" name="service" required className={inputClass}>
                          <option value="">Select a service</option>
                          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="sqft" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Approx. Square Footage (optional)</label>
                          <input id="sqft" name="sqft" type="text" maxLength={50} className={inputClass} placeholder="e.g. 120 sq ft" />
                        </div>
                        <div>
                          <label htmlFor="start_date" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Desired Start Date (optional)</label>
                          <input id="start_date" name="start_date" type="text" maxLength={60} className={inputClass} placeholder="ASAP / next month / flexible" />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="materials" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Material Already Purchased? (optional)</label>
                          <select id="materials" name="materials" className={inputClass}>
                            <option value="">Select</option>
                            <option>Yes — already have it</option>
                            <option>Partially</option>
                            <option>No — need help choosing</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="area_ready" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Area Ready for Install? (optional)</label>
                          <select id="area_ready" name="area_ready" className={inputClass}>
                            <option value="">Select</option>
                            <option>Yes — fully ready</option>
                            <option>Mostly ready</option>
                            <option>No — needs prep work</option>
                            <option>Not sure</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="scope" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Scope Needed (optional)</label>
                        <select id="scope" name="scope" className={inputClass}>
                          <option value="">Select</option>
                          <option>Installation only</option>
                          <option>Demolition + Installation</option>
                          <option>Waterproofing + Installation</option>
                          <option>Self-leveling / Floor prep + Installation</option>
                          <option>Full scope (demo, prep, install)</option>
                          <option>Not sure — need recommendation</option>
                        </select>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="budget" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Budget Range (optional)</label>
                          <select id="budget" name="budget" className={inputClass}>
                            <option value="">Select</option>
                            <option>Under $2,000</option>
                            <option>$2,000 – $5,000</option>
                            <option>$5,000 – $10,000</option>
                            <option>$10,000 – $20,000</option>
                            <option>$20,000+</option>
                            <option>Not sure yet</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="contact_pref" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Best Way to Contact (optional)</label>
                          <select id="contact_pref" name="contact_pref" className={inputClass}>
                            <option value="">Select</option>
                            <option>Text</option>
                            <option>Call</option>
                            <option>Email</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-2.5 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-foreground/45">Project Details (optional)</label>
                        <textarea id="message" name="message" rows={5} maxLength={2000} className={inputClass} placeholder="Tell us about your project — anything else that helps us give you an accurate estimate." />
                      </div>

                      <div className="flex items-start gap-3 rounded-xl bg-sand p-4 text-xs text-muted-foreground leading-relaxed">
                        <Camera size={16} className="text-walnut shrink-0 mt-0.5" />
                        <p>
                          <span className="font-semibold text-foreground">Have photos?</span> Text them to{" "}
                          <a href={SMS_HREF} className="text-walnut font-semibold hover:underline">{PHONE_DISPLAY}</a>{" "}
                          for the fastest estimate.
                        </p>
                      </div>

                      {error && (
                        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-walnut px-10 py-[1.05rem] md:py-4 text-[0.92rem] md:text-sm font-semibold text-walnut-foreground transition-all hover:shadow-[0_8px_30px_-8px] hover:shadow-walnut/40 disabled:opacity-60 sm:w-auto"
                      >
                        {submitting && <Loader2 size={16} className="animate-spin" />}
                        {submitting ? "Sending..." : "Request Free Estimate →"}
                      </button>

                      <p className="flex items-center gap-2 text-[0.74rem] md:text-[0.7rem] text-muted-foreground/75 pt-1">
                        <ShieldCheck size={13} className="text-walnut shrink-0" strokeWidth={2} />
                        <span>Licensed, Insured &amp; Bonded in New Jersey</span>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

            <aside className="lg:col-span-2 space-y-3">
              <TrackedLink event="call_click" href={PHONE_HREF} className="group flex items-center gap-4 md:gap-5 rounded-2xl bg-background p-5 md:p-6 border border-foreground/[0.06] transition-all hover:border-walnut/30 hover:shadow-[0_1px_3px_rgba(60,45,30,0.05),0_12px_32px_-12px_rgba(60,45,30,0.10)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-walnut/10 shrink-0 group-hover:bg-walnut/15 transition-colors">
                  <Phone size={20} className="text-walnut" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-foreground/45">Call Now</p>
                  <p className="text-[1.05rem] md:text-base font-bold mt-1 tracking-tight">{PHONE_DISPLAY}</p>
                </div>
              </TrackedLink>
              <TrackedLink event="text_click" href={SMS_HREF} className="group flex items-center gap-4 md:gap-5 rounded-2xl bg-background p-5 md:p-6 border border-foreground/[0.06] transition-all hover:border-walnut/30 hover:shadow-[0_1px_3px_rgba(60,45,30,0.05),0_12px_32px_-12px_rgba(60,45,30,0.10)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-walnut/10 shrink-0 group-hover:bg-walnut/15 transition-colors">
                  <MessageSquare size={20} className="text-walnut" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-foreground/45">Text Us</p>
                  <p className="text-[0.92rem] md:text-sm font-semibold mt-1">Send a message — fastest reply</p>
                </div>
              </TrackedLink>
              <a href={`mailto:${EMAIL}`} className="group flex items-center gap-4 md:gap-5 rounded-2xl bg-background p-5 md:p-6 border border-foreground/[0.06] transition-all hover:border-walnut/30 hover:shadow-[0_1px_3px_rgba(60,45,30,0.05),0_12px_32px_-12px_rgba(60,45,30,0.10)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-walnut/10 shrink-0 group-hover:bg-walnut/15 transition-colors">
                  <Mail size={20} className="text-walnut" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-foreground/45">Email</p>
                  <p className="text-[0.92rem] md:text-sm font-semibold mt-1 truncate">{EMAIL}</p>
                </div>
              </a>

              <div className="rounded-2xl bg-primary text-primary-foreground p-7 mt-4">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-walnut/20 shrink-0"><Clock size={16} className="text-walnut" /></div>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-walnut">Response Time</p>
                      <p className="text-sm mt-1.5 leading-relaxed text-primary-foreground/75">Most requests answered within a few hours, 7 days a week.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-walnut/20 shrink-0"><MapPin size={16} className="text-walnut" /></div>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-walnut">Service Area</p>
                      <p className="text-sm mt-1.5 leading-relaxed text-primary-foreground/75">Serving homeowners across New Jersey — Jersey City, Hoboken, Newark, Toms River and surrounding towns.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-walnut/20 shrink-0"><ShieldCheck size={16} className="text-walnut" /></div>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-walnut">Licensed, Insured &amp; Bonded</p>
                      <p className="text-sm mt-1.5 leading-relaxed text-primary-foreground/75">Fully credentialed in New Jersey — NJ HIC #{NJ_HIC_LICENSE}.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-walnut/20 shrink-0"><Check size={16} className="text-walnut" strokeWidth={2.5} /></div>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-walnut">Free Estimates</p>
                      <p className="text-sm mt-1.5 leading-relaxed text-primary-foreground/75">Always free, always no-pressure. Clear pricing, honest advice, your timeline.</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 py-16 md:px-10 md:py-28 lg:px-16 lg:py-32 bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-4 md:mb-5">
              <div className="h-px w-8 bg-walnut" />
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-walnut">Common Questions</p>
            </div>
            <h2 className="text-[1.85rem] md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] md:tracking-[-0.03em] leading-[1.05]">Answers before you ask.</h2>
          </div>

          <div className="grid gap-4 md:gap-5 md:grid-cols-2 max-w-5xl">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl md:rounded-2xl bg-cream p-6 md:p-8 border border-foreground/[0.05]">
                <h3 className="text-[0.98rem] md:text-lg font-bold tracking-[-0.01em] leading-snug">{faq.q}</h3>
                <p className="mt-2.5 md:mt-3 text-[0.88rem] md:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Still have questions?</span>
            <TrackedLink event="call_click" href={PHONE_HREF} className="font-semibold text-walnut hover:underline underline-offset-4">Call {PHONE_DISPLAY}</TrackedLink>
            <span className="text-foreground/30">·</span>
            <TrackedLink event="text_click" href={SMS_HREF} className="font-semibold text-walnut hover:underline underline-offset-4">Text us anytime</TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
