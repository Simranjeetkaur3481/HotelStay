import { BarChart3, Building2, CalendarDays, Loader2, Star, TrendingUp } from "lucide-react";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import StatCard from "@/components/dashboard/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import { useGetBookingsQuery } from "@/store/api/paymentApi";
import { useGetAllReviewsQuery } from "@/store/api/reviewApi";

const AdminAnalytics = () => {
  const { data: hotelsData, isLoading: hotelsLoading } = useGetHotelsQuery({});
  const { data: bookingsData, isLoading: bookingsLoading } = useGetBookingsQuery({});
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewsQuery(undefined);

  const isLoading = hotelsLoading || bookingsLoading || reviewsLoading;
  const hotels = hotelsData?.data ?? [];
  const bookings = bookingsData?.data ?? [];
  const reviews = reviewsData?.data ?? [];

  const confirmed = bookings.filter((b: { status: string }) => b.status?.toLowerCase() === "confirmed").length;
  const pending = bookings.filter((b: { status: string }) => b.status?.toLowerCase() === "pending").length;
  const totalRevenue = bookings.reduce((sum: number, b: { totalAmount: number }) => sum + (b.totalAmount ?? 0), 0);
  const avgRating = reviews.length
    ? (reviews.reduce((sum: number, r: { overallRating: number }) => sum + r.overallRating, 0) / reviews.length).toFixed(1)
    : "—";

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Analytics" description="Platform performance metrics and insights." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Hotels" value={hotels.filter((h: { isActive: boolean }) => h.isActive).length} icon={Building2} />
        <StatCard title="Confirmed Bookings" value={confirmed} icon={CalendarDays} trend={{ value: `${pending} pending`, positive: false }} />
        <StatCard title="Avg. Rating" value={avgRating} icon={Star} description={`From ${reviews.length} reviews`} />
        <StatCard title="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(2)}L`} icon={TrendingUp} trend={{ value: "+8.4% growth", positive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="size-5" /> Booking Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["confirmed", "pending", "completed", "cancelled"].map((status) => {
              const count = bookings.filter((b: { status: string }) => b.status?.toLowerCase() === status).length;
              const pct = bookings.length ? Math.round((count / bookings.length) * 100) : 0;
              return (
                <div key={status} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{status}</span>
                    <span className="font-medium">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Star className="size-5" /> Top Rated Hotels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...hotels]
              .sort((a: { averageRating: number }, b: { averageRating: number }) => b.averageRating - a.averageRating)
              .slice(0, 5)
              .map((hotel: { id: number; name: string; averageRating: number; totalReviews: number }) => (
                <div key={hotel.id} className="flex items-center justify-between rounded-xl border bg-muted/20 p-3">
                  <span className="font-medium">{hotel.name}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    {hotel.averageRating} ({hotel.totalReviews})
                  </div>
                </div>
              ))}
            {!hotels.length && <p className="py-4 text-center text-sm text-muted-foreground">No data available</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
