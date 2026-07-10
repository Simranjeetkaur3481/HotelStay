import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import HotelList from "@/components/dashboard/hotelOwner/hotel/HotelList";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import HotelFormPanel from "@/components/dashboard/hotelOwner/hotel/HotelFormPanel";
import { useAddHotelMutation, useDeleteHotelMutation, useEditHotelsMutation, useGetHotelsQuery } from "@/store/api/hotelApi";
import { emptyHotelForm, type HotelFormData } from "@/types/dashboardTypes";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import type { HotelItem } from "@/components/dashboard/hotelOwner/hotel/HotelList";

export default function OwnerHotelsPage() {
  const { user } = useAuth();
  const { data: hotelsData, isLoading: hotelsLoading } = useGetHotelsQuery({});
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<HotelFormData>(emptyHotelForm());

  const [addHotel, { isLoading: isAdding }] = useAddHotelMutation();
  const [editHotel, { isLoading: isEditing }] = useEditHotelsMutation();
  const [deleteHotel] = useDeleteHotelMutation();
  const allHotels: HotelItem[] = hotelsData?.data ?? [];
  const hasOwnershipField = allHotels.some((hotel: Record<string, unknown>) =>
    ["ownerId", "hotelOwnerId", "userId", "createdById"].some((key) => hotel[key] != null)
  );
  const ownerHotels = hasOwnershipField && user?.id
    ? allHotels.filter((hotel: Record<string, unknown>) =>
        [hotel.ownerId, hotel.hotelOwnerId, hotel.userId, hotel.createdById].some((value) => Number(value) === Number(user.id))
      ) as HotelItem[]
    : allHotels;

  const openCreate = () => {
    setFormValues(emptyHotelForm());
    setEditingId(null);
    setFormMode("create");
  };

  const openEdit = (hotel: {
    id: number;
    name: string;
    city: string;
    state: string;
    description?: string;
    country?: string;
    address?: string;
    starRating?: number;
    isActive: boolean;
  }) => {
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
    if (!formValues.name || !formValues.city) {
      return toast.error("Name and city are required");
    }
    try {
      if (formMode === "create") {
        await addHotel(formValues).unwrap();
        toast.success("Hotel created successfully");
      } else if (formMode === "edit" && editingId) {
        await editHotel({ id: editingId, data: formValues }).unwrap();
        toast.success("Hotel updated successfully");
      }
      closeForm();
    } catch {
      toast.error(formMode === "create" ? "Failed to create hotel" : "Failed to update hotel");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this hotel? This action cannot be undone.")) return;
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
      <PageHeader
        title="Hotels"
        description="Manage your hotels, rooms and bookings."
        action={
          <Button onClick={openCreate} className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Add Hotel
          </Button>
        }
      />

      {formMode && (
        <HotelFormPanel
          mode={formMode}
          values={formValues}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isLoading={isAdding || isEditing}
        />
      )}

      <HotelList onEdit={openEdit} onDelete={handleDelete} hotels={ownerHotels} isLoading={hotelsLoading} />
    </div>
  );
}
