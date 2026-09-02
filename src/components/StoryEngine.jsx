import React, { useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CINEMATIC_STORY_QUERY, STATIC_STORY_QUERY } from "../lib/prefs";
gsap.registerPlugin(Observer, ScrollTrigger);

function holdWheel(self) {
  if (self.event?.cancelable) self.event.preventDefault();
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(lenis.scroll, { immediate: true });
}

function createPinnedGuard({ trigger, steps, onStep, downCooldown = 0.7, autoPlayDown = false }) {
  let index = 0;
  let busy = false;
  let cooldown = false;
  let armed = false;
  let cooldownCall;

  const clearCooldown = () => {
    cooldownCall?.kill();
    cooldownCall = null;
    cooldown = false;
  };

  const play = (next, dir) => {
    if (busy || next === index || next < 0 || next >= steps) return false;
    busy = true;
    clearCooldown();
    const from = index;
    index = next;
    const tl = onStep(from, next, dir);

    const finish = () => {
      busy = false;
      if (dir > 0) {
        cooldown = true;
        cooldownCall = gsap.delayedCall(downCooldown, clearCooldown);
      }
    };

    if (tl?.eventCallback) tl.eventCallback("onComplete", finish);
    else finish();
    return true;
  };

  const handle = (down, self) => {
    if (!armed) return;

    if (!down) {
      clearCooldown();
      if (busy) {
        holdWheel(self);
        return;
      }
      if (index > 0) {
        holdWheel(self);
        play(index - 1, -1);
      }
      return;
    }

    if (busy || cooldown) {
      holdWheel(self);
      return;
    }
    if (index < steps - 1) {
      holdWheel(self);
      play(index + 1, 1);
    }
  };

  const observer = Observer.create({
    target: window,
    type: "wheel,touch,pointer",
    tolerance: 18,
    preventDefault: false,
    onDown: (self) => handle(true, self),
    onUp: (self) => handle(false, self),
  });
  observer.disable();

  const st = ScrollTrigger.create({
    trigger,
    start: "top top",
    end: `+=${90 + (steps - 1) * 15}%`,
    pin: true,
    anticipatePin: 1,
    onToggle(self) {
      armed = self.isActive;
      if (self.isActive) {
        observer.enable();
        if (autoPlayDown && self.direction === 1 && index === 0) play(1, 1);
      } else {
        observer.disable();
      }
    },
  });

  return { observer, st, play };
}

export default function StoryEngine({ children }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const wrap = root.current;
      if (!wrap) return undefined;

      const mm = gsap.matchMedia();

      mm.add(STATIC_STORY_QUERY, () => {
        wrap.classList.add("story-static");
        gsap.set(
          [
            ".display-name",
            ".intro-title",
            ".intro-bio",
            ".intro-actions",
            ".intro-metrics",
            ".fork-copy > *",
            ".fork-node",
            ".fork-line",
            ".exp-slide",
          ],
          { clearProps: "all" },
        );
        gsap.set(".fork-line", { strokeDashoffset: 0 });
        return () => wrap.classList.remove("story-static");
      });

      mm.add(CINEMATIC_STORY_QUERY, () => {
      wrap.classList.remove("story-static");

      const name = wrap.querySelector(".display-name");
      const title = wrap.querySelector(".intro-title");
      const bio = wrap.querySelector(".intro-bio");
      const actions = wrap.querySelector(".intro-actions");
      const hint = wrap.querySelector(".cover-hint");
      const metrics = wrap.querySelector(".intro-metrics");

      gsap.set([title, bio, actions, metrics], { autoAlpha: 0, y: 32 });
      gsap.set(name, { y: 48, autoAlpha: 0.14 });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-pin",
          start: "top top",
          end: "+=185%",
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
        },
      });

      introTl
        .to(name, { y: 0, autoAlpha: 1, duration: 0.7 }, 0)
        .to(hint, { autoAlpha: 0, y: -16, duration: 0.25 }, 0.12)
        .to(title, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.42)
        .to(bio, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.62)
        .to(actions, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.8)
        .to(
          name,
          {
            fontSize: "clamp(2.2rem, 5.2vmin, 3.4rem)",
            duration: 0.45,
          },
          1.05,
        )
        .to(metrics, { autoAlpha: 1, y: 0, duration: 0.35 }, 1.12);

      const forkCopy = wrap.querySelectorAll(".fork-copy > *");
      const forkNodes = gsap.utils.toArray(".fork-node");
      const forkBranches = gsap.utils.toArray(".fork-branch");
      const forkStem = wrap.querySelector(".fork-stem");

      gsap.set(forkCopy, { autoAlpha: 0, y: 22 });
      gsap.set(forkNodes, { autoAlpha: 0, y: 24 });
      gsap.set(".fork-line", { strokeDashoffset: 1 });

      const buildForkEnter = () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(
          forkCopy,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.07 },
        );
        forkNodes.forEach((node, i) => {
          tl.fromTo(node, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.3 }, "+=0.04");
          if (forkBranches[i]) {
            tl.fromTo(
              forkBranches[i],
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 0.48 },
              "-=0.04",
            );
          }
          if (i === 0 && forkStem) {
            tl.fromTo(forkStem, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.32 }, "-=0.08");
          }
        });
        return tl;
      };

      const buildForkExit = () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.in" } });
        for (let i = forkNodes.length - 1; i >= 0; i -= 1) {
          if (i === 0 && forkStem) {
            tl.to(forkStem, { strokeDashoffset: 1, duration: 0.22 }, 0);
          }
          if (forkBranches[i]) {
            tl.to(forkBranches[i], { strokeDashoffset: 1, duration: 0.28 }, i === forkNodes.length - 1 ? 0 : "-=0.06");
          }
          tl.to(forkNodes[i], { autoAlpha: 0, y: 18, duration: 0.22 }, "-=0.12");
        }
        tl.to(forkCopy, { autoAlpha: 0, y: 16, duration: 0.28, stagger: 0.04 }, "-=0.08");
        return tl;
      };

      const slides = gsap.utils.toArray(".exp-slide");
      if (slides.length) {
        gsap.set(slides, { autoAlpha: 0, y: 40, pointerEvents: "none" });
        gsap.set(slides[0], { autoAlpha: 1, y: 0, pointerEvents: "auto" });
      }

      const guards = [];

      guards.push(
        createPinnedGuard({
          trigger: ".fork-pin",
          steps: 2,
          autoPlayDown: true,
          downCooldown: 0.45,
          onStep: (_from, to) => (to === 1 ? buildForkEnter() : buildForkExit()),
        }),
      );

      if (slides.length) {
        guards.push(
          createPinnedGuard({
            trigger: ".exp-pin",
            steps: slides.length,
            downCooldown: 0.75,
            onStep: (from, to, dir) =>
              gsap
                .timeline({ defaults: { ease: "power3.inOut" } })
                .to(slides[from], {
                  autoAlpha: 0,
                  y: dir > 0 ? -48 : 48,
                  pointerEvents: "none",
                  duration: 0.38,
                })
                .fromTo(
                  slides[to],
                  { autoAlpha: 0, y: dir > 0 ? 48 : -48, pointerEvents: "none" },
                  { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 0.42 },
                ),
          }),
        );
      }

      gsap.utils.toArray(".skill-row").forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          x: -48,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
            once: true,
          },
        });
      });

      gsap.from(".edu-panel > *", {
        autoAlpha: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".edu-panel",
          start: "top 72%",
          once: true,
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      const id = window.setTimeout(refresh, 80);
      window.addEventListener("resize", refresh);

      return () => {
        window.clearTimeout(id);
        window.removeEventListener("resize", refresh);
        guards.forEach(({ observer, st }) => {
          observer.kill();
          st.kill();
        });
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="story">
      {children}
    </div>
  );
}
