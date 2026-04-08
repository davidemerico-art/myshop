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

  // Calcolo sconto se presente
  let prezzoScontato = product.price;
  let percentualeSconto = 0;
  if (product.sconto) {
    if (typeof product.sconto === "string" && product.sconto.includes("%")) {
      percentualeSconto = parseInt(product.sconto);
      prezzoScontato = product.price * (1 - percentualeSconto / 100);
    } else if (typeof product.sconto === "number" && product.sconto < 1) {
      percentualeSconto = Math.round((1 - product.sconto) * 100);
      prezzoScontato = product.price * product.sconto;
    } else if (typeof product.sconto === "number") {
      percentualeSconto = product.sconto;
      prezzoScontato = product.price * (1 - percentualeSconto / 100);
    }
  }

  const handleAdd = () => {
    addToCart(product, qty);
    alert(`${product.name} aggiunto al carrello (${qty})`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      {percentualeSconto > 0 ? (
        <>
          <p className="line-through text-gray-400">Prezzo: €{product.price}</p>
          <p className="text-green-600 font-bold">Sconto: -{percentualeSconto}%</p>
          <p className="text-red-600 font-bold mb-4">Ora: €{prezzoScontato.toFixed(2)}</p>
        </>
      ) : (
        <p className="mb-4">Prezzo: €{product.price}</p>
      )}

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