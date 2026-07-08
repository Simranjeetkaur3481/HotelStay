import { ChevronLeft, ChevronRight, Quote, Star, StarOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { useGetAllreviewiewsQuery } from "../../store/api/reviewApi";
import { API_BASE_URL } from "@/constants/api";
import { useState } from "react";
import { useGetAllReviewsQuery } from "@/store/api/reviewApi";

export default function GuestStory() {
  const { data } = useGetAllReviewsQuery();
  const [currentIndex, seturrentIndex] = useState(0);
  const reviews = data?.data || [];
  const review = reviews[currentIndex];

  console.log(review);

  const nextReviews = () => {
    seturrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  const prevReviews = () => {
    seturrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="font-semibold text-primary">Guest Stories</span>

          <h2 className="mt-3 text-4xl font-bold">Every Stay Has a Story</h2>

          <p className="mt-4 text-muted-foreground">
            Discover unforgettable experiences shared by travelers who found their perfect stay with HotelHub.
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-[32px] border bg-card shadow-xl">
          {review ? (
            <div>
              <div className="grid lg:grid-cols-2">
                <div className="relative h-[350px] lg:h-[500px]">
                  <img
                    src={`${API_BASE_URL}${review?.userAvatarUrl}`}
                    alt="Guest"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute bottom-6 left-6 rounded-2xl bg-black/60 px-5 py-3 text-white backdrop-blur">
                    <p className="text-sm opacity-80">Stayed At</p>

                    <h3 className="text-xl font-semibold">{review.hotelName}</h3>

                    <p className="text-sm opacity-80">Goa, India</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 lg:p-14">
                  <Quote className="mb-6 size-12 text-primary/30" />

                  <div className="mb-6 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`mr-1 size-5  ${i < review.overallRating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-xl leading-9 text-foreground lg:text-2xl">"{review.comment}"</blockquote>

                  <div className="mt-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="size-14">
                        <AvatarImage src={`${API_BASE_URL}${review.userAvatarUrl}`} />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>

                      <div>
                        <h4 className="font-semibold">{review.userName}</h4>

                        <p className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3">
                      <Button size="icon" variant="outline" className="rounded-full" onClick={prevReviews}>
                        <ChevronLeft className="size-5" />
                      </Button>

                      <Button size="icon" className="rounded-full" onClick={nextReviews}>
                        <ChevronRight className="size-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Indicators */}
                  <div className="mt-10 flex gap-2">
                    {reviews.map((_, i) => (
                      <span
                        className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted"}`}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-2xl bg-gradient-to-b from-gray-50 to-white py-14">
              <div className="rounded-full bg-gray-100 p-4">
                <StarOff className="h-8 w-8 text-gray-400" />
              </div>

              <h3 className="mt-4 text-xl font-semibold text-gray-900">No guest reviews yet</h3>

              <p className="mt-2 max-w-md text-center text-sm text-gray-500">
                Once guests complete their stay and leave feedback, their reviews and ratings will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
