"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>

      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          🛒 MyShop
        </h1>

        {/* SEARCH */}
        <input
          className="w-1/2 max-w-md p-2 border rounded-lg text-black"
          placeholder="Cerca prodotti..."
        />

        {/* MENU */}
        <div className="flex items-center gap-6">

          <Link
            href="/cart"
            className="text-gray-700 dark:text-white hover:underline"
          >
            Carrello 
          </Link>

          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>

      </nav>

    </div>
  );
}