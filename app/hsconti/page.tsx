"use client";

import { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";

import ProductCard from "./../components/ProductCard";
import { products as initialProducts } from "./../data/sconti";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("tutti");
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("products");
      if (!saved) return;

      const parsed = JSON.parse(saved);

      // sicurezza: deve essere array
      if (!Array.isArray(parsed)) return;

      const safe = parsed.filter((p) => p && p.id);

      setProducts(initialProducts.concat(safe));
    } catch (err) {
      console.log("Errore localStorage:", err);
      localStorage.removeItem("products");
    }
  }, []);

  const filtered = products.filter((p) => {
    if (!p) return false;

    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "tutti" || p.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      

      <div className="p-4 flex gap-4 items-center flex-wrap">
        <input
          placeholder="Cerca prodotti..."
          className="p-2 border w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="tutti">Tutti</option>
          <option value="Elettronica">Elettronica</option>
          <option value="Casa">Casa</option>
          <option value="Abbigliamento">Abbigliamento</option>
          <option value="Giardinaggio">Giardinaggio</option>
        </select>

        <button
          onClick={() => router.push("/nuovisconti")}
          className="bg-green-500 text-white px-4 py-2"
        >
          Aggiungi merce in sconto
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {filtered.slice(0, 200).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}