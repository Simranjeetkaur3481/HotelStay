import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import HotelCard from "../home/HotelCard";

interface SimilarHotelsProps {
  hotels: any[];
}

export default function SimilarHotels({
  hotels,
}: SimilarHotelsProps) {
  return (
    <section className="py-20">

      <div className="mb-10 flex items-end justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            You Might Also Like
          </h2>

          <p className="mt-2 text-muted-foreground">
            Discover similar stays you'll love.
          </p>
        </div>

        <Button
          asChild
          variant="ghost"
          className="hidden md:flex"
        >
          <Link to="/hotels">
            View All

            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {hotels.slice(0, 3).map((hotel) => (
          <HotelCard
            key={hotel.id}
            {...hotel}
          />
        ))}

      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Button asChild>
          <Link to="/hotels">
            View All Hotels
          </Link>
        </Button>
      </div>

    </section>
  );
}