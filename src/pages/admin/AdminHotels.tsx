import { Building2, Loader2, MapPin, Pencil, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import EmptyState from "@/components/dashboard/common/EmptyState";
import StatusBadge from "@/components/dashboard/common/StatusBadge";
import HotelFormPanel from "@/components/dashboard/hotelOwner/hotel/HotelFormPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetHotelsQuery, useEditHotelsMutation, useDeleteHotelMutation } from "@/store/api/hotelApi";
import { API_BASE_URL } from "@/constants/api";
import { emptyHotelForm, type HotelFormData } from "@/types/dashboardTypes";
import toast from "react-hot-toast";

const AdminHotels = () => {
  const { data, isLoading } = useGetHotelsQuery({});
  const [editHotel, { isLoading: isEditing }] = useEditHotelsMutation();
  const [deleteHotel] = useDeleteHotelMutation();

  const [formMode, setFormMode] = useState<"edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<HotelFormData>(emptyHotelForm());

  const hotels = data?.data ?? [];

  const openEdit = (hotel: HotelFormData & { id: number }) => {
    setFormValues({
      name: hotel.name ?? "",
      description: hotel.description ?? "",
      city: hotel.city ?? "",
      state: hotel.state ?? "",
      country: hotel.country ?? "India",
      address: hotel.address ?? "",
      starRating: hotel.starRating ?? 3,
      isActive: hotel.isActive ?? true,
    });
    setEditingId(hotel.id);
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingId(null);
    setFormValues(emptyHotelForm());
  };

  const handleSubmit = async () => {
    if (!editingId || !formValues.name) return toast.error("Name is required");
    try {
      await editHotel({ id: editingId, data: formValues }).unwrap();
      toast.success("Hotel updated");
      closeForm();
    } catch {
      toast.error("Failed to update hotel");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this hotel from the platform?")) return;
    try {
      await deleteHotel(id).unwrap();
      toast.success("Hotel deleted");
      if (editingId === id) closeForm();
    } catch {
      toast.error("Failed to delete hotel");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Hotel Management" description="Oversee, update, and remove hotels on the platform." />

      {formMode && (
        <HotelFormPanel
          mode="edit"
          values={formValues}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isLoading={isEditing}
        />
      )}

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : !hotels.length ? (
        <EmptyState icon={Building2} title="No hotels registered" description="Hotels will appear here once owners register properties." />
      ) : (
        <div className="grid gap-4">
          {hotels.map((hotel: HotelFormData & {
            id: number;
            averageRating: number;
            totalReviews: number;
            totalBookings: number;
            isActive: boolean;
            images: { imageUrl: string }[];
          }) => (
            <Card key={hotel.id} className="overflow-hidden border-0 shadow-sm ring-1 ring-border/60">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <img
                    src={`${API_BASE_URL}${hotel.images?.[0]?.imageUrl}`}
                    alt={hotel.name}
                    className="h-48 w-full object-cover md:h-auto md:w-56"
                  />
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{hotel.name}</h3>
                        <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                          <MapPin className="size-4" /> {hotel.city}, {hotel.state}
                        </p>
                      </div>
                      <StatusBadge status={hotel.isActive ? "active" : "inactive"} />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        {hotel.averageRating} ({hotel.totalReviews} reviews)
                      </span>
                      <span>{hotel.totalBookings} bookings</span>
                      <span className="text-muted-foreground">ID: #{hotel.id}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-xl" onClick={() => openEdit(hotel)}>
                        <Pencil className="mr-1 size-3.5" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl text-destructive" onClick={() => handleDelete(hotel.id)}>
                        <Trash2 className="mr-1 size-3.5" /> Delete
                      </Button>
                    </div>
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

export default AdminHotels;
