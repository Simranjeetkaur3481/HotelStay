import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
      <img src="/hero.jpg" alt="Luxury Hotel" className="absolute inset-0 h-full w-full object-cover" />

      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/25" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pb-5">
        <div className="max-w-xl space-y-4">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            ✨ Luxury Hotels Worldwide
          </Badge>

          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Stay in Comfort.
            <span className="block text-white">Travel Without Limits.</span>
          </h1>

          <p className="max-w-lg text-sm leading-6 text-gray-200 md:text-base">
            Discover premium stays, exclusive offers, and unforgettable experiences at destinations around the world.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg">
              Explore Hotels
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white bg-white/10 text-white backdrop-blur hover:bg-white hover:text-black"
            >
              View Deals
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
