import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetHotelReviewsQuery } from "@/store/api/reviewApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { API_BASE_URL } from "@/constants/api";
import { useState } from "react";

const ratingData = [
  { label: "Cleanliness", value: 4.9 },
  { label: "Location", value: 4.8 },
  { label: "Service", value: 4.7 },
  { label: "Value", value: 4.7 },
];


export default function ReviewSection({ hotel }) {
  const { data } = useGetHotelReviewsQuery(hotel?.id);
  const allReviews = data?.data || [];
  const averageRating = allReviews?.summary?.averageRating;
  const totalReviews = allReviews?.summary?.totalReviews;
  const reviews = allReviews?.reviews;
  const [showAll, setShowAll] = useState(false);
  const displayReviews = showAll ? reviews : reviews?.slice(0, 3);
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold">Guest Reviews</h2>

        <div className="mt-2 flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">{averageRating}</span>

          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${i < averageRating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
              />
            ))}
          </div>

          <span className="text-sm text-muted-foreground">
            ({totalReviews} review{totalReviews > 1 ? "s" : ""})
          </span>
        </div>
      </div>

      {/* Rating Bars */}
      {/* <div className="grid gap-4 sm:grid-cols-2">
        {ratingData.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>

            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${(item.value / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div> */}

      {/* Featured Review */}
 <div className="space-y-8">
  {displayReviews?.map((rev) => (
    <div key={rev.id} className="flex gap-4">
      <Avatar className="mt-1 size-11">
        <AvatarImage src={`${API_BASE_URL}${rev.userAvatarUrl}`} />
        <AvatarFallback>
          {rev.userName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h4 className="font-semibold">{rev.userName}</h4>
            <p className="text-xs text-muted-foreground">
              {new Date(rev.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-1">
            {Array.from({ length: rev.overallRating }).map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="relative rounded-2xl bg-muted px-5 py-4">
          {/* Bubble Tail */}
          <div className="absolute -left-2 top-5 h-4 w-4 rotate-45 bg-muted" />

          <p className="leading-7 text-muted-foreground">
            {rev.comment}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* CTA */}
      {totalReviews > 3 && (
        <div>
          <Button variant="outline" className="w-full" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </section>
  );
}
