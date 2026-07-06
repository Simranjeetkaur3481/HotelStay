import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";

export default function SearchCard() {
  return (
    <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-6">
      <div className="rounded-2xl border bg-background p-4 shadow-xl lg:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input placeholder="Enter city" className="pl-10" />
            </div>
          </div>

          {/* Check In */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Check In</label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input type="date" className="pl-10" />
            </div>
          </div>

          {/* Check Out */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Check Out</label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input type="date" className="pl-10" />
            </div>
          </div>

          {/* Search */}
          <div className="flex items-end">
            <Button className="w-full gap-2 h-10">
              <Search className="size-4" />
              Search Hotels
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
