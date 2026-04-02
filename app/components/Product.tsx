"use client";

import { useRouter } from "next/navigation";

type ProductProps = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function Product({
  id,
  name,
  price,
  category,
  image,
}: ProductProps) {
  const router = useRouter();

  const handleBuy = () => {
    alert(`Hai acquistato: ${name}`);
  };

  return (
    <div className="card animate-fade-in-up flex flex-col h-full group">

      {/* IMMAGINE */}
      <div
        className="relative overflow-hidden shrink-0 h-[240px] sm:h-[280px] bg-gray-200 cursor-pointer"
        onClick={() => router.push(`/prodotto/${id}`)}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
      </div>

      {/* DETTAGLI */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500 text-sm">{category}</p>

        <div className="mt-auto">
          <p className="text-xl font-bold">€{price}</p>
        </div>
      </div>

     
      </div>
   
  );
}