import SearchResultList from "@/components/hotels/searchResult/SearchResultList";
import { useGetAvailableHotelRoomsQuery, useGetHotelRoomsQuery } from "@/store/api/roomApi";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import FilterSidebar, { type ListingFilters } from "@/components/hotels/hotelLists/FilterSidebar";
import MobileFilters from "@/components/hotels/searchResult/MobileFilter";
import SortDropdown from "@/components/hotels/hotelLists/SortDropDown";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const hasDateCriteria = Boolean(checkIn && checkOut);

  const { data: availableData, isLoading: isAvailabilityLoading } = useGetAvailableHotelRoomsQuery(
    {
      destination,
      checkInDate: checkIn,
      checkOutDate: checkOut,
    },
    { skip: !hasDateCriteria }
  );
  const { data: roomsData, isLoading: isRoomsLoading } = useGetHotelRoomsQuery(undefined, {
    skip: hasDateCriteria,
  });
  const { data: hotelsData } = useGetHotelsQuery({});

  const [filters, setFilters] = useState<ListingFilters>({ maxPrice: 20000, ratings: [] });
  const [sortValue, setSortValue] = useState("recommended");
  const rawResults = hasDateCriteria ? (availableData?.data ?? []) : (roomsData?.data ?? []);
  const hotelRatingsById = useMemo(() => {
    const hotels = hotelsData?.data ?? [];
    return new Map(
      hotels.map((hotel: any) => [Number(hotel.id), Number(hotel.starRating ?? hotel.averageRating ?? 0)])
    );
  }, [hotelsData?.data]);
  const hotelRatingsByName = useMemo(() => {
    const hotels = hotelsData?.data ?? [];
    return new Map(
      hotels.map((hotel: any) => [String(hotel.name ?? "").toLowerCase(), Number(hotel.starRating ?? hotel.averageRating ?? 0)])
    );
  }, [hotelsData?.data]);

  const getRoomRating = (room: any) => {
    const directRating = Number(room.starRating ?? room.hotelStarRating ?? 0);
    if (directRating > 0) return directRating;
    const byHotelId = hotelRatingsById.get(Number(room.hotelId));
    if (byHotelId && byHotelId > 0) return byHotelId;
    const byHotelName = hotelRatingsByName.get(String(room.hotelName ?? "").toLowerCase());
    return byHotelName && byHotelName > 0 ? byHotelName : 0;
  };

  const results = destination
    ? rawResults.filter((room: any) =>
        [room.city, room.destination, room.hotelName]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(destination.toLowerCase()))
      )
    : rawResults;
  const isLoading = hasDateCriteria ? isAvailabilityLoading : isRoomsLoading;
  const filteredResults = useMemo(() => {
    const byPriceAndRating = results.filter((room: any) => {
      const price = Number(room.dynamicPricePerNight ?? room.pricePerNight ?? 0);
      const hotelRating = getRoomRating(room);
      const matchPrice = price <= filters.maxPrice;
      const matchRating = !filters.ratings.length || filters.ratings.some((r) => hotelRating >= r);
      return matchPrice && matchRating;
    });

    const rooms = [...byPriceAndRating];
    switch (sortValue) {
      case "priceAsc":
        return rooms.sort((a, b) => (a.dynamicPricePerNight ?? a.pricePerNight ?? 0) - (b.dynamicPricePerNight ?? b.pricePerNight ?? 0));
      case "priceDesc":
        return rooms.sort((a, b) => (b.dynamicPricePerNight ?? b.pricePerNight ?? 0) - (a.dynamicPricePerNight ?? a.pricePerNight ?? 0));
      case "ratingDesc":
        return rooms.sort((a, b) => getRoomRating(b) - getRoomRating(a));
      default:
        return rooms;
    }
  }, [results, filters, sortValue, hotelRatingsById, hotelRatingsByName]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" className="px-0" onClick={() => history.back()}>
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>
      </div>
      {/* <SearchSearchBar /> */}

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </aside>

        <main className="space-y-6 lg:col-span-9">
          <div className="flex items-center justify-between lg:hidden">
            <MobileFilters filters={filters} onChange={setFilters} />
            <SortDropdown value={sortValue} onChange={setSortValue} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredResults.length} room(s) in <span className="font-medium">{destination || "all destinations"}</span>
            </p>
            <div className="hidden lg:block">
              <SortDropdown value={sortValue} onChange={setSortValue} />
            </div>
          </div>

          <SearchResultList
            results={filteredResults}
            isLoading={isLoading}
            onReset={() => {
              setFilters({ maxPrice: 20000, ratings: [] });
              setSortValue("recommended");
            }}
          />
        </main>
      </div>
    </div>
  );
}
