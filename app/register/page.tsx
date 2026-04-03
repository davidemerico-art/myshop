"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (!email || !password) {
      alert("Compila tutti i campi");
      return;
    }

    const user = { email, password };

    // salva utente
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registrazione completata ");

    router.push("/")
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Registrazione</h1>

        <input
          placeholder="Email"
          className="w-full p-2 border mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Registrati
        </button>
      </div>
    </div>
  );
}