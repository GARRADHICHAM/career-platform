"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { departments } from "@/lib/questions";

const stats = [
  { value: "65+", label: "Années d'excellence" },
  { value: "8", label: "Filières d'ingénierie" },
  { value: "5 000+", label: "Ingénieurs formés" },
  { value: "96%", label: "Taux d'insertion" },
];

const whyEnsam = [
  {
    icon: "🏆",
    title: "Excellence académique",
    desc: "Membre du réseau Arts et Métiers ParisTech, l'ENSAM Meknès est l'une des grandes écoles d'ingénieurs les plus reconnues du Maroc.",
  },
  {
    icon: "🤝",
    title: "Partenariats industriels",
    desc: "Des partenariats solides avec Renault, Boeing, OCP, Schneider Electric et des dizaines d'entreprises nationales et internationales.",
  },
  {
    icon: "🌍",
    title: "Ouverture internationale",
    desc: "Programmes d'échanges avec des universités européennes, stages à l'étranger et double-diplôme pour les meilleurs étudiants.",
  },
  {
    icon: "🔬",
    title: "Recherche & Innovation",
    desc: "Des laboratoires de recherche actifs dans les domaines des matériaux, de l'énergie, de l'IA et de l'industrie 4.0.",
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
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-semibold tracking-wide uppercase">
                Plateforme d&apos;orientation officielle — ENSAM Meknès
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Construis ton avenir
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                d&apos;ingénieur à ENSAM
              </span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
              Découvre les 8 filières d&apos;ingénierie de l&apos;ENSAM Meknès, explore les
              débouchés professionnels, et utilise notre test interactif pour trouver
              le domaine qui te correspond le mieux.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/departments"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-7 py-3.5 rounded-xl text-base transition-all hover:shadow-xl hover:shadow-amber-400/25 hover:scale-105"
              >
                Explorer les filières →
              </Link>
              <Link
                href={user ? "/game" : "/login"}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all hover:bg-white/10"
              >
                🎯 Test d&apos;orientation
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs font-medium">Découvrir</span>
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
              <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">À propos</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-6 leading-tight">
                L&apos;excellence au service de l&apos;ingénierie marocaine
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Fondée en 1959, l&apos;École Nationale Supérieure d&apos;Arts et Métiers de Meknès
                fait partie du prestigieux réseau Arts et Métiers ParisTech. Elle forme
                des ingénieurs polyvalents, capables de relever les défis technologiques
                du Maroc et du monde entier.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Avec un cycle de formation de 5 ans (2 ans de classes préparatoires + 3 ans
                d&apos;école d&apos;ingénieurs), l&apos;ENSAM Meknès offre 8 spécialisations couvrant
                les domaines les plus porteurs de l&apos;économie actuelle : de l&apos;intelligence
                artificielle à l&apos;énergie renouvelable, en passant par l&apos;industrie 4.0 et
                le génie civil.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Accréditée CTI", "Réseau Arts et Métiers", "ISO 9001", "Label EUR-ACE"].map((badge) => (
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
                { label: "Taux d'insertion à 6 mois", value: "96%", icon: "📈", color: "bg-green-50 border-green-200" },
                { label: "Salaire moyen débutant", value: "14 500 MAD", icon: "💼", color: "bg-blue-50 border-blue-200" },
                { label: "Années d'excellence", value: "65+", icon: "🏛️", color: "bg-amber-50 border-amber-200" },
                { label: "Partenaires industriels", value: "120+", icon: "🤝", color: "bg-purple-50 border-purple-200" },
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
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Filières</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              8 spécialisations d&apos;avenir
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Chaque filière ouvre des portes sur des secteurs clés de l&apos;économie marocaine et internationale.
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
                  En savoir plus →
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:bg-slate-100"
            >
              Voir toutes les filières →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAREERS TEASER ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Débouchés</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Des carrières à haute valeur ajoutée
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Les diplômés de l&apos;ENSAM Meknès intègrent des entreprises leaders au Maroc et à l&apos;international.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                sector: "Industrie & Automobile",
                companies: ["Renault Maroc", "Boeing", "Safran", "Stellantis", "Yazaki"],
                icon: "🏭",
                color: "border-orange-200 bg-orange-50",
              },
              {
                sector: "Tech & Numérique",
                companies: ["OCP Digital", "Capgemini", "IBM", "HPS", "CGI"],
                icon: "💻",
                color: "border-indigo-200 bg-indigo-50",
              },
              {
                sector: "Énergie & Environnement",
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
              Explorer tous les débouchés →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY ENSAM ── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Pourquoi ENSAM</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Une école, une vision
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
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-5">🎯</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Pas encore sûr de ta filière ?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Notre test d&apos;orientation interactif analyse tes affinités avec chaque domaine
            et te recommande les 3 filières qui te correspondent le mieux.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={user ? "/game" : "/login"}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-2xl hover:scale-105"
            >
              Commencer le test gratuitement →
            </Link>
            <Link href="/departments" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              ou explorer les filières d&apos;abord
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-6">
            80 questions · 8 filières · Résultats instantanés · Gratuit
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
