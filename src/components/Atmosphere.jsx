import React, { useEffect, useRef } from "react";
import { isCoarsePointer, isMobileViewport, prefersReducedMotion } from "../lib/prefs";

function NodeField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    if (prefersReducedMotion() || isMobileViewport()) return undefined;

    const ctx = canvas.getContext("2d");
    const pointer = { x: 0.5, y: 0.5 };
    const count = isCoarsePointer() ? 28 : 46;
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
    }));

    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node) => {
        node.x += node.vx + (pointer.x - 0.5) * 0.00012;
        node.y += node.vy + (pointer.y - 0.5) * 0.00008;
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;
        node.x = Math.min(1, Math.max(0, node.x));
        node.y = Math.min(1, Math.max(0, node.y));
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx * width, dy * height);
          if (dist > 140) continue;
          const alpha = (1 - dist / 140) * 0.14;
          ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x * width, nodes[i].y * height);
          ctx.lineTo(nodes[j].x * width, nodes[j].y * height);
          ctx.stroke();
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(167, 139, 250, 0.38)";
        ctx.arc(node.x * width, node.y * height, 1.15, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      pointer.x = event.clientX / window.innerWidth;
      pointer.y = event.clientY / window.innerHeight;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="atmosphere-canvas" aria-hidden="true" />;
}

export default function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="bloom bloom-a" />
      <div className="bloom bloom-b" />
      <div className="bloom bloom-c" />
      <div className="tech-grid" />
      <NodeField />
      <div className="vignette" />
      <div className="scan" />
      <div className="grain" />
    </div>
  );
}
