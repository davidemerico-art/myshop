"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/home" className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">MyShop</span>
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/home" className="nav-link">Home</Link>
          <Link href="/acquista" className="nav-link">Acquista</Link>
          <Link href="/hsconti" className="nav-link">Sconti</Link>
          
          <span className="hidden md:inline-block h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />
          <Link href="/cart" className="relative flex items-center group">
            <span className="text-gray-700 dark:text-white text-lg mr-1 group-hover:text-blue-600 transition">🛒</span>
            <span className="hidden md:inline text-gray-700 dark:text-white group-hover:underline">Carrello</span>
          </Link>
          <button
            onClick={() => setDark(!dark)}
            className="ml-2 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-300 dark:hover:bg-gray-800 transition"
            title="Cambia tema"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
      <style jsx>{`
        .nav-link {
          @apply text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition px-2 py-1 rounded;
        }
        .nav-link:hover {
          background: rgba(59,130,246,0.08);
        }
      `}</style>
    </div>
  );
}