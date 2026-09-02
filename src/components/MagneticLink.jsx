import React, { useRef } from "react";
import { isCoarsePointer, prefersReducedMotion } from "../lib/prefs";

export default function MagneticLink({ className = "", children, ...props }) {
  const ref = useRef(null);

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const onMove = (event) => {
    const node = ref.current;
    if (!node || isCoarsePointer() || prefersReducedMotion()) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };

  return (
    <a
      ref={ref}
      className={`magnetic-link ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...props}
    >
      {children}
    </a>
  );
}
