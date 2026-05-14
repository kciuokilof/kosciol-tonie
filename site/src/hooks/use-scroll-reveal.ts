"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Returns a ref + visible boolean that flips to true once the element
 * scrolls into view (one-shot — never resets).
 */
export function useScrollReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * Builds inline CSSProperties for a fadeUp + optional scale reveal.
 */
export function revealStyle(
  visible: boolean,
  delayMs: number,
  options?: { translateY?: number; scale?: boolean; duration?: number },
): CSSProperties {
  const y = options?.translateY ?? 16;
  const duration = options?.duration ?? 500;
  const scale = options?.scale ?? false;

  return {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateY(0) scale(1)"
      : `translateY(${y}px)${scale ? " scale(0.95)" : ""}`,
    transition: `opacity ${duration}ms ease-out ${delayMs}ms, transform ${duration}ms ease-out ${delayMs}ms`,
  };
}
