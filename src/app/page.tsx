"use client";
import { motion } from "framer-motion";
import { Text } from '@react-three/drei';
import React from 'react';
import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';

const socialLinks = [
  { href: "https://github.com/Asmi-va", label: "GitHub", icon: "M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" },
  { href: "https://www.linkedin.com/in/asmi-vashista-b92087252/", label: "LinkedIn", icon: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" },
  { href: "mailto:vashistaasmi@gmail.com", label: "Email", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
];

const projectImages = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
];

const skillIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
];

const projects = [
  {
    title: "Women Safety Detection System",
    img: projectImages[0],
    desc: "Real-time alerting via Twilio & Firebase, ML-based threat detection.",
    link: "https://github.com/Asmi-va/women_safety_analysis"
  },
  {
    title: "End-to-End Text-to-SQL LLM App",
    img: projectImages[1],
    desc: "Natural language to SQL interface using Google Gemini API, executes live queries.",
    link: "/playground"
  },
  {
    title: "Self-Driving Car Simulator",
    img: projectImages[4],
    desc: "Lane detection with OpenCV, CNN steering model in PyGame.",
    link: "https://github.com/Asmi-va/Drive-AI-race-car-"
  },
];

const achievementBadges = [
  {
    icon: '🏆',
    color: 'from-yellow-400 via-pink-400 to-blue-400',
    text: 'Infosys Pragati – Cohort 4',
  },
  {
    icon: '🏅',
    color: 'from-pink-400 via-blue-400 to-yellow-400',
    text: 'Reliance Foundation Scholar – Top 500 nationwide',
  },
  {
    icon: '🥇',
    color: 'from-blue-400 via-yellow-400 to-pink-400',
    text: 'Winner – Smart India Hackathon 2024 (Internal round)',
  },
];

const timelineData = [
  {
    icon: '🎓',
    title: 'B.Tech in Computer Science (AI & ML)',
    subtitle: 'Panipat Institute of Engineering and Technology, Haryana',
    date: '2022–2026',
    color: 'from-blue-400 to-purple-600',
  },
  {
    icon: '🤖',
    title: 'Machine Learning Intern',
    subtitle: 'Prasunet Pvt. Ltd.',
    date: 'March 2025',
    color: 'from-pink-400 to-yellow-400',
  },
  {
    icon: '📊',
    title: 'ML Intern',
    subtitle: 'Grades Global, Noida',
    date: 'Oct 2024',
    color: 'from-green-400 to-blue-400',
  },
  {
    icon: '📈',
    title: 'Data Science Intern',
    subtitle: 'Imarticus Learning, Noida',
    date: 'Sep 2023',
    color: 'from-yellow-400 to-pink-400',
  },
  {
    icon: '🪐',
    title: 'Projects',
    subtitle: '',
    date: '',
    color: 'from-fuchsia-500 to-pink-500',
    projects: [
      {
        icon: '🛡️',
        title: 'Women Safety Detection System',
        desc: 'Real-time alerting via Twilio & Firebase, ML-based threat detection',
        link: 'https://github.com/Asmi-va/women_safety_analysis'
      },
      {
        icon: '🔗',
        title: 'End-to-End Text-to-SQL LLM App',
        desc: 'Natural language to SQL interface using Google Gemini API, executes live queries',
        link: '/playground'
      },
      {
        icon: '🚗',
        title: 'Self-Driving Car Simulator',
        desc: 'Lane detection with OpenCV, CNN steering model in PyGame',
        link: 'https://github.com/Asmi-va/Drive-AI-race-car-'
      },
    ],
  },
];

function SpaceyTimeline() {
  return (
    <section id="timeline" className="w-full max-w-2xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300">Experience Timeline</h2>
      <div className="relative border-l-4 border-blue-900/60 ml-6">
        {timelineData.map((item, i) => (
          <div key={i} className="mb-16 flex items-center group">
            {/* Animated planet/star */}
            <div className={`absolute -left-8 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} shadow-2xl flex items-center justify-center text-3xl animate-pulse group-hover:scale-110 transition-transform duration-300`}>
              <span className="drop-shadow-[0_0_8px_#fff]">{item.icon}</span>
            </div>
            {/* Animated line */}
            {i < timelineData.length - 1 && (
              <div className="absolute left-[-2px] top-12 w-1 h-16 bg-gradient-to-b from-blue-900/60 to-transparent animate-gradient-x" />
            )}
            <div className="ml-12 bg-black/80 rounded-xl shadow-lg p-6 border border-blue-900/40 w-full animate-fade-in-up">
              <div className="text-xl font-bold text-blue-200 mb-1">{item.title}</div>
              {item.subtitle && <div className="text-md text-blue-400 mb-1">{item.subtitle}</div>}
              {item.date && <div className="text-sm text-gray-400 mb-2">{item.date}</div>}
              {/* If this is the Projects group, show all projects */}
              {item.projects && (
                <ul className="mt-2 space-y-2">
                  {item.projects.map((proj, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-2xl">{proj.icon}</span>
                      <div>
                        <div className="font-semibold text-blue-300">{proj.title}</div>
                        <div className="text-gray-400 text-sm">{proj.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center font-sans scroll-smooth">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-gray-800 flex justify-between items-center px-6 py-3">
        <a href="#home" className="text-2xl font-bold tracking-tight">ASMI</a>
        <div className="flex gap-6">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#achievements" className="hover:text-blue-400 transition">Achievements</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          <Link href="/timeline" className="hover:text-pink-400 transition">Timeline</Link>
          <Link href="/playground" className="hover:text-pink-400 transition">Playground</Link>
        </div>
        <div className="flex gap-4">
          {socialLinks.map(link => (
            <a key={link.label} href={link.href} aria-label={link.label} className="hover:text-blue-400 transition">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon} /></svg>
            </a>
          ))}
        </div>
      </nav>
      {/* Hero Section */}
      <section id="home" className="relative flex flex-col items-center justify-center min-h-[70vh] w-full pt-20 pb-10 bg-black">
        <div className="max-w-5xl w-full bg-black rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between px-4 py-8 mx-auto">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start justify-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Hi,<br />
              I&apos;m <span className="text-blue-400">Asmi Vashista</span><br />
              <span className="text-lg sm:text-xl font-bold text-gray-300">Software Engineer</span>
            </h1>
            <span className="text-base text-gray-400 font-mono min-h-[28px]">
              <Typewriter
                words={["AI/ML Enthusiast", "Backend & Data Wizard", "Building cool things with code!"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1200}
              />
            </span>
            <a href="#contact" className="mt-2 px-5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition text-base">Contact</a>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} aria-label={link.label} className="hover:text-blue-400 transition text-xl text-white">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon} /></svg>
                </a>
              ))}
            </div>
          </div>
          {/* Right: Local coder image */}
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <div className="w-80 h-80 bg-black rounded-full flex items-center justify-center relative">
              <img src="/coder image.png" alt="Coder Illustration" className="w-72 h-72 object-contain rounded-full" />
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="max-w-2xl w-full mb-12 px-4 bg-black">
        <motion.h2 className="text-xl font-semibold mb-2 text-blue-400" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>About</motion.h2>
        <motion.p className="text-gray-200 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
          I&apos;m Asmi Vashista, a Computer Science undergrad specializing in Artificial Intelligence and Machine Learning. I enjoy building real-world projects — from real-time ML systems and API integrations to 3D visual experiences.<br /><br />
          With internship experience in machine learning and data science, I&apos;ve worked on predictive models, dashboards, and intelligent automation tools. I&apos;m passionate about learning by doing and constantly exploring how AI can solve real problems.
        </motion.p>
        <div className="flex gap-3 mt-4">
          {skillIcons.map((src, i) => (
            <motion.img key={i} src={src} alt="Skill" className="w-8 h-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} />
          ))}
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="max-w-5xl w-full mb-12 px-4 bg-black">
        <motion.h2 className="text-xl font-semibold mb-4 text-blue-400" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Projects</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link || "#"}
              target={project.link && project.link.startsWith('http') ? '_blank' : undefined}
              rel={project.link && project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block bg-gray-900 rounded-xl shadow-md p-4 hover:shadow-lg transition border border-gray-800 hover:border-blue-400 text-white text-sm"
              title={project.title}
            >
              <img src={project.img} alt={project.title} className="w-full h-28 object-cover rounded mb-2" />
              <div className="font-bold text-base mb-1 text-blue-300">{project.title}</div>
              <div className="text-gray-400 text-xs mb-2">{project.desc}</div>
              {project.link && (
                <div className="mt-1">
                  <span className="text-blue-400 underline">Learn More</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </section>
      {/* Achievements Section */}
      <section id="achievements" className="max-w-2xl w-full mb-16 px-4 bg-black">
        <motion.h2 className="text-2xl font-semibold mb-6 text-blue-400" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Achievements</motion.h2>
        <div className="flex flex-wrap gap-8 justify-center items-center py-8">
          {achievementBadges.map((ach, i) => (
            <div key={i} className={`relative group w-32 h-32 flex flex-col items-center justify-center bg-gradient-to-br ${ach.color} rounded-full shadow-2xl animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer`}>
              <span className="text-5xl drop-shadow-[0_0_12px_#fff]">{ach.icon}</span>
              {/* Tooltip */}
              <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 bg-black/90 text-blue-200 text-sm rounded-lg px-4 py-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 whitespace-nowrap z-20">
                {ach.text}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="max-w-2xl w-full mb-16 px-4 bg-black">
        <motion.h2 className="text-2xl font-semibold mb-2 text-blue-400" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Contact</motion.h2>
        <motion.p className="text-gray-200 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
          Feel free to reach out for collaborations, questions, or just to connect!
        </motion.p>
        <div className="flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Name" className="bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-400" />
            <input type="email" placeholder="Email" className="bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-400" />
            <textarea placeholder="Message" rows={4} className="bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-400" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition">Send</button>
          </form>
          {/* GitHub Contact Link */}
          <motion.a
            href="https://github.com/Asmi-va"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-300 hover:text-white font-mono text-lg transition-colors"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            aria-label="GitHub Profile"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" fill="currentColor"/>
            </svg>
            <span>github.com/Asmi-va</span>
          </motion.a>
        </div>
      </section>
      <SpaceyTimeline />
      <footer className="text-gray-500 text-sm py-6">&copy; {new Date().getFullYear()} Asmi Vashista</footer>
    </div>
  );
}
