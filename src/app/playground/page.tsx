"use client";
import React, { useState } from "react";
import Link from "next/link";

const mathQuestions = [
  {
    question: "What is 7 × 8?",
    options: ["54", "56", "64", "58"],
    answer: 1,
  },
  {
    question: "What is the square root of 81?",
    options: ["7", "8", "9", "10"],
    answer: 2,
  },
  {
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    answer: 1,
  },
  {
    question: "What is the value of π (pi) rounded to 2 decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    answer: 1,
  },
  {
    question: "What is 12²?",
    options: ["124", "132", "144", "156"],
    answer: 2,
  },
  {
    question: "What is the next prime after 7?",
    options: ["9", "10", "11", "13"],
    answer: 2,
  },
  {
    question: "What is 100 divided by 4?",
    options: ["20", "24", "25", "30"],
    answer: 2,
  },
  {
    question: "What is the cube of 3?",
    options: ["6", "9", "18", "27"],
    answer: 3,
  },
  {
    question: "What is 2 to the power of 5?",
    options: ["16", "32", "64", "128"],
    answer: 1,
  },
  {
    question: "What is the sum of angles in a triangle? (in degrees)",
    options: ["90", "180", "270", "360"],
    answer: 1,
  },
];

export default function PlaygroundPage() {
  const [tab, setTab] = useState<'sql' | 'math'>('sql');
  // Text-to-SQL state
  const [input, setInput] = useState("");
  const [sql, setSql] = useState("");
  const [loading, setLoading] = useState(false);
  // Math Trivia state
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(() => Math.floor(Math.random() * mathQuestions.length));
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setSql("");
    try {
      const res = await fetch("/api/gemini-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setSql(data.sql || data.error || "No SQL generated.");
    } catch (err) {
      setSql("Error generating SQL.");
    }
    setLoading(false);
  }

  function handleOption(idx: number) {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === mathQuestions[qIndex].answer) {
      setScore(s => s + 1);
      setFeedback("Correct! 🚀");
    } else {
      setFeedback(`Incorrect! The answer is "${mathQuestions[qIndex].options[mathQuestions[qIndex].answer]}"`);
    }
  }

  function nextQuestion() {
    setQIndex(Math.floor(Math.random() * mathQuestions.length));
    setSelected(null);
    setShowResult(false);
    setFeedback("");
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl bg-gradient-to-br from-blue-900/80 via-black/90 to-pink-900/80 rounded-2xl shadow-2xl p-8 border border-blue-800/40 relative">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            className={`px-6 py-2 rounded-t-lg font-bold text-lg transition border-b-4 ${tab === 'sql' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white border-pink-400 shadow-lg' : 'bg-black/40 text-blue-200 border-transparent'}`}
            onClick={() => setTab('sql')}
          >
            Text-to-SQL
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg font-bold text-lg transition border-b-4 ${tab === 'math' ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white border-blue-400 shadow-lg' : 'bg-black/40 text-blue-200 border-transparent'}`}
            onClick={() => setTab('math')}
          >
            Math Trivia
          </button>
        </div>
        {/* Text-to-SQL Tab */}
        {tab === 'sql' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300">Text-to-SQL Playground</h1>
            <p className="text-center text-blue-200 mb-6">Type a question and generate a SQL query using Google Gemini!</p>
            <input
              className="w-full bg-black/80 border border-blue-700 rounded px-4 py-3 text-white mb-4 focus:outline-none focus:border-pink-400 font-mono text-lg shadow-inner"
              placeholder="e.g. Show all users named Asmi"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              className="w-full py-3 rounded bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:from-pink-500 hover:to-blue-500 transition mb-4"
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
            >
              {loading ? "Generating..." : "Generate SQL"}
            </button>
            <div className="bg-black/90 border border-blue-800 rounded p-4 min-h-[80px] font-mono text-blue-200 text-lg shadow-inner transition-all duration-500 animate-fade-in-up">
              {sql && <span>{sql}</span>}
              {loading && <span className="animate-pulse text-pink-400">Thinking...</span>}
            </div>
          </>
        )}
        {/* Math Trivia Tab */}
        {tab === 'math' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-300">Math Trivia</h1>
            <p className="text-center text-blue-200 mb-6">Test your math skills with cosmic MCQs!</p>
            <div className="bg-black/80 border border-pink-700 rounded-2xl p-6 shadow-lg mb-4">
              <div className="text-lg text-blue-100 mb-4 font-semibold flex items-center gap-2">
                <span className="text-2xl">🪐</span> {mathQuestions[qIndex].question}
              </div>
              <div className="grid grid-cols-1 gap-3">
                {mathQuestions[qIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`w-full py-2 rounded-lg font-mono text-lg border-2 transition-all duration-200 shadow-md
                      ${selected === idx
                        ? idx === mathQuestions[qIndex].answer
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-green-400 scale-105'
                          : 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white border-pink-400 scale-105'
                        : 'bg-black/60 text-blue-200 border-blue-800 hover:bg-blue-900/40 hover:scale-105'}
                    `}
                    onClick={() => handleOption(idx)}
                    disabled={showResult}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="mt-4 text-center text-xl font-bold animate-fade-in-up">
                  {feedback}
                </div>
              )}
              {showResult && (
                <button
                  className="mt-6 w-full py-2 rounded bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:from-pink-500 hover:to-blue-500 transition"
                  onClick={nextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>
            <div className="text-center text-blue-300 mt-4">Score: <span className="font-bold text-pink-400">{score}</span></div>
          </>
        )}
      </div>
      <Link href="/" className="mt-8 text-blue-400 hover:text-pink-400 transition text-lg underline">← Back to Home</Link>
    </div>
  );
} 