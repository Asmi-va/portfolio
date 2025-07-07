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
          <DarkModeToggle />
        </nav>
        {children}
      </body>
    </html>
  );
}
