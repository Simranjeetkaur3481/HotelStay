import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterSidebar from "../hotelLists/FilterSidebar";

// import FilterSidebar from "./FilterSidebar";

// interface MobileFiltersProps {
//   filters: HotelFilters;
//   onChange: (filters: HotelFilters) => void;
// }

export default function MobileFilters({
  filters,
  onChange,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="lg:hidden"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[320px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <FilterSidebar
            filters={filters}
            onChange={onChange}
            mobile
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}