import { CalendarDays, Hotel, Moon, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useParams } from "react-router-dom";
import { useGetRoomDetailQuery } from "@/store/api/roomApi";
import { API_BASE_URL } from "@/constants/api";
import { calculateNights } from "@/constants/booking";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

type BookingSummaryProps = {
  // roomId: number;
  hotelId: number;

  checkIn: string;
  checkOut: string;

  guests: number;

  discount: number;
};

export default function BookingSummary({ hotelId,  discount }: BookingSummaryProps) {
  const { register, watch } = useFormContext<BookingFormValues>();

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const guests = watch("guests");
  const { id } = useParams();
  const { data } = useGetRoomDetailQuery(id);
  const room = data?.data ?? {};

  const nights = calculateNights(checkIn, checkOut);

  const subtotal = room.pricePerNight * nights;

  const taxes = Math.round(subtotal * 0.12);

  const discountAmount = Math.round(subtotal * (discount / 100));

  const total = subtotal + taxes - discountAmount;

  return (
    <Card className="sticky top-24 overflow-hidden">
      <img src={`${API_BASE_URL}${room.images[0].imageUrl}`} alt={room.name} className="h-52 w-full object-cover" />

      <CardHeader>
        <CardTitle>{room.name}</CardTitle>

        <p className="text-sm text-muted-foreground">{room.hotelName}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stay */}

        <div className="space-y-4">
          <div>
            <Label>Check In</Label>

            <Input type="date" {...register("checkIn")} />
          </div>

          <div>
            <Label>Check Out</Label>

            <Input type="date" {...register("checkOut")} />
          </div>

          <div>
            <Label>Guests</Label>

            <Input
              type="number"
              min={1}
              {...register("guests", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-primary" />

              <span className="text-sm">Nights</span>
            </div>

            <span className="text-sm font-medium">{nights}</span>
          </div>
        </div>

        {/* Price */}

        <div className="space-y-3 border-y py-5">
          <div className="flex justify-between text-sm">
            <span>
              ₹{room.pricePerNight} × {nights}
            </span>

            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Taxes & Fees</span>

            <span>₹{taxes}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span>Discount</span>

              <span className="font-medium text-green-600">-₹{discountAmount}</span>
            </div>
          )}

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span className="text-primary">₹{total}</span>
          </div>
        </div>

        {/* Notice */}
        <Button type="submit" size="lg" className="w-full">
          Continue to Payment
        </Button>

        <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
          Final pricing will be confirmed before payment.
        </div>
      </CardContent>
    </Card>
  );
}
