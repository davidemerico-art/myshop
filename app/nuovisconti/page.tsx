"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { products } from "../data/sconti";

export default function NuovaMerce() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sconti, setSconti] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!name || !price || !category || !sconti || !image) {
      setError("Tutti i campi sono obbligatori.");
      setSuccess("");
      return false;
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      setError("Il prezzo deve essere un numero positivo.");
      setSuccess("");
      return false;
    }
    if (isNaN(Number(sconti)) || Number(sconti) < 0 || Number(sconti) > 100) {
      setError("Lo sconto deve essere un numero tra 0 e 100.");
      setSuccess("");
      return false;
    }
    setError("");
    return true;
  };

  const save = () => {
    if (!validate()) return;

    const newProduct = {
      id: products.length + 1,
      name,
      sconto: Number(sconti) + "%", // salva come stringa "10%"
      price: Number(price),
      category,
      image,
    };

    products.push(newProduct);
    setSuccess("Prodotto scontato salvato correttamente!");
    setError("");
    setName("");
    setPrice("");
    setCategory("");
    setSconti("");
    setImage("");
    setTimeout(() => {
      router.push("/hsconti");
    }, 1200);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Nuovo Sconto</h1>
  

      {error && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-2 rounded">{success}</div>}

      <label className="block mb-1 font-medium">Nome</label>
      <input
        value={name}
        placeholder="Nome"
        className="block border rounded p-2 mb-3 w-full"
        onChange={e => setName(e.target.value)}
      />

      <label className="block mb-1 font-medium">Sconto (%)</label>
      <input
        value={sconti}
        placeholder="Sconto"
        type="number"
        min="0"
        max="100"
        className="block border rounded p-2 mb-3 w-full"
        onChange={e => setSconti(e.target.value)}
      />

      <label className="block mb-1 font-medium">Prezzo (€)</label>
      <input
        value={price}
        placeholder="Prezzo"
        type="number"
        min="0"
        className="block border rounded p-2 mb-3 w-full"
        onChange={e => setPrice(e.target.value)}
      />

      <label className="block mb-1 font-medium">Categoria</label>
      <input
        value={category}
        placeholder="Categoria"
        className="block border rounded p-2 mb-3 w-full"
        onChange={e => setCategory(e.target.value)}
      />

      <label className="block mb-1 font-medium">Immagine URL</label>
      <input
        value={image}
        placeholder="Immagine URL"
        className="block border rounded p-2 mb-3 w-full"
        onChange={e => setImage(e.target.value)}
      />

      {image && (
        <div className="mb-3">
          <span className="block text-sm text-gray-500 mb-1">Anteprima immagine:</span>
          <img src={image} alt="Anteprima" className="max-h-32 rounded shadow border" />
        </div>
      )}

      <button
        onClick={save}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold transition"
      >
        Salva
      </button>
    </div>
  );
}