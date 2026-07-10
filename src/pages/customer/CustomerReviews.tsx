import { Loader2, Star } from "lucide-react";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import EmptyState from "@/components/dashboard/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMyReviewsQuery } from "@/store/api/reviewApi";
import { API_BASE_URL } from "@/constants/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CustomerReviews = () => {
  const { data, isLoading } = useGetMyReviewsQuery(undefined);
  const reviews = data?.data ?? [];

  return (
    <div className="space-y-8">
      <PageHeader title="My Reviews" description="Reviews you've shared about your hotel experiences." />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : !reviews.length ? (
        <EmptyState
          icon={Star}
          title="No reviews yet"
          description="Complete a stay and share your experience to help fellow travelers."
          action={
            <Button asChild>
              <Link to="/customer/bookings">View Bookings</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4">
          {reviews.map((review: {
            id: number;
            hotelName: string;
            comment: string;
            overallRating: number;
            createdAt: string;
            userAvatarUrl?: string;
            userName?: string;
          }) => (
            <Card key={review.id} className="border-0 shadow-sm ring-1 ring-border/60">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12">
                    <AvatarImage src={review.userAvatarUrl ? `${API_BASE_URL}${review.userAvatarUrl}` : undefined} />
                    <AvatarFallback>{review.userName?.charAt(0) ?? "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{review.hotelName}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
                        </p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i < review.overallRating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground leading-relaxed">"{review.comment}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
