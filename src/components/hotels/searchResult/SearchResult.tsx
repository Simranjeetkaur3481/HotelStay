import { Link } from "react-router-dom";
import { BedDouble, MapPin, Star, Users, Wifi, Coffee, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchResultCardProps {
  result: any;
}

export default function SearchResultCard({ result }: SearchResultCardProps) {
  const { hotel, room } = result;

  return (
    <article className="overflow-hidden rounded-3xl border bg-background shadow-sm transition hover:shadow-lg">
      <div className="flex flex-col lg:flex-row">
        {/* Image */}

        <img src={hotel.images[0].imageUrl} alt={hotel.name} className="h-64 w-full object-cover lg:h-auto lg:w-80" />

        {/* Content */}

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <Link to={`/hotels/${hotel.id}`} className="text-2xl font-bold hover:text-primary">
                  {hotel.name}
                </Link>

                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />

                  {hotel.city}
                </div>
              </div>

              <Badge>
                <Star className="mr-1 size-4 fill-current" />

                {hotel.rating}
              </Badge>
            </div>

            <hr className="my-5" />

            <h3 className="text-xl font-semibold">{room.name}</h3>

            <p className="mt-2 text-muted-foreground">{room.description}</p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BedDouble className="size-4" />

                {room.bedType}
              </div>

              <div className="flex items-center gap-2">
                <Users className="size-4" />
                {room.maxOccupancy} Guests
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="secondary">
                <Wifi className="mr-1 size-3" />
                Free WiFi
              </Badge>

              <Badge variant="secondary">
                <Coffee className="mr-1 size-3" />
                Breakfast
              </Badge>

              <Badge variant="secondary">
                <ShieldCheck className="mr-1 size-3" />
                Free Cancellation
              </Badge>
            </div>
          </div>

          {/* Footer */}

          <div className="mt-8 flex flex-col gap-4 border-t pt-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">₹{room.pricePerNight.toLocaleString()}</p>

              <p className="text-sm text-muted-foreground">per night • Taxes extra</p>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to={`/hotels/${hotel.id}`}>View Hotel</Link>
              </Button>

              <Button>Select Room</Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
