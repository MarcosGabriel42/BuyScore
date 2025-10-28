'use client';

interface CategoryBannerProps {
  title: string;
  color: string;
}

export default function CategoryBanner({ title, color }: CategoryBannerProps) {
  return (
    <div
      className="w-full h-48 sm:h-56 flex items-center justify-center text-white rounded-b-2xl shadow-md"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">{title}</h1>
    </div>
  );
}
