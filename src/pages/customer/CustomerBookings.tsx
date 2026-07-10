import { CalendarDays, Loader2, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import EmptyState from "@/components/dashboard/common/EmptyState";
import StatusBadge from "@/components/dashboard/common/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetBookingsQuery } from "@/store/api/paymentApi";
import { useState } from "react";

const filters = ["all", "confirmed", "pending", "completed", "cancelled"];

const CustomerBookings = () => {
  const [filter, setFilter] = useState("all");
  const { data, isLoading } = useGetBookingsQuery({ Filter: filter === "all" ? undefined : filter });
  const bookings = data?.data ?? [];

  return (
    <div className="space-y-8">
      <PageHeader title="My Bookings" description="Track and manage all your hotel reservations." />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            className="rounded-full capitalize"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : !bookings.length ? (
        <EmptyState
          icon={CalendarDays}
          title="No bookings found"
          description="You haven't made any reservations yet. Discover amazing stays across India."
          action={
            <Button asChild>
              <Link to="/hotels">Browse Hotels</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking: {
            id: number;
            hotelName: string;
            roomName: string;
            checkInDate: string;
            checkOutDate: string;
            guestCount: number;
            totalAmount: number;
            status: string;
          }) => (
            <Card key={booking.id} className="overflow-hidden border-0 shadow-sm ring-1 ring-border/60 transition hover:shadow-md">
              <CardContent className="p-0">
                <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{booking.hotelName}</h3>
                      <StatusBadge status={booking.status} />
                    </div>
                    <p className="text-muted-foreground">{booking.roomName}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-4" />
                        {booking.checkInDate} → {booking.checkOutDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="size-4" />
                        {booking.guestCount} guests
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-4" />
                        Booking #{booking.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold">₹{booking.totalAmount?.toLocaleString()}</p>
                    {booking.status?.toLowerCase() === "pending" && (
                      <Button asChild>
                        <Link to={`/booking/${booking.id}/payment`}>Pay Now</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerBookings;
