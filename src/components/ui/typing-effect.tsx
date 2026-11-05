"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TypingEffectProps
  extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  speed?: number; // ms per char
  delay?: number; // ms before start
  showCursor?: boolean;
  cursorColor?: string;
  cursorChar?: string;
  hideCursorOnComplete?: boolean;
  className?: string;
  once?: boolean;
}

export function TypingEffect({
  text,
  as: Component = "span",
  speed = 36,
  delay = 140,
  showCursor = true,
  cursorColor,
  cursorChar = "|",
  hideCursorOnComplete = true,
  className = "",
  once = false,
  style,
  ...props
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  // Check user prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  // IntersectionObserver to start typing when element scrolls into view,
  // and reset when scrolled out of view so it re-types every time you scroll back
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    if (reducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
          setDisplayedText("");
          setHasStarted(false);
          setIsComplete(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, once, text]);

  // Typing cadence timer
  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    if (!inView) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      setHasStarted(true);
      let currentIndex = 0;

      intervalId = setInterval(() => {
        currentIndex++;
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
        }
        if (currentIndex >= text.length) {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, Math.max(16, speed));
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [inView, text, speed, delay, reducedMotion]);

  // Cursor is visible strictly while characters are actively being typed,
  // and completely disappears as soon as the text is fully typed
  const shouldRenderCursor =
    showCursor &&
    !reducedMotion &&
    hasStarted &&
    (!hideCursorOnComplete || !isComplete);

  return (
    <Component
      ref={containerRef as any}
      aria-label={text}
      className={cn("inline-block", className)}
      style={style}
      {...props}
    >
      <span>{displayedText}</span>
      {shouldRenderCursor && (
        <span
          aria-hidden="true"
          className="inline-block ml-0.5 font-light animate-pulse select-none"
          style={{
            color: cursorColor || "var(--color-accent-light, #D5BC8A)",
            verticalAlign: "baseline",
          }}
        >
          {cursorChar}
        </span>
      )}
    </Component>
  );
}

export default TypingEffect;
