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
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetHotelByIdQuery(Number(id));
  const hotel = data?.data ?? null;

  if (isLoading) return <p className="flex h-40 items-center justify-center text-red-700">Loading...</p>;

  if (isError)
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-3xl border bg-background p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>

          <h2 className="text-3xl font-bold">Unable to Load Hotel</h2>

          <p className="mt-3 text-muted-foreground">
            The hotel you're looking for couldn't be loaded. It may have been removed or there might be a temporary
            network issue.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  if (!hotel)
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">🏨</div>

          <h2 className="text-3xl font-bold">Hotel Not Found</h2>

          <p className="mt-3 text-muted-foreground">
            This hotel doesn't exist anymore or the link is invalid. Browse other amazing stays instead.
          </p>

          <Button className="mt-8" onClick={() => navigate("/hotels")}>
            Explore Hotels
          </Button>
        </div>
      </section>
    );
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
          <Overview hotel={hotel} isLoading={isLoading} />

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
