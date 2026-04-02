"use client";

import { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import Banner from "./../components/Banner";
import ProductCard from "./../components/ProductCard";
import { products as initialProducts } from "./../data/merce";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("tutti");
  const [products, setProducts] = useState(initialProducts);

  const router = useRouter();

  // carica prodotti salvati
  useEffect(() => {
    const saved = localStorage.getItem("products");

    if (saved) {
      const parsed = JSON.parse(saved);
      setProducts([...initialProducts, ...parsed]);
    }
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "tutti" || p.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* 🔥 BANNER */}
      <Banner />

      {/* SEARCH + FILTER */}
      <div className="p-4 flex gap-4 items-center">

        <input
          placeholder="Cerca prodotti o categorie..."
          className="p-2 border w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="tutti">Tutti</option>
          <option value="Elettronica">Elettronica</option>
          <option value="Elettrodomestici">Elettrodomestici</option>
          <option value="Casa">Casa</option>
          <option value="Abbigliamento">Abbigliamento</option>
          <option value="Scuola">Scuola</option>
          <option value="Attrezzi da giardino">Attrezzi da giardino</option>
        </select>

        <button
          onClick={() => router.push("/nuovamerce")}
          className="bg-green-500 text-white px-4 py-2"
        >
          Aggiungi merce
        </button>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-4 gap-6 p-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
}