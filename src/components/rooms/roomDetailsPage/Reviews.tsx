import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type ReviewsProps = {
  reviews: Review[];
};

export default function Reviews({ reviews }: ReviewsProps) {
  const average =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <section className="rounded-2xl border bg-background p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Guest Reviews
          </h2>

          <p className="mt-1 text-muted-foreground">
            {average} ★ • {reviews.length} Reviews
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {reviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="rounded-xl border p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>
                    {review.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h4 className="font-medium">
                    {review.userName}
                  </h4>

                  <p className="text-xs text-muted-foreground">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="mt-6 text-center">
          <Button variant="outline">
            View All Reviews
          </Button>
        </div>
      )}
    </section>
  );
}