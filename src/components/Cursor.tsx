"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const baseColor = "#F5A545";
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let prevDotX = 0, prevDotY = 0;
    let raf: number;
    let lastMoveAt = 0;
    const trail: Array<{ x: number; y: number }> = [];

    const isAccentGreen = (value: string) => {
      const m = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (!m) return false;
      const r = Number(m[1]);
      const g = Number(m[2]);
      const b = Number(m[3]);
      return r > 160 && g > 210 && b < 130;
    };

    const setCursorBlack = (black: boolean) => {
      if (dotRef.current) {
        dotRef.current.style.background = black ? "#0a0a0f" : baseColor;
      }
      if (ringRef.current) {
        ringRef.current.style.borderColor = black ? "#0a0a0f" : baseColor;
      }
    };

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      lastMoveAt = performance.now();

      const hovered = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (hovered) {
        const styles = window.getComputedStyle(hovered);
        const onAccent = [styles.backgroundColor, styles.borderColor, styles.color].some(isAccentGreen);
        setCursorBlack(onAccent);
      }

      if (blobRef.current) {
        blobRef.current.style.left = `${e.clientX}px`;
        blobRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      trail.unshift({ x: dotX, y: dotY });
      if (trail.length > 18) trail.pop();

      const movement = Math.hypot(dotX - prevDotX, dotY - prevDotY);
      const moving = movement > 0.4;
      const activeFade = Math.max(0, 1 - (performance.now() - lastMoveAt) / 180);
      const particleOpacity = moving ? 0.22 : 0.22 * activeFade;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }

      particleRefs.current.forEach((particle, index) => {
        if (!particle) return;
        const point = trail[(index + 1) * 4] ?? trail[trail.length - 1];
        if (!point) return;
        const size = 5 - index;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = `${Math.max(0, particleOpacity - index * 0.05)}`;
        particle.style.transform = `translate(${point.x - size / 2}px, ${point.y - size / 2}px)`;
      });

      prevDotX = dotX;
      prevDotY = dotY;
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = baseColor;
        ringRef.current.style.mixBlendMode = "difference";
      }
    };
    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "40px";
        ringRef.current.style.height = "40px";
        ringRef.current.style.borderColor = baseColor;
        ringRef.current.style.mixBlendMode = "normal";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={blobRef}
        className="glow-blob"
        style={{ left: "-300px", top: "-300px" }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#F5A545",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid #F5A545",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
          willChange: "transform",
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el;
          }}
          className="cursor-particle"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 5 - i,
            height: 5 - i,
            borderRadius: "50%",
            background: "#F5A545",
            pointerEvents: "none",
            zIndex: 9997,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </>
  );
}
