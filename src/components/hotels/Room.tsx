import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetRoomsByHotelIdQuery } from "@/store/api/roomApi";
import { API_BASE_URL } from "@/constants/api";

interface Room {
  id: string;
  name: string;
  roomTypeName: string;
  pricePerNight: number;
  description: string;
  bedType: string;
  maxOccupancy: number;
  status: string;
  images:{
    imageUrl:string
  }[]
}

export default function Rooms({ hotelId }: { hotelId: number }) {
  const { data } = useGetRoomsByHotelIdQuery(Number(hotelId));
  const hotelRooms = data?.data ?? [];
  console.log(hotelRooms);
  return (
    <section className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Available Rooms</h2>

        <p className="text-sm text-muted-foreground">Choose the room that fits your stay.</p>
      </div>

      {/* Rooms */}
      <div className="space-y-6">
        {hotelRooms.map((room:Room) => (
          <div
            key={room.id}
            className="overflow-hidden rounded-3xl border bg-background p-3 shadow-sm transition hover:shadow-lg"
          >
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Image */}
              <div className="shrink-0">
                <img
                  src={`${API_BASE_URL}${room.images[0]?.imageUrl}`}
                  alt={room.name}
                  className="h-48 w-full rounded-2xl object-cover lg:h-44 lg:w-64"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <Badge className="w-fit bg-amber-500">{room.roomTypeName ?? "Delux"}</Badge>

                <div>
                  <h3 className="text-2xl font-semibold">{room.name}</h3>

                  <p className="mt-2 text-muted-foreground">{room.description}</p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {room.bedType} • {room.maxOccupancy} Guests
                </p>
              </div>

              {/* Right */}
              <div className="flex min-w-[220px] flex-col justify-between border-t pt-4 lg:border-l lg:border-t-0 lg:pl-6">
                {/* Status */}
                <div className="space-y-3">
                  <Badge variant={room.status === "Available" ? "secondary" : "destructive"} className="w-fit">
                    {room.status === "Available" ? "Available" : "Sold Out"}
                  </Badge>

                  <div>
                    <p className="text-sm text-muted-foreground">Per Night</p>

                    <p className="text-3xl font-bold text-primary">₹{room.pricePerNight.toLocaleString()}</p>
                  </div>
                </div>

                {/* Button */}
                <Button className="mt-6 w-full" disabled={room.status !== "Available"}>
                  {room.status === "Available" ? "Select Room" : "Unavailable"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
