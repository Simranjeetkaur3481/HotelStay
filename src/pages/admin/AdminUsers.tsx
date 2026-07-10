import { Loader2, Shield, UserCheck, UserX, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import StatCard from "@/components/dashboard/common/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetBookingsQuery } from "@/store/api/paymentApi";
import { useGetAllReviewsQuery } from "@/store/api/reviewApi";

const AdminUsers = () => {
  const { data: bookingsData, isLoading: bookingsLoading } = useGetBookingsQuery({});
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewsQuery(undefined);

  const isLoading = bookingsLoading || reviewsLoading;
  const bookings = bookingsData?.data ?? [];
  const reviews = reviewsData?.data ?? [];

  const uniqueGuests = new Map<string, { name: string; bookings: number; reviews: number }>();

  bookings.forEach((b: { guestName?: string; userName?: string }) => {
    const name = b.guestName ?? b.userName ?? "Unknown";
    const existing = uniqueGuests.get(name) ?? { name, bookings: 0, reviews: 0 };
    existing.bookings += 1;
    uniqueGuests.set(name, existing);
  });

  reviews.forEach((r: { userName: string }) => {
    const existing = uniqueGuests.get(r.userName) ?? { name: r.userName, bookings: 0, reviews: 0 };
    existing.reviews += 1;
    uniqueGuests.set(r.userName, existing);
  });

  const users = Array.from(uniqueGuests.values());

  return (
    <div className="space-y-8">
      <PageHeader title="User Management" description="Monitor platform users derived from bookings and review activity." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Active Users" value={users.length} icon={Users} description="With platform activity" />
        <StatCard title="Total Bookings" value={bookings.length} icon={UserCheck} description="Across all users" />
        <StatCard title="Review Contributors" value={reviews.length} icon={Shield} description="Published reviews" />
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-6 py-4 text-left font-medium">User</th>
                    <th className="px-6 py-4 text-left font-medium">Bookings</th>
                    <th className="px-6 py-4 text-left font-medium">Reviews</th>
                    <th className="px-6 py-4 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.name} className="border-b transition hover:bg-muted/20">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{user.bookings}</td>
                      <td className="px-6 py-4">{user.reviews}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                          <UserCheck className="mr-1 size-3" /> Active
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {!users.length && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                        <UserX className="mx-auto mb-2 size-8 opacity-40" />
                        No user activity recorded yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUsers;
