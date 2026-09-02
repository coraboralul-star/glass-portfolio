export const STATIC_STORY_QUERY =
  "(max-width: 767px), (max-height: 540px), (hover: none) and (max-width: 1180px), (prefers-reduced-motion: reduce)";

export const CINEMATIC_STORY_QUERY =
  "(min-width: 768px) and (min-height: 541px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function isStaticStory() {
  return window.matchMedia(STATIC_STORY_QUERY).matches;
}

export function isMobileViewport() {
  return isStaticStory();
}

export function shouldSkipIntro() {
  return (
    new URLSearchParams(window.location.search).has("skip") ||
    window.sessionStorage.getItem("gp-entered") === "1" ||
    prefersReducedMotion()
  );
}
