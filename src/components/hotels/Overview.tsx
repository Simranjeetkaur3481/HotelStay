import { MapPin, Plane, Clock, Utensils } from "lucide-react";

export default function Overview({ hotel, isLoading }:{hotel:any;isLoading:boolean}) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">About this property</h2>

        <p className="mt-2 text-sm text-muted-foreground">Experience luxury and comfort blended with nature.</p>
      </div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="rounded-2xl border bg-background p-6 leading-7 text-muted-foreground">
          <p>{hotel?.description}</p>
        </div>
      )}

      {/* Quick Info */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Quick Info</h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div className="flex items-center gap-3 rounded-xl border p-4">
            <MapPin className="size-4 text-primary" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-muted-foreground">2 km from city center</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Plane className="size-4 text-primary" />
            <div>
              <p className="font-medium">Airport</p>
              <p className="text-muted-foreground">18 km away</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Clock className="size-4 text-primary" />
            <div>
              <p className="font-medium">Check-in</p>
              <p className="text-muted-foreground">2:00 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Utensils className="size-4 text-primary" />
            <div>
              <p className="font-medium">Food</p>
              <p className="text-muted-foreground">Breakfast included</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
