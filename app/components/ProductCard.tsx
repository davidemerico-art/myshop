"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: any) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = (e: any) => {
    e.stopPropagation(); // 🔥 evita che apra la pagina prodotto
    addToCart(product, qty);
    alert(`${product.name} aggiunto al carrello (${qty})`);
  };

  const goToProduct = () => {
    router.push(`/prodotto/${product.id}`);
  };

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
      <p>€{product.price}</p>

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