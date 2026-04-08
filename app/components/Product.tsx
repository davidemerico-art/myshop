"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { products as prodottiNormali } from "@/app/data/merce";
import { products as prodottiScontati } from "@/app/data/sconti";

export default function ProductPage({ params }: any) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  
  const id = Number(params.id);

  const product = useMemo(() => {
    const saved =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("products") || "[]")
        : [];

    // Cerca prima tra i prodotti normali
    let found = [...prodottiNormali, ...saved].find((p) => p.id === id);
    if (found) return found;
    // Se non trovato, cerca tra i prodotti scontati
    found = prodottiScontati.find((p) => p.id === id);
    return found;
  }, [id]);

  if (!product) {
    return <p className="p-6">Prodotto non trovato</p>;
  }

  // Calcolo sconto se presente (compatibile sia con prodotti normali che scontati)
  let prezzoScontato = product.price;
  let percentualeSconto = 0;
  const sconto = product.sconto ?? product.sconti;
  if (sconto) {
    if (typeof sconto === "string" && sconto.includes("%")) {
      percentualeSconto = parseInt(sconto);
      prezzoScontato = product.price * (1 - percentualeSconto / 100);
    } else if (typeof sconto === "number" && sconto < 1) {
      percentualeSconto = Math.round((1 - sconto) * 100);
      prezzoScontato = product.price * sconto;
    } else if (typeof sconto === "number") {
      percentualeSconto = sconto;
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

      {product.image && (
        <img src={product.image} alt={product.name} className="mb-4 max-h-48 rounded shadow" />
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