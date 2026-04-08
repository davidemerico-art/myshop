"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { products } from "../data/sconti";

export default function NuovaMerce() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sconti, setSconti]= useState("");
  const [image, setImage] = useState("");


  const save = () => {
  const newProduct = {
    id: products.length + 1,
    name,
    sconti:Number(sconti),
    price: Number(price),
    category,
    image,
  };

  products.push(newProduct);

  alert("Merce salvata");
  router.push("/hsconti");
};

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Nuovo Prodotto</h1>

      <input
        placeholder="Nome"
        className="block border p-2 mb-2"
        onChange={(e) => setName(e.target.value)}
      />
      <input
      placeholder="Sconto"
      className="block border p-2 mb-2"
      onChange={(e)=>setSconti(e.target.value)}
      />

      <input
        placeholder="Prezzo"
        className="block border p-2 mb-2"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Categoria"
        className="block border p-2 mb-2"
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Immagine URL"
        className="block border p-2 mb-2"
        onChange={(e) => setImage(e.target.value)}
      />

      <button
        onClick={save}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Salva
      </button>
    </div>
  );
}