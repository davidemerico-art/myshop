import { products } from "@/app/data/merce";
import Navbar from "@/app/components/Navbar";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === Number(id));
  

  if (!product) {
    return <p className="p-6">Prodotto non trovato</p>;
  }
<Navbar />
  return (
    
    <div className="p-10 max-w-3xl mx-auto">
      <img
        src={product.image}
        className="w-full h-96 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600">{product.category}</p>

      <p className="text-2xl font-bold mt-4">€{product.price}</p>
    </div>
    
    
  );
}