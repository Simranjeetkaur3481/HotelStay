import HotelCard from "@/components/home/HotelCard";

interface HotelListProps {
  hotels: any[];
}

export default function HotelList({ hotels }: HotelListProps) {
  return (
    <div className="space-y-6 grid sm:grid-cols-2  gap-5">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
}
