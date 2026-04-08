"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart } = useCart();
  const router = useRouter();

  // Calcolo totale con sconto applicato
  const total = cart.reduce(
    (sum: number, item: any) => {
      let prezzoScontato = item.price;
      let percentualeSconto = 0;
      if (item.sconto || item.sconti) {
        const sconto = item.sconto ?? item.sconti;
        if (typeof sconto === "string" && sconto.includes("%")) {
          percentualeSconto = parseInt(sconto);
          prezzoScontato = item.price * (1 - percentualeSconto / 100);
        } else if (typeof sconto === "number" && sconto < 1) {
          percentualeSconto = Math.round((1 - sconto) * 100);
          prezzoScontato = item.price * sconto;
        } else if (typeof sconto === "number") {
          percentualeSconto = sconto;
          prezzoScontato = item.price * (1 - percentualeSconto / 100);
        }
      }
      return sum + prezzoScontato * item.quantity;
    },
    0
  );

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Carrello</h1>

      <button
        onClick={() => router.push("/home")}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Torna alla Home
      </button>

      <br /><br />

      {cart.length === 0 ? (
        <p>Carrello vuoto</p>
      ) : (
        cart.map((item: any) => {
          let prezzoScontato = item.price;
          let percentualeSconto = 0;
          const sconto = item.sconto ?? item.sconti;
          if (sconto) {
            if (typeof sconto === "string" && sconto.includes("%")) {
              percentualeSconto = parseInt(sconto);
              prezzoScontato = item.price * (1 - percentualeSconto / 100);
            } else if (typeof sconto === "number" && sconto < 1) {
              percentualeSconto = Math.round((1 - sconto) * 100);
              prezzoScontato = item.price * sconto;
            } else if (typeof sconto === "number") {
              percentualeSconto = sconto;
              prezzoScontato = item.price * (1 - percentualeSconto / 100);
            }
          }
          return (
            <div key={item.id} className="border p-3 mb-2">
              <h2>{item.name}</h2>
              <p>Prezzo originale: €{item.price}</p>
              {percentualeSconto > 0 && (
                <p className="text-green-600 font-bold">Sconto: -{percentualeSconto}%</p>
              )}
              <p>Prezzo scontato: €{prezzoScontato.toFixed(2)}</p>
              <p>Quantità: {item.quantity}</p>
              <p>Totale: €{(prezzoScontato * item.quantity).toFixed(2)}</p>
            </div>
          );
        })
      )}

      <h2 className="mt-4 font-bold">
        Totale: €{total}
      </h2>

      <button
        onClick={() => router.push("/acquista")}
        className="mt-4 bg-red-500 text-white px-4 py-2"
      >
        Acquista
      </button>

    </div>
  );
}