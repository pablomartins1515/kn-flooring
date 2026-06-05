import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { trackEvent, type EventType } from "@/lib/tracking";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: EventType;
  children: ReactNode;
};

export default function TrackedLink({ event, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        // Fire-and-forget; do not await — the browser must navigate immediately
        void trackEvent(event);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
