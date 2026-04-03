"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function AcquistaPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const handleBuy = () => {
    alert("Acquisto completato con successo ");

    clearCart(); 
    router.push("/home");
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Conferma acquisto
      </h1>

      <div className="border p-4 rounded mb-4">
        {cart.length === 0 ? (
          <p>Nessun prodotto da acquistare</p>
        ) : (
          cart.map((item: any) => (
            <div key={item.id} className="mb-2">
              <p className="font-bold">{item.name}</p>
              <p>{item.quantity} x €{item.price}</p>
            </div>
          ))
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">
        Totale: €{total}
      </h2>

      <button
        onClick={handleBuy}
        className="bg-green-500 text-white px-6 py-3 rounded"
      >
        Conferma acquisto
      </button>

      <button
        onClick={() => router.push("/cart")}
        className="ml-4 bg-gray-500 text-white px-6 py-3 rounded"
      >
        Torna al carrello
      </button>

    </div>
  );
}