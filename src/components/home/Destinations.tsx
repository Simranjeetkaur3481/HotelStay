import DestinationCard from "./DestinationCard";
import { useGetHotelsQuery } from "@/store/api/hotelApi";

const Destinations = () => {
  const { data } = useGetHotelsQuery();
  const hotels = data?.data || [];

  const grouped = hotels.reduce((acc, hotel) => {
    const key = `${hotel.city}-${hotel.country}`;
    if (!acc[key]) {
      acc[key] = {
        id:hotel.id,
        city: hotel.city,
        images: hotel.images,
        country: hotel.country,
        totalHotels: 0,
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 4).map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
      </div>
  );
};

export default Destinations;
