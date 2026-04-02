"use client";

import { useState } from "react";
import Navbar from "./../components/Navbar";
import ProductCard from "./../components/ProductCard";
import { products as initialProducts } from "./../data/merce";
import { useRouter } from "next/navigation";
import product from "../components/Product";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("tutti");

  const router = useRouter();

  const filtered = initialProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "tutti" || p.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* SEARCH + FILTER */}
      <div className="p-4 flex gap-4 items-center">

        {/* SEARCH */}
        <input
          placeholder="Cerca prodotti o categorie..."
          className="p-2 border w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTER */}
        <select
          className="p-2 border"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="tutti">Tutti</option>
          <option value="elettronica">Elettronica</option>
          <option value="elettrodomestici">Elettrodomestici</option>
          <option value="casa">Casa</option>
          <option value="abbigliamento">Abbigliamento</option>
          <option value="scuola">Scuola</option>
          <option value="attrezzi da giardino">Attrezzi da giardino</option>
        </select>

        {/* ADD PRODUCT */}
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