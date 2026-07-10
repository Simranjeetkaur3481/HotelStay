import FilterSidebar from "@/components/hotels/hotelLists/FilterSidebar";
import HotelCardSkeleton from "@/components/hotels/hotelLists/HotelCardSekelton";
import HotelList from "@/components/hotels/hotelLists/HotelList";
import SortDropdown from "@/components/hotels/hotelLists/SortDropDown";
import MobileFilters from "@/components/hotels/searchResult/MobileFilter";
import { Button } from "@/components/ui/button";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ListingFilters } from "@/components/hotels/hotelLists/FilterSidebar";

const HotelListPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const queryParams = useMemo(() => (search ? { search } : undefined), [search]);
  const { data, isLoading, isError, refetch } = useGetHotelsQuery(queryParams);
  const allHotels = data?.data || [];
  const [filters, setFilters] = useState<ListingFilters>({ maxPrice: 20000, ratings: [] });
  const [sortValue, setSortValue] = useState("recommended");

  const filteredHotels = useMemo(() => {
    const byPriceAndRating = allHotels.filter((hotel: any) => {
      const price = Number(hotel.startingRoomPrice ?? 0);
      const rating = Number(hotel.starRating ?? 0);
      const matchPrice = price <= filters.maxPrice;
      const matchRating = !filters.ratings.length || filters.ratings.some((r) => rating >= r);
      return matchPrice && matchRating;
    });

    const hotels = [...byPriceAndRating];
    switch (sortValue) {
      case "priceAsc":
        return hotels.sort((a, b) => (a.startingRoomPrice ?? 0) - (b.startingRoomPrice ?? 0));
      case "priceDesc":
        return hotels.sort((a, b) => (b.startingRoomPrice ?? 0) - (a.startingRoomPrice ?? 0));
      case "ratingDesc":
        return hotels.sort((a, b) => (b.starRating ?? 0) - (a.starRating ?? 0));
      case "reviewsDesc":
        return hotels.sort((a, b) => (b.totalReviews ?? 0) - (a.totalReviews ?? 0));
      default:
        return hotels;
    }
  }, [allHotels, filters, sortValue]);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-10">
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3 hidden lg:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </aside>

        <main className="space-y-6 lg:col-span-9">
          <div className="mt-6 flex items-center justify-between lg:hidden">
            <MobileFilters filters={filters} onChange={setFilters} />

            <SortDropdown value={sortValue} onChange={setSortValue} />
          </div>

          <div className="hidden items-center justify-between lg:flex">
            <p className="text-sm text-muted-foreground">{filteredHotels.length} hotel(s) found</p>
            <SortDropdown value={sortValue} onChange={setSortValue} />
          </div>
          {isLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <HotelCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>

              <h2 className="text-2xl font-semibold">Unable to Load Hotels</h2>

              <p className="mt-2 max-w-md text-muted-foreground">
                We couldn't load the available hotels at the moment. Please check your connection or try again in a few
                moments.
              </p>

              <Button className="mt-6" onClick={() => refetch()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : (
            <HotelList hotels={filteredHotels} />
          )}

          {/* <Pagination /> */}
        </main>
      </div>
    </section>
  );
};

export default HotelListPage;

//   <div className="flex flex-col items-center justify-center rounded-3xl border py-20">

//       <SearchX className="mb-4 size-14 text-muted-foreground" />

//       <h2 className="text-2xl font-semibold">
//         No Hotels Found
//       </h2>

//       <p className="mt-2 text-muted-foreground">
//         Try changing your filters.
//       </p>

//     </div>
