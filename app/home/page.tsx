"use client";

import { useState } from "react";
import Navbar from "./../components/Navbar";
import ProductCard from "./../components/ProductCard";
import { products as initialProducts } from "./../data/merce";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-4 flex gap-4">
        <input
          placeholder="Cerca..."
          className="p-2 border w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => router.push("/nuovamerce")}
          className="bg-green-500 text-white px-4"
        >
          + Aggiungi merce
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 p-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={() => {}} />
        ))}
      </div>
    </div>
  );
}