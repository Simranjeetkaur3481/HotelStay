import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";
import { Link } from "react-router-dom";

type DestinationProps = {
  id: number;
  country: string;
  city: string;
  totalHotels: number;
  images: {
    imageUrl: string;
  }[];
};

export default function DestinationCard({ country, city, totalHotels, images, cityImageUrl }: DestinationProps) {
  return (
    <Link to={`/hotels?search=${city}`}>
      <Card className="group relative overflow-hidden rounded-3xl border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Image */}
        <img
          src={`${API_BASE_URL}${cityImageUrl}`}
          alt={city}
          className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <MapPin className="size-4" />
            {country}
          </div>

          <h3 className="mt-2 text-3xl font-bold">{city}</h3>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="size-4" />
              {totalHotels} Hotels
            </div>

            <div className="rounded-full bg-white/20 p-2 backdrop-blur transition group-hover:bg-primary">
              <ArrowUpRight className="size-5" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
