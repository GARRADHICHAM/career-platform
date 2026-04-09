"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { departments } from "@/lib/questions";
import { departmentDetails } from "@/lib/departmentData";
import { getOrCreateSession } from "@/lib/gameSession";
import { GameSession } from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserMenu from "@/components/UserMenu";
import { useAuth } from "@/context/AuthContext";

function GameMap() {
  const router = useRouter();
  const { user } = useAuth();
  const [session, setSession] = useState<GameSession | null>(null);

  useEffect(() => {
    if (user) setSession(getOrCreateSession(user.uid));
  }, [user]);

  const completed = session?.completedDepartments ?? [];
  const allDone = completed.length === departments.length;
  const pct = Math.round((completed.length / departments.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950">

      {/* Top bar */}
      <div className="bg-slate-900 border-b border-white/10 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-white rounded-md px-1.5 py-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="ENSAM Meknès" className="h-8 w-auto object-contain" />
            </div>
          </Link>

          {/* Overall progress */}
          <div className="flex-1 max-w-xs">
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>{completed.length} / {departments.length} filières</span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <UserMenu />
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 text-xs font-semibold tracking-wide uppercase">
            Test d&apos;orientation ENSAM Meknès
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Choisis une filière à explorer
        </h1>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Réponds à 10 questions par filière pour mesurer ton niveau d&apos;affinité.
          Plus tu en complètes, plus ta recommandation sera précise.
        </p>
      </div>

      {/* Department grid */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => {
            const score = session?.scores[dept.id];
            const isDone = completed.includes(dept.id);
            const detail = departmentDetails[dept.id];

            return (
              <Link
                key={dept.id}
                href={`/game/${dept.id}`}
                className={`group relative flex flex-col rounded-2xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-xl overflow-hidden ${
                  isDone
                    ? "bg-slate-800 border-amber-400/40 hover:border-amber-400"
                    : "bg-slate-800/50 border-white/10 hover:border-white/30 hover:bg-slate-800"
                }`}
              >
                {/* Completed badge */}
                {isDone && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                    ✓ Fait
                  </div>
                )}

                <div className="p-5 flex-1">
                  <div className="text-3xl mb-3">{dept.icon}</div>
                  <h3 className="text-white font-bold text-sm mb-1 leading-snug">
                    {dept.shortName}
                  </h3>
                  {detail && (
                    <p className="text-white/40 text-xs leading-snug italic">
                      {detail.tagline}
                    </p>
                  )}
                </div>

                {/* Score bar if done */}
                {isDone && score ? (
                  <div className="px-5 pb-5">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/40">Affinité</span>
                      <span className="text-amber-400 font-bold">{score.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${score.percentage}%` }}
                      />
                    </div>
                    <p className="text-white/30 text-[10px] mt-1.5">
                      {score.score}/{score.total} réponses positives
                    </p>
                  </div>
                ) : (
                  <div className="px-5 pb-5">
                    <span className="text-white/30 text-xs font-semibold group-hover:text-amber-400 transition-colors">
                      Commencer le quiz →
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/results")}
            disabled={completed.length === 0}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              completed.length > 0
                ? "bg-amber-400 hover:bg-amber-300 text-slate-900 hover:shadow-lg hover:shadow-amber-400/25 hover:scale-105"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {allDone
              ? "🏆 Voir mes résultats finaux"
              : completed.length > 0
              ? `📊 Voir mes résultats (${completed.length} filière${completed.length > 1 ? "s" : ""})`
              : "Complète au moins une filière"}
          </button>

          {completed.length > 0 && !allDone && (
            <p className="text-white/30 text-xs">
              {departments.length - completed.length} filière{departments.length - completed.length > 1 ? "s" : ""} restante{departments.length - completed.length > 1 ? "s" : ""} — continue pour une meilleure recommandation
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default function GamePage() {
  return (
    <ProtectedRoute>
      <GameMap />
    </ProtectedRoute>
  );
}
