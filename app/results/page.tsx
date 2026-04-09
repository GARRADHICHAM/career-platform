"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrCreateSession, saveResultsToFirebase } from "@/lib/gameSession";
import { departments } from "@/lib/questions";
import { DepartmentScore, GameSession } from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserMenu from "@/components/UserMenu";

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

function ResultsDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<GameSession | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = getOrCreateSession();
    setSession(s);
  }, []);

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

  async function handleSave() {
    if (!session) return;
    await saveResultsToFirebase(session);
    setSaved(true);
  }

  function getMedal(index: number) {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  }

  if (!session || ranked.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No results yet</h2>
          <p className="text-gray-500 text-sm mb-6">
            You need to complete at least one quiz before seeing results.
          </p>
          <button
            onClick={() => router.push("/game")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-500 transition-all"
          >
            Go to Department Map
          </button>
        </div>
      </main>
    );
  }

  const completedCount = ranked.length;
  const totalCount = departments.length;

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="text-4xl mb-2">🏆</div>
            <h1 className="text-2xl font-extrabold mb-1">Your Results</h1>
            <p className="text-indigo-200 text-sm">
              {completedCount} of {totalCount} departments completed
            </p>
          </div>
          <UserMenu />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-8 space-y-6">

        {/* Top 3 Recommendations */}
        {top3.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              ⭐ Your Top {top3.length} Recommendations
            </h2>
            <div className="space-y-3">
              {top3.map((dept, i) => (
                <div
                  key={dept.id}
                  className={`border-2 rounded-2xl p-5 ${dept.bgColor} ${i === 0 ? "shadow-md" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{getMedal(i)}</span>
                    <span className="text-2xl">{dept.icon}</span>
                    <div>
                      <h3 className={`font-bold text-sm ${dept.color}`}>{dept.name}</h3>
                      <p className="text-gray-500 text-xs">Rank #{i + 1}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className={`text-2xl font-extrabold ${dept.color}`}>{dept.percentage}%</p>
                      <p className="text-gray-500 text-xs">{dept.score}/{dept.total} Yes</p>
                    </div>
                  </div>
                  <div className="h-2.5 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-current rounded-full transition-all"
                      style={{ width: `${dept.percentage}%`, color: "inherit" }}
                    />
                  </div>
                  {/* progress bar with fixed color */}
                  <div className="h-2.5 -mt-2.5 bg-transparent rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all ${
                        i === 0
                          ? "bg-yellow-500"
                          : i === 1
                          ? "bg-gray-400"
                          : "bg-orange-400"
                      }`}
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Scores */}
        {rest.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-700 mb-3">Other Scores</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
              {rest.map((dept) => (
                <div key={dept.id} className="flex items-center gap-3 px-5 py-4">
                  <span className="text-xl">{dept.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">{dept.shortName}</p>
                    <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-indigo-400 rounded-full"
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-700">{dept.percentage}%</p>
                    <p className="text-xs text-gray-400">{dept.score}/{dept.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Incomplete departments notice */}
        {completedCount < totalCount && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-700">
            <p className="font-semibold mb-1">💡 Tip</p>
            <p>
              You haven&apos;t completed all departments yet. Complete the remaining{" "}
              <strong>{totalCount - completedCount}</strong> to get more accurate recommendations.
            </p>
            <button
              onClick={() => router.push("/game")}
              className="mt-3 text-amber-800 font-semibold underline"
            >
              Continue quiz →
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => router.push("/game")}
            className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 transition-all text-sm"
          >
            ← Back to Map
          </button>
          <button
            onClick={handleSave}
            disabled={saved}
            className={`flex-1 py-3 rounded-2xl font-semibold text-sm transition-all ${
              saved
                ? "bg-green-100 text-green-600 cursor-default"
                : "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md"
            }`}
          >
            {saved ? "✓ Saved to Firebase" : "💾 Save Results"}
          </button>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="flex-1 py-3 rounded-2xl bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 transition-all"
          >
            🔄 Restart
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
