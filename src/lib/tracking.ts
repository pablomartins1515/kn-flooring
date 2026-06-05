import { supabase } from "@/integrations/supabase/client";

export type EventType =
  | "page_view"
  | "call_click"
  | "text_click"
  | "whatsapp_click"
  | "estimate_click"
  | "estimate_submit";

function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    return /iPad|tablet/i.test(ua) ? "tablet" : "mobile";
  }
  return "desktop";
}

export async function trackEvent(
  eventType: EventType,
  metadata?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  try {
    await supabase.from("event_tracking").insert({
      event_type: eventType,
      page: window.location.pathname,
      device_type: getDeviceType(),
      user_agent: navigator.userAgent.slice(0, 500),
      ...(metadata ? { metadata: metadata as never } : {}),
    });
  } catch {
    // Tracking failures must never break the user experience
  }
}
