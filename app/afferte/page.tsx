import sconti from "../../data/sconti";
import Navbar from "../../components/Navbar";

export default function Offerte() {
  return (
    <div>
      <Navbar />
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Offerte del giorno</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sconti.map((sconto) => (
                    <div key={sconto.id} className="border rounded-lg p-4">
                        <img src={sconto.image} className="w-full h-48 object-cover rounded" />
                        <h2 className="text-xl font-bold mt-2">{sconto.name}</h2>
                        <p className="text-gray-600">{sconto.category}</p>
                        <p className="text-2xl font-bold mt-2 text-red-500">
                            {sconto.discount}% OFF
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}