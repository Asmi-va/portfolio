import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DarkModeToggle from '../components/DarkModeToggle';

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
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-black dark:bg-[#0a1930] dark:text-white transition-colors duration-300`}>
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#0a1930]/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex justify-between items-center px-8 py-4">
          <div className="flex gap-8 items-center">
            <a href="#about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">About</a>
            <a href="#work" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Work</a>
            <a href="#contact" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Contact</a>
            <a href="/timeline" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Timeline</a>
            <a href="/playground" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Playground</a>
            <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition">Resume</a>
          </div>
          <DarkModeToggle />
        </nav>
        {children}
      </body>
    </html>
  );
}
