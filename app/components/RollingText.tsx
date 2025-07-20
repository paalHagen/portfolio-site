"use client";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// RollingText.tsx: shows a list of phrases that change every few seconds with a fade + slide effect

export default function RollingText() {
  const theme = useTheme();

  // List of phrases to cycle through
  const texts = [
    "Recent Computer Science graduate",
    "Problem solver, communicator, developer",
    "Blending people skills with programming",
    "New to tech, eager to make an impact",
  ];
  const [index, setIndex] = useState(0); // Which phrase is currently showing
  const [fade, setFade] = useState(true); // Whether the current phrase is faded in

  // Check if user prefers reduced motion (accessibility setting)
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 400); // fade out for 400ms, then change
    }, 2000);
    return () => clearInterval(interval);
  }, [texts.length, prefersReducedMotion]);

  return (
    <div
      style={{
        height: 48,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", height: 48, width: "100%" }}>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: prefersReducedMotion ? 1 : fade ? 1 : 0,
            transform: prefersReducedMotion
              ? "none"
              : fade
                ? "translateY(0)"
                : "translateY(2rem)",
            transition: prefersReducedMotion
              ? "none"
              : "opacity 0.4s, transform 0.4s",
            fontWeight: 600,
            fontSize: "2rem",
          }}
        >
          {texts[index]}
        </Typography>
      </div>
    </div>
  );
}
