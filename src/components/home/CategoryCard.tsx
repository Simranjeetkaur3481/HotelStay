import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  image: string;
  hotels: number;
}

export default function CategoryCard({
  title,
  image,
  hotels,
}: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl cursor-pointer">
      <img
        src={image}
        alt={title}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>

        <p className="mt-1 text-sm text-gray-200">
          {hotels}+ Hotels
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium">
          Explore
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}