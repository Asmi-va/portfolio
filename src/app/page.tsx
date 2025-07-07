"use client";
import { motion } from "framer-motion";
import React, { useState, useRef } from 'react';
import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';

const socialLinks = [
  { href: "https://github.com/Asmi-va", label: "GitHub", icon: "M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" },
  { href: "https://www.linkedin.com/in/asmi-vashista-b92087252/", label: "LinkedIn", icon: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" },
  { href: "mailto:vashistaasmi@gmail.com", label: "Email", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
];

const projects = [
  {
    title: "Women Safety Detection System",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    desc: "Real-time alerting via Twilio & Firebase, ML-based threat detection.",
    link: "https://github.com/Asmi-va/women_safety_analysis",
    stack: ["Python", "Django", "TensorFlow", "MySQL"]
  },
  {
    title: "End-to-End Text-to-SQL LLM App",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    desc: "Natural language to SQL interface using Google Gemini API, executes live queries.",
    link: "/playground",
    stack: ["Python", "Next.js", "React"]
  },
  {
    title: "Self-Driving Car Simulator",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    desc: "Lane detection with OpenCV, CNN steering model in PyGame.",
    link: "https://github.com/Asmi-va/Drive-AI-race-car-",
    stack: ["Python", "TensorFlow"]
  },
  {
    title: "BRSR/GRI Analyzer – End-to-End Validation",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    desc: "Automated validation and analysis of BRSR/GRI sustainability reports. End-to-end data extraction, compliance checks, and insights dashboard.",
    link: "https://github.com/Asmi-va/BRSR-GRI-Analyzer-End-to-End-Validation",
    stack: ["Python", "FastAPI", "React", "Pandas"]
  },
];

const achievements = [
  "Infosys Pragati – Cohort 4",
  "Reliance Foundation Scholar – Top 500 nationwide",
  "Winner – Smart India Hackathon 2024 (Internal round)",
];

function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-blue-200 font-mono text-base">{label}</span>
        <span className="text-blue-300 font-mono text-xs">{value}%</span>
      </div>
      <div className="w-full h-3 bg-[#18305a] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const projectsScrollRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
      }
    } catch {
      setError('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const scrollProjects = (direction: 'left' | 'right') => {
    const container = projectsScrollRef.current;
    if (container) {
      const scrollAmount = 340; // width of one card + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-200 flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="#fff" stroke="#0a1930" strokeWidth="2"/>
            <path d="M12 28L20 12L28 28" stroke="#0a1930" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 24H24" stroke="#0a1930" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex gap-8">
          <a href="#about" className="hover:text-gray-600 transition">About</a>
          <a href="#work" className="hover:text-gray-600 transition">Work</a>
          <a href="#contact" className="hover:text-gray-600 transition">Contact</a>
          <Link href="/timeline" className="hover:text-gray-600 transition">Timeline</Link>
          <Link href="/playground" className="hover:text-gray-600 transition">Playground</Link>
        </div>
        <div className="flex gap-4">
          {socialLinks.map(link => (
            <a key={link.label} href={link.href} aria-label={link.label} className="hover:text-gray-600 transition">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon} /></svg>
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-8" style={{ background: '#f9f6f2' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 min-h-[60vh]">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start justify-center gap-8 max-w-xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0a1930] leading-tight mb-4">
              Hi, my<br />name is <span className="text-[#0a1930]">Asmi.</span>
            </h1>
            {/* Typewriter Animation */}
            <span className="text-xl md:text-2xl font-mono text-gray-500 min-h-[32px] mb-2">
              <Typewriter
                words={["AI/ML Enthusiast", "Software Engineer", "Building beautiful user experiences"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1200}
              />
            </span>
            <p className="text-2xl text-gray-500 mb-8">I love creating beautiful user experiences.</p>
          </div>
          {/* Right: Illustration */}
          <div className="flex-1 flex items-center justify-center w-full md:w-auto">
            <img src="/coder image.png" alt="Coder Illustration" className="w-[420px] h-auto object-contain drop-shadow-xl" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 flex justify-center bg-gradient-to-br from-[#0a1930] via-[#102347] to-[#1a3a6b]">
        <div className="w-full max-w-3xl rounded-2xl p-8 shadow-2xl border-2 border-blue-500/60" style={{ boxShadow: '0 0 32px #1e90ff44' }}>
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-4">
              <img src="/coder image.png" alt="Profile" className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg bg-[#0a1930] object-cover" />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="border-2 border-blue-400 rounded-lg p-4 text-blue-200 font-mono">
                <div className="text-xs text-blue-300">Name :</div>
                <div className="text-xl font-bold tracking-wider">Asmi</div>
              </div>
              <div className="border-2 border-blue-400 rounded-lg p-4 text-blue-200 font-mono">
                <div className="text-xs text-blue-300">Age :</div>
                <div className="text-xl font-bold tracking-wider">21</div>
              </div>
              <div className="border-2 border-blue-400 rounded-lg p-4 text-blue-200 font-mono">
                <div className="text-xs text-blue-300">From :</div>
                <div className="text-xl font-bold tracking-wider">India</div>
              </div>
            </div>
          </div>
          {/* Skills */}
          <div className="mb-10">
            <div className="text-2xl font-bold text-blue-200 mb-6 border-b-2 border-blue-400 pb-2 tracking-widest font-mono">SKILLS</div>
            <div className="space-y-4">
              <SkillBar label="Python" value={90} />
              <SkillBar label="C++" value={80} />
              <SkillBar label="Django" value={75} />
              <SkillBar label="TensorFlow" value={70} />
              <SkillBar label="MySQL" value={80} />
              <SkillBar label="React" value={85} />
              <SkillBar label="Next.js" value={80} />
            </div>
          </div>
          {/* About Text */}
          <div className="flex items-start gap-4 mt-8">
            <div className="flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" stroke="#1e90ff" strokeWidth="4" fill="#0a1930" />
                <path d="M24 16v8l6 3" stroke="#1e90ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-blue-100 text-lg font-mono leading-relaxed">
              {/* Intentionally left blank */}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-20 px-4" style={{ background: '#f9f6f2' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="block w-8 h-1 rounded bg-orange-400" />
              <span className="text-lg font-semibold text-orange-500 tracking-wide">Portfolio</span>
            </div>
            <motion.h2
              className="text-5xl md:text-6xl font-extrabold text-[#0a1930] mb-2 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Some things<br />I&apos;ve worked on
            </motion.h2>
          </motion.div>
          {/* Projects Grid with Scroll Buttons */}
          <div className="relative">
            <button
              onClick={() => scrollProjects('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full shadow p-2 hover:bg-orange-100 transition disabled:opacity-40"
              style={{ display: 'block' }}
              aria-label="Scroll left"
            >
              &#8592;
            </button>
            <button
              onClick={() => scrollProjects('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full shadow p-2 hover:bg-orange-100 transition disabled:opacity-40"
              style={{ display: 'block' }}
              aria-label="Scroll right"
            >
              &#8594;
            </button>
            <div ref={projectsScrollRef} className="overflow-x-auto pb-2">
              <div className="flex gap-8 min-w-[600px] sm:min-w-0">
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    className="relative bg-white rounded-2xl shadow-lg p-4 flex flex-col items-start border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-2xl min-w-[320px] max-w-xs w-full"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Project Image */}
                    <a href={project.link} target={project.link && project.link.startsWith('http') ? '_blank' : undefined} rel={project.link && project.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                      <img src={project.img || '/coder image.png'} alt={project.title} className="w-full h-48 object-cover rounded-xl mb-4 border border-gray-100 hover:opacity-80 transition" />
                    </a>
                    {/* Project Title */}
                    <div className="text-2xl font-bold text-[#222] mb-2">{project.title}</div>
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.stack?.map((tech: string, idx: number) => (
                        <span key={idx} className={
                          tech === 'Python' ? 'bg-blue-100 text-blue-700' :
                          tech === 'C++' ? 'bg-purple-100 text-purple-700' :
                          tech === 'Django' ? 'bg-green-100 text-green-700' :
                          tech === 'TensorFlow' ? 'bg-yellow-100 text-yellow-700' :
                          tech === 'MySQL' ? 'bg-pink-100 text-pink-700' :
                          tech === 'React' ? 'bg-cyan-100 text-cyan-700' :
                          tech === 'Next.js' ? 'bg-gray-200 text-gray-700' :
                          tech === 'JavaScript' ? 'bg-yellow-200 text-yellow-800' :
                          tech === 'HTML' ? 'bg-orange-100 text-orange-700' :
                          tech === 'CSS' ? 'bg-blue-50 text-blue-600' :
                          'bg-gray-100 text-gray-700'
                        + ' px-3 py-1 rounded-full text-xs font-semibold'}>{tech}</span>
                      ))}
                    </div>
                    {/* Project Description */}
                    <div className="text-gray-500 text-base mb-4 flex-1">{project.desc}</div>
                    {/* Learn More Link */}
                    {project.link && (
                      <a
                        href={project.link}
                        target={project.link.startsWith('http') ? '_blank' : undefined}
                        rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="mt-auto inline-block text-orange-500 font-bold hover:underline text-sm"
                      >
                        Learn More →
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="work" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <span className="text-2xl">🏆</span>
                  <span className="text-gray-700">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4" style={{ background: '#f9f6f2' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-12">
          {/* Left: Form and Info */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-2">
              <span className="block w-8 h-1 rounded bg-orange-400" />
              <span className="text-lg font-semibold text-orange-500 tracking-wide">Say hello <span role='img' aria-label='wave'>👋</span></span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#0a1930] mb-8 leading-tight">Contact me</h2>
            <form onSubmit={handleSubmit} className="bg-[#f5f5f5] rounded-2xl shadow-lg p-8 flex flex-col gap-6 mb-6 border border-gray-100">
              <label className="text-gray-400 font-semibold text-lg" htmlFor="name">Name :</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl bg-[#f1f1f1] border-none text-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                placeholder="Name :"
                required
              />
              <label className="text-gray-400 font-semibold text-lg" htmlFor="email">Email :</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl bg-[#f1f1f1] border-none text-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                placeholder="Email :"
                required
              />
              <label className="text-gray-400 font-semibold text-lg" htmlFor="message">Message :</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl bg-[#f1f1f1] border-none text-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                placeholder="Message :"
                required
              />
              <div className="flex items-center justify-between mt-2">
                {/* Social Icons */}
                <div className="flex gap-4">
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-orange-400 text-2xl"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.11A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg></a>
                  <a href="https://github.com/Asmi-va" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-orange-400 text-2xl"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg></a>
                  <a href="https://www.linkedin.com/in/asmi-vashista-b92087252/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-orange-400 text-2xl"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg></a>
                  <a href="mailto:vashistaasmi@gmail.com" aria-label="Email" className="text-gray-400 hover:text-orange-400 text-2xl"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-xl text-lg transition disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              {success && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center font-semibold">
                  {success}
                </div>
              )}
              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center font-semibold">
                  {error}
                </div>
              )}
            </form>
          </div>
          {/* Right: Image/Illustration */}
          <div className="flex-1 flex items-start justify-center relative min-h-[400px]">
            <img src="/7450220-removebg-preview.png" alt="Contact Illustration" className="w-[520px] md:w-[640px] h-auto object-contain drop-shadow-xl self-start mt-0 md:mt-4 lg:mt-8" style={{ maxHeight: 640 }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Asmi Vashista</p>
        </div>
      </footer>
    </div>
  );
}
