import HotelCardSkeleton from "@/components/hotels/hotelLists/HotelCardSekelton";
import EmptyHotels from "./EmptyHotel";
import HotelCard from "./HotelCard";
import HotelFilters from "./HotelFilter";
import { useState } from "react";
import { useGetHotelsQuery } from "@/store/api/hotelApi";

export type HotelItem = {
  id: number;
  name: string;
  city: string;
  state: string;
  description?: string;
  country?: string;
  address?: string;
  starRating?: number;
  images: { imageUrl: string }[];
  averageRating: number;
  totalReviews: number;
  totalRooms: number;
  totalBookings: number;
  isActive: boolean;
};

type HotelListProps = {
  onEdit?: (hotel: HotelItem) => void;
  onDelete?: (id: number) => void;
  hotels?: HotelItem[];
  isLoading?: boolean;
};

export default function HotelList({ onEdit, onDelete, hotels: externalHotels, isLoading: externalLoading }: HotelListProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");

  const { data, isLoading } = useGetHotelsQuery({
    search,
    status: status === "all" ? undefined : status === "active",
  }, { skip: !!externalHotels });

  const hotels: HotelItem[] = externalHotels ?? data?.data ?? [];
  const loading = externalLoading ?? isLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <HotelCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!hotels.length) {
    return <EmptyHotels />;
  }

  return (
    <div className="space-y-6">
      <HotelFilters search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
      <div className="grid gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
