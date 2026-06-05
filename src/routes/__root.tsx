import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import PageViewTracker from "@/components/PageViewTracker";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KN Flooring — Professional Tile & Flooring Installation NJ" },
      { name: "description", content: "Professional tile and flooring installation in New Jersey." },
      { name: "author", content: "KN Flooring" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "KN Flooring — Professional Tile & Flooring Installation NJ" },
      { name: "twitter:title", content: "KN Flooring — Professional Tile & Flooring Installation NJ" },
      { property: "og:description", content: "Professional tile and flooring installation in New Jersey." },
      { name: "twitter:description", content: "Professional tile and flooring installation in New Jersey." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/13f68b77-7bfd-41ba-9c8d-3bf891405226/id-preview-87e69d00--8770f355-42f0-4cd6-ba2f-61e9085be12b.lovable.app-1776833210426.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/13f68b77-7bfd-41ba-9c8d-3bf891405226/id-preview-87e69d00--8770f355-42f0-4cd6-ba2f-61e9085be12b.lovable.app-1776833210426.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Only ship the weights actually used (300, 400, 500, 600, 700).
      // Drop 800 — never referenced. Reduces font payload ~20%.
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      // ── Google Analytics 4 (GA4) ──
      // Replace G-XXXXXXXXXX with your GA4 Measurement ID
      { src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX", async: true },
      {
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');`,
      },
      // ── LocalBusiness Schema (JSON-LD) ──
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://premium-flooring-hub.lovable.app/#business",
          name: "KN Flooring",
          description: "Owner-operated tile and flooring installation in New Jersey. Bathrooms, showers, kitchens, backsplashes, main floors, vinyl, hardwood, and baseboards.",
          url: "https://premium-flooring-hub.lovable.app",
          telephone: "+1-732-520-8743",
          email: "kn.flooring@hotmail.com",
          image: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/13f68b77-7bfd-41ba-9c8d-3bf891405226/id-preview-87e69d00--8770f355-42f0-4cd6-ba2f-61e9085be12b.lovable.app-1776833210426.png",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressRegion: "NJ",
            addressCountry: "US",
          },
          areaServed: [
            "Jersey City, NJ", "Hoboken, NJ", "Newark, NJ", "Toms River, NJ",
            "Edison, NJ", "Long Branch, NJ", "Red Bank, NJ", "Princeton, NJ",
          ].map((name) => ({ "@type": "City", name })),
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "license",
            name: "NJ Home Improvement Contractor License #13VH14115900",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "6",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <PageViewTracker />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
      <Toaster />
    </>
  );
}
