import { useGetRoomsByHotelIdQuery } from "@/store/api/roomApi";
import SearchResultCard from "./searchResult/SearchResult";

interface Room {
  id: string;
  name: string;
  roomTypeName: string;
  pricePerNight: number;
  description: string;
  bedType: string;
  maxOccupancy: number;
  status: string;
  images: {
    imageUrl: string;
  }[];
}

export default function Rooms({ hotelId }: { hotelId: number }) {
  const { data } = useGetRoomsByHotelIdQuery(Number(hotelId));
  const hotelRooms = data?.data ?? [];
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Available Rooms</h2>

        <p className="text-sm text-muted-foreground">Choose the room that fits your stay.</p>
      </div>

      {/* Rooms */}
      <div className="space-y-6 grid">
        {hotelRooms.map((room: Room) => (
          <SearchResultCard key={room.id} result={room} />
        ))}
      </div>
    </section>
  );
}
