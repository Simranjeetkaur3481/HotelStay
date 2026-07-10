import { Bed, Building2, CalendarDays, IndianRupee, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import StatCard from "@/components/dashboard/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import { useGetHotelRoomsQuery } from "@/store/api/roomApi";
import { useGetBookingsQuery } from "@/store/api/paymentApi";

const HotelOwnerHome = () => {
  const { data: hotelsData } = useGetHotelsQuery({});
  const { data: roomsData } = useGetHotelRoomsQuery();
  const { data: bookingsData } = useGetBookingsQuery({});

  const hotels = hotelsData?.data ?? [];
  const rooms = roomsData?.data ?? [];
  const bookings = bookingsData?.data ?? [];
  const activeHotels = hotels.filter((h: { isActive: boolean }) => h.isActive);
  const totalRevenue = bookings.reduce((sum: number, b: { totalAmount: number }) => sum + (b.totalAmount ?? 0), 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Owner Dashboard"
        description="Monitor your properties, rooms, and bookings in real time."
        action={
          <Button asChild>
            <Link to="/hotelOwner/hotels">Manage Hotels</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Hotels"
          value={hotels.length}
          icon={Building2}
          description={`${activeHotels.length} active`}
        />
        <StatCard title="Total Rooms" value={rooms.length} icon={Bed} description="Across all properties" />
        <StatCard title="Total Bookings" value={bookings.length} icon={CalendarDays} description="All reservations" />
        <StatCard
          title="Revenue"
          value={`₹${(totalRevenue / 1000).toFixed(0)}K`}
          icon={IndianRupee}
          trend={{ value: "+12% vs last month", positive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Properties</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/hotelOwner/hotels">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {hotels
              .slice(0, 4)
              .map((hotel: { id: number; name: string; city: string; totalBookings: number; isActive: boolean }) => (
                <div key={hotel.id} className="flex items-center justify-between rounded-xl border bg-muted/20 p-4">
                  <div>
                    <p className="font-medium">{hotel.name}</p>
                    <p className="text-sm text-muted-foreground">{hotel.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{hotel.totalBookings} bookings</p>
                    <p className={`text-xs ${hotel.isActive ? "text-emerald-600" : "text-muted-foreground"}`}>
                      {hotel.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              ))}
            {!hotels.length && (
              <p className="py-6 text-center text-sm text-muted-foreground">No hotels yet. Add your first property.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild variant="outline" className="h-12 justify-start rounded-xl">
              <Link to="/hotelOwner/hotels">
                <Building2 className="mr-2 size-4" /> Manage Hotels
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-start rounded-xl">
              <Link to="/hotelOwner/rooms">
                <Bed className="mr-2 size-4" /> Manage Rooms
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-start rounded-xl">
              <Link to="/hotelOwner/bookings">
                <CalendarDays className="mr-2 size-4" /> View Bookings
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-start rounded-xl">
              <Link to="/hotelOwner/amenities">
                <TrendingUp className="mr-2 size-4" /> Amenities
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelOwnerHome;
