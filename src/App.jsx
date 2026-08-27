import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Cpu, Sparkles, Code2, ArrowUpRight, 
  Briefcase, GraduationCap, Mail, FileText, CheckCircle2 
} from 'lucide-react';
import GlassHeroScene from './components/GlassHeroScene';

// ==========================================
// CUSTOMIZED CV DATA
// ==========================================
const CV_DATA = {
  header: {
    name: "Boi-D Holland",
    title: "Vibe Coder & Systems Automator",
    status: "Available for Hire",
    location: "Remote",
    bio: "High-velocity developer specializing in AutoHotkey automation, game memory analysis, AI agent workflows with Cursor & MCP, and rapid web prototyping. Shipped custom scripts, hosted web bots, and reverse-engineered game mechanics."
  },
  
  metrics: [
    { label: "Primary Language", value: "AHK", detail: "Custom macros & key-hook scripts" },
    { label: "Reverse Eng.", value: "Cheat Engine", detail: "Memory debugging & offsets" },
    { label: "AI Workflows", value: "Cursor + MCP", detail: "Context-aware AI dev stacks" }
  ],

  experience: [
    {
      role: "Automation & AI Workflow Engineer",
      company: "Independent Projects",
      period: "2024 - Present",
      description: "Focused on low-level script automation, memory debugging, modern AI tool integrations, and full-stack hosting.",
      highlights: [
        "Engineered advanced AutoHotkey (AHK) macros using direct input hooks and time-holding logic.",
        "Utilized Cheat Engine for game reverse engineering, memory mapping, and real-time value debugging.",
        "Configured Model Context Protocol (MCP) servers within Cursor to build context-aware AI coding pipelines.",
        "Built and hosted production-ready web applications, micro-sites, and active Discord bots.",
        "Wrote utility scripts and automation tools in Python for rapid backend data handling."
      ]
    },
    {
      role: "Graphics & Interface Design",
      company: "Design Sprints",
      period: "2024 (10 Months)",
      description: "Delivered digital graphics, UI layouts, and asset components across web platforms.",
      highlights: [
        "Spent 8 months producing custom visual assets, textures, and banners in Photopea.",
        "Executed 2 months of rapid UI/UX wireframing and interactive interface mockups in Figma.",
        "Applied minor compositional and post-processing work using Adobe Creative Cloud suite tools."
      ]
    },
    {
      role: "AI Model Experimentation & Research",
      company: "Early AI Workflows",
      period: "June 2023 - June 2024",
      description: "Initial foundational year experimenting with early LLM prompting, system instructions, and script generation.",
      highlights: [
        "Tested structural prompt frameworks and automated text generation with early ChatGPT iterations.",
        "Developed custom prompt structures for single-line automation scripts and code synthesis."
      ]
    }
  ],

  skills: [
    { 
      category: "1. Primary & Automation", 
      items: ["AutoHotkey (AHK)", "Custom Macro Logic", "Python", "Input Manipulation"] 
    },
    { 
      category: "2. Reverse Engineering", 
      items: ["Cheat Engine", "Memory Analysis", "Debugging", "Offset Tracking"] 
    },
    { 
      category: "3. AI Architecture", 
      items: ["Cursor IDE", "MCP Servers", "Prompt Engineering", "Vibe Coding Workflow"] 
    },
    { 
      category: "4. Web & Bot Hosting", 
      items: ["Web Hosting", "Discord Bots", "Vite / React", "Tailwind CSS"] 
    },
    { 
      category: "Graphics & UI/UX", 
      items: ["Photopea (8 Mos)", "Figma (2 Mos)", "Adobe CC Suite", "Visual Design"] 
    }
  ],

  education: [
    {
      degree: "Practical Game Reverse Engineering & Script Automation",
      school: "Self-Directed Projects & Independent Development",
      year: "June 2023 - Present"
    }
  ],

  links: {
    email: "mailto:hollandboid1@gmail.com",
    github: "https://github.com/coraboralul-star",
    pdfCv: "/Boi-D-Holland-CV.pdf"
  }
};

export default function App() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050508] text-gray-100">
      
      {/* 3D / Adaptive Background Canvas */}
      <GlassHeroScene />

      {/* Foreground Glass UI Overlay */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        
        {/* Navigation Bar */}
        <header className="glass-panel flex items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-[#00f3ff]" />
            <span className="font-mono text-sm tracking-wider font-semibold">{CV_DATA.header.name} // CV</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-xs font-mono text-gray-400">
            <a href="#about" className="hover:text-[#00f3ff] transition-colors">/ABOUT</a>
            <a href="#experience" className="hover:text-[#00f3ff] transition-colors">/TIMELINE</a>
            <a href="#skills" className="hover:text-[#00f3ff] transition-colors">/STACK</a>
          </nav>
			<a href={CV_DATA.links.email} className="glass-card flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white">            <span>{CV_DATA.header.status}</span>
            <span className="h-2 w-2 rounded-full bg-[#00ff66] animate-pulse"></span>
          </a>
        </header>

        {/* Hero / About Section */}
        <section id="about" className="mt-12 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-3xl p-8 backdrop-blur-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00f3ff]/20 bg-[#00f3ff]/5 px-3 py-1 text-xs text-[#00f3ff]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{CV_DATA.header.title}</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
              {CV_DATA.header.name}
            </h1>
            
            <p className="mt-4 text-gray-300 text-base leading-relaxed max-w-2xl">
              {CV_DATA.header.bio}
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={CV_DATA.links.email} className="glass-card flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-medium text-white hover:bg-white/15">
                <Mail className="h-4 w-4 text-[#00f3ff]" />
                <span>Get in Touch</span>
              </a>
			<a href={CV_DATA.links.pdfCv} download="Boi-D-Holland-CV.pdf" className="glass-card flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-gray-300">                
			<FileText className="h-4 w-4 text-[#00ff66]" />
                <span>Download PDF CV</span>
              </a>
            </div>
          </motion.div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CV_DATA.metrics.map((m, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <span className="text-2xl font-extrabold text-[#00f3ff] font-mono">{m.value}</span>
                <h3 className="text-sm font-semibold text-white mt-1">{m.label}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work & Timeline Section */}
        <section id="experience" className="mt-16">
          <h2 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-6 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[#00f3ff]" /> Experience & Progression
          </h2>
          
          <div className="space-y-6">
            {CV_DATA.experience.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-3xl p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-sm text-[#00f3ff] font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.highlights.map((item, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#00ff66] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Stack Section */}
        <section id="skills" className="mt-16">
          <h2 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-6 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#8a2be2]" /> Ranked Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CV_DATA.skills.map((group, index) => (
              <div key={index} className="glass-card rounded-3xl p-6">
                <h3 className="text-sm font-semibold text-[#00f3ff] font-mono mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mt-16">
          <h2 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-6 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#00ff66]" /> Timeline Start
          </h2>

          <div className="space-y-4">
            {CV_DATA.education.map((edu, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{edu.school}</p>
                </div>
                <span className="text-xs font-mono text-gray-500">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-mono">
          <span>BUILT FOR VIBE CODING & AUTOMATION ROLES</span>
          <a href={CV_DATA.links.github} className="hover:text-white transition-colors flex items-center gap-1">
            <Code2 className="h-3.5 w-3.5" /> GitHub
          </a>
        </footer>

      </div>
    </main>
  );
}