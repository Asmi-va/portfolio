"use client";
import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggleDark}
      className="ml-4 p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#1a263a] hover:bg-gray-200 dark:hover:bg-[#22304a] transition"
      aria-label="Toggle dark mode"
    >
      {dark ? "🌞" : "🌙"}
    </button>
  );
} 