import { Phone, MessageSquare } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { PHONE_HREF, SMS_HREF } from "@/lib/contact";
import TrackedLink from "@/components/TrackedLink";

export default function MobileCTA() {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-foreground/8 bg-background/95 backdrop-blur-md lg:hidden pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.12)]">
      <TrackedLink
        event="call_click"
        href={PHONE_HREF}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-[0.8rem] font-semibold tracking-wide text-foreground/75 transition-colors active:bg-muted/30"
      >
        <Phone size={15} strokeWidth={2} />
        Call Now
      </TrackedLink>
      <div className="w-px self-stretch my-2 bg-foreground/8" />
      <TrackedLink
        event="text_click"
        href={SMS_HREF}
        className="flex flex-[1.3] items-center justify-center gap-2 py-4 text-[0.8rem] font-semibold tracking-wide text-walnut-foreground bg-walnut transition-colors active:brightness-95"
      >
        <MessageSquare size={15} strokeWidth={2} />
        Text Photos
      </TrackedLink>
    </div>
  );
}
