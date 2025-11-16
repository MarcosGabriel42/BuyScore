'use client';

import { Star } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition"
      aria-label="Favoritar"
    >
      <Star
        size={28}
        className={`
          transition
          ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-white"}
        `}
      />
    </button>
  );
}
