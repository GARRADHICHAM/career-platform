"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { departments } from "@/lib/questions";
import { getOrCreateSession } from "@/lib/gameSession";
import { GameSession } from "@/types";
import DepartmentCard from "@/components/DepartmentCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserMenu from "@/components/UserMenu";

function GameMap() {
  const router = useRouter();
  const [session, setSession] = useState<GameSession | null>(null);

  useEffect(() => {
    setSession(getOrCreateSession());
  }, []);

  const completed = session?.completedDepartments ?? [];
  const allDone = completed.length === departments.length;

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold">Choose a Department</h1>
              <p className="text-indigo-200 text-sm mt-0.5">
                {completed.length} / {departments.length} completed
              </p>
            </div>
            <UserMenu />
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(completed.length / departments.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {departments.map((dept) => {
            const deptScore = session?.scores[dept.id];
            return (
              <DepartmentCard
                key={dept.id}
                department={dept}
                score={deptScore?.score}
                total={deptScore?.total}
                completed={completed.includes(dept.id)}
              />
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/results")}
            disabled={completed.length === 0}
            className={`px-8 py-3 rounded-2xl font-bold text-base transition-all duration-200 ${
              completed.length > 0
                ? "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allDone
              ? "🏆 See My Results"
              : completed.length > 0
              ? "📊 See Partial Results"
              : "Complete at least 1 quiz first"}
          </button>
          {completed.length > 0 && !allDone && (
            <p className="text-gray-400 text-xs mt-2">
              Complete more quizzes for better recommendations
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
