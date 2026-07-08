import { Link } from "react-router-dom";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";

type SimilarRoom = {
  id: string;
  name: string;
  images: { imageUrl: string }[];
  maxOccupancy: number;
  pricePerNight: number;
};

type SimilarRoomsProps = {
  rooms: SimilarRoom[];
};

export default function SimilarRooms({ rooms }: SimilarRoomsProps) {
  if (!rooms.length) return null;

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Similar Rooms</h2>

        <p className="text-sm text-muted-foreground">Explore other rooms you may like.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden transition hover:shadow-lg">
            <img
              src={`${API_BASE_URL}${room.images[0]?.imageUrl}`}
              alt={room.name}
              className="h-48 w-full object-cover"
            />

            <CardContent className="space-y-3 p-4">
              <h3 className="line-clamp-1 text-lg font-semibold">{room.name}</h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {room.maxOccupancy} Guests
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-primary">₹{room.pricePerNight}</p>

                  <p className="text-xs text-muted-foreground">per night</p>
                </div>

                <Button asChild size="sm">
                  <Link to={`/roomDetails/${room.id}`}>View Room</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
