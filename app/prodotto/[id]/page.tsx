"use client";

import { products } from "@/app/data/merce";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useState, useMemo, use } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

 
  const resolvedParams = use(params) as { id: string };
  const id = Number(resolvedParams.id);
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
    <div>
      <Navbar />

      <div className="p-10 max-w-3xl mx-auto">

        <img
          src={product.image}
          className="w-full h-96 object-cover rounded"
        />

        <h1 className="text-3xl font-bold mt-4">
          {product.name}
        </h1>

        <p className="text-gray-600">{product.category}</p>

        <p className="text-2xl font-bold mt-4">
          €{product.price}
        </p>

        {/* QTY */}
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="border p-2 mt-4 w-20"
        />

        {/* CART */}
        <button
          onClick={handleAdd}
          className="bg-yellow-400 mt-4 px-4 py-2 rounded w-full"
        >
          Aggiungi al carrello
        </button>

        {/* HOME */}
        <button
          onClick={() => router.push("/home")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Torna alla Home
        </button>

      </div>
    </div>
  );
}