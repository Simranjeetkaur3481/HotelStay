import { ChevronLeft, ChevronRight, Quote, Sparkles, Star, StarOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants/api";
import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { useGetAllReviewsQuery } from "@/store/api/reviewApi";
import { Badge } from "@/components/ui/badge";

export default function GuestStory() {
  const { data, isLoading } = useGetAllReviewsQuery(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const reviews = data?.data || [];
  const review = reviews[currentIndex];

  const nextReviews = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  const prevReviews = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextReviews();
      else prevReviews();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="mb-14 text-center">
          <Badge variant="outline" className="mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-primary">
            <Sparkles className="mr-1.5 size-3.5" />
            Guest Stories
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">Every Stay Has a Story</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Real experiences from travelers who discovered their perfect stay with HotelStay.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-[2rem] border bg-card/95 shadow-xl ring-1 ring-primary/10"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {isLoading ? (
            <div className="grid animate-pulse lg:grid-cols-2">
              <div className="h-[320px] bg-muted sm:h-[380px] lg:h-[520px]" />
              <div className="space-y-6 p-6 sm:p-8 lg:p-12">
                <div className="h-6 w-24 rounded bg-muted" />
                <div className="h-5 w-40 rounded bg-muted" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-[90%] rounded bg-muted" />
                  <div className="h-4 w-[70%] rounded bg-muted" />
                </div>
                <div className="h-12 w-52 rounded bg-muted" />
              </div>
            </div>
          ) : review ? (
            <div className="grid lg:grid-cols-2">
              <div className="relative h-[320px] sm:h-[380px] lg:h-[520px]">
                <img
                  src={`${API_BASE_URL}${review?.images?.[0]?.imageUrl}`}
                  alt="Guest stay"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/35 p-4 backdrop-blur-sm">
                  <p className="text-sm font-medium text-white/70">Stayed At</p>
                  <h3 className="mt-1 line-clamp-1 text-xl font-bold text-white">{review.hotelName}</h3>
                  <p className="mt-1 text-sm text-white/70">{review.city ?? "India"}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center bg-linear-to-b from-background to-muted/20 p-6 sm:p-8 lg:p-12">
                <Quote className="mb-4 size-12 text-primary/25" />

                <div className="mb-5 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-5 ${i < review.overallRating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">{review.overallRating}/5</span>
                </div>

                <blockquote className="text-lg leading-relaxed text-foreground lg:text-xl lg:leading-8">
                  &ldquo;{review.comment}&rdquo;
                </blockquote>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-14 ring-2 ring-primary/10">
                      <AvatarImage src={review.userAvatarUrl ? `${API_BASE_URL}${review.userAvatarUrl}` : undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {review.userName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>

                  {reviews.length > 1 && (
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" className="rounded-full border-border/70 bg-background/70" onClick={prevReviews}>
                        <ChevronLeft className="size-5" />
                      </Button>
                      <Button size="icon" className="rounded-full" onClick={nextReviews}>
                        <ChevronRight className="size-5" />
                      </Button>
                    </div>
                  )}
                </div>

                {reviews.length > 1 && (
                  <div className="mt-8 flex gap-2">
                    {reviews.map((_: unknown, i: number) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-10 bg-primary" : "w-2 bg-muted hover:bg-muted-foreground/30"}`}
                        aria-label={`Go to review ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center bg-linear-to-b from-muted/30 to-background py-20">
              <div className="rounded-2xl bg-primary/10 p-5">
                <StarOff className="size-10 text-primary/60" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">No guest reviews yet</h3>
              <p className="mt-2 max-w-md text-center text-muted-foreground">
                Once guests complete their stay and leave feedback, their stories will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
