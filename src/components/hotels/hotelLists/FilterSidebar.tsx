// import {
//   AMENITIES,
//   PROPERTY_TYPES,
//   RATINGS,
// } from "@/constants/hotelFilters";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RATINGS } from "@/constants/hotelFilter";

export type ListingFilters = {
  maxPrice: number;
  ratings: number[];
};

type FilterSidebarProps = {
  filters: ListingFilters;
  onChange: (filters: ListingFilters) => void;
};

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleRating = (rating: number) => {
    const exists = filters.ratings.includes(rating);
    onChange({
      ...filters,
      ratings: exists ? filters.ratings.filter((r) => r !== rating) : [...filters.ratings, rating],
    });
  };

  const handleClear = () => {
    onChange({ maxPrice: 20000, ratings: [] });
  };

  return (
  <aside className="rounded-3xl border p-6">

      {/* Heading */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Filters
        </h2>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>

      {/* Price */}

      <section className="space-y-4">

        <h3 className="font-semibold">
          Price Range
        </h3>

        <Slider
          value={[filters.maxPrice]}
          onValueChange={(value) => onChange({ ...filters, maxPrice: value[0] ?? filters.maxPrice })}
          max={20000}
          step={500}
        />

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹0</span>
          <span>₹20,000+</span>
        </div>

      </section>

      {/* Rating */}

      <section className="mt-8 space-y-3">

        <h3 className="font-semibold">
          Star Rating
        </h3>

        {RATINGS.map((rating) => (
          <div
            key={rating}
            className="flex items-center space-x-2"
          >
            <Checkbox id={`rating-${rating}`} checked={filters.ratings.includes(rating)} onCheckedChange={() => toggleRating(rating)} />

            <Label htmlFor={`rating-${rating}`}>
              {rating} Stars & Up
            </Label>
          </div>
        ))}

      </section>

    </aside>
  );
}