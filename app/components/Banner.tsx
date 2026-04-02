export default function Banner() {
  return (
    <div className="w-full h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white text-center px-4">

      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        Offerte di oggi 
      </h2>

      <p className="text-lg md:text-xl mb-4">
        Fino al 50% di sconto su prodotti selezionati
      </p>

      <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
        Scopri offerte
      </button>

    </div>
  );
}