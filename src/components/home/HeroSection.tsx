import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-[56vh] min-h-[360px] overflow-hidden sm:h-[62vh]">
      <img
        src="/hero.jpg"
        alt="Luxury Hotel"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-center [image-rendering:auto]"
      />

      <div className="absolute inset-0 bg-linear-to-r from-slate-900/55 via-slate-900/30 to-primary/20" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 pb-6 sm:px-6">
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            ✨ Luxury Hotels Worldwide
          </Badge>

          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Stay in Comfort.
            <span className="block text-white">Travel Without Limits.</span>
          </h1>

          <p className="max-w-lg text-sm leading-6 text-white/85 md:text-base">
            Discover premium stays, exclusive offers, and unforgettable experiences at destinations around the world.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" asChild>
              <Link to="/hotels">
              Explore Hotels
              <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white bg-white/10 text-white backdrop-blur hover:bg-white hover:text-primary"
            >
              <Link to="/searchRooms">View Deals</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
