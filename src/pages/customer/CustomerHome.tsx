import { CalendarDays, Heart, MapPin, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import StatCard from "@/components/dashboard/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetBookingsQuery } from "@/store/api/paymentApi";
import { useGetWishListQuery } from "@/store/api/wishListAPi";
import { useGetMyReviewsQuery } from "@/store/api/reviewApi";
import useAuth from "@/hooks/useAuth";
import StatusBadge from "@/components/dashboard/common/StatusBadge";

const CustomerHome = () => {
  const { user } = useAuth();
  const { data: bookingsData } = useGetBookingsQuery({});
  const { data: wishlistData } = useGetWishListQuery(undefined);
  const { data: reviewsData } = useGetMyReviewsQuery(undefined);

  const bookings = bookingsData?.data ?? [];
  const wishlist = wishlistData?.data ?? [];
  const reviews = reviewsData?.data ?? [];
  const upcoming = bookings.filter((b: { status: string }) => ["confirmed", "pending"].includes(b.status?.toLowerCase()));

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user?.fullName?.split(" ")[0] ?? "Guest"}`}
        description="Your travel dashboard — bookings, wishlist, and reviews at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Bookings" value={bookings.length} icon={CalendarDays} description="All time reservations" />
        <StatCard title="Upcoming Stays" value={upcoming.length} icon={TrendingUp} description="Confirmed & pending" />
        <StatCard title="Wishlist" value={wishlist.length} icon={Heart} description="Saved properties" />
        <StatCard title="Reviews Written" value={reviews.length} icon={Star} description="Your guest feedback" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/customer/bookings">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookings.slice(0, 3).map((booking: { id: number; hotelName: string; roomName: string; checkInDate: string; status: string }) => (
              <div key={booking.id} className="flex items-center justify-between rounded-xl border bg-muted/20 p-4">
                <div>
                  <p className="font-medium">{booking.hotelName}</p>
                  <p className="text-sm text-muted-foreground">{booking.roomName}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Check-in: {booking.checkInDate}</p>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
            {!bookings.length && (
              <p className="py-8 text-center text-sm text-muted-foreground">No bookings yet. Start exploring!</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild className="h-12 justify-start rounded-xl" variant="outline">
              <Link to="/hotels"><MapPin className="mr-2 size-4" /> Explore Hotels</Link>
            </Button>
            <Button asChild className="h-12 justify-start rounded-xl" variant="outline">
              <Link to="/customer/bookings"><CalendarDays className="mr-2 size-4" /> My Bookings</Link>
            </Button>
            <Button asChild className="h-12 justify-start rounded-xl" variant="outline">
              <Link to="/customer/wishlist"><Heart className="mr-2 size-4" /> View Wishlist</Link>
            </Button>
            <Button asChild className="h-12 justify-start rounded-xl" variant="outline">
              <Link to="/customer/profile"><Star className="mr-2 size-4" /> Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerHome;
