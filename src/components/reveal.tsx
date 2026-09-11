"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll-triggered reveal.
 *
 * Two deliberate choices:
 *
 * 1. No React state. The effect adds the `reveal` class and toggles a data
 *    attribute on the node directly, which is exactly the "synchronise an
 *    external system" job effects are for, and it avoids extra render passes.
 *    CSS owns the animation, so `prefers-reduced-motion` is handled in one place
 *    in globals.css.
 *
 * 2. Content renders visible and is only hidden if the element is actually below
 *    the fold at mount. So nothing is ever trapped invisible when JS fails to
 *    hydrate, and elements already on screen at load don't flash.
 */
export function Reveal({
  children,
  as: Tag = "div",
  index = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    // Already in view at load: leave it alone rather than animating it in.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    node.classList.add("reveal");
    node.dataset.shown = "false";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.dataset.shown = "true";
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      node.classList.remove("reveal");
    };
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ ["--i" as string]: index }}>
      {children}
    </Tag>
  );
}
