"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: any) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = (e: any) => {
    e.stopPropagation(); 
    addToCart(product, qty);
    alert(`${product.name} aggiunto al carrello (${qty})`);
  };

  const goToProduct = () => {
    router.push(`/prodotto/${product.id}`);
  };

  // Calcolo sconto se presente
  let prezzoScontato = product.price;
  let percentualeSconto = 0;
  if (product.sconto) {
    // Supporta sia "20%" che 0.8
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

  return (
    <div
      className="bg-white p-4 rounded shadow cursor-pointer flex flex-col gap-2"
      onClick={goToProduct}
    >
      {/* immagine */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      {/* info base */}
      <h3 className="font-bold">{product.name}</h3>
      {percentualeSconto > 0 ? (
        <>
          <p className="line-through text-gray-400">€{product.price}</p>
          <p className="text-green-600 font-bold">Sconto: -{percentualeSconto}%</p>
          <p className="text-red-600 font-bold">Ora: €{prezzoScontato.toFixed(2)}</p>
        </>
      ) : (
        <p>€{product.price}</p>
      )}

      {/* quantità */}
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border p-1 w-16"
        onClick={(e) => e.stopPropagation()} // 🔥 non aprire pagina
      />

      {/* bottone carrello */}
      <button
        onClick={handleAdd}
        className="bg-yellow-400 px-3 py-2 rounded"
      >
        Aggiungi al carrello
      </button>
    </div>
  );
}