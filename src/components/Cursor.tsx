"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const baseColor = "#F5A545";
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let raf: number;

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
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
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
    </>
  );
}
