import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useGetRoomDetailQuery } from "@/store/api/roomApi";
import { addDays, calculateNights } from "@/constants/booking";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/types/bookingTypes";

type BookingSummaryProps = {
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  discount: number;
  isLoading: boolean;
};

export default function BookingSummary({ discount, isLoading }: BookingSummaryProps) {
  const { register, watch, setValue } = useFormContext<BookingFormValues>();

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const { id } = useParams();
  const { data } = useGetRoomDetailQuery(id);
  const room = data?.data ?? {};
  const today = new Date().toISOString().split("T")[0];

  const nights = Math.max(0, calculateNights(checkIn, checkOut));

  const subtotal = room.pricePerNight * nights;

  const taxes = Math.round(subtotal * 0.12);

  const discountAmount = Math.round(subtotal * (discount / 100));

  const total = subtotal + taxes - discountAmount;

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    register("checkIn").onChange(e);

    if (!checkOut || checkOut <= value) {
      setValue("checkOut", addDays(value, 1), {
        shouldValidate: true,
      });
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (checkIn && value <= checkIn) {
      setValue("checkOut", addDays(checkIn, 1), {
        shouldValidate: true,
      });
      return;
    }

    setValue("checkOut", value, {
      shouldValidate: true,
    });
  };

  return (
    <Card className="sticky top-24 overflow-hidden">
      <CardHeader>
        <CardTitle>{room?.name}</CardTitle>

        <p className="text-sm text-muted-foreground">{room?.hotelName}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Check In</Label>

            <Input type="date" {...register("checkIn")} min={today} onChange={handleCheckInChange} />
          </div>

          <div>
            <Label>Check Out</Label>

            <Input
              type="date"
              {...register("checkOut")}
              min={checkIn ? addDays(checkIn, 1) : addDays(today, 1)}
              onChange={handleCheckOutChange}
            />
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
        </div>

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

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing...":"Continue to Payment"}
        </Button>
      </CardContent>
    </Card>
  );
}
