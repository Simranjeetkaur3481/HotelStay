import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetHotelReviewsQuery } from "@/store/api/reviewApi";

const ratingData = [
  { label: "Cleanliness", value: 4.9 },
  { label: "Location", value: 4.8 },
  { label: "Service", value: 4.7 },
  { label: "Value", value: 4.7 },
];

const featuredReview = {
  name: "Sarah Williams",
  country: "United Kingdom",
  rating: 5,
  text: "Absolutely amazing stay. The ocean view was stunning and the service was exceptional. Everything felt effortless from check-in to checkout.",
};

export default function ReviewSection({hotel}) {
  console.log(hotel,'ggg')
  const {data} = useGetHotelReviewsQuery(hotel?.id);
  console.log(data)
  return (
    <section className="space-y-10">

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">
          Guest Reviews
        </h2>

        <div className="mt-2 flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">
            4.8
          </span>

          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <span className="text-sm text-muted-foreground">
            (1,284 reviews)
          </span>
        </div>
      </div>

      {/* Rating Bars */}
      <div className="grid gap-4 sm:grid-cols-2">

        {ratingData.map((item) => (
          <div key={item.label} className="space-y-1">

            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>

            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${(item.value / 5) * 100}%` }}
              />
            </div>

          </div>
        ))}

      </div>

      {/* Featured Review */}
      <div className="rounded-3xl border bg-background p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            {Array.from({ length: featuredReview.rating }).map(
              (_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-yellow-400 text-yellow-400"
                />
              )
            )}
          </div>

        </div>

        <p className="mt-4 text-muted-foreground leading-7">
          "{featuredReview.text}"
        </p>

        <div className="mt-6 text-sm font-medium">
          {featuredReview.name} • {featuredReview.country}
        </div>

      </div>

      {/* CTA */}
      <div>
        <Button variant="outline" className="w-full">
          View All Reviews
        </Button>
      </div>

    </section>
  );
}