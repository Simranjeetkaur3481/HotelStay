import { CalendarDays, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDays, calculateNights, getNextCheckOutDate, getToday } from "@/constants/booking";
import useAuth from "@/hooks/useAuth";
import { getEffectiveRoomPricing } from "@/lib/roomPricing";

type BookingCardProps = {
  room: {
    pricePerNight: number;
    id: number;
    basePricePerNight?: number | null;
    dynamicPricePerNight?: number | null;
    appliedPromotionId?: number | null;
    appliedPromotionTitle?: string | null;
    appliedPromotionDisplayText?: string | null;
    promotionDiscountPerNight?: number | null;
  };
  hotelId: number;
};

export default function BookingCard({ room, hotelId }: BookingCardProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const today = getToday();

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(checkIn, 1));
  const [guests, setGuests] = useState(1);
  const pricing = getEffectiveRoomPricing(room);

  const nights = calculateNights(checkIn, checkOut);

  const total = nights * pricing.effectivePrice;

  const handleReserve = () => {
    if (!isAuthenticated) {
      navigate("/booking/auth", {
        state: {
          roomId: room.id,
          hotelId,
          checkIn,
          checkOut,
          guests,
          room,
        },
      });
      return;
    }

    navigate(`/booking/${room.id}`, {
      state: {
        roomId: room.id,
        hotelId,
        checkIn,
        checkOut,
        guests,
      },
    });
  };

  return (
    <div className="sticky top-24 rounded-2xl border bg-background p-6 shadow-sm">
      <div className="border-b pb-5">
        {pricing.hasDiscount && <p className="text-sm text-muted-foreground line-through">₹{pricing.basePrice.toLocaleString()}</p>}
        <p className="text-3xl font-bold text-primary">₹{pricing.effectivePrice.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">per night</p>
        {pricing.promotionLabel && <p className="mt-1 text-xs font-medium text-emerald-600">{pricing.promotionLabel}</p>}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Check In</label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setCheckOut(getNextCheckOutDate(e.target.value));
              }}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Check Out</label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="date"
              value={checkOut}
              min={checkIn ? addDays(checkIn, 1) : getToday()}
              onChange={(e) => setCheckOut(e.target.value)}
              className="pl-10"
            />
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

      <div className="my-6 space-y-3 border-t pt-5 text-sm">
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
