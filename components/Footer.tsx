import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg px-2 py-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="ENSAM Meknès" className="h-10 w-auto object-contain" />
              </div>
              <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase leading-snug">
                Orientation<br />Platform
              </p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Helping ENSAM Meknès students discover their ideal engineering
              department and build their professional project with confidence.
            </p>
            <p className="text-white/30 text-xs mt-4">
              École Nationale Supérieure d&apos;Arts et Métiers — Meknès, Morocco
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/departments", label: "Departments" },
                { href: "/careers", label: "Careers & Opportunities" },
                { href: "/game", label: "Orientation Test" },
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

          {/* Departments */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Departments
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/departments/ai", label: "AI Engineering" },
                { href: "/departments/it", label: "IT Engineering" },
                { href: "/departments/iot-industry40", label: "Electro Digitalisation" },
                { href: "/departments/energy", label: "Energy Engineering" },
                { href: "/departments/materials-mechanical", label: "Materials & Mech" },
                { href: "/departments/civil", label: "Civil Engineering" },
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
            © {new Date().getFullYear()} ENSAM Meknès — Student Orientation Platform
          </p>
          <p className="text-white/30 text-xs">Project SGRP52</p>
        </div>
      </div>
    </footer>
  );
}
