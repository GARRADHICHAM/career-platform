"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { departments } from "@/lib/questions";

const stats = [
  { value: "65+", label: "Years of excellence" },
  { value: "10", label: "Engineering departments" },
  { value: "5 000+", label: "Engineers trained" },
  { value: "96%", label: "Employment rate" },
];

const whyEnsam = [
  {
    icon: "🏆",
    title: "Academic Excellence",
    desc: "A member of the Arts et Métiers ParisTech network, ENSAM Meknès is one of the most recognized engineering schools in Morocco.",
  },
  {
    icon: "🤝",
    title: "Industry Partnerships",
    desc: "Strong partnerships with Renault, Boeing, OCP, Schneider Electric and dozens of national and international companies.",
  },
  {
    icon: "🌍",
    title: "International Openness",
    desc: "Exchange programs with European universities, international internships, and double-degree opportunities for top students.",
  },
  {
    icon: "🔬",
    title: "Research & Innovation",
    desc: "Active research laboratories in materials, energy, AI, and Industry 4.0.",
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-slate-900 flex items-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-150 h-150 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-125 h-125 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-purple-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-semibold tracking-wide uppercase">
                Official Orientation Platform — ENSAM Meknès
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Build your engineering
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-400">
                future at ENSAM
              </span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
              Discover the 10 engineering departments of ENSAM Meknès, explore career
              paths, and use our interactive test to find the field that suits you best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/departments"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-7 py-3.5 rounded-xl text-base transition-all hover:shadow-xl hover:shadow-amber-400/25 hover:scale-105"
              >
                Explore Departments →
              </Link>
              <Link
                href={user ? "/game" : "/login"}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all hover:bg-white/10"
              >
                🎯 Orientation Test
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-amber-400 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-slate-700 text-sm font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ENSAM ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">About</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-6 leading-tight">
                Excellence at the service of Moroccan engineering
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Founded in 1959, the École Nationale Supérieure d&apos;Arts et Métiers de Meknès
                is part of the prestigious Arts et Métiers ParisTech network. It trains
                versatile engineers capable of meeting the technological challenges
                of Morocco and the world.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                With a 5-year training cycle (2 years of preparatory classes + 3 years of
                engineering school), ENSAM Meknès offers 10 specializations covering
                the most in-demand fields: from artificial intelligence to renewable energy,
                Industry 4.0, and civil engineering.
              </p>
              <div className="flex flex-wrap gap-3">
                {["CTI Accredited", "Arts et Métiers Network", "ISO 9001", "EUR-ACE Label"].map((badge) => (
                  <span
                    key={badge}
                    className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Employment rate at 6 months", value: "96%", icon: "📈", color: "bg-green-50 border-green-200" },
                { label: "Average starting salary", value: "14 500 MAD", icon: "💼", color: "bg-blue-50 border-blue-200" },
                { label: "Years of excellence", value: "65+", icon: "🏛️", color: "bg-amber-50 border-amber-200" },
                { label: "Industry partners", value: "120+", icon: "🤝", color: "bg-purple-50 border-purple-200" },
              ].map((item) => (
                <div key={item.label} className={`border-2 ${item.color} rounded-2xl p-5 text-center`}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-2xl font-extrabold text-slate-900">{item.value}</p>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Departments</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              10 specializations for the future
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Each department opens doors to key sectors of the Moroccan and international economy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <Link
                key={dept.id}
                href={`/departments/${dept.id}`}
                className={`border-2 ${dept.bgColor} rounded-2xl p-5 hover:shadow-md transition-all hover:-translate-y-1 group`}
              >
                <div className="text-3xl mb-3">{dept.icon}</div>
                <h3 className={`font-bold text-sm mb-2 ${dept.color}`}>{dept.shortName}</h3>
                <p className="text-slate-500 text-xs leading-snug line-clamp-2">{dept.description}</p>
                <p className={`text-xs font-semibold mt-3 ${dept.color} group-hover:underline`}>
                  Learn more →
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:bg-slate-100"
            >
              View all departments →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAREERS TEASER ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Career Paths</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              High-value engineering careers
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              ENSAM Meknès graduates join leading companies in Morocco and internationally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                sector: "Industry & Automotive",
                companies: ["Renault Maroc", "Boeing", "Safran", "Stellantis", "Yazaki"],
                icon: "🏭",
                color: "border-orange-200 bg-orange-50",
              },
              {
                sector: "Tech & Digital",
                companies: ["OCP Digital", "Capgemini", "IBM", "HPS", "CGI"],
                icon: "💻",
                color: "border-indigo-200 bg-indigo-50",
              },
              {
                sector: "Energy & Environment",
                companies: ["ONEE", "Nareva", "Masen", "Total Energies", "EDF"],
                icon: "⚡",
                color: "border-green-200 bg-green-50",
              },
            ].map((item) => (
              <div key={item.sector} className={`border-2 ${item.color} rounded-2xl p-6`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-3">{item.sector}</h3>
                <ul className="space-y-1.5">
                  {item.companies.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Explore all career paths →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY ENSAM ── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Why ENSAM</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              One school, one vision
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyEnsam.map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold mb-2 text-sm">{item.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAME CTA ── */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-5">🎯</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Not sure which department fits you?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Our interactive orientation test analyzes your affinity with each field
            and recommends the 3 departments that suit you best.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={user ? "/game" : "/login"}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-2xl hover:scale-105"
            >
              Start the test for free →
            </Link>
            <Link href="/departments" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              or explore departments first
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-6">
            100 questions · 10 departments · Instant results · Free
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
