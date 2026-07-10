import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDays, getDefaultBookingDates, getToday, handleCheckInChange } from "@/constants/booking";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SearchCard() {
  const { checkIn, checkOut } = getDefaultBookingDates();
  const today = getToday();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      destination: "",
      checkIn: checkIn || "",
      checkOut: checkOut || "",
    },
  });

  const navigate = useNavigate();

  const formSubmit = (data) => {
    try {
      const params = new URLSearchParams();

      if (data.destination.trim()) {
        params.set("destination", data.destination.trim());
      }

      if (data.checkIn) {
        params.set("checkIn", data.checkIn);
      }

      if (data.checkOut) {
        params.set("checkOut", data.checkOut);
      }
      if (new Date(data.checkOut) <= new Date(data.checkIn)) {
        toast.error("Check-out must be after check-in.");
        return;
      }
      navigate(`searchRooms?${params.toString()}`);
    } catch (error) {
      toast.error("Unable to search right now.");
    }
  };
  return (
    <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-6">
      <div className="rounded-2xl border bg-background p-4 shadow-xl lg:p-6">
        <form onSubmit={handleSubmit(formSubmit)} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* destination */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Enter city"
                {...register("destination", { required: "destination is required" })}
                className="pl-10"
              />
            </div>
          </div>

          {/* Check In */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Check In</label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                {...register("checkIn", { required: "checkin date is required" })}
                className="pl-10"
                min={today}
                onChange={(e) => handleCheckInChange(e.target.value, setValue)}
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Check Out</label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                {...register("checkOut", { required: "checkout date is required" })}
                className="pl-10"
                min={addDays(watch("checkIn"), 1)}
              />
            </div>
          </div>

          {/* Search */}
          <div className="flex items-end">
            <Button className="w-full gap-2 h-10">
              <Search className="size-4" />
              Search Hotels
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
