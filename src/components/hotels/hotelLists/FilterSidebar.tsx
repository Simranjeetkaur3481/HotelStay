// import {
//   AMENITIES,
//   PROPERTY_TYPES,
//   RATINGS,
// } from "@/constants/hotelFilters";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AMENITIES, PROPERTY_TYPES, RATINGS } from "@/constants/hotelFilter";

export default function FilterSidebar() {
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
          defaultValue={[5000]}
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
            <Checkbox id={`rating-${rating}`} />

            <Label htmlFor={`rating-${rating}`}>
              {rating} Stars & Up
            </Label>
          </div>
        ))}

      </section>

      {/* Property */}

      <section className="mt-8 space-y-3">

        <h3 className="font-semibold">
          Property Type
        </h3>

        {PROPERTY_TYPES.map((type) => (
          <div
            key={type}
            className="flex items-center space-x-2"
          >
            <Checkbox id={type} />

            <Label htmlFor={type}>
              {type}
            </Label>
          </div>
        ))}

      </section>

      {/* Amenities */}

      <section className="mt-8 space-y-3">

        <h3 className="font-semibold">
          Amenities
        </h3>

        {AMENITIES.map((item) => (
          <div
            key={item}
            className="flex items-center space-x-2"
          >
            <Checkbox id={item} />

            <Label htmlFor={item}>
              {item}
            </Label>
          </div>
        ))}

      </section>

      {/* Availability */}

      <section className="mt-8 space-y-3">

        <h3 className="font-semibold">
          Availability
        </h3>

        {[
          "Free Cancellation",
          "Breakfast Included",
          "Available Rooms Only",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center space-x-2"
          >
            <Checkbox id={item} />

            <Label htmlFor={item}>
              {item}
            </Label>
          </div>
        ))}

      </section>

    </aside>
  );
}