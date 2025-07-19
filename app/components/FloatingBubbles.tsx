import React, { useEffect, useState } from "react";

const BUBBLE_COUNT = 12;

const COLORS = [
  "rgba(106, 17, 203, 0.18)", // brand blue
  "rgba(37, 117, 252, 0.15)", // lighter blue
  "rgba(255,255,255,0.18)", // white
];

// Type for a single bubbles properties
type Bubble = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  key: number;
};

// Create an array of bubbles with random positions, sizes, etc.
function generateBubbles(): Bubble[] {
  return Array.from({ length: BUBBLE_COUNT }).map((_, i) => {
    const left = Math.random() * 100;
    const size = 18 + Math.random() * 32;
    const duration = 8 + Math.random() * 8;
    const delay = Math.random() * 8;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return { left, size, duration, delay, color, key: i };
  });
}

// FloatingBubbles.tsx: shows animated bubbles floating up in the background
const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [mounted, setMounted] = useState(false);

  // Check if the user prefers reduced motion (accessibility setting)
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setBubbles(generateBubbles());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Do not render bubbles if user prefers no animation
  if (prefersReducedMotion) return null;

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {bubbles.map(({ left, size, duration, delay, color, key }) => (
        <span
          key={key}
          style={{
            position: "absolute",
            left: `${left}vw`,
            bottom: "-60px",
            width: size,
            height: size,
            borderRadius: "50%",
            background: color,
            opacity: 0.7,
            filter: "blur(2px)",
            animation: `bubbleFloat ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            zIndex: 0,
            display: "inline-block",
          }}
        />
      ))}
      {/* The bubble animation */}
      <style>{`
        @keyframes bubbleFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          70% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingBubbles;
