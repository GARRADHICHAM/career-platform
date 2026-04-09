import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-amber-400 rounded-lg flex items-center justify-center font-black text-slate-900">
                E
              </div>
              <div>
                <p className="text-white font-bold text-base">ENSAM Meknès</p>
                <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                  Plateforme d&apos;Orientation
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Aide les étudiants de l&apos;ENSAM Meknès à découvrir leur filière
              idéale et à construire leur projet professionnel avec confiance.
            </p>
            <p className="text-white/30 text-xs mt-4">
              École Nationale Supérieure d&apos;Arts et Métiers — Meknès, Maroc
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Explorer
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Accueil" },
                { href: "/departments", label: "Les Filières" },
                { href: "/careers", label: "Débouchés & Carrières" },
                { href: "/game", label: "Test d'Orientation" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-amber-400 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Filières */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Filières
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/departments/ai", label: "IA Engineering" },
                { href: "/departments/it", label: "IT Engineering" },
                { href: "/departments/iot-industry40", label: "IoT & Industrie 4.0" },
                { href: "/departments/energy", label: "Génie Énergétique" },
                { href: "/departments/materials-mechanical", label: "Génie Mécanique" },
                { href: "/departments/civil", label: "Génie Civil" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-amber-400 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} ENSAM Meknès — Plateforme d&apos;Orientation Étudiante
          </p>
          <p className="text-white/30 text-xs">Projet SGRP52</p>
        </div>
      </div>
    </footer>
  );
}
