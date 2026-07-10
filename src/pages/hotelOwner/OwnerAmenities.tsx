import { Loader2, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import EmptyState from "@/components/dashboard/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetAmenitiesQuery,
  useAddAmenityMutation,
  useUpdateAmenityMutation,
  useDeleteAmenitiesMutation,
} from "@/store/api/amenitiesAPi";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import type { AmenityFormData } from "@/types/dashboardTypes";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";

const emptyAmenity = (): AmenityFormData => ({ name: "", icon: "" });

const OwnerAmenities = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetAmenitiesQuery(undefined);
  const { data: hotelsData } = useGetHotelsQuery({});
  const [addAmenity, { isLoading: isAdding }] = useAddAmenityMutation();
  const [updateAmenity, { isLoading: isUpdating }] = useUpdateAmenityMutation();
  const [deleteAmenity] = useDeleteAmenitiesMutation();

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<AmenityFormData>(emptyAmenity());
  const [selectedHotelId, setSelectedHotelId] = useState<string>("all");

  const allHotels = hotelsData?.data ?? [];
  const hasOwnershipField = allHotels.some((hotel: Record<string, unknown>) =>
    ["ownerId", "hotelOwnerId", "userId", "createdById"].some((key) => hotel[key] != null)
  );
  const ownerHotels = hasOwnershipField && user?.id
    ? allHotels.filter((hotel: Record<string, unknown>) =>
        [hotel.ownerId, hotel.hotelOwnerId, hotel.userId, hotel.createdById].some((value) => Number(value) === Number(user.id))
      )
    : allHotels;
  const ownerHotelIds = new Set(ownerHotels.map((hotel: { id: number }) => Number(hotel.id)));
  const allAmenities = data?.data ?? [];
  const amenities = selectedHotelId === "all"
    ? allAmenities.filter((item: { hotelId?: number }) => !item.hotelId || ownerHotelIds.has(Number(item.hotelId)))
    : allAmenities.filter((item: { hotelId?: number }) => Number(item.hotelId) === Number(selectedHotelId));

  const openCreate = () => {
    setFormValues(emptyAmenity());
    setEditingId(null);
    setFormMode("create");
  };

  const openEdit = (amenity: AmenityFormData & { id: number }) => {
    setFormValues({ name: amenity.name, icon: amenity.icon ?? "" });
    setEditingId(amenity.id);
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingId(null);
    setFormValues(emptyAmenity());
  };

  const handleSubmit = async () => {
    if (!formValues.name) return toast.error("Amenity name is required");
    try {
      if (formMode === "create") {
        await addAmenity(formValues).unwrap();
        toast.success("Amenity created");
      } else if (formMode === "edit" && editingId) {
        await updateAmenity({ id: editingId, data: formValues }).unwrap();
        toast.success("Amenity updated");
      }
      closeForm();
    } catch {
      toast.error(formMode === "create" ? "Failed to create amenity" : "Failed to update amenity");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this amenity?")) return;
    try {
      await deleteAmenity(id).unwrap();
      toast.success("Amenity deleted");
      if (editingId === id) closeForm();
    } catch {
      toast.error("Failed to delete amenity");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Amenities"
        description="Manage amenities available across your hotel properties."
        action={
          <Button className="rounded-xl" onClick={openCreate}>
            <Plus className="mr-2 size-4" /> Add Amenity
          </Button>
        }
      />

      <div className="max-w-xs">
        <Select value={selectedHotelId} onValueChange={setSelectedHotelId}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Filter by hotel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All My Hotels</SelectItem>
            {ownerHotels.map((hotel: { id: number; name: string }) => (
              <SelectItem key={hotel.id} value={String(hotel.id)}>
                {hotel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formMode && (
        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-semibold">{formMode === "create" ? "Add Amenity" : "Edit Amenity"}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Amenity Name</Label>
                <Input value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} placeholder="e.g. Swimming Pool" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Icon (optional)</Label>
                <Input value={formValues.icon} onChange={(e) => setFormValues({ ...formValues, icon: e.target.value })} placeholder="e.g. pool" className="rounded-xl" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={isAdding || isUpdating} className="rounded-xl">
                {formMode === "create" ? "Create Amenity" : "Update Amenity"}
              </Button>
              <Button variant="outline" onClick={closeForm} className="rounded-xl">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : !amenities.length && !formMode ? (
        <EmptyState icon={Sparkles} title="No amenities yet" description="Add amenities to showcase what your properties offer." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {amenities.map((amenity: AmenityFormData & { id: number }) => (
            <Card key={amenity.id} className="border-0 shadow-sm ring-1 ring-border/60 transition hover:shadow-md">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <Sparkles className="size-5 text-primary" />
                  </div>
                  <span className="font-medium">{amenity.name}</span>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="size-8" onClick={() => openEdit(amenity)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-8 text-destructive" onClick={() => handleDelete(amenity.id)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerAmenities;
