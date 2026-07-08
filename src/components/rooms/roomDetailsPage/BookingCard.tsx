import { CalendarDays, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { calculateNights } from "@/constants/booking";
import useAuth from "@/hooks/useAuth";

type BookingCardProps = {
  room: {
    pricePerNight: number;
  };
};

export default function BookingCard({ room }: BookingCardProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const nights = calculateNights(checkIn, checkOut);

  const total = nights * room.pricePerNight;

  const handleReserve = () => {
    if (!isAuthenticated) {
      navigate("/booking/auth", {
        state: {
          roomId: room.id,
          checkIn,
          checkOut,
          guests,
        },
      });
      return;
    }

    navigate(`/booking/${room.id}`, {
      state: {
        roomId: room.id,
        checkIn,
        checkOut,
        guests,
      },
    });
  };

  return (
    <div className="sticky top-24 rounded-2xl border bg-background p-6 shadow-sm">
      <div className="border-b pb-5">
        <p className="text-3xl font-bold text-primary">₹{room.pricePerNight}</p>

        <p className="text-sm text-muted-foreground">per night</p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Check In</label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Check Out</label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Guests</label>

          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="my-6 space-y-3 border-y py-5 text-sm">
        <div className="flex justify-between">
          <span>
            ₹{room.pricePerNight} × {nights} nights
          </span>

          <span>₹{total}</span>
        </div>

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>

          <span className="text-primary">₹{total}</span>
        </div>
      </div>

      <Button className="w-full" disabled={!checkIn || !checkOut || nights <= 0} onClick={handleReserve}>
        Reserve Now
      </Button>
    </div>
  );
}
