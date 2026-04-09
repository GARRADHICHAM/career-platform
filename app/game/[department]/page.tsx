"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { departments } from "@/lib/questions";
import { getOrCreateSession, saveDepartmentScore } from "@/lib/gameSession";
import { GameSession } from "@/types";
import ProgressBar from "@/components/ProgressBar";

type Phase = "intro" | "quiz" | "done";

export default function DepartmentQuizPage() {
  const { department: departmentId } = useParams<{ department: string }>();
  const router = useRouter();

  const department = departments.find((d) => d.id === departmentId);

  const [session, setSession] = useState<GameSession | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selected, setSelected] = useState<boolean | null>(null);

  useEffect(() => {
    setSession(getOrCreateSession());
  }, []);

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Department not found.</p>
      </div>
    );
  }

  const questions = department.questions;
  const totalQ = questions.length;
  const question = questions[currentQ];

  function handleAnswer(answer: boolean) {
    if (selected !== null) return;
    setSelected(answer);
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      if (currentQ + 1 >= totalQ) {
        // Save and show done screen
        const updatedSession = saveDepartmentScore(
          session!,
          department!.id,
          newAnswers
        );
        setSession(updatedSession);
        setAnswers(newAnswers);
        setPhase("done");
      } else {
        setAnswers(newAnswers);
        setCurrentQ(currentQ + 1);
        setSelected(null);
      }
    }, 600);
  }

  const finalScore = answers.filter(Boolean).length;
  const finalPct = Math.round((finalScore / totalQ) * 100);

  function getScoreMessage(pct: number) {
    if (pct >= 80) return { text: "Excellent fit! 🎉", color: "text-green-600" };
    if (pct >= 60) return { text: "Good match! 👍", color: "text-blue-600" };
    if (pct >= 40) return { text: "Moderate fit 🤔", color: "text-yellow-600" };
    return { text: "May not be the best fit", color: "text-red-500" };
  }

  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className={`border-2 rounded-3xl p-8 text-center ${department.bgColor}`}>
            <div className="text-6xl mb-4">{department.icon}</div>
            <h1 className={`text-2xl font-bold mb-2 ${department.color}`}>
              {department.name}
            </h1>
            <p className="text-gray-600 text-sm mb-6">{department.description}</p>
            <div className="bg-white/70 rounded-2xl p-4 mb-6 text-left space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">📋 {totalQ} questions</span> — Answer Yes or No
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">✅ Expected answer:</span> Yes (for each topic you&apos;re ready to study)
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">📈 Scoring:</span> Each Yes = 1 point
              </p>
            </div>
            <button
              onClick={() => setPhase("quiz")}
              className={`w-full py-3 rounded-2xl font-bold text-white text-base transition-all hover:scale-105 ${
                department.id === "ai"
                  ? "bg-purple-600 hover:bg-purple-500"
                  : department.id === "it"
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : department.id === "iot-industry40"
                  ? "bg-blue-600 hover:bg-blue-500"
                  : department.id === "energy"
                  ? "bg-amber-600 hover:bg-amber-500"
                  : department.id === "lean"
                  ? "bg-teal-600 hover:bg-teal-500"
                  : department.id === "industrial"
                  ? "bg-green-600 hover:bg-green-500"
                  : department.id === "civil"
                  ? "bg-yellow-600 hover:bg-yellow-500"
                  : "bg-orange-600 hover:bg-orange-500"
              }`}
            >
              Start Quiz →
            </button>
            <button
              onClick={() => router.push("/game")}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600 underline w-full"
            >
              ← Back to Map
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (phase === "done") {
    const msg = getScoreMessage(finalPct);
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className={`border-2 rounded-3xl p-8 ${department.bgColor}`}>
            <div className="text-6xl mb-4">{department.icon}</div>
            <h2 className={`text-xl font-bold mb-1 ${department.color}`}>
              {department.shortName}
            </h2>
            <p className={`text-lg font-semibold mb-4 ${msg.color}`}>{msg.text}</p>

            <div className="bg-white rounded-2xl p-5 mb-6">
              <div className="text-4xl font-extrabold text-gray-800 mb-1">
                {finalScore}<span className="text-xl text-gray-400">/{totalQ}</span>
              </div>
              <div className="text-gray-500 text-sm mb-3">questions answered Yes</div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${finalPct}%` }}
                />
              </div>
              <p className="text-sm font-semibold text-gray-600 mt-2">{finalPct}% readiness</p>
            </div>

            <div className="space-y-2 mb-6">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`flex items-start gap-2 text-left text-xs p-2 rounded-lg ${
                    answers[i] ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"
                  }`}
                >
                  <span className="mt-0.5 shrink-0">{answers[i] ? "✓" : "✗"}</span>
                  <span>{q.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/game")}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                ← Back to Map
              </button>
              <button
                onClick={() => router.push("/results")}
                className="flex-1 py-3 rounded-2xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-all"
              >
                See Results →
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Quiz phase
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.push("/game")}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{department.icon}</span>
              <span className={`text-sm font-semibold ${department.color}`}>
                {department.shortName}
              </span>
            </div>
            <ProgressBar current={currentQ + 1} total={totalQ} />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <div className="text-gray-400 text-sm mb-4 font-medium uppercase tracking-wide">
            Question {currentQ + 1}
          </div>
          <p className="text-gray-800 text-lg font-semibold leading-relaxed mb-8">
            {question.text}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(false)}
              disabled={selected !== null}
              className={`flex-1 py-4 rounded-2xl font-bold text-base border-2 transition-all duration-200 ${
                selected === false
                  ? "bg-red-500 border-red-500 text-white scale-95"
                  : selected !== null
                  ? "opacity-40 cursor-not-allowed border-gray-200 text-gray-400"
                  : "border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 hover:scale-105"
              }`}
            >
              ✗ No
            </button>
            <button
              onClick={() => handleAnswer(true)}
              disabled={selected !== null}
              className={`flex-1 py-4 rounded-2xl font-bold text-base border-2 transition-all duration-200 ${
                selected === true
                  ? "bg-green-500 border-green-500 text-white scale-95"
                  : selected !== null
                  ? "opacity-40 cursor-not-allowed border-gray-200 text-gray-400"
                  : "border-green-200 text-green-600 hover:bg-green-50 hover:border-green-400 hover:scale-105"
              }`}
            >
              ✓ Yes
            </button>
          </div>
        </div>

        {/* Score so far */}
        <div className="text-center mt-4 text-gray-400 text-xs">
          {answers.filter(Boolean).length} Yes out of {answers.length} answered
        </div>
      </div>
    </main>
  );
}
