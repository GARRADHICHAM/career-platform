"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { departments } from "@/lib/questions";
import { departmentDetails } from "@/lib/departmentData";
import { useAuth } from "@/context/AuthContext";

const sectors = ["All", "Industry", "Tech & Digital", "Energy", "Consulting", "Construction", "Research"];

const allCareers = departments.flatMap((dept) => {
  const detail = departmentDetails[dept.id];
  if (!detail) return [];
  return detail.careers.map((c) => ({
    ...c,
    deptId: dept.id,
    deptName: dept.shortName,
    deptIcon: dept.icon,
    deptColor: dept.color,
    deptBg: dept.bgColor,
    salary: c.salary,
  }));
});

export default function CareersPage() {
  const { user } = useAuth();
  const [activeSector, setActiveSector] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allCareers.filter((c) => {
    const s = c.sector.toLowerCase();
    const matchSector =
      activeSector === "All" ||
      (activeSector === "Industry" && (s.includes("industry") || s.includes("automotive") || s.includes("aerospace") || s.includes("manufacturing"))) ||
      (activeSector === "Tech & Digital" && (s.includes("tech") || s.includes("it services") || s.includes("digital") || s.includes("fintech") || s.includes("startups"))) ||
      (activeSector === "Energy" && (s.includes("energy") || s.includes("onee") || s.includes("utilities") || s.includes("renewables"))) ||
      (activeSector === "Consulting" && s.includes("consulting")) ||
      (activeSector === "Construction" && (s.includes("construction") || s.includes("public works") || s.includes("design offices"))) ||
      (activeSector === "Research" && s.includes("research"));
    const matchSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.deptName.toLowerCase().includes(search.toLowerCase());
    return matchSector && matchSearch;
  });

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-slate-900 pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Careers</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            All ENSAM Careers
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            {allCareers.length} careers listed across 10 departments — explore, filter, and find
            your future role.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a career or department..."
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-slate-800 py-4 px-4 sticky top-16 z-30 shadow-lg">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSector === sector
                  ? "bg-amber-400 text-slate-900"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </section>

      {/* Careers grid */}
      <section className="bg-slate-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-400 text-sm mb-6">
            {filtered.length} career{filtered.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((career, i) => (
              <div
                key={`${career.deptId}-${i}`}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">{career.deptIcon}</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm leading-snug">{career.title}</h3>
                    <Link
                      href={`/departments/${career.deptId}`}
                      className={`text-xs font-semibold ${career.deptColor} hover:underline`}
                    >
                      {career.deptName}
                    </Link>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">🏢 Sector:</span>
                    <span className="text-slate-600 text-xs font-medium">{career.sector}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">💰 Salary:</span>
                    <span className="text-slate-800 text-xs font-bold">{career.salary}</span>
                  </div>
                </div>

                <Link
                  href={`/departments/${career.deptId}`}
                  className={`block text-center text-xs font-semibold py-2 rounded-xl border ${career.deptBg} ${career.deptColor} border-current hover:opacity-80 transition-opacity`}
                >
                  View department →
                </Link>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-slate-500">No careers found for these criteria.</p>
                <button
                  onClick={() => { setSearch(""); setActiveSector("All"); }}
                  className="text-indigo-600 underline text-sm mt-2"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Salary comparison */}
      <section className="bg-white py-16 px-4 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">
            💰 Average salaries by department
          </h2>
          <div className="space-y-4">
            {departments.map((dept) => {
              const detail = departmentDetails[dept.id];
              if (!detail) return null;
              const numericSalary = parseInt(detail.avgSalary.replace(/\D/g, ""));
              const maxSalary = 18000;
              const pct = Math.min(100, (numericSalary / maxSalary) * 100);
              return (
                <div key={dept.id} className="flex items-center gap-4">
                  <span className="text-xl w-8 shrink-0">{dept.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-slate-700 truncate">{dept.shortName}</span>
                      <span className="text-sm font-bold text-slate-900 ml-3 shrink-0">{detail.avgSalary}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${dept.color.replace("text-", "bg-")}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-slate-400 text-xs text-center mt-6">
            * Indicative salaries for recent graduates in Morocco — vary by company and region.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-slate-900 to-indigo-900 py-14 px-4 text-center">
        <h3 className="text-2xl font-extrabold text-white mb-3">
          Which career really fits you?
        </h3>
        <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
          Our orientation test analyzes your affinities and recommends the departments — and therefore the careers — that suit you best.
        </p>
        <Link
          href={user ? "/game" : "/login"}
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:shadow-lg"
        >
          🎯 Take the test now
        </Link>
      </section>

      <Footer />
    </>
  );
}
