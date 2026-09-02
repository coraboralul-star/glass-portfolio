import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { isCoarsePointer, prefersReducedMotion } from "../lib/prefs";

export default function CustomCursor() {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return undefined;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return undefined;

    document.body.classList.add("has-cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    const onMove = (event) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      gsap.set(dot, { x: pos.x, y: pos.y });
    };

    const onOver = (event) => {
      const hot = event.target.closest("a, button, [data-cursor='hot']");
      root.classList.toggle("is-hot", Boolean(hot));
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    gsap.ticker.add(tick);

    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      gsap.ticker.remove(tick);
    };
  }, []);

  if (typeof window !== "undefined" && (isCoarsePointer() || prefersReducedMotion())) {
    return null;
  }

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      <span ref={dotRef} className="cursor-dot" />
      <span ref={ringRef} className="cursor-ring" />
    </div>
  );
}
