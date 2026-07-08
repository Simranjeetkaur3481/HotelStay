import { Building2, MapPin, Clock3, Star } from "lucide-react";

type HotelInfoProps = {
  hotel: {
    name: string;
    city: string;
    country: string;
    description: string;
    averageRating: number;
  };
};

const getRatingLabel = (rating: number) => {
  if (rating >= 4.8) return "Exceptional";
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4.0) return "Very Good";
  if (rating >= 3.5) return "Good";
  if (rating >= 3.0) return "Average";
  return "Below Average";
};

export default function HotelInfo({ hotel }: HotelInfoProps) {
  return (
    <section className="rounded-2xl border bg-background p-6">
      <h2 className="mb-6 text-xl font-semibold">About the Hotel</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-primary" />

          <div>
            <h3 className="font-semibold">{hotel.name}</h3>

            <p className="text-sm text-muted-foreground">Luxury Hotel</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <MapPin className="h-5 w-5" />
          {hotel.city}, {hotel.country}
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          {hotel.averageRating} • {getRatingLabel(hotel.averageRating)}
        </div>

        <p className="leading-7 text-muted-foreground">{hotel.description}</p>

        <div className="grid gap-4 pt-4 md:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Clock3 className="h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">Check-in</p>

              <p className="text-sm text-muted-foreground">From 2:00 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Clock3 className="h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">Check-out</p>

              <p className="text-sm text-muted-foreground">Until 11:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
