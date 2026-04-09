"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getOrCreateSession, saveResultsToFirebase, clearSession } from "@/lib/gameSession";
import { departments } from "@/lib/questions";
import { departmentDetails } from "@/lib/departmentData";
import { GameSession } from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserMenu from "@/components/UserMenu";
import { useAuth } from "@/context/AuthContext";

interface RankedDept {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgColor: string;
  score: number;
  total: number;
  percentage: number;
}

const medals = ["🥇", "🥈", "🥉"];
const medalColors = [
  "border-amber-400/50 bg-amber-400/5",
  "border-slate-400/40 bg-slate-400/5",
  "border-orange-400/40 bg-orange-400/5",
];
const medalBarColors = ["bg-amber-400", "bg-slate-400", "bg-orange-400"];

function ResultsDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [session, setSession] = useState<GameSession | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) setSession(getOrCreateSession(user.uid));
  }, [user]);

  const ranked: RankedDept[] = departments
    .filter((d) => session?.scores[d.id])
    .map((d) => {
      const sc = session!.scores[d.id];
      return {
        id: d.id,
        name: d.name,
        shortName: d.shortName,
        icon: d.icon,
        color: d.color,
        bgColor: d.bgColor,
        score: sc.score,
        total: sc.total,
        percentage: sc.percentage,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);
  const completedCount = ranked.length;
  const totalCount = departments.length;

  async function handleSave() {
    if (!session || saving || !user) return;
    setSaving(true);
    await saveResultsToFirebase(session, user.uid);
    setSaved(true);
    setSaving(false);
  }

  function handleRestart() {
    if (user) clearSession(user.uid);
    router.push("/game");
  }

  /* ── EMPTY STATE ── */
  if (!session || ranked.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col">
        <div className="bg-slate-900 border-b border-white/10 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/game" className="text-white/40 hover:text-white text-sm transition-colors">
              ← Retour
            </Link>
            <UserMenu />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="text-6xl mb-5">📭</div>
            <h2 className="text-xl font-extrabold text-white mb-2">Aucun résultat</h2>
            <p className="text-white/40 text-sm mb-8">
              Tu dois compléter au moins une filière avant de voir tes résultats.
            </p>
            <Link
              href="/game"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Aller à la carte des filières
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const overallScore = Math.round(
    ranked.reduce((acc, d) => acc + d.percentage, 0) / ranked.length
  );

  return (
    <main className="min-h-screen bg-slate-950 pb-16">

      {/* Top bar */}
      <div className="bg-slate-900 border-b border-white/10 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link href="/game" className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-1.5">
            ← Carte
          </Link>
          <span className="text-white/50 text-sm font-medium hidden sm:block">Mes Résultats</span>
          <UserMenu />
        </div>
      </div>

      {/* Hero */}
      <div className="bg-slate-900 border-b border-white/10 px-4 pt-12 pb-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Tes résultats d&apos;orientation
          </h1>
          <p className="text-white/40 text-sm mb-6">
            {completedCount} filière{completedCount > 1 ? "s" : ""} complétée{completedCount > 1 ? "s" : ""} sur {totalCount}
            {completedCount < totalCount && ` — complète les ${totalCount - completedCount} restantes pour plus de précision`}
          </p>

          {/* Summary pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
              <p className="text-2xl font-extrabold text-amber-400">{overallScore}%</p>
              <p className="text-white/30 text-xs">score moyen</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
              <p className="text-2xl font-extrabold text-white">{completedCount}/{totalCount}</p>
              <p className="text-white/30 text-xs">filières testées</p>
            </div>
            {top3[0] && (
              <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl px-5 py-3">
                <p className="text-lg font-extrabold text-amber-400">
                  {top3[0].icon} {top3[0].shortName}
                </p>
                <p className="text-white/30 text-xs">meilleure affinité</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-10 space-y-8">

        {/* TOP 3 */}
        {top3.length > 0 && (
          <section>
            <h2 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">
              ⭐ Recommandations — Top {top3.length}
            </h2>
            <div className="space-y-3">
              {top3.map((dept, i) => {
                const detail = departmentDetails[dept.id];
                return (
                  <div
                    key={dept.id}
                    className={`border rounded-2xl p-5 transition-all ${medalColors[i]} ${i === 0 ? "shadow-lg shadow-amber-400/10" : ""}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl">{medals[i]}</span>
                      <div className="text-3xl">{dept.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-extrabold text-base">{dept.name}</h3>
                        {detail && (
                          <p className="text-white/40 text-xs italic">{detail.tagline}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-3xl font-extrabold ${i === 0 ? "text-amber-400" : "text-white"}`}>
                          {dept.percentage}%
                        </p>
                        <p className="text-white/30 text-xs">{dept.score}/{dept.total} Oui</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                      <div
                        className={`h-full rounded-full transition-all ${medalBarColors[i]}`}
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>

                    {/* Career pills */}
                    {detail && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {detail.careers.slice(0, 3).map((c) => (
                          <span
                            key={c.title}
                            className="bg-white/5 border border-white/10 text-white/50 text-xs px-2.5 py-1 rounded-full"
                          >
                            {c.title}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Link
                        href={`/departments/${dept.id}`}
                        className="flex-1 text-center py-2.5 rounded-xl border border-white/10 text-white/60 text-xs font-semibold hover:bg-white/5 hover:text-white transition-all"
                      >
                        Découvrir la filière ↗
                      </Link>
                      <Link
                        href={`/game/${dept.id}`}
                        className="flex-1 text-center py-2.5 rounded-xl border border-white/10 text-white/60 text-xs font-semibold hover:bg-white/5 hover:text-white transition-all"
                      >
                        🔄 Refaire le quiz
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ALL SCORES bar chart */}
        <section className="bg-slate-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-5">
            📊 Toutes les filières
          </h2>
          <div className="space-y-4">
            {ranked.map((dept, i) => (
              <div key={dept.id} className="flex items-center gap-3">
                <span className="text-xl w-7 shrink-0">{dept.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white/70 text-sm font-medium truncate">{dept.shortName}</span>
                    <span className={`text-sm font-extrabold shrink-0 ml-3 ${i < 3 ? "text-amber-400" : "text-white/50"}`}>
                      {dept.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${i < 3 ? "bg-amber-400" : "bg-white/20"}`}
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
                {i < 3 && (
                  <span className="text-sm shrink-0">{medals[i]}</span>
                )}
              </div>
            ))}

            {/* Not yet tested */}
            {departments
              .filter((d) => !ranked.find((r) => r.id === d.id))
              .map((dept) => (
                <div key={dept.id} className="flex items-center gap-3 opacity-30">
                  <span className="text-xl w-7 shrink-0">{dept.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/50 text-sm truncate">{dept.shortName}</span>
                      <span className="text-white/30 text-xs shrink-0 ml-3">Non testé</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full" />
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Incomplete notice */}
        {completedCount < totalCount && (
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <p className="text-amber-400 font-semibold text-sm mb-1">
                  Résultats partiels
                </p>
                <p className="text-white/50 text-xs leading-relaxed">
                  Tu n&apos;as pas encore testé toutes les filières.
                  Complète les <strong className="text-white/70">{totalCount - completedCount}</strong> filières
                  restantes pour obtenir une recommandation plus précise.
                </p>
                <Link
                  href="/game"
                  className="inline-block mt-3 text-amber-400 text-xs font-semibold hover:underline"
                >
                  Continuer le test →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => router.push("/game")}
            className="py-3.5 rounded-xl border border-white/10 text-white/60 font-semibold text-sm hover:bg-white/5 hover:text-white transition-all"
          >
            ← Carte des filières
          </button>
          <button
            onClick={handleSave}
            disabled={saved || saving}
            className={`py-3.5 rounded-xl font-semibold text-sm transition-all ${
              saved
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                : "bg-slate-800 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {saving ? "Enregistrement..." : saved ? "✓ Sauvegardé" : "💾 Sauvegarder"}
          </button>
          <button
            onClick={handleRestart}
            className="py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm transition-all hover:shadow-lg hover:shadow-amber-400/20"
          >
            🔄 Recommencer
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <ProtectedRoute>
      <ResultsDashboard />
    </ProtectedRoute>
  );
}
