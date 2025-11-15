'use client';

import { useParams } from "next/navigation";
import { useState } from "react";
import ProductDetailCard from "@/components/ProductDetailCard";
import QrPopup from "@/components/QrCodePopup";
import BottomNav from "@/components/BottomNav";
import QrCodeButton from "@/components/QrCodeButton";

export default function ProductPage() {
  const { id } = useParams();
  const safeId =
    Array.isArray(id) ? id.join(",") : id ?? "";
  const [showPopup, setShowPopup] = useState(false);
  const [code, setCode] = useState("");

  // Função para gerar código aleatório de 5 caracteres
  const generateCode = () =>
    Math.random().toString(36).substring(2, 7).toUpperCase();

  const product = {
    id: safeId,
    name: "Pizza Margherita",
    restaurant: "Bella Itália",
    restaurantId: 12,
    category: "Restaurantes",
    price: "600 pts.",
    image: "/img/pizza.jpg",
    description:
      "Deliciosa pizza com molho de tomate artesanal, mussarela fresca e folhas de manjericão. Massa crocante e leve, perfeita para saborear a qualquer hora.",
    address: "Av. Central, 123 - Centro, Blumenau",
    hours: "Seg a Dom: 11h às 23h",
  };

  const handleOpenPopup = () => {
    setCode(generateCode());
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 px-4 py-8">
      <ProductDetailCard
        {...product}
        onRedeem={handleOpenPopup}
      />

      {/* Popup */}
      {showPopup && <QrPopup code={code} onClose={() => setShowPopup(false)} />}

      <QrCodeButton />
      <BottomNav />
    </div>
  );
}
