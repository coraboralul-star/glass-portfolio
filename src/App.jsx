import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, ArrowUpRight } from 'lucide-react';

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

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export default function App() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Subtle ambient particles (very light) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-[#8052ff]/40 rounded-full" />
        <div className="absolute top-40 right-1/3 w-1 h-1 bg-[#ffb829]/30 rounded-full" />
        <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-[#8052ff]/30 rounded-full" />
        <div className="absolute top-[75%] right-[20%] w-1 h-1 bg-[#ffb829]/25 rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 pt-10 pb-24">

        {/* Navigation */}
        <header className="flex items-center justify-between mb-20 sm:mb-28">
          <span className="text-sm font-medium tracking-wide text-white">
            {CV_DATA.header.name}
          </span>

          <nav className="hidden sm:flex items-center gap-8">
            <a href="#experience" className="ghost-link">Experience</a>
            <a href="#skills" className="ghost-link">Skills</a>
            <a href="#education" className="ghost-link">Education</a>
          </nav>

          <a href={CV_DATA.links.email} className="btn-iris text-xs">
            {CV_DATA.header.status}
          </a>
        </header>

        {/* Hero */}
        <section className="mb-28 sm:mb-36">
          <motion.div {...fade}>
            <p className="label-saffron mb-5">{CV_DATA.header.title}</p>

            <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-normal leading-[1.05] tracking-[-0.035em] text-white max-w-3xl">
              {CV_DATA.header.name}
            </h1>

            <p className="mt-8 text-lg sm:text-xl font-extralight leading-relaxed text-[#bdbdbd] max-w-xl">
              {CV_DATA.header.bio}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href={CV_DATA.links.email} className="btn-iris inline-flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
              <a
                href={CV_DATA.links.pdfCv}
                download
                className="ghost-link inline-flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Metrics - floating, no cards */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {CV_DATA.metrics.map((m, i) => (
              <motion.div key={i} {...fade} transition={{ delay: i * 0.08 }}>
                <p className="text-2xl sm:text-3xl font-normal tracking-tight text-white">
                  {m.value}
                </p>
                <p className="mt-2 text-sm text-[#9a9a9a]">{m.label}</p>
                <p className="text-sm font-extralight text-[#bdbdbd] mt-0.5">{m.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-28 sm:mb-36">
          <motion.div {...fade}>
            <p className="label-saffron mb-10">Experience</p>
          </motion.div>

          <div className="space-y-16 sm:space-y-20">
            {CV_DATA.experience.map((exp, index) => (
              <motion.div key={index} {...fade}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-[#8052ff]">{exp.company}</p>
                  </div>
                  <span className="text-sm text-[#9a9a9a] shrink-0">{exp.period}</span>
                </div>

                <p className="text-base font-extralight text-[#bdbdbd] max-w-2xl mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-3 max-w-2xl">
                  {exp.highlights.map((item, hIndex) => (
                    <li key={hIndex} className="flex gap-3 text-sm font-extralight text-[#9a9a9a] leading-relaxed">
                      <span className="text-[#8052ff] mt-1.5 shrink-0">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-28 sm:mb-36">
          <motion.div {...fade}>
            <p className="label-saffron mb-10">Technical Skills</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {CV_DATA.skills.map((group, index) => (
              <motion.div key={index} {...fade}>
                <h3 className="text-sm font-medium text-white mb-4 tracking-wide">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="text-sm font-extralight text-[#9a9a9a]">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mb-20">
          <motion.div {...fade}>
            <p className="label-saffron mb-10">Education & Development</p>
          </motion.div>

          {CV_DATA.education.map((edu, index) => (
            <motion.div key={index} {...fade} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-xl font-normal text-white tracking-tight">{edu.degree}</h3>
                <p className="mt-1 text-sm font-extralight text-[#9a9a9a]">{edu.school}</p>
              </div>
              <span className="text-sm text-[#9a9a9a]">{edu.year}</span>
            </motion.div>
          ))}
        </section>

        {/* Footer */}
        <footer className="pt-16 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm font-extralight text-[#9a9a9a]">
            Automation · Systems · Engineering
          </p>
          <a
            href={CV_DATA.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ghost-link inline-flex items-center gap-1.5"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </footer>
      </div>
    </main>
  );
}