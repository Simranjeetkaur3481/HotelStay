import {
  Building2,
  BedDouble,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import StatsCard from "@/components/common/StatsCard";

export default function HotelStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Hotels"
        value={4}
        icon={Building2}
      />

      <StatsCard
        title="Total Rooms"
        value={86}
        icon={BedDouble}
      />

      <StatsCard
        title="Bookings Today"
        value={18}
        icon={CalendarDays}
      />

      <StatsCard
        title="Occupancy"
        value="82%"
        icon={TrendingUp}
      />
    </div>
  );
}