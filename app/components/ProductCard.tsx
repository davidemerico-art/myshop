"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

type Props = {
  product: any;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addToCart(product, qty);

    alert(`${product.name} aggiunto al carrello (${qty})`);
  };

  return (
    <div className="bg-white p-4 rounded shadow">

      <img src={product.image} className="w-full h-40 object-cover" />

      <h2 className="font-bold mt-2">{product.name}</h2>
      <p>€{product.price}</p>

      {/* quantità */}
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border p-1 w-16 mt-2"
      />

      <button
        onClick={handleAdd}
        className="bg-yellow-400 mt-2 px-4 py-2 rounded w-full"
      >
        Aggiungi al carrello
      </button>

    </div>
  );
}