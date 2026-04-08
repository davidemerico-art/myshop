

"use client";

import { useRouter } from "next/navigation";

export default function Banner() {
  const router = useRouter();

  return (
    <div className="w-full h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white text-center px-4">

      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        Offerte di oggi 
      </h2>

      <p className="text-lg md:text-xl mb-4">
        Fino al 50% di sconto su prodotti selezionati
      </p>

      <button
        onClick={() => router.push("/hsconti")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Scopri le offerte
      </button>

    </div>
  );
}