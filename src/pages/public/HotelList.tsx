import FilterSidebar from "@/components/hotels/hotelLists/FilterSidebar";
import HotelCardSkeleton from "@/components/hotels/hotelLists/HotelCardSekelton";
import HotelList from "@/components/hotels/hotelLists/HotelList";
import SortDropdown from "@/components/hotels/hotelLists/SortDropDown";
import MobileFilters from "@/components/hotels/searchResult/MobileFilter";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import { useState } from "react";

const HotelListPage = () => {
  const { data, isLoading, isError } = useGetHotelsQuery("");
  const allHotels = data?.data || [];
  const [filters, setFilters] = useState("");

  const handleSort = () =>{
    
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pb-10">
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <FilterSidebar />
        </aside>

        <main className="space-y-6 lg:col-span-9">
          <div className="mt-6 flex items-center justify-between lg:hidden">
            <MobileFilters filters={filters} onChange={setFilters} />

            <SortDropdown value={filters.sort} onChange={handleSort} />
          </div>
          {isLoading && (
            <div className="space-y-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <HotelCardSkeleton key={index} />
              ))}
            </div>
          )}
          {isError && <div>some error occured</div>}

          <HotelList hotels={allHotels} />

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
