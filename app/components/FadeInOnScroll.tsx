"use client";
import { useInView } from "react-intersection-observer";
import { Box } from "@mui/material";
import React from "react";

// FadeInOnScroll.tsx: shows its content with a fade + slide effect when you scroll to it

// Props: what to show, how long to wait before animating, optional min height
type FadeInOnScrollProps = {
  children: React.ReactNode;
  delay?: number;
  minHeight?: number | string;
};

export default function FadeInOnScroll({
  children,
  delay = 0,
  minHeight,
}: FadeInOnScrollProps) {
  // Check if this element is visible on the screen
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  // If the user prefers no animations (accessibility), do that instead
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : prefersReducedMotion ? 1 : 0,
        transform: inView
          ? "translateY(0)"
          : prefersReducedMotion
            ? "none"
            : "translateY(40px)",
        transition: prefersReducedMotion
          ? "none"
          : `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms`,
        willChange: prefersReducedMotion ? "auto" : "opacity, transform",
        display: "block",
        minHeight: minHeight || undefined,
      }}
    >
      {children}
    </Box>
  );
}
