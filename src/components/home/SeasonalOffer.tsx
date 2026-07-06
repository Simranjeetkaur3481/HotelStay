import { ArrowRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SeasonalOffer() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem]">
          {/* Background Image */}
          {/* <img src="/offers/summer.jpg" alt="Summer Offer" className="absolute inset-0 h-full w-full object-cover" /> */}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 via-blue-700 to-transparent" />

          {/* Decorative Blur */}
          <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[380px] flex-col justify-center p-8 sm:p-12 lg:w-3/5">
            <span className="mb-4 inline-flex w-fit rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              🌴 Limited Time Offer
            </span>

            <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
              Summer Escape
              <br />
              Save Up To
              <span className="text-primary"> 30%</span>
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-gray-200">
              Escape to handpicked luxury resorts with exclusive seasonal discounts. Book today and create unforgettable
              memories.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2">
                Explore Offers
                <ArrowRight className="size-5" />
              </Button>

              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur">
                <Clock3 className="size-4" />
                Ends 31 July
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
