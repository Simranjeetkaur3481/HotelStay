import { CalendarDays, MapPin, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="rounded-3xl border bg-background p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        {/* Destination */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Where are you going?"
            className="pl-10"
          />
        </div>

        {/* Check In */}
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="date"
            className="pl-10"
          />
        </div>

        {/* Check Out */}
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="date"
            className="pl-10"
          />
        </div>

        {/* Guests */}
        <div className="relative">
          <Users className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="number"
            min={1}
            placeholder="Guests"
            className="pl-10"
          />
        </div>

        {/* Search */}
        <Button className="h-10">
          <Search className="mr-2 size-4" />
          Search
        </Button>

      </div>
    </div>
  );
}