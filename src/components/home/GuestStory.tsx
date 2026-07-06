import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function GuestStory() {
  // const {data} = usegetre
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="font-semibold text-primary">
            Guest Stories
          </span>

          <h2 className="mt-3 text-4xl font-bold">
            Every Stay Has a Story
          </h2>

          <p className="mt-4 text-muted-foreground">
            Discover unforgettable experiences shared by travelers
            who found their perfect stay with HotelHub.
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-[32px] border bg-card shadow-xl">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-[350px] lg:h-[500px]">
              <img
                src="/guest-story.jpg"
                alt="Guest"
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-6 left-6 rounded-2xl bg-black/60 px-5 py-3 text-white backdrop-blur">
                <p className="text-sm opacity-80">
                  Stayed At
                </p>

                <h3 className="text-xl font-semibold">
                  Ocean View Resort
                </h3>

                <p className="text-sm opacity-80">
                  Goa, India
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 lg:p-14">
              <Quote className="mb-6 size-12 text-primary/30" />

              <div className="mb-6 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="mr-1 size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <blockquote className="text-xl leading-9 text-foreground lg:text-2xl">
                "From the seamless booking experience to waking up
                with an ocean view every morning, everything felt
                effortless. This was one of the most memorable trips
                we've ever had."
              </blockquote>

              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarImage src="/users/sarah.jpg" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold">
                      Sarah Williams
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      London, United Kingdom
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                  >
                    <ChevronLeft className="size-5" />
                  </Button>

                  <Button
                    size="icon"
                    className="rounded-full"
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                </div>
              </div>

              {/* Indicators */}
              <div className="mt-10 flex gap-2">
                <span className="h-2 w-8 rounded-full bg-primary"></span>
                <span className="h-2 w-2 rounded-full bg-muted"></span>
                <span className="h-2 w-2 rounded-full bg-muted"></span>
                <span className="h-2 w-2 rounded-full bg-muted"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}