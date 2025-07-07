import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from 'react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Asmi Vashista - Software Engineer & AI/ML Developer",
  description: "Portfolio of Asmi Vashista, a Computer Science student specializing in AI/ML and software development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-black dark:bg-[#0a1930] dark:text-white transition-colors duration-300`}>
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#0a1930]/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex justify-between items-center px-8 py-4">
          <button
            onClick={toggleDark}
            className="ml-4 p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#1a263a] hover:bg-gray-200 dark:hover:bg-[#22304a] transition"
            aria-label="Toggle dark mode"
          >
            {dark ? '🌞' : '🌙'}
          </button>
        </nav>
        {children}
      </body>
    </html>
  );
}
