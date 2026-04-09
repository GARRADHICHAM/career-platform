"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/gameSession";

export default function Home() {
  const router = useRouter();

  function handleStart() {
    clearSession();
    router.push("/game");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="text-7xl mb-6">🎓</div>
        <h1 className="text-4xl font-extrabold text-white mb-3 leading-tight">
          Career Orientation
          <span className="block text-indigo-300">Web Game</span>
        </h1>
        <p className="text-indigo-200 text-base mb-2">
          ENSAM — Interactive Department Guide
        </p>
        <p className="text-white/70 text-sm mb-8 leading-relaxed">
          Answer readiness questions across 8 engineering departments and discover
          which field suits you best. Get your top 3 recommendations instantly.
        </p>

        <div className="bg-white/10 rounded-2xl p-5 mb-8 text-left space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <p className="text-white font-semibold text-sm">Explore 8 Departments</p>
              <p className="text-white/60 text-xs">Materials, Civil, AI, IoT, Energy and more</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">❓</span>
            <div>
              <p className="text-white font-semibold text-sm">10 Questions per Department</p>
              <p className="text-white/60 text-xs">Simple Yes/No readiness assessment</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-white font-semibold text-sm">Get Your Top 3 Picks</p>
              <p className="text-white/60 text-xs">Personalized recommendations based on your answers</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          Start the Game 🚀
        </button>
        <p className="text-white/40 text-xs mt-4">
          Questions based on real data from ENSAM students &amp; graduates
        </p>
      </div>
    </main>
  );
}
