import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { isMobileViewport, prefersReducedMotion } from "../lib/prefs";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ enabled = true }) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion() || isMobileViewport()) return undefined;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      const target = id && document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.start();
      lenis.scrollTo(target, { offset: 0 });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [enabled]);

  return null;
}
