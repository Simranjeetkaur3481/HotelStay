import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDays, getNextCheckOutDate, getToday } from "@/constants/booking";
import type { BookingDetails } from "@/types/bookingTypes";
import { Calendar, Users } from "lucide-react";

type BookingCardProps = {
  price: number;
  bookingDetails: BookingDetails;
  onChange: (value: BookingDetails) => void;
  handleCheckAvailablity: () => void;
};

export default function BookingCard({ price, bookingDetails, onChange, handleCheckAvailablity }: BookingCardProps) {
  const today = getToday();
  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-3xl border bg-background p-6 shadow-xl">
        {/* Price */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Starting from</p>

          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-primary">₹{price}</span>

            <span className="pb-1 text-sm text-muted-foreground">/ night</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Check In */}
          <div>
            <label className="text-sm font-medium">Check In</label>

            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                className="pl-10"
                value={bookingDetails.checkIn}
                min={today}
                onChange={(e) =>
                  onChange({
                    ...bookingDetails,
                    checkIn: e.target.value,
                    checkOut: getNextCheckOutDate(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Check Out */}
          <div>
            <label className="text-sm font-medium">Check Out</label>

            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                className="pl-10"
                value={bookingDetails.checkOut}
                min={addDays(bookingDetails.checkIn, 1)}
                onChange={(e) =>
                  onChange({
                    ...bookingDetails,
                    checkOut: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm font-medium">Guests</label>

            <div className="relative mt-1">
              <Users className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="number"
                min={1}
                className="pl-10"
                value={bookingDetails.guests}
                onChange={(e) =>
                  onChange({
                    ...bookingDetails,
                    guests: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <Button className="w-full text-base font-semibold" onClick={handleCheckAvailablity}>
            Check Availablity
          </Button>
        </div>
      </div>
    </div>
  );
}
