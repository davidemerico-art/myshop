"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="bg-black text-white flex items-center justify-between p-4 dark:bg-gray-900">
        
        <h1 className="text-xl font-bold">MyShop</h1>

        <input
          className="w-1/2 p-2 text-black rounded"
          placeholder="Cerca prodotti..."
        />

        <div className="flex gap-4 items-center">
          <Link href="/cart">Carrello</Link>

          <button
            onClick={() => setDark(!dark)}
            className="bg-gray-700 px-3 py-1 rounded"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

      </div>
    </div>
  );
}