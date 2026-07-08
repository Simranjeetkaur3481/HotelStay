import { Percent } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BookingFormValues } from "@/types/bookingTypes";
import toast from "react-hot-toast";

type CouponCardProps = {
  discount: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
};

export default function CouponCard({ discount, setDiscount }: CouponCardProps) {
  const { register, getValues } = useFormContext<BookingFormValues>();

  const [loading, setLoading] = useState(false);

  const applyCoupon = async () => {
    const coupon = getValues("coupon");

    if (!coupon.trim()) return;

    setLoading(true);

    /**
     * Replace with API
     */

    setTimeout(() => {
      if (coupon.toUpperCase() === "WELCOME10") {
        setDiscount(10);
        toast.success("coupon applied successfully");
      } else if (coupon.toUpperCase() === "SUMMER20") {
        setDiscount(20);
        toast.success("coupon applied successfully");
      } else {
        setDiscount(0);

        toast.error("Invalid coupon");
      }

      setLoading(false);
    }, 700);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promo Code</CardTitle>

        <CardDescription>Have a coupon? Apply it below.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input className="pl-10" placeholder="Enter coupon code" {...register("coupon")} />
          </div>

          <Button type="button" onClick={applyCoupon} disabled={loading}>
            {loading ? "Applying..." : "Apply"}
          </Button>
        </div>

        {discount > 0 && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            🎉 Coupon applied successfully.
            <div className="mt-1 font-semibold">{discount}% discount applied.</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
