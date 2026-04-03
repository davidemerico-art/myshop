"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { products } from "../data/merce";

export default function ProductPage({ params }: any) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const router = useRouter();

  const id = Number(params?.id);

  
  const product = products.find((p) => p.id === id);

    // sicurezza: se id non valido o prodotto non trovato
  if (!product) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Prodotto non trovato</h1>

        <button
          onClick={() => router.push("/home")}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Torna alla Home
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    alert(`${product.name} aggiunto al carrello (${qty})`);
  };

  return (
    <div className="p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-64 mb-4 rounded"
      />

      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-4 text-gray-600">{product.category}</p>

      <p className="mb-4 font-semibold">Prezzo: €{product.price}</p>

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

      <button
        onClick={() => router.push("/home")}
        className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Torna alla Home
      </button>
    </div>
  );
}