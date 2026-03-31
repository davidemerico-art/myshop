"use client";

import { useCart } from "./../context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart } = useCart();
  const router = useRouter();

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrello</h1>

      {cart.length === 0 ? (
        <p>Carrello vuoto</p>
      ) : (
        cart.map((item: any) => (
          <div key={item.id} className="border p-3 mb-2">
            <h2>{item.name}</h2>
            <p>Prezzo: €{item.price}</p>
            <p>Quantità: {item.quantity}</p>
            <p>Totale: €{item.price * item.quantity}</p>
          </div>
        ))
      )}

      <h2 className="mt-4 font-bold">Totale: €{total}</h2>

      <button
        onClick={() => router.push("/home")}
        className="mt-4 bg-blue-500 text-white px-4 py-2"
      >
        Torna alla Home
      </button>
    </div>
  );
}