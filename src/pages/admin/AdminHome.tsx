import { Building2, CalendarDays, IndianRupee, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import StatCard from "@/components/dashboard/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import { useGetBookingsQuery } from "@/store/api/paymentApi";
import { useGetAllReviewsQuery } from "@/store/api/reviewApi";

const AdminHome = () => {
  const { data: hotelsData } = useGetHotelsQuery({});
  const { data: bookingsData } = useGetBookingsQuery({});
  const { data: reviewsData } = useGetAllReviewsQuery(undefined);

  const hotels = hotelsData?.data ?? [];
  const bookings = bookingsData?.data ?? [];
  const reviews = reviewsData?.data ?? [];
  const activeHotels = hotels.filter((h: { isActive: boolean }) => h.isActive);
  const totalRevenue = bookings.reduce((sum: number, b: { totalAmount: number }) => sum + (b.totalAmount ?? 0), 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Platform-wide overview of hotels, bookings, and user activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Hotels" value={hotels.length} icon={Building2} description={`${activeHotels.length} active`} />
        <StatCard title="Total Bookings" value={bookings.length} icon={CalendarDays} description="Platform-wide" />
        <StatCard title="Total Reviews" value={reviews.length} icon={Star} description="Guest feedback" />
        <StatCard title="Platform Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={IndianRupee} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building2 className="size-5" /> Hotels</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{hotels.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">{activeHotels.length} active properties</p>
            <Button asChild variant="outline" className="mt-4 w-full rounded-xl">
              <Link to="/admin/hotels">Manage Hotels</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays className="size-5" /> Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{bookings.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">All reservations</p>
            <Button asChild variant="outline" className="mt-4 w-full rounded-xl">
              <Link to="/admin/bookings">View Bookings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="size-5" /> Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">—</p>
            <p className="mt-1 text-sm text-muted-foreground">User management</p>
            <Button asChild variant="outline" className="mt-4 w-full rounded-xl">
              <Link to="/admin/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
