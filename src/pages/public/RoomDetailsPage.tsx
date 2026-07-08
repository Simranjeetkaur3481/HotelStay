import BookingCard from "@/components/rooms/roomDetailsPage/BookingCard";
import HotelInfo from "@/components/rooms/roomDetailsPage/HotelInfo";
import RoomBreadcrumb from "@/components/rooms/roomDetailsPage/RoomBreadCrumb";
import RoomGallery from "@/components/rooms/roomDetailsPage/RoomGallery";
import RoomInfo from "@/components/rooms/roomDetailsPage/RoomInfo";
import SimilarRooms from "@/components/rooms/roomDetailsPage/SimilarRooms";
import { useGetHotelDetailQuery } from "@/store/api/hotelApi";
import { useGetRoomDetailQuery, useGetRoomsByHotelIdQuery } from "@/store/api/roomApi";
import { useParams } from "react-router-dom";

export default function RoomDetailsPage() {
  const { id } = useParams();
  const { data } = useGetRoomDetailQuery(id);
  const room = data?.data || {};
  const { data: hotels } = useGetHotelDetailQuery(room.hotelId);
  const hotel = hotels?.data || {};
  const { data: rooms } = useGetRoomsByHotelIdQuery(hotel.id);
  const allRooms = rooms?.data || [];
  const similarRooms = allRooms.filter((r) => r.id !== room.id);
  console.log(similarRooms, "rrrr");

  
  return (
    <div className="container mx-auto px-4 py-8">
      <RoomBreadcrumb />

      <RoomGallery images={room.images} />

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <main className="lg:col-span-8 space-y-8">
          <RoomInfo room={room} hotel={hotel} />

          <HotelInfo hotel={hotel} />

          {/* <Reviews /> */}

          <SimilarRooms rooms={similarRooms} />
        </main>

        <aside className="lg:col-span-4">
          <div className="sticky top-24">
            <BookingCard room={room} />
          </div>
        </aside>
      </div>
    </div>
  );
}
