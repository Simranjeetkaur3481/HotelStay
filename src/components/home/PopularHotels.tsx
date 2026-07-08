import { useGetHotelsQuery } from "@/store/api/hotelApi";
import HotelCard from "./HotelCard";
import { Link } from "react-router-dom";
import HotelCardSkeleton from "../hotels/hotelLists/HotelCardSekelton";
import { AlertTriangle, Hotel, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

const PopularHotels = () => {
  const { data, isLoading, isError, refetch } = useGetHotelsQuery(undefined);
  const hotels = data?.data || [];
  const polularHotels = [...hotels].sort((a, b) => b.starRating - a.starRating);

  return (
    <section className="max-w-7xl w-full mx-auto px-6 py-12">
      <div className="flex items-end justify-between py-5">
        <div>
          <p className="text-primary font-semibold">Popular Hotels</p>

          <h2 className="mt-2 text-3xl font-bold">Stay at Our Most Loved Destinations</h2>
        </div>

        <Link to={`hotels`}>View All</Link>
      </div>
      {isLoading ? (
        <div className="flex gap-5 overflow-x-auto scrollbar-none py-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <HotelCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <div className="mb-5 rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>

          <h2 className="text-2xl font-semibold">Couldn't Load Hotels</h2>

          <p className="mt-2 max-w-md text-muted-foreground">
            Something went wrong while loading the hotels. Please try again.
          </p>

          <Button className="mt-6" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      ) : polularHotels.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed p-8 text-center">
          <div className="mb-5 rounded-full bg-muted p-4">
            <Hotel className="h-10 w-10 text-muted-foreground" />
          </div>

          <h2 className="text-2xl font-semibold">No Hotels Found</h2>

          <p className="mt-2 max-w-md text-muted-foreground">
            We couldn't find any hotels right now. Check back later or explore another destination.
          </p>
        </div>
      ) : (
        <div className="flex gap-5 overflow-x-auto scrollbar-none py-10 snap-x snap-mandatory">
          {polularHotels.slice(0, 4).map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularHotels;
