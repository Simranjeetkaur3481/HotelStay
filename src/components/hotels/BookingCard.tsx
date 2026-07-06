import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users } from "lucide-react";

interface BookingCardProps {
  price: number;
}

export default function BookingCard({ price }: BookingCardProps) {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-3xl border bg-background p-6 shadow-xl">

        {/* Price */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Starting from
          </p>

          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-primary">
              ₹{price}
            </span>

            <span className="pb-1 text-sm text-muted-foreground">
              / night
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Check In */}
          <div>
            <label className="text-sm font-medium">
              Check In
            </label>

            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                className="pl-10"
              />
            </div>
          </div>

          {/* Check Out */}
          <div>
            <label className="text-sm font-medium">
              Check Out
            </label>

            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                className="pl-10"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm font-medium">
              Guests
            </label>

            <div className="relative mt-1">
              <Users className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="number"
                min={1}
                defaultValue={2}
                className="pl-10"
              />
            </div>
          </div>

          {/* Rooms */}
          <div>
            <label className="text-sm font-medium">
              Rooms
            </label>

            <Input
              type="number"
              min={1}
              defaultValue={1}
            />
          </div>

          {/* Button */}
          <Button className="w-full text-base font-semibold">
            Reserve Now
          </Button>

        </div>

        {/* Trust Notes */}
        <div className="mt-5 space-y-2 text-xs text-muted-foreground">
          <p>✔ Free cancellation available</p>
          <p>✔ You won't be charged yet</p>
        </div>

      </div>
    </div>
  );
}