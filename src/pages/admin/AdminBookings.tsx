import { CalendarDays, Loader2, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import EmptyState from "@/components/dashboard/common/EmptyState";
import StatusBadge from "@/components/dashboard/common/StatusBadge";
import { useGetBookingsQuery } from "@/store/api/paymentApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const filters = ["all", "confirmed", "pending", "completed", "cancelled"];

const AdminBookings = () => {
  const [filter, setFilter] = useState("all");
  const { data, isLoading } = useGetBookingsQuery({ Filter: filter === "all" ? undefined : filter });
  const bookings = data?.data ?? [];

  return (
    <div className="space-y-8">
      <PageHeader title="All Bookings" description="Platform-wide booking management and oversight." />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} className="rounded-full capitalize" onClick={() => setFilter(f)}>
            {f}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : !bookings.length ? (
        <EmptyState icon={CalendarDays} title="No bookings found" description="Bookings will appear here as guests make reservations." />
      ) : (
        <div className="overflow-hidden rounded-2xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-6 py-4 text-left font-medium">ID</th>
                  <th className="px-6 py-4 text-left font-medium">Hotel / Room</th>
                  <th className="px-6 py-4 text-left font-medium">Dates</th>
                  <th className="px-6 py-4 text-left font-medium">Guests</th>
                  <th className="px-6 py-4 text-left font-medium">Amount</th>
                  <th className="px-6 py-4 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
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
                  <tr key={booking.id} className="border-b transition hover:bg-muted/20">
                    <td className="px-6 py-4 font-mono text-muted-foreground">#{booking.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{booking.hotelName}</p>
                      <p className="text-muted-foreground">{booking.roomName}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{booking.checkInDate} → {booking.checkOutDate}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1"><Users className="size-3.5" />{booking.guestCount}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold">₹{booking.totalAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4"><StatusBadge status={booking.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
