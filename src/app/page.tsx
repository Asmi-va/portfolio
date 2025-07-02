"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars, Text } from '@react-three/drei';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import ThreeScene from "./ThreeScene";
import useEmblaCarousel from 'embla-carousel-react';
import Timeline3D from "./Timeline3D";
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

const achievementIcons = [
  "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  "https://cdn-icons-png.flaticon.com/512/190/190411.png",
];

function AnimatedDivider() {
  return (
    <svg viewBox="0 0 1440 100" className="w-full h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M0,50 C400,150 1040,-50 1440,50 L1440,100 L0,100 Z"
        fill="#1e293b"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
    </svg>
  );
}

const projects = [
  {
    title: "Women Safety Detection System",
    img: projectImages[0],
    desc: "Real-time alerting via Twilio & Firebase, ML-based threat detection."
  },
  {
    title: "End-to-End Text-to-SQL LLM App",
    img: projectImages[1],
    desc: "Natural language to SQL interface using Google Gemini API, executes live queries."
  },
  {
    title: "DDoS Detection System",
    img: projectImages[2],
    desc: "Real-time attack detection using Kafka, Grafana, and Scikit-learn."
  },
  {
    title: "OCR-Based Document Insight Generator (Scan & Understand)",
    img: projectImages[3],
    desc: "Extracted and analyzed text from scanned docs using Tesseract OCR and exposed via FastAPI."
  },
  {
    title: "Self-Driving Car Simulator",
    img: projectImages[4],
    desc: "Lane detection with OpenCV, CNN steering model in PyGame."
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

function RotatingName3D() {
  return (
    <Canvas className="w-full h-40 sm:h-56" camera={{ position: [0, 0, 7], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
      <RotatingText />
    </Canvas>
  );
}

function RotatingText() {
  const meshRef = React.useRef<any>(null);
  const [flicker, setFlicker] = React.useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => setFlicker(f => !f), 700);
    return () => clearInterval(interval);
  }, []);
  return (
    <Text
      ref={meshRef}
      position={[0, 0, 0]}
      fontSize={1.4}
      color={flicker ? "#fff" : "#a5b4fc"}
      anchorX="center"
      anchorY="middle"
      outlineColor={flicker ? "#f472b6" : "#6366f1"}
      outlineWidth={flicker ? 0.09 : 0.06}
      strokeColor="#fff"
      strokeWidth={0.01}
      fillOpacity={1}
      letterSpacing={0.04}
      fontWeight={"bold"}
    >
      ASMI VASHISTA
    </Text>
  );
}

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
      },
      {
        icon: '🔗',
        title: 'End-to-End Text-to-SQL LLM App',
        desc: 'Natural language to SQL interface using Google Gemini API, executes live queries',
      },
      {
        icon: '🔒',
        title: 'DDoS Detection System',
        desc: 'Real-time attack detection using Kafka, Grafana, and Scikit-learn',
      },
      {
        icon: '📄',
        title: 'OCR-Based Document Insight Generator',
        desc: 'Extracted and analyzed text from scanned docs using Tesseract OCR and exposed via FastAPI',
      },
      {
        icon: '🚗',
        title: 'Self-Driving Car Simulator',
        desc: 'Lane detection with OpenCV, CNN steering model in PyGame',
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

// Add a simple shooting star effect
function ShootingStars() {
  const [stars, setStars] = useState([
    { id: 1, left: '10%', delay: 0 },
    { id: 2, left: '70%', delay: 2 },
    { id: 3, left: '40%', delay: 4 },
  ]);
  return (
    <>
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute top-0 h-0.5 w-32 bg-gradient-to-r from-white/80 to-transparent rounded-full pointer-events-none"
          style={{ left: star.left, zIndex: 1 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, 600], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, delay: star.delay, repeat: Infinity, repeatDelay: 3 }}
        />
      ))}
    </>
  );
}

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const [achEmblaRef, achEmblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [achSelectedIndex, setAchSelectedIndex] = useState(0);
  useEffect(() => {
    if (!achEmblaApi) return;
    const onSelect = () => setAchSelectedIndex(achEmblaApi.selectedScrollSnap());
    achEmblaApi.on('select', onSelect);
    onSelect();
    return () => {
      if (achEmblaApi) achEmblaApi.off('select', onSelect);
    };
  }, [achEmblaApi]);

  const scrollAchPrev = useCallback(() => achEmblaApi && achEmblaApi.scrollPrev(), [achEmblaApi]);
  const scrollAchNext = useCallback(() => achEmblaApi && achEmblaApi.scrollNext(), [achEmblaApi]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center font-sans scroll-smooth">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-gray-800 flex justify-between items-center px-6 py-3">
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
      <section id="home" className="relative flex flex-col items-center justify-center min-h-[60vh] w-full pt-32 pb-12 overflow-hidden">
        {/* Animated starfield background */}
        <div className="absolute inset-0 -z-10">
          <Canvas className="w-full h-full absolute inset-0">
            <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
          </Canvas>
          <ShootingStars />
        </div>
        {/* Glassmorphism Card */}
        <motion.div
          className="relative flex flex-col items-center justify-center px-8 py-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl max-w-lg mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* 3D Rotating Name */}
          <div className="w-full flex justify-center items-center mb-2" style={{ height: '120px' }}>
            <RotatingName3D />
          </div>
          {/* Animated Subtitle with Typewriter */}
          <motion.p
            className="text-lg text-blue-200 mb-4 font-mono tracking-widest drop-shadow-[0_0_8px_#6366f1] min-h-[32px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Typewriter
              words={["Aspiring Software Engineer", "AI/ML Enthusiast", "Backend & Data Wizard"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </motion.p>
          {/* CTA Button */}
          <motion.a
            href="#about"
            className="mt-2 px-7 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-pink-400/40 transition-all duration-300 border-2 border-white/20 backdrop-blur-md text-lg tracking-wide"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
          </motion.a>
        </motion.div>
        {/* Animated Down Arrow */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 16, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>
      <AnimatedDivider />
      {/* About Section */}
      <section id="about" className="max-w-2xl w-full mb-16 px-4">
        <motion.h2 className="text-2xl font-semibold mb-2 text-blue-400" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>About</motion.h2>
        <motion.p className="text-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
          Aspiring Software Engineer eager to contribute to enterprise-level systems through strong skills in backend development, database management, and real-time monitoring. Proficient in Python and SQL with experience in debugging, building APIs, and enhancing software architecture.
        </motion.p>
        {/* Skills icons */}
        <div className="flex gap-4 mt-6">
          {skillIcons.map((src, i) => (
            <motion.img key={i} src={src} alt="Skill" className="w-10 h-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} />
          ))}
        </div>
      </section>
      <AnimatedDivider />
      {/* Projects Section */}
      <section id="projects" className="max-w-2xl w-full mb-16 px-4">
        <motion.h2 className="text-2xl font-semibold mb-2 text-blue-400" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Projects</motion.h2>
        <div className="relative">
          {/* Left/Right Arrow Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 hover:bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow transition"
            aria-label="Scroll left"
            style={{ outline: 'none', border: 'none' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 hover:bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow transition"
            aria-label="Scroll right"
            style={{ outline: 'none', border: 'none' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 touch-pan-x" style={{ willChange: 'transform' }}>
              {projects.map((project, i) => (
                <a
                  key={i}
                  href="#" // Replace with project.link if available
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[260px] max-w-xs flex-1 bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                  tabIndex={0}
                >
                  <motion.img src={project.img} alt={project.title} className="w-full h-32 object-cover" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }} />
                  <div className="p-4">
                    <p className="font-semibold text-blue-300 mb-1">{project.title}</p>
                    <p className="text-gray-300 text-sm">{project.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AnimatedDivider />
      {/* Achievements Section */}
      <section id="achievements" className="max-w-2xl w-full mb-16 px-4 relative">
        <motion.h2 className="text-2xl font-semibold mb-2 text-blue-400" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Achievements</motion.h2>
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
      <AnimatedDivider />
      {/* Contact Section */}
      <section id="contact" className="max-w-2xl w-full mb-16 px-4">
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
