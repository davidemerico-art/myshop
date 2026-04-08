"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function AcquistaPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

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
          cart.map((item: any) => {
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