import React, { useEffect, useState } from "react";

export default function ScrollProgress({ active }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setValue(max > 0 ? window.scrollY / max : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${value})` }} />
    </div>
  );
}
