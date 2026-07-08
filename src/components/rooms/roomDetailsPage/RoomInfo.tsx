import { BedDouble, Users, Bath, Snowflake, Star } from "lucide-react";

import Amenities from "@/components/hotels/Amenities";

export default function RoomInfo({ room, hotel }: any) {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{room.name}</h1>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>
              {hotel.averageRating} ({hotel.totalReviews} Review{hotel.totalReviews > 1 && "s"})
            </span>
          </div>

          <span>{room.hotelName}</span>
        </div>

        <p className="mt-4 text-3xl font-bold text-primary">
          ₹{room.pricePerNight}
          <span className="ml-2 text-base font-normal text-muted-foreground">/ night</span>
        </p>
      </div>

      {/* Description */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">Description</h2>

        <p className="leading-7 text-muted-foreground">{room.description}</p>
      </div>

      {/* Room Features */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Room Features</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <Feature icon={<BedDouble className="h-5 w-5" />} text={room.bedType} />
          <Feature icon={<Users className="h-5 w-5" />} text={`${room.maxOccupancy} Guests`} />
          <Feature icon={<Bath className="h-5 w-5" />} text="Private Bathroom" />
          <Feature icon={<Snowflake className="h-5 w-5" />} text="Air Conditioning" />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Popular Amenities</h2>
        <Amenities amenities={hotel.amenities} />
      </div>
    </section>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <div className="text-primary">{icon}</div>

      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
