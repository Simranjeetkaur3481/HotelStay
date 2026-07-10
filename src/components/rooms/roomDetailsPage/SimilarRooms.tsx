import { Link } from "react-router-dom";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";
import { getEffectiveRoomPricing } from "@/lib/roomPricing";

type SimilarRoom = {
  id: string;
  name: string;
  images: { imageUrl: string }[];
  maxOccupancy: number;
  pricePerNight: number;
  basePricePerNight?: number | null;
  dynamicPricePerNight?: number | null;
  appliedPromotionId?: number | null;
  appliedPromotionTitle?: string | null;
  appliedPromotionDisplayText?: string | null;
  promotionDiscountPerNight?: number | null;
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
        {rooms.map((room) => {
          const pricing = getEffectiveRoomPricing(room);
          return (
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
                  {pricing.hasDiscount && (
                    <p className="text-sm text-muted-foreground line-through">
                      ₹{pricing.basePrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-xl font-bold text-primary">₹{pricing.effectivePrice.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">per night</p>
                  {pricing.promotionLabel && (
                    <p className="mt-1 text-xs font-medium text-emerald-600">{pricing.promotionLabel}</p>
                  )}
                </div>

                <Button asChild size="sm">
                  <Link to={`/roomDetails/${room.id}`}>View Room</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>
    </section>
  );
}
