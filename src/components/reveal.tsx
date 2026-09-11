"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll-triggered reveal. Deliberately minimal: it toggles one data attribute
 * and lets CSS own the animation, so `prefers-reduced-motion` is handled in one
 * place in globals.css rather than in JS.
 *
 * Elements start visible and are only hidden once the observer is confirmed to
 * be running, so content is never trapped invisible if JS fails to hydrate.
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
  const [shown, setShown] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${armed ? "reveal" : ""} ${className}`}
      data-shown={shown ? "true" : "false"}
      style={{ ["--i" as string]: index }}
    >
      {children}
    </Tag>
  );
}
