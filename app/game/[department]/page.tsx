"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { departments } from "@/lib/questions";
import { departmentDetails } from "@/lib/departmentData";
import { getOrCreateSession, saveDepartmentScore } from "@/lib/gameSession";
import { GameSession } from "@/types";
import { useAuth } from "@/context/AuthContext";

type Phase = "intro" | "quiz" | "done";

export default function DepartmentQuizPage() {
  const { department: departmentId } = useParams<{ department: string }>();
  const router = useRouter();

  const department = departments.find((d) => d.id === departmentId);
  const detail = departmentDetails[departmentId];

  const { user } = useAuth();
  const [session, setSession] = useState<GameSession | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selected, setSelected] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) setSession(getOrCreateSession(user.uid));
  }, [user]);

  if (!department) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-white/50">Department not found.</p>
          <Link href="/game" className="text-amber-400 underline mt-2 block text-sm">
            ← Back
          </Link>
        </div>
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
        const updatedSession = saveDepartmentScore(session!, department!.id, newAnswers, user!.uid);
        setSession(updatedSession);
        setAnswers(newAnswers);
        setPhase("done");
      } else {
        setAnswers(newAnswers);
        setCurrentQ(currentQ + 1);
        setSelected(null);
      }
    }, 500);
  }

  const finalScore = answers.filter(Boolean).length;
  const finalPct = Math.round((finalScore / totalQ) * 100);

  function getScoreLabel(pct: number) {
    if (pct >= 80) return { text: "Excellent affinity", emoji: "🎉", color: "text-emerald-400" };
    if (pct >= 60) return { text: "Good affinity", emoji: "👍", color: "text-amber-400" };
    if (pct >= 40) return { text: "Moderate affinity", emoji: "🤔", color: "text-orange-400" };
    return { text: "Low affinity", emoji: "💡", color: "text-red-400" };
  }

  /* ── INTRO ── */
  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col">
        {/* Top bar */}
        <div className="bg-slate-900 border-b border-white/10 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link href="/game" className="text-white/40 hover:text-white transition-colors text-sm">
              ← Back
            </Link>
            <span className="text-white/20 text-sm">/</span>
            <span className="text-white/60 text-sm font-medium">{department.shortName}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-lg w-full">
            {/* Card */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden">
              {/* Colored top strip */}
              <div className={`h-1.5 w-full ${department.color.replace("text-", "bg-")}`} />

              <div className="p-8 text-center">
                <div className="text-6xl mb-5">{department.icon}</div>
                <h1 className="text-2xl font-extrabold text-white mb-1">{department.name}</h1>
                {detail && (
                  <p className="text-white/40 text-sm italic mb-6">{detail.tagline}</p>
                )}

                <div className="bg-slate-800 rounded-2xl p-5 mb-7 text-left space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📋</span>
                    <div>
                      <p className="text-white text-sm font-semibold">{totalQ} questions</p>
                      <p className="text-white/40 text-xs">Answer Yes or No to each statement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✅</span>
                    <div>
                      <p className="text-white text-sm font-semibold">Expected answer: Yes</p>
                      <p className="text-white/40 text-xs">If you are ready to study this topic, answer Yes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📈</span>
                    <div>
                      <p className="text-white text-sm font-semibold">Score = % of Yes answers</p>
                      <p className="text-white/40 text-xs">The higher the score, the better this department fits you</p>
                    </div>
                  </div>
                </div>

                {detail && (
                  <div className="flex justify-center gap-6 mb-7">
                    <div className="text-center">
                      <p className="text-amber-400 text-lg font-extrabold">{detail.employmentRate}</p>
                      <p className="text-white/30 text-xs">employment</p>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                      <p className="text-amber-400 text-lg font-extrabold">{detail.avgSalary}</p>
                      <p className="text-white/30 text-xs">starting salary</p>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                      <p className="text-amber-400 text-lg font-extrabold">{detail.careers.length}</p>
                      <p className="text-white/30 text-xs">career paths</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setPhase("quiz")}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold py-4 rounded-2xl text-base transition-all hover:shadow-xl hover:shadow-amber-400/20 hover:scale-[1.02]"
                >
                  Start quiz →
                </button>
                <Link
                  href={`/departments/${department.id}`}
                  className="block mt-3 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Learn more about this department ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── DONE ── */
  if (phase === "done") {
    const label = getScoreLabel(finalPct);
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col">
        <div className="bg-slate-900 border-b border-white/10 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link href="/game" className="text-white/40 hover:text-white text-sm transition-colors">
              ← Department map
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-lg w-full space-y-4">

            {/* Score card */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden">
              <div className={`h-1.5 w-full ${department.color.replace("text-", "bg-")}`} />
              <div className="p-7 text-center">
                <div className="text-5xl mb-3">{department.icon}</div>
                <h2 className="text-white font-extrabold text-xl mb-1">{department.shortName}</h2>
                <p className={`text-sm font-semibold mb-6 ${label.color}`}>
                  {label.emoji} {label.text}
                </p>

                {/* Big score */}
                <div className="bg-slate-800 rounded-2xl p-6 mb-4">
                  <p className="text-5xl font-extrabold text-white mb-1">
                    {finalPct}
                    <span className="text-white/30 text-2xl">%</span>
                  </p>
                  <p className="text-white/40 text-sm mb-4">
                    {finalScore} / {totalQ} positive answers
                  </p>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${finalPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Answer review */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
                Summary
              </p>
              <div className="space-y-2">
                {questions.map((q, i) => (
                  <div
                    key={q.id}
                    className={`flex items-start gap-2.5 text-xs p-2.5 rounded-xl ${
                      answers[i]
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "bg-red-500/10 border border-red-500/20"
                    }`}
                  >
                    <span className={`mt-0.5 shrink-0 font-bold ${answers[i] ? "text-emerald-400" : "text-red-400"}`}>
                      {answers[i] ? "✓" : "✗"}
                    </span>
                    <span className="text-white/60 leading-snug">{q.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/game")}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-semibold text-sm hover:bg-white/5 hover:text-white transition-all"
              >
                ← Map
              </button>
              <button
                onClick={() => {
                  setPhase("intro");
                  setCurrentQ(0);
                  setAnswers([]);
                  setSelected(null);
                }}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-semibold text-sm hover:bg-white/5 hover:text-white transition-all"
              >
                🔄 Retake
              </button>
              <button
                onClick={() => router.push("/results")}
                className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm transition-all"
              >
                Results →
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── QUIZ ── */
  const progressPct = Math.round((currentQ / totalQ) * 100);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* Progress top bar */}
      <div className="bg-slate-900 border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.push("/game")}
            className="text-white/30 hover:text-white transition-colors text-sm shrink-0"
          >
            ←
          </button>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-lg">{department.icon}</span>
            <span className={`text-xs font-semibold ${department.color}`}>
              {department.shortName}
            </span>
          </div>
          <div className="flex-1">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          <span className="text-white/30 text-xs shrink-0">
            {currentQ + 1} / {totalQ}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">

          {/* Question number pill */}
          <div className="text-center mb-6">
            <span className="bg-white/5 border border-white/10 text-white/40 text-xs font-semibold px-4 py-1.5 rounded-full">
              Question {currentQ + 1} of {totalQ}
            </span>
          </div>

          {/* Question card */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 mb-5">
            <p className="text-white text-xl sm:text-2xl font-bold leading-relaxed text-center">
              {question.text}
            </p>
          </div>

          {/* Answer buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(false)}
              disabled={selected !== null}
              className={`py-5 rounded-2xl font-extrabold text-lg border-2 transition-all duration-200 ${
                selected === false
                  ? "bg-red-500 border-red-500 text-white scale-95"
                  : selected !== null
                  ? "opacity-30 cursor-not-allowed border-white/10 text-white/30"
                  : "border-white/10 bg-white/5 text-white hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-400 hover:scale-[1.03]"
              }`}
            >
              ✗ No
            </button>
            <button
              onClick={() => handleAnswer(true)}
              disabled={selected !== null}
              className={`py-5 rounded-2xl font-extrabold text-lg border-2 transition-all duration-200 ${
                selected === true
                  ? "bg-emerald-500 border-emerald-500 text-white scale-95"
                  : selected !== null
                  ? "opacity-30 cursor-not-allowed border-white/10 text-white/30"
                  : "border-white/10 bg-white/5 text-white hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:scale-[1.03]"
              }`}
            >
              ✓ Yes
            </button>
          </div>

          {/* Live tally */}
          {answers.length > 0 && (
            <p className="text-center text-white/20 text-xs mt-5">
              {answers.filter(Boolean).length} Yes out of {answers.length} answered
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
