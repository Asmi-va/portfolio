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
    } catch {}
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200 relative">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition ${tab === 'sql' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setTab('sql')}
          >
            Text-to-SQL
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition ${tab === 'math' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setTab('math')}
          >
            Math Trivia
          </button>
        </div>
        {/* Text-to-SQL Tab */}
        {tab === 'sql' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Text-to-SQL Playground</h1>
            <p className="text-center text-gray-600 mb-6">Type a question and generate a SQL query using Google Gemini!</p>
            <input
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
              placeholder="e.g. Show all users named Asmi"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition mb-4"
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
            >
              {loading ? "Generating..." : "Generate SQL"}
            </button>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 min-h-[80px] font-mono text-gray-800 text-lg">
              {sql && <span>{sql}</span>}
              {loading && <span className="text-blue-600">Thinking...</span>}
            </div>
          </>
        )}
        {/* Math Trivia Tab */}
        {tab === 'math' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Math Trivia</h1>
            <p className="text-center text-gray-600 mb-6">Test your math skills with interactive MCQs!</p>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-sm mb-4">
              <div className="text-lg text-gray-800 mb-4 font-semibold flex items-center gap-2">
                <span className="text-2xl">🧮</span> {mathQuestions[qIndex].question}
              </div>
              <div className="grid grid-cols-1 gap-3">
                {mathQuestions[qIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`w-full py-3 rounded-lg font-semibold text-lg border-2 transition-all duration-200
                      ${selected === idx
                        ? idx === mathQuestions[qIndex].answer
                          ? 'bg-green-500 text-white border-green-600'
                          : 'bg-red-500 text-white border-red-600'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}
                    `}
                    onClick={() => handleOption(idx)}
                    disabled={showResult}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="mt-4 text-center text-xl font-bold">
                  {feedback}
                </div>
              )}
              {showResult && (
                <button
                  className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition"
                  onClick={nextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>
            <div className="text-center text-gray-600 mt-4">Score: <span className="font-bold text-blue-600">{score}</span></div>
          </>
        )}
      </div>
      <Link href="/" className="mt-8 text-blue-600 hover:text-blue-800 transition text-lg underline">← Back to Home</Link>
    </div>
  );
} 