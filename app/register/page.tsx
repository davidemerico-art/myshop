"use client";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Registrazione</h1>

        <input placeholder="Email" className="w-full p-2 border mb-2" />
        <input placeholder="Password" className="w-full p-2 border mb-2" />

        <button
          onClick={() => router.push("/")}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Registrati
        </button>
      </div>
    </div>
  );
}