import Amenities from "@/components/hotels/Amenities";
import BookingCard from "@/components/hotels/BookingCard";
import HotelHeader from "@/components/hotels/HotelHeader";
import HotelMap from "@/components/hotels/HotelMap";
import ImageGallery from "@/components/hotels/ImageGallery";
import Overview from "@/components/hotels/Overview";
import Policies from "@/components/hotels/Policies";
import ReviewSection from "@/components/hotels/ReviewSection";
import Rooms from "@/components/hotels/Room";
import SimilarHotels from "@/components/hotels/SimilarHotels";
import { Button } from "@/components/ui/button";
import { useGetHotelByIdQuery } from "@/store/api/hotelApi";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(typeof id);
  const { data, isError, isLoading } = useGetHotelByIdQuery(Number(id));
  if (isLoading) return <p className="flex h-40 items-center justify-center text-red-700">Loading...</p>;

  if (isError) return <div className="flex h-40 items-center justify-center text-red-700">Something went wrong.</div>;
  const hotel = data?.data ?? null;
  if (!hotel) return <div className="flex h-40 items-center justify-center text-red-700">Hotel not found</div>;
  console.log(data);

  return (
    <section className="max-w-7xl mx-auto px-6">
      <Button variant="ghost" className="mt-6 px-0" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 size-4" />
        Back
      </Button>

      <ImageGallery images={hotel.images} />

      <HotelHeader {...hotel} />

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-16 lg:col-span-2">
          <Overview />

          <Amenities amenities={hotel.amenities} />

          <Rooms hotelId={hotel.id} />

          <ReviewSection hotel={hotel} />

          <HotelMap city={hotel.city} />

          <Policies />
        </div>

        <BookingCard price={hotel.startingRoomPrice} />
      </div>

      {/* <SimilarHotels hotels={hotel} /> */}
    </section>
  );
};

export default HotelDetails;
