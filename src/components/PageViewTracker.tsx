import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { trackEvent } from "@/lib/tracking";

export default function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    // Don't track admin pages — internal usage shouldn't pollute analytics
    if (location.pathname.startsWith("/admin")) return;
    trackEvent("page_view");
  }, [location.pathname]);
  return null;
}
