import React, { useEffect } from "react";
import { Briefcase, CheckCircle2, Code2, Cpu, FileText, GraduationCap, Mail } from "lucide-react";
import { audio } from "./lib/audio";
import { startViewportScale } from "./lib/scale";
import { CV_DATA } from "./data/cv";
import Atmosphere from "./components/Atmosphere";
import CustomCursor from "./components/CustomCursor";
import MagneticLink from "./components/MagneticLink";
import MuteButton from "./components/MuteButton";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";
import StoryEngine from "./components/StoryEngine";

function jumpTo(id) {
  const target = document.querySelector(id);
  if (!target) return;
  window.__lenis?.start();
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: 0 });
  else target.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  useEffect(() => {
    const stopScale = startViewportScale();
    const unlock = async () => {
      await audio.unlock();
      audio.enter();
    };
    const onFirst = () => {
      unlock();
      window.removeEventListener("pointerdown", onFirst);
    };
    window.addEventListener("pointerdown", onFirst, { once: true });

    let last = null;
    const onOver = (event) => {
      const hit = event.target.closest("a, button");
      if (hit && hit !== last) {
        last = hit;
        audio.hover();
      }
      if (!hit) last = null;
    };
    const onClick = (event) => {
      if (event.target.closest("a, button")) audio.tick();
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("click", onClick);
    return () => {
      stopScale();
      window.removeEventListener("pointerdown", onFirst);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Atmosphere />
      <SmoothScroll />
      <ScrollProgress active />
      <MuteButton audio={audio} />

      <header className="chrome">
        <a href="#intro" className="chrome-name">
          {CV_DATA.header.name}
        </a>
        <nav className="chrome-nav">
          <a href="#path">Path</a>
          <a href="#experience">Work</a>
          <a href="#skills">Skills</a>
        </nav>
        <a href={CV_DATA.links.email} className="chrome-status">
          {CV_DATA.header.status}
          <span className="status-dot" />
        </a>
      </header>

      <StoryEngine>
        <section id="intro" className="intro-pin">
          <div className="intro-sticky">
            <p className="eyebrow">Automation · Systems · Engineering</p>
            <h1 className="display-name">
              Boi-D
              <br />
              Holland
            </h1>
            <p className="intro-title">{CV_DATA.header.title}</p>
            <p className="intro-bio">{CV_DATA.header.bio}</p>
            <div className="intro-actions">
              <MagneticLink href={CV_DATA.links.email} className="cta cta-solid">
                <Mail className="cta-icon" />
                Get in Touch
              </MagneticLink>
              <MagneticLink
                href={CV_DATA.links.pdfCv}
                download="Boi-D-Holland-CV.pdf"
                className="cta"
              >
                <FileText className="cta-icon" />
                Download PDF CV
              </MagneticLink>
            </div>
            <div className="intro-metrics">
              {CV_DATA.metrics.map((m) => (
                <div key={m.label} className="metric">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                  <em>{m.detail}</em>
                </div>
              ))}
            </div>
            <p className="cover-hint">
              <span className="hint-line" />
              Scroll
            </p>
          </div>
        </section>

        <section id="path" className="fork-pin">
          <div className="fork-sticky">
            <div className="fork-copy">
              <p className="chapter-index">02</p>
              <p className="eyebrow">Choose a path</p>
              <h2 className="fork-title">Where next.</h2>
            </div>
            <div className="fork-stage">
              <svg className="fork-svg" viewBox="0 0 400 240" fill="none" aria-hidden="true">
                <path className="fork-line fork-stem" pathLength="1" d="M200 88 V8" />
                <path className="fork-line fork-branch" pathLength="1" d="M72 214 C72 156 200 148 200 88" />
                <path className="fork-line fork-branch" pathLength="1" d="M200 214 V88" />
                <path className="fork-line fork-branch" pathLength="1" d="M328 214 C328 156 200 148 200 88" />
              </svg>
              <div className="fork-nodes">
                <button type="button" className="fork-node" onClick={() => jumpTo("#experience")}>
                  <Briefcase className="fork-icon" />
                  <span className="fork-label">Experience</span>
                  <span className="fork-sub">The work</span>
                </button>
                <button type="button" className="fork-node" onClick={() => jumpTo("#skills")}>
                  <Cpu className="fork-icon" />
                  <span className="fork-label">Technical Skills</span>
                  <span className="fork-sub">The stack</span>
                </button>
                <button type="button" className="fork-node" onClick={() => jumpTo("#education")}>
                  <GraduationCap className="fork-icon" />
                  <span className="fork-label">Education & Development</span>
                  <span className="fork-sub">The path in</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="exp-pin">
          <div className="exp-sticky">
            <p className="chapter-index">03</p>
            <p className="eyebrow">
              <Briefcase className="inline-icon" />
              Professional Experience
            </p>
            <div className="exp-frame">
              {CV_DATA.experience.map((exp, index) => (
                <article key={exp.role} className="exp-slide">
                  <div className="exp-meta">
                    <span className="exp-count">
                      {String(index + 1).padStart(2, "0")} / {String(CV_DATA.experience.length).padStart(2, "0")}
                    </span>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-company">{exp.company}</p>
                  <p className="exp-copy">{exp.description}</p>
                  <ul className="exp-list">
                    {exp.highlights.map((item) => (
                      <li key={item}>
                        <CheckCircle2 className="tick" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills-stage">
          <p className="chapter-index">04</p>
          <p className="eyebrow">
            <Cpu className="inline-icon" />
            Technical Skills
          </p>
          <h2 className="stage-title">The stack.</h2>
          <div className="skill-list">
            {CV_DATA.skills.map((group, index) => (
              <div key={group.category} className="skill-row">
                <span className="skill-no">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{group.category}</h3>
                  <p>{group.items.join("  ·  ")}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="edu-stage">
          <div className="edu-panel">
            <p className="chapter-index">05</p>
            <p className="eyebrow">
              <GraduationCap className="inline-icon" />
              Education & Development
            </p>
            {CV_DATA.education.map((edu) => (
              <div key={edu.degree}>
                <h2 className="edu-degree">{edu.degree}</h2>
                <p className="edu-school">{edu.school}</p>
                <p className="edu-year">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        <footer id="contact" className="close-stage">
          <p className="eyebrow">Available for hire</p>
          <h2 className="stage-title">Next move.</h2>
          <div className="intro-actions">
            <MagneticLink href={CV_DATA.links.email} className="cta cta-solid">
              <Mail className="cta-icon" />
              Get in Touch
            </MagneticLink>
            <MagneticLink
              href={CV_DATA.links.pdfCv}
              download="Boi-D-Holland-CV.pdf"
              className="cta"
            >
              <FileText className="cta-icon" />
              Download PDF CV
            </MagneticLink>
          </div>
          <div className="close-foot">
            <span>Automation · Systems · Engineering</span>
            <a href={CV_DATA.links.github}>
              <Code2 className="inline-icon" />
              GitHub
            </a>
          </div>
        </footer>
      </StoryEngine>
    </>
  );
}
