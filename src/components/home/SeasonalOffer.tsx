import { ArrowRight, Clock3, Percent, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function SeasonalOffer() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00355f]/95 via-[#005a8f]/85 to-[#0077b6]/40" />
          <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-amber-400/20 blur-[100px]" />
          <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-cyan-400/15 blur-[80px]" />

          <div className="relative z-10 flex min-h-[420px] flex-col justify-center p-8 sm:p-12 lg:w-3/5">
            <Badge className="mb-5 w-fit rounded-full border-0 bg-amber-400 px-4 py-1.5 text-amber-950 hover:bg-amber-400">
              <Sun className="mr-1.5 size-3.5" />
              Limited Time Offer
            </Badge>

            <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
              Summer Escape
              <br />
              Save Up To{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                30% Off
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-white/80">
              Escape to handpicked luxury resorts with exclusive seasonal discounts. Book today and create unforgettable
              summer memories across India&apos;s finest destinations.
            </p>

            <div className="mt-4 flex items-center gap-2 text-white/70">
              <Percent className="size-4" />
              <span className="text-sm">Use code <strong className="text-amber-300">SUMMER30</strong> at checkout</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2 rounded-xl bg-white text-[#00355f] hover:bg-white/90" asChild>
                <Link to="/searchRooms">
                  Explore Offers
                  <ArrowRight className="size-5" />
                </Link>
              </Button>

              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-white backdrop-blur-sm">
                <Clock3 className="size-4 text-amber-300" />
                <span className="text-sm font-medium">Ends 31 July 2026</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md lg:block">
            <p className="text-5xl font-black text-white">30%</p>
            <p className="mt-1 text-sm text-white/70">Maximum savings</p>
            <p className="mt-3 text-xs text-white/50">On select premium properties</p>
          </div>
        </div>
      </div>
    </section>
  );
}
