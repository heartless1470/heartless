"use client";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const STAR_COLORS = ["#ffffff", "#ffffff", "#ffffff", "#f0ede8", "#e8f0ff", "#c8f545"];

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 220 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        duration: Math.random() * 5 + 2,
        delay: Math.random() * 7,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }))
    );
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {stars.map((star) => (
          <span
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: star.color,
              animation: `starTwinkle ${star.duration}s ${star.delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes starTwinkle {
          from { opacity: 0.08; transform: scale(0.8); }
          to   { opacity: 0.9;  transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}
