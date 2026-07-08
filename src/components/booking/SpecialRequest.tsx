import { useFormContext } from "react-hook-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BookingFormValues } from "@/types/bookingTypes";

const REQUESTS = ["High Floor", "Early Check-In", "Late Check-Out", "Non-Smoking Room", "Twin Beds", "Extra Pillows"];

export default function SpecialRequest() {
  const { watch, setValue, register } = useFormContext<BookingFormValues>();

  const selectedRequests = watch("specialRequests") || [];

  const toggleRequest = (request: string) => {
    if (selectedRequests.includes(request)) {
      setValue(
        "specialRequests",
        selectedRequests.filter((item) => item !== request),
      );
    } else {
      setValue("specialRequests", [...selectedRequests, request]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Special Requests</CardTitle>

        <CardDescription>These requests will be shared with the hotel but cannot be guaranteed.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {REQUESTS.map((request) => (
            <div key={request} className="flex items-center gap-3 rounded-lg border p-3">
              <Checkbox checked={selectedRequests.includes(request)} onCheckedChange={() => toggleRequest(request)} />

              <Label className="cursor-pointer">{request}</Label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Request</Label>

          <Textarea
            id="notes"
            rows={4}
            placeholder="Anything you'd like the hotel to know..."
            {...register("notes")}
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
