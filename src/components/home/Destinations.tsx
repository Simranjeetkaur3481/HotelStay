import { AlertTriangle, Hotel, RefreshCw } from "lucide-react";
import HotelCardSkeleton from "../hotels/hotelLists/HotelCardSekelton";
import DestinationCard from "./DestinationCard";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import { Button } from "../ui/button";

const Destinations = () => {
  const { data, isLoading, isError, refetch } = useGetHotelsQuery(undefined);
  const hotels = data?.data || [];

  const grouped = hotels.reduce((acc, hotel) => {
    const city = hotel.city.trim().toLowerCase();
    const country = hotel.country.trim().toLowerCase();
    const key = `${city}-${country}`;
    if (!acc[key]) {
      acc[key] = {
        id: hotel.id,
        city: hotel.city,
        images: hotel.images,
        country: hotel.country,
        totalHotels: 0,
        cityImageUrl:hotel.cityImageUrl
      };
    }

    acc[key].totalHotels += 1;
    return acc;
  }, {});

  const destinations = Object.values(grouped);
  return (
    <div className="mx-auto max-w-7xl px-6 sm:py-10">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="font-semibold text-primary">Top Destinations</p>

          <h2 className="mt-2 text-4xl font-bold">Discover Incredible Places</h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Explore breathtaking destinations and book the perfect stay for your next unforgettable adventure.
          </p>
        </div>
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
            Something went wrong while loading the top destinations. Please try again.
          </p>

          <Button className="mt-6" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      ) : destinations.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed p-8 text-center">
          <div className="mb-5 rounded-full bg-muted p-4">
            <Hotel className="h-10 w-10 text-muted-foreground" />
          </div>

          <h2 className="text-2xl font-semibold">No Popular Destinations Yet</h2>

          <p className="mt-2 max-w-md text-muted-foreground">
            It looks like there are no featured destinations right now. Explore again later as we add exciting places
            for your next trip.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 4).map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
