"use client";
import Timeline3D from "../Timeline3D";
import Link from "next/link";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl mb-8 flex justify-start">
        <Link href="/" className="text-lg font-bold text-blue-300 hover:text-pink-400 bg-black/70 border border-blue-700 px-5 py-2 rounded-full shadow-lg transition-all duration-200">
          ← Back to Home
        </Link>
      </div>
      <div className="w-full max-w-3xl">
        <Timeline3D />
      </div>
    </div>
  );
} 