import { useGetAvailableHotelRoomsQuery, useGetRoomsByHotelIdQuery } from "@/store/api/roomApi";
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
  isActive: boolean;
  images: {
    imageUrl: string;
  }[];
}

export default function Rooms({ hotelId, search }: { hotelId: number; search: any }) {
  const { data: allRooms } = useGetRoomsByHotelIdQuery(Number(hotelId));
  const { data: availableRooms } = useGetAvailableHotelRoomsQuery(
    {
      hotelId,
      checkInDate: search?.checkIn,
      checkOutDate: search?.checkOut,
      guests: search?.guests,
    },
    {
      skip: !search,
    },
  );
  const availableRoom = search
    ? (availableRooms?.data ?? [])
    : (allRooms?.data.filter((room: Room) => room.isActive) ?? []);
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Available Rooms</h2>

        <p className="text-sm text-muted-foreground">Choose the room that fits your stay.</p>
      </div>

      {/* Rooms */}
      <div className="space-y-6 grid">
        {availableRoom.map((room: Room) => (
          <SearchResultCard key={room.id} result={room} />
        ))}
      </div>
    </section>
  );
}
