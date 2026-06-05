import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import heroBathroom from "@/assets/hero-bathroom.webp";
import kitchenBacksplash from "@/assets/kitchen-backsplash.webp";
import showerTile from "@/assets/shower-tile.webp";
import mainfloorProject1 from "@/assets/mainfloor-project-1.webp";
import mainfloorProject2 from "@/assets/mainfloor-project-2.webp";
import mainfloorProject3 from "@/assets/mainfloor-project-3.webp";
import mainfloorProject4 from "@/assets/mainfloor-project-4.webp";
import mainfloorProject5 from "@/assets/mainfloor-project-5.webp";
import mainfloorProject6 from "@/assets/mainfloor-project-6.webp";
import mainfloorProject7 from "@/assets/mainfloor-project-7.webp";
import mainfloorProject8 from "@/assets/mainfloor-project-8.webp";
import mainfloorProject9 from "@/assets/mainfloor-project-9.webp";
import hardwoodFloor from "@/assets/hardwood-floor.webp";
import vinylProject1 from "@/assets/vinyl-project-1.webp";
import vinylProject2 from "@/assets/vinyl-project-2.webp";
import annandaleBacksplash1 from "@/assets/annandale-backsplash-1.webp";
import annandaleBacksplash2 from "@/assets/annandale-backsplash-2.webp";
import annandaleBacksplash3 from "@/assets/annandale-backsplash-3.webp";
import annandaleBacksplash4 from "@/assets/annandale-backsplash-4.webp";
import annandaleBacksplash5 from "@/assets/annandale-backsplash-5.webp";
import annandaleBacksplash6 from "@/assets/annandale-backsplash-6.webp";
import wildwoodBathroom1 from "@/assets/wildwood-bathroom-1.webp";
import wildwoodBathroom2 from "@/assets/wildwood-bathroom-2.webp";
import wildwoodBathroom3 from "@/assets/wildwood-bathroom-3.webp";
import wildwoodBathroom4 from "@/assets/wildwood-bathroom-4.webp";
import wildwoodBathroom5 from "@/assets/wildwood-bathroom-5.webp";
import wildwoodBathroom6 from "@/assets/wildwood-bathroom-6.webp";
import wildwoodBathroom7 from "@/assets/wildwood-bathroom-7.webp";
import wildwoodBathroom8 from "@/assets/wildwood-bathroom-8.webp";
import showerProject1 from "@/assets/shower-project-1.webp";
import showerProject2 from "@/assets/shower-project-2.webp";
import showerProject3 from "@/assets/shower-project-3.webp";
import showerProject4 from "@/assets/shower-project-4.webp";
import showerProject5 from "@/assets/shower-project-5.webp";
import eduardoHardwood1 from "@/assets/eduardo-hardwood-1.webp";
import eduardoHardwood2 from "@/assets/eduardo-hardwood-2.webp";
import eduardoHardwood3 from "@/assets/eduardo-hardwood-3.webp";
import herringboneShower1 from "@/assets/herringbone-shower-1.webp";
import herringboneShower2 from "@/assets/herringbone-shower-2.webp";
import herringboneShower3 from "@/assets/herringbone-shower-3.webp";
import herringboneShower4 from "@/assets/herringbone-shower-4.webp";
import herringboneShower5 from "@/assets/herringbone-shower-5.webp";
import kitchenBacksplash1 from "@/assets/kitchen-backsplash-1.webp";
import kitchenBacksplash2 from "@/assets/kitchen-backsplash-2.webp";
import kitchenBacksplash3 from "@/assets/kitchen-backsplash-3.webp";
import herringboneBacksplash1 from "@/assets/herringbone-backsplash-1.webp";
import herringboneBacksplash2 from "@/assets/herringbone-backsplash-2.webp";
import herringboneBacksplash3 from "@/assets/herringbone-backsplash-3.webp";
import herringboneBacksplash4 from "@/assets/herringbone-backsplash-4.webp";
import herringboneBacksplash5 from "@/assets/herringbone-backsplash-5.webp";
import CTASection from "@/components/CTASection";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — KN Flooring | Tile & Flooring Gallery" },
      { name: "description", content: "Browse our tile and flooring projects across New Jersey. Bathrooms, showers, kitchens, main floors, hardwood, and vinyl installations." },
      { property: "og:title", content: "Our Projects — KN Flooring" },
      { property: "og:description", content: "See real tile and flooring installations completed across New Jersey." },
    ],
  }),
  component: ProjectsPage,
});

const categories = ["All", "Bathrooms", "Backsplash", "Main Floors", "Hardwood", "Vinyl"];

type LabelMode = "beforeAfter" | "finishedResult";

type Project = {
  imgs: string[];
  cat: string;
  caption: string;
  location: string;
  projectType: string;
  workCompleted: string;
  keyDetails: string;
  labelMode?: LabelMode;
};

const projects: Project[] = [
  {
    imgs: [showerProject2, showerProject3, showerProject1, showerProject4, showerProject5],
    cat: "Bathrooms",
    caption: "Walk-in shower with subway wall tile, pebble mosaic floor, and recessed niche detail.",
    location: "New Jersey",
    projectType: "Walk-in Shower Tile Installation",
    workCompleted: "Shower walls, shower floor, recessed niche, waterproofing, grout",
    keyDetails: "Subway wall tile, pebble mosaic floor, clean layout, finished edges",
    labelMode: "finishedResult",
  },
  {
    imgs: [herringboneBacksplash1, herringboneBacksplash2, herringboneBacksplash3, herringboneBacksplash4, herringboneBacksplash5],
    cat: "Backsplash",
    caption: "Full kitchen backsplash transformation — glossy black ceramic subway tile in herringbone pattern with crisp grout lines.",
    location: "New Jersey",
    projectType: "Kitchen Backsplash Installation",
    workCompleted: "Backsplash layout, tile cutting, install, grout, finish edges",
    keyDetails: "Glossy black ceramic subway tile, herringbone pattern, crisp grout lines",
  },
  {
    imgs: [mainfloorProject1, mainfloorProject2, mainfloorProject3, mainfloorProject4, mainfloorProject5, mainfloorProject6, mainfloorProject7, mainfloorProject8, mainfloorProject9],
    cat: "Main Floors",
    caption: "Full main floor build — radiant heating system, cement backer board prep, and large-format polished porcelain tile with waterfront views.",
    location: "New Jersey",
    projectType: "Main Floor Tile Installation",
    workCompleted: "Floor prep, cement backer board, radiant heating, large-format tile install, grout",
    keyDetails: "Polished porcelain, large-format layout, radiant heat system, clean transitions",
  },
  {
    imgs: [eduardoHardwood1, eduardoHardwood2, eduardoHardwood3],
    cat: "Hardwood",
    caption: "Oak hardwood floor sanding, staining, and refinishing in open-plan living room.",
    location: "New Jersey",
    projectType: "Hardwood Floor Refinishing",
    workCompleted: "Sanding, staining, refinishing, finish coats",
    keyDetails: "Oak hardwood, open-plan living room, smooth finish, even color",
  },
  {
    imgs: [vinylProject1, vinylProject2],
    cat: "Vinyl",
    caption: "Light wood-look LVP flooring installed in finished basement with open stair landing.",
    location: "New Jersey",
    projectType: "Vinyl / LVP Flooring Installation",
    workCompleted: "Subfloor check, LVP install, transitions, trim",
    keyDetails: "Light wood-look LVP, finished basement, clean stair landing transition",
    labelMode: "finishedResult",
  },
  {
    imgs: [kitchenBacksplash1, kitchenBacksplash2, kitchenBacksplash3],
    cat: "Backsplash",
    caption: "Arabesque-pattern ceramic backsplash with quartzite countertops and brushed brass hardware.",
    location: "New Jersey",
    projectType: "Kitchen Backsplash Installation",
    workCompleted: "Backsplash install, precise cuts around outlets, grout, finish edges",
    keyDetails: "Arabesque ceramic tile, paired with quartzite counters and brass hardware",
  },
  {
    imgs: [annandaleBacksplash1, annandaleBacksplash2, annandaleBacksplash3, annandaleBacksplash4, annandaleBacksplash5, annandaleBacksplash6],
    cat: "Backsplash",
    caption: "Full kitchen backsplash installation — natural stone subway tile with granite countertops and marble island.",
    location: "Annandale, NJ",
    projectType: "Kitchen Backsplash Installation",
    workCompleted: "Full backsplash layout, install, grout, finish trim",
    keyDetails: "Natural stone subway tile, granite counters, marble island accent",
  },
  {
    imgs: [herringboneShower1, herringboneShower2, herringboneShower3, herringboneShower4, herringboneShower5],
    cat: "Bathrooms",
    caption: "Full shower build — waterproof membrane, white herringbone subway walls, and a marble-look mosaic floor.",
    location: "New Jersey",
    projectType: "Walk-in Shower Tile Installation",
    workCompleted: "Waterproof membrane, shower walls, shower floor, niche, grout",
    keyDetails: "White herringbone subway walls, marble-look mosaic floor, clean edges",
  },
  {
    imgs: [wildwoodBathroom1, wildwoodBathroom2, wildwoodBathroom3, wildwoodBathroom4, wildwoodBathroom5, wildwoodBathroom6, wildwoodBathroom7, wildwoodBathroom8],
    cat: "Bathrooms",
    caption: "Full bathroom tile installation with wave-pattern wall tile, glass corner shelves, and tub surround.",
    location: "Wildwood, NJ",
    projectType: "Full Bathroom Tile Installation",
    workCompleted: "Wall tile, tub surround, glass corner shelves, grout, finish trim",
    keyDetails: "Wave-pattern wall tile, glass corner shelves, clean tub surround layout",
  },
];

function PhotoBadge({ label }: { label: string }) {
  return (
    <div className="absolute bottom-3 left-3 z-10 rounded-full bg-primary/70 backdrop-blur-sm px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
      {label}
    </div>
  );
}

function badgeForIndex(i: number, total: number, mode?: LabelMode): string | null {
  if (mode === "finishedResult") {
    return i === 0 ? "Finished Result" : null;
  }
  if (i === 0) return "Before";
  if (i === total - 1) return "After";
  return null;
}

function ProjectSlider({ imgs, alt, labelMode }: { imgs: string[]; alt: string; labelMode?: LabelMode }) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Only autoplay sliders that are actually on screen — saves CPU when many
  // gallery cards are offscreen on the projects page.
  useEffect(() => {
    if (imgs.length <= 1 || !containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [imgs.length]);

  useEffect(() => {
    if (imgs.length <= 1 || !isVisible) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c === imgs.length - 1 ? 0 : c + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [imgs.length, isVisible]);

  if (imgs.length === 1) {
    const label = badgeForIndex(0, 1, labelMode);
    return (
      <div className="relative h-full w-full">
        <img
          src={imgs[0]}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          width={640}
          height={480}
        />
        {label && <PhotoBadge label={label} />}
      </div>
    );
  }

  const currentLabel = badgeForIndex(current, imgs.length, labelMode);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {imgs.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${alt} — ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          decoding="async"
          width={640}
          height={480}
        />
      ))}

      {currentLabel && <PhotoBadge label={currentLabel} />}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {imgs.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-4 bg-primary-foreground" : "w-1.5 bg-primary-foreground/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Lightbox({ imgs, initialIndex, onClose }: { imgs: string[]; initialIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? imgs.length - 1 : c - 1)), [imgs.length]);
  const next = useCallback(() => setCurrent((c) => (c === imgs.length - 1 ? 0 : c + 1)), [imgs.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors" aria-label="Close">
        <X size={20} />
      </button>

      {imgs.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <img
          src={imgs[current]}
          alt={`Photo ${current + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
        />
      </div>

      {imgs.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {imgs.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/40"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-6 right-6 text-primary-foreground/50 text-sm">
        {current + 1} / {imgs.length}
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<{ imgs: string[]; index: number } | null>(null);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <div className="pb-16 lg:pb-0">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img src={kitchenBacksplash} alt="KN Flooring projects" className="h-full w-full object-cover opacity-15" width={1920} height={1080} />
        </div>
        <div className="relative px-6 pt-40 pb-20 md:px-10 md:pt-48 md:pb-24 lg:px-16">
          <div className="container-wide">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-walnut" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-walnut">Portfolio</p>
              </div>
              <h1 className="text-4xl font-bold md:text-5xl lg:text-[3.25rem] tracking-[-0.03em]">Our Projects</h1>
              <p className="mt-5 text-base text-primary-foreground/45 leading-relaxed max-w-md">
                Real work. Real finishes. Real results across New Jersey.
              </p>
              <p className="mt-4 text-[0.82rem] font-semibold tracking-[0.02em] text-walnut">
                Every photo shown here is real KN Flooring work — no stock photos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-36">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 mb-14">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                  filter === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-foreground/50 border border-border/60 hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <div key={i} className={`group ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div
                  className={`overflow-hidden rounded-2xl cursor-pointer ${i === 0 ? "aspect-[16/10] sm:aspect-[2/1] lg:aspect-[4/3]" : "aspect-[4/3]"}`}
                  onClick={() => setLightbox({ imgs: p.imgs, index: 0 })}
                >
                  <ProjectSlider imgs={p.imgs} alt={p.caption} labelMode={p.labelMode} />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-walnut/50 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-foreground/50">{p.cat}</span>
                      <span className="text-[0.6rem] text-muted-foreground/50">·</span>
                      <span className="text-[0.65rem] text-muted-foreground/50">{p.location}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.caption}</p>

                    <dl className="mt-4 space-y-1.5 text-[0.78rem] leading-relaxed">
                      <div className="flex gap-2">
                        <dt className="font-semibold text-foreground/75 shrink-0">Project Type:</dt>
                        <dd className="text-muted-foreground">{p.projectType}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold text-foreground/75 shrink-0">Location:</dt>
                        <dd className="text-muted-foreground">{p.location}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold text-foreground/75 shrink-0">Work Completed:</dt>
                        <dd className="text-muted-foreground">{p.workCompleted}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold text-foreground/75 shrink-0">Key Details:</dt>
                        <dd className="text-muted-foreground">{p.keyDetails}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      {lightbox && (
        <Lightbox imgs={lightbox.imgs} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}