"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("LOGIN CLICKED:", { email, password });

    if (!email.trim() || !password.trim()) {
      alert("Inserisci email e password");
      return;
    }

    // simulazione login OK
    router.push("/home");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          placeholder="Email"
          className="w-full p-2 border mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

        <p
          className="mt-2 text-sm cursor-pointer text-center"
          onClick={() => router.push("/register")}
        >
          Registrati
        </p>
      </form>
    </div>
  );
}