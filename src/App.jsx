import React from 'react';
import { motion } from 'framer-motion';
import {
  Terminal, Cpu, Briefcase, GraduationCap, Mail, FileText, CheckCircle2, Code2
} from 'lucide-react';
import GlassHeroScene from './components/GlassHeroScene';

const CV_DATA = {
  header: {
    name: "Boi-D Holland",
    title: "Automation Engineer & Systems Developer",
    status: "Available for Hire",
    location: "Remote",
    bio: "Developer focused on automation systems, process scripting, reverse engineering, and practical web tooling. Experienced building reliable AutoHotkey solutions, memory analysis workflows, production web applications, Discord bots, and efficient Python utilities."
  },

  metrics: [
    { label: "Primary Stack", value: "AHK + Python", detail: "Automation scripts & utilities" },
    { label: "Analysis", value: "Memory Tools", detail: "Debugging & offset mapping" },
    { label: "Delivery", value: "Full-Stack", detail: "Web apps, bots & hosting" }
  ],

  experience: [
    {
      role: "Automation & Systems Engineer",
      company: "Independent Projects",
      period: "2024 – Present",
      description: "Design and maintain automation systems, scripting tools, reverse-engineering workflows, and hosted applications.",
      highlights: [
        "Developed advanced AutoHotkey (AHK) macros with direct input hooks, timing logic, and reliable key-event handling.",
        "Performed memory analysis and reverse engineering using Cheat Engine for debugging, mapping, and real-time value inspection.",
        "Built and configured development environments integrating modern IDE tooling and protocol-based context servers.",
        "Shipped and hosted production web applications, micro-sites, and active Discord bots.",
        "Created Python utility scripts for data handling, automation, and backend support tasks."
      ]
    },
    {
      role: "Graphics & Interface Designer",
      company: "Design Projects",
      period: "2024 (10 months)",
      description: "Produced digital assets, UI layouts, and visual components for web and interface work.",
      highlights: [
        "Created custom visual assets, textures, and banners over an extended production period using Photopea.",
        "Built UI/UX wireframes and interactive interface mockups in Figma.",
        "Applied compositional and post-processing work with Adobe Creative Cloud tools."
      ]
    },
    {
      role: "Automation & Prompt Systems Development",
      company: "Independent Research",
      period: "June 2023 – June 2024",
      description: "Built foundational automation and structured generation workflows.",
      highlights: [
        "Designed structured prompt frameworks and automated text/code generation pipelines.",
        "Developed reusable prompt patterns for reliable single-purpose automation scripts and code synthesis."
      ]
    }
  ],

  skills: [
    {
      category: "Automation & Scripting",
      items: ["AutoHotkey (AHK)", "Custom Macro Systems", "Python", "Input & Process Control"]
    },
    {
      category: "Reverse Engineering & Analysis",
      items: ["Cheat Engine", "Memory Analysis", "Debugging", "Offset Mapping"]
    },
    {
      category: "Development Tooling",
      items: ["Modern IDEs", "Context Protocols", "Structured Prompting", "Workflow Automation"]
    },
    {
      category: "Web & Hosting",
      items: ["Web Application Hosting", "Discord Bots", "Vite / React", "Tailwind CSS"]
    },
    {
      category: "Design & UI",
      items: ["Photopea", "Figma", "Adobe Creative Cloud", "Visual Design"]
    }
  ],

  education: [
    {
      degree: "Applied Reverse Engineering & Automation Systems",
      school: "Self-Directed Development & Independent Projects",
      year: "June 2023 – Present"
    }
  ],

  links: {
    email: "mailto:hollandboid1@gmail.com",
    github: "https://github.com/coraboralul-star",
    pdfCv: "/Boi-D-Holland-CV.pdf"
  }
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
};

export default function App() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050508] text-gray-100">
      <GlassHeroScene />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 py-8 sm:py-10">
        {/* Nav */}
        <header className="glass-panel flex items-center justify-between rounded-full px-5 sm:px-6 py-3">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-[#00f3ff]" />
            <span className="font-mono text-xs sm:text-sm tracking-wider font-semibold">
              {CV_DATA.header.name}
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-xs font-mono text-gray-400">
            <a href="#about" className="hover:text-[#00f3ff] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#00f3ff] transition-colors">Experience</a>
            <a href="#skills" className="hover:text-[#00f3ff] transition-colors">Skills</a>
          </nav>

          <a
            href={CV_DATA.links.email}
            className="glass-card flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white"
          >
            <span>{CV_DATA.header.status}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ff66] animate-pulse" />
          </a>
        </header>

        {/* Hero */}
        <section id="about" className="mt-10 sm:mt-12 flex flex-col gap-5 sm:gap-6">
          <motion.div
            {...fadeUp}
            className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-2xl relative overflow-hidden"
          >
            {/* subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f3ff]/40 to-transparent" />

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00f3ff]/25 bg-[#00f3ff]/8 px-3 py-1 text-xs text-[#00f3ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00f3ff]" />
              <span>{CV_DATA.header.title}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
              {CV_DATA.header.name}
            </h1>

            <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {CV_DATA.header.bio}
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
              <a
                href={CV_DATA.links.email}
                className="glass-card group flex items-center gap-2 rounded-xl bg-white/8 px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-white text-sm"
              >
                <Mail className="h-4 w-4 text-[#00f3ff] group-hover:scale-110 transition-transform" />
                <span>Get in Touch</span>
              </a>
              <a
                href={CV_DATA.links.pdfCv}
                download="Boi-D-Holland-CV.pdf"
                className="glass-card group flex items-center gap-2 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-gray-300 text-sm"
              >
                <FileText className="h-4 w-4 text-[#00ff66] group-hover:scale-110 transition-transform" />
                <span>Download PDF CV</span>
              </a>
            </div>
          </motion.div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {CV_DATA.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.08, duration: 0.5 }}
                className="glass-card rounded-2xl p-4 sm:p-5"
              >
                <span className="text-xl sm:text-2xl font-extrabold text-[#00f3ff] font-mono tracking-tight">
                  {m.value}
                </span>
                <h3 className="text-sm font-semibold text-white mt-1">{m.label}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{m.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mt-14 sm:mt-16">
          <h2 className="section-label text-xs font-mono tracking-widest text-gray-500 uppercase mb-5 sm:mb-6 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[#00f3ff]" />
            Professional Experience
          </h2>

          <div className="space-y-4 sm:space-y-5">
            {CV_DATA.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-sm text-[#00f3ff] font-medium mt-0.5">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/8 px-3 py-1 rounded-full w-fit shrink-0">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.highlights.map((item, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 leading-relaxed">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#00ff66] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-14 sm:mt-16">
          <h2 className="section-label text-xs font-mono tracking-widest text-gray-500 uppercase mb-5 sm:mb-6 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#8a2be2]" />
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {CV_DATA.skills.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6"
              >
                <h3 className="text-sm font-semibold text-[#00f3ff] font-mono mb-3.5">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mt-14 sm:mt-16">
          <h2 className="section-label text-xs font-mono tracking-widest text-gray-500 uppercase mb-5 sm:mb-6 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#00ff66]" />
            Education & Development
          </h2>

          <div className="space-y-3">
            {CV_DATA.education.map((edu, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
              >
                <div>
                  <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{edu.school}</p>
                </div>
                <span className="text-xs font-mono text-gray-500 shrink-0">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-white/6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-gray-500 font-mono">
          <span>Automation · Systems · Engineering</span>
          <a
            href={CV_DATA.links.github}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Code2 className="h-3.5 w-3.5" />
            GitHub
          </a>
        </footer>
      </div>
    </main>
  );
}