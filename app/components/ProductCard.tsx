"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Product from "./Product";
import { useCart } from "../context/CartContext";

type Props = {
  product: any;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const router = useRouter();

  const handleAdd = () => {
    addToCart(product, qty);
    alert(`${product.name} aggiunto al carrello (${qty})`);
  };

  const goToProduct = () => {
    router.push(`/prodotto/${product.id}`);
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">

      {/* CLICK SOLO QUI */}
      <div onClick={goToProduct} className="cursor-pointer">
        <Product {...product} />
      </div>

      {/* QUANTITÀ */}
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border p-1 w-16 mt-2"
      />

      {/* ADD TO CART */}
      <button
        onClick={handleAdd}
        className="bg-yellow-400 mt-2 px-4 py-2 rounded w-full"
      >
        Aggiungi al carrello
      </button>

    </div>
  );
}