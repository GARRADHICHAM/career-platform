"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { departments } from "@/lib/questions";
import { departmentDetails } from "@/lib/departmentData";
import { useAuth } from "@/context/AuthContext";

export default function DepartmentsPage() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-slate-900 pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Departments</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            10 paths to excellence
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore each specialization in detail — courses, skills, careers, and
            companies that hire our graduates.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {departments.map((dept) => {
              const detail = departmentDetails[dept.id];
              return (
                <div
                  key={dept.id}
                  className={`border-2 ${dept.bgColor} rounded-2xl p-7 flex flex-col gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{dept.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h2 className={`font-extrabold text-lg ${dept.color}`}>{dept.name}</h2>
                      {detail && (
                        <p className="text-slate-500 text-sm mt-0.5 italic">{detail.tagline}</p>
                      )}
                    </div>
                    {detail && (
                      <div className="text-right shrink-0">
                        <p className="text-lg font-extrabold text-slate-800">{detail.employmentRate}</p>
                        <p className="text-xs text-slate-400">employment</p>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">{dept.description}</p>

                  {detail && (
                    <>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Sample careers
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {detail.careers.slice(0, 3).map((c) => (
                            <span
                              key={c.title}
                              className="bg-white/70 border border-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-full"
                            >
                              {c.title}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <Link
                          href={`/departments/${dept.id}`}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-center transition-all hover:opacity-90 ${dept.color} bg-white border-2 border-current hover:shadow-sm`}
                        >
                          Explore department →
                        </Link>
                        <Link
                          href={user ? `/game/${dept.id}` : "/login"}
                          className="py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-500 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all"
                        >
                          🎯 Test
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 px-4 text-center border-t border-slate-100">
        <h3 className="text-xl font-extrabold text-slate-900 mb-3">
          Still choosing between departments?
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          Our interactive test analyzes your affinities and recommends the 3 best options for you.
        </p>
        <Link
          href={user ? "/game" : "/login"}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:shadow-lg"
        >
          🎯 Take the orientation test
        </Link>
      </section>

      <Footer />
    </>
  );
}
