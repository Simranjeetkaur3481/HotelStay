import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SearchCard() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      destination: "",
      CheckInDate: "",
      CheckOutDate: "",
    },
  });

  //localhost:3000/search?destination=goa&checkIn=2026-07-06&checkOut=2026-07-07&_rsc=2Md0sTUZcnjCijMr
  const navigate = useNavigate();

  const formSubmit = (data) => {
    try {
      const params = new URLSearchParams();

      if (data.destination.trim()) {
        params.set("destination", data.destination.trim());
      }

      if (data.CheckInDate) {
        params.set("CheckInDate", data.CheckInDate);
      }

      if (data.CheckOutDate) {
        params.set("CheckOutDate", data.CheckOutDate);
      }
      if (new Date(data.CheckOutDate) <= new Date(data.checkInDate)) {
        console.log("chekout date must be after checkin date");
        return;
      }
      navigate(`searchRooms?${params.toString()}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-6">
      <div className="rounded-2xl border bg-background p-4 shadow-xl lg:p-6">
        <form onSubmit={handleSubmit(formSubmit)} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* destination */}
          <div className="space-y-2">
            <label className="text-sm font-medium">destination</label>

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
                {...register("CheckInDate", { required: "checkin date is required" })}
                className="pl-10"
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
                {...register("CheckOutDate", { required: "checkout date is required" })}
                className="pl-10"
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
