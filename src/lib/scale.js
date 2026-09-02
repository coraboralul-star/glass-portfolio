import { isStaticStory } from "./prefs";

export function applyViewportScale() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scale = Math.min(width / 1440, height / 900);
  const clamped = Math.min(1.08, Math.max(0.68, scale));
  const root = document.documentElement;
  root.style.setProperty("--scale", clamped.toFixed(3));
  root.style.setProperty("--vh", `${height * 0.01}px`);
  root.dataset.mode = isStaticStory() ? "mobile" : "desktop";
}

export function startViewportScale() {
  applyViewportScale();
  window.addEventListener("resize", applyViewportScale);
  window.addEventListener("orientationchange", applyViewportScale);
  return () => {
    window.removeEventListener("resize", applyViewportScale);
    window.removeEventListener("orientationchange", applyViewportScale);
  };
}
