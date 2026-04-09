"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/departments", label: "Filières" },
  { href: "/careers", label: "Carrières" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
  }

  const initials = user
    ? (user.displayName ?? user.email ?? "?")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-white rounded-lg px-2 py-1">
              <Image
                src="/logo.jpeg"
                alt="ENSAM Meknès"
                width={80}
                height={28}
                className="h-7 object-contain"
                style={{ width: "auto" }}
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-amber-400 bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={user ? "/game" : "/login"}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:scale-105"
            >
              🎯 Test d&apos;Orientation
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full pl-1 pr-3 py-1 transition-all"
                >
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt="avatar" width={26} height={26} className="rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-slate-900">
                      {initials}
                    </div>
                  )}
                  <span className="text-white text-xs font-medium max-w-[80px] truncate">
                    {user.displayName?.split(" ")[0] ?? user.email}
                  </span>
                </button>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl z-20 overflow-hidden border border-gray-100">
                      <Link href="/game" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium">
                        📊 Mon tableau de bord
                      </Link>
                      <Link href="/results" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium">
                        🏆 Mes résultats
                      </Link>
                      <hr className="border-gray-100" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-medium"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                pathname === link.href ? "text-amber-400 bg-white/10" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={user ? "/game" : "/login"}
            className="block bg-amber-400 text-slate-900 font-bold text-sm px-4 py-2.5 rounded-lg text-center mt-3"
          >
            🎯 Test d&apos;Orientation
          </Link>
          {user ? (
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2.5 text-sm text-red-400"
            >
              Déconnexion
            </button>
          ) : (
            <Link href="/login" className="block px-4 py-2.5 text-sm text-white/70">
              Connexion
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
