"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { products } from "@/app/data/merce";

export default function ProductPage({ params }: any) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  
  const id = Number(params.id);

  const product = useMemo(() => {
    const saved =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("products") || "[]")
        : [];

    const allProducts = [...products, ...saved];

    return allProducts.find((p) => p.id === id);
  }, [id]);

  if (!product) {
    return <p className="p-6">Prodotto non trovato</p>;
  }

  const handleAdd = () => {
    addToCart(product, qty);
    alert(`${product.name} aggiunto al carrello (${qty})`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-4">Prezzo: €{product.price}</p>

      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border p-1 w-16 mb-4"
      />

      <button
        onClick={handleAdd}
        className="bg-yellow-400 px-4 py-2 rounded"
      >
        Aggiungi al carrello
      </button>
    </div>
  );
}