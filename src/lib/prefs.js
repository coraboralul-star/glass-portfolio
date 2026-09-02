export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function isMobileViewport() {
  return window.innerWidth < 768;
}

export function shouldSkipIntro() {
  return (
    new URLSearchParams(window.location.search).has("skip") ||
    window.sessionStorage.getItem("gp-entered") === "1" ||
    prefersReducedMotion()
  );
}
