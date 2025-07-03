"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Html } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';

const milestones = [
  { position: [0, 0, 0], color: '#6366f1', label: 'Education', icon: '🎓', details: 'B.Tech in Computer Science (AI & ML)\nPanipat Institute of Engineering and Technology, Haryana (2022–2026)' },
  { position: [0, -3, 0], color: '#f59e42', label: 'Internship', icon: '🤖', details: 'Machine Learning Intern – Prasunet Pvt. Ltd. (March 2025)\n• Deployed real-time ML models for system monitoring', link: 'https://www.linkedin.com/in/asmivashista/' },
  { position: [0, -6, 0], color: '#10b981', label: 'Internship', icon: '📊', details: 'ML Intern – Grades Global, Noida (Oct 2024)\n• Built predictive models on academic datasets', link: 'https://www.linkedin.com/in/asmivashista/' },
  { position: [0, -9, 0], color: '#e11d48', label: 'Internship', icon: '📈', details: 'Data Science Intern – Imarticus Learning, Noida (Sep 2023)\n• Created Power BI dashboards, handled SQL queries', link: 'https://www.linkedin.com/in/asmivashista/' },
  { position: [0, -12, 0], color: '#f43f5e', label: 'Project', icon: '🛡️', details: 'Women Safety Detection System\n• Real-time alerting via Twilio & Firebase, ML-based threat detection', link: 'https://github.com/asmivashista/women-safety-detection' },
  { position: [0, -15, 0], color: '#a21caf', label: 'Project', icon: '🔗', details: 'End-to-End Text-to-SQL LLM App\n• Natural language to SQL interface using Google Gemini API, executes live queries', link: 'https://github.com/asmivashista/text-to-sql-llm' },
  { position: [0, -18, 0], color: '#0ea5e9', label: 'Project', icon: '🔒', details: 'DDoS Detection System\n• Real-time attack detection using Kafka, Grafana, and Scikit-learn', link: 'https://github.com/asmivashista/ddos-detection' },
  { position: [0, -21, 0], color: '#facc15', label: 'Project', icon: '📄', details: 'OCR-Based Document Insight Generator\n• Extracted and analyzed text from scanned docs using Tesseract OCR and exposed via FastAPI', link: 'https://github.com/asmivashista/ocr-insight' },
  { position: [0, -24, 0], color: '#22d3ee', label: 'Project', icon: '🚗', details: 'Self-Driving Car Simulator\n• Lane detection with OpenCV, CNN steering model in PyGame', link: 'https://github.com/asmivashista/self-driving-car' },
  { position: [0, -27, 0], color: '#f472b6', label: 'Achievement', icon: '🏆', details: 'Infosys Pragati – Cohort 4' },
  { position: [0, -30, 0], color: '#fbbf24', label: 'Achievement', icon: '🏅', details: 'Reliance Foundation Scholar – Top 500 nationwide' },
  { position: [0, -33, 0], color: '#34d399', label: 'Achievement', icon: '🥇', details: 'Winner – Smart India Hackathon 2024 (Internal round)' },
];

type MilestoneProps = {
  position: [number, number, number];
  color: string;
  icon: string;
  label: string;
  details: string;
  link?: string;
  onHover: () => void;
  onClick: () => void;
  isActive: boolean;
  animate: boolean;
};

function Milestone({ position, color, icon, label, details, link, onHover, onClick, isActive, animate }: MilestoneProps) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  useFrame(() => {
    if (meshRef.current && animate) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(0.7, 0.7, 0.7), 0.1);
    }
  });
  return (
    <mesh ref={meshRef} position={position} onPointerOver={onHover} onPointerOut={onHover} onClick={onClick}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={color} emissive={isActive ? '#fff' : color} emissiveIntensity={isActive ? 0.7 : 0.2} />
      <Html center distanceFactor={8} style={{ pointerEvents: 'none', fontSize: 40 }}>{icon}</Html>
      {isActive && (
        <Html center position={[0, 1.5, 0]} distanceFactor={8} style={{ background: 'rgba(30,41,59,0.98)', color: '#fff', padding: 16, borderRadius: 16, minWidth: 220, textAlign: 'center', fontSize: 18, boxShadow: '0 8px 32px #0008' }}>
          <div className="font-bold mb-2 text-lg">{label}</div>
          <div style={{ whiteSpace: 'pre-line' }}>{details}</div>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-400 underline hover:text-pink-400 transition">View More</a>
          )}
        </Html>
      )}
    </mesh>
  );
}

function AnimatedCamera({ scrollLength, scrollTo }: { scrollLength: number; scrollTo: number | null }) {
  const { camera } = useThree();
  const scroll = useScroll();
  useFrame(() => {
    let y = -scroll.offset * (scrollLength - 1) * 3;
    if (scrollTo !== null) {
      y = -scrollTo * 3;
      scroll.el.scrollTop = scrollTo * scroll.el.clientHeight;
    }
    camera.position.lerp({ x: 0, y, z: 8 }, 0.1);
    camera.lookAt(0, y, 0);
  });
  return null;
}

export default function Timeline3D() {
  const [active, setActive] = useState<number | null>(null);
  const [scrollTo, setScrollTo] = useState<number | null>(null);
  return (
    <div className="w-full h-[700px] bg-black rounded-2xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300 select-none pointer-events-none">3D Interactive Timeline</div>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <ScrollControls pages={milestones.length} damping={6}>
          <AnimatedCamera scrollLength={milestones.length} scrollTo={scrollTo} />
          {milestones.map((m, i) => (
            <Milestone
              key={i}
              {...m}
              position={m.position as [number, number, number]}
              onHover={() => setActive(i)}
              onClick={() => setScrollTo(i)}
              isActive={active === i}
              animate={active === i}
            />
          ))}
        </ScrollControls>
      </Canvas>
      {/* Glowing animated background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-b from-blue-900/40 via-black/0 to-pink-900/40 blur-2xl animate-gradient-x" />
      </div>
    </div>
  );
} 