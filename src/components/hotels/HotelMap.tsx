import { MapPin, Plane, Building2, ShoppingBag } from "lucide-react";

const nearby = [
  { icon: MapPin, label: "Beach", distance: "500m" },
  { icon: Plane, label: "Airport", distance: "18km" },
  { icon: Building2, label: "City Center", distance: "2km" },
  { icon: ShoppingBag, label: "Mall", distance: "1.2km" },
];

export default function HotelMap({ city }: { city: string }) {
  return (
    <section className="space-y-8">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Location</h2>

        <p className="text-sm text-muted-foreground">Find the hotel and nearby attractions.</p>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-3xl border shadow-sm">
        <iframe
          title="hotel-map"
          src={`https://www.google.com/maps?q=${city}&output=embed`}
          className="h-[350px] w-full"
          loading="lazy"
        />
      </div>

      {/* Nearby Places */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Nearby Places</h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nearby.map(({ icon: Icon, label, distance }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border bg-background p-4 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="rounded-xl bg-primary/10 p-2">
                <Icon className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-sm font-medium">{label}</p>

                <p className="text-xs text-muted-foreground">{distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
