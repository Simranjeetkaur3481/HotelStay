import HotelCard from "@/components/home/HotelCard";

interface HotelListProps {
  hotels: any[];
}

export default function HotelList({ hotels }: HotelListProps) {
  return (
    <div className="space-y-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
}
