import { useFormContext } from "react-hook-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BookingFormValues } from "@/types/bookingTypes";

export default function BookingGuestForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Details</CardTitle>

        <CardDescription>Enter the primary guest information for this reservation.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>

          <Input
            id="fullName"
            placeholder="John Doe"
            {...register("fullName", {
              required: "Full name is required",
            })}
          />

          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
        </div>


        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>

            <Input
              id="phoneNumber"
              placeholder="+91 9876543210"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />

            {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>}
          </div>
        </div>


        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>

          <Textarea
            id="notes"
            rows={5}
            placeholder="Special instructions for the hotel (optional)"
            {...register("notes")}
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
