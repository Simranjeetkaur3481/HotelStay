import { Bed, Loader2, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import EmptyState from "@/components/dashboard/common/EmptyState";
import StatusBadge from "@/components/dashboard/common/StatusBadge";
import RoomFormPanel from "@/components/dashboard/hotelOwner/room/RoomFormPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGetHotelRoomsQuery,
  useAddHotelRoomsMutation,
  useUpdateHotelRoomsMutation,
  useDeleteHotelRoomMutation,
} from "@/store/api/roomApi";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import { API_BASE_URL } from "@/constants/api";
import { emptyRoomForm, type RoomFormData } from "@/types/dashboardTypes";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";

const OwnerRooms = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetHotelRoomsQuery();
  const { data: hotelsData } = useGetHotelsQuery({});
  const [addRoom, { isLoading: isAdding }] = useAddHotelRoomsMutation();
  const [updateRoom, { isLoading: isUpdating }] = useUpdateHotelRoomsMutation();
  const [deleteRoom] = useDeleteHotelRoomMutation();

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<RoomFormData>(emptyRoomForm());

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
  const allRooms = data?.data ?? [];
  const ownerRooms = allRooms.filter((room: { hotelId?: number }) => !room.hotelId || ownerHotelIds.has(Number(room.hotelId)));
  const rooms = selectedHotelId === "all"
    ? ownerRooms
    : ownerRooms.filter((room: { hotelId?: number }) => Number(room.hotelId) === Number(selectedHotelId));

  const openCreate = () => {
    setFormValues(emptyRoomForm());
    setEditingId(null);
    setFormMode("create");
  };

  const openEdit = (room: RoomFormData & { id: number; hotelId?: number }) => {
    setFormValues({
      hotelId: room.hotelId ?? 0,
      name: room.name ?? "",
      description: room.description ?? "",
      pricePerNight: room.pricePerNight ?? 0,
      maxOccupancy: room.maxOccupancy ?? 2,
      isAvailable: room.isAvailable ?? true,
    });
    setEditingId(room.id);
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingId(null);
    setFormValues(emptyRoomForm());
  };

  const handleSubmit = async () => {
    if (!formValues.name || !formValues.hotelId) {
      return toast.error("Room name and hotel are required");
    }
    try {
      if (formMode === "create") {
        await addRoom(formValues).unwrap();
        toast.success("Room created successfully");
      } else if (formMode === "edit" && editingId) {
        await updateRoom({ id: editingId, data: formValues }).unwrap();
        toast.success("Room updated successfully");
      }
      closeForm();
    } catch {
      toast.error(formMode === "create" ? "Failed to create room" : "Failed to update room");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await deleteRoom(id).unwrap();
      toast.success("Room deleted");
      if (editingId === id) closeForm();
    } catch {
      toast.error("Failed to delete room");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Room Management"
        description="Manage room inventory, pricing, and availability across all properties."
        action={
          <Button className="rounded-xl" onClick={openCreate}>
            <Bed className="mr-2 size-4" /> Add Room
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
        <RoomFormPanel
          mode={formMode}
          values={formValues}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isLoading={isAdding || isUpdating}
        />
      )}

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : !rooms.length && !formMode ? (
        <EmptyState
          icon={Bed}
          title="No rooms found"
          description="Add rooms to your hotels to start accepting bookings."
          action={
            <Button onClick={openCreate} className="rounded-xl">
              <Bed className="mr-2 size-4" /> Add Room
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room: RoomFormData & { id: number; hotelName: string; images: { imageUrl: string }[] }) => (
            <Card key={room.id} className="overflow-hidden border-0 shadow-sm ring-1 ring-border/60">
              <div className="relative h-40">
                <img
                  src={`${API_BASE_URL}${room.images?.[0]?.imageUrl}`}
                  alt={room.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-3 top-3">
                  <StatusBadge status={room.isAvailable ? "active" : "inactive"} />
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold">{room.name}</h3>
                <p className="text-sm text-muted-foreground">{room.hotelName}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-bold">
                    ₹{room.pricePerNight?.toLocaleString()}
                    <span className="text-xs font-normal text-muted-foreground">/night</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Max {room.maxOccupancy} guests</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 rounded-xl" onClick={() => openEdit(room)}>
                    <Pencil className="mr-1 size-3.5" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl text-destructive" onClick={() => handleDelete(room.id)}>
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

export default OwnerRooms;
