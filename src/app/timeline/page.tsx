"use client";
import Timeline3D from "../Timeline3D";
import Link from "next/link";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl mb-8 flex justify-start">
        <Link href="/" className="text-lg font-bold text-gray-700 hover:text-blue-600 bg-white border border-gray-200 px-5 py-2 rounded-lg shadow-sm transition-all duration-200">
          ← Back to Home
        </Link>
      </div>
      <div className="w-full max-w-3xl">
        <Timeline3D />
      </div>
    </div>
  );
} 