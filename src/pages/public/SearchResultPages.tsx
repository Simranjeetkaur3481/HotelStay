import SearchResultList from "@/components/hotels/searchResult/SearchResultList";
import { useGetAvailableHotelRoomsQuery } from "@/store/api/roomApi";
import { useSearchParams } from "react-router-dom";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination") ?? "";
  const checkIn = searchParams.get("CheckInDate") ?? "";
  const checkOut = searchParams.get("CheckOutDate") ?? "";

  console.log(destination, checkIn, checkOut);

  const { data, isLoading } = useGetAvailableHotelRoomsQuery({
    destination,
    checkInDate: checkIn,
    checkOutDate: checkOut,
  });

  const results = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <SearchSearchBar /> */}

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">{/* <SearchFilters /> */}</aside>

        <main className="space-y-6 lg:col-span-9">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing available rooms in <span className="font-medium">{destination}</span>
            </p>

            {/* <SearchSortDropdown /> */}
          </div>

          <SearchResultList results={results} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
